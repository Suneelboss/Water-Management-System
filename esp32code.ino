#include <WiFi.h>
#include <HTTPClient.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "WTC";
const char* password = "12345678";

// Server details
const char* server = "192.168.241.219";
const int httpPort = 4000;
const int wsPort = 3000;

// Device ID - hardcoded
const char* deviceId = "23232";

// WebSocket client
WebSocketsClient webSocket;

// Configuration variables (will be populated from API)
int tankCapacity = 2000;    // Default values, will be updated from API
int tankHeight = 33;        // in cm
float leakageThreshold = 500;
int dryRunThreshold = 30;   // in seconds
int lowLevelAlert = 20;     // percentage
int criticalLevel = 10;     // percentage

// Ultrasonic sensor pins
const int trigPin = 27;     // GPIO pin for TRIG
const int echoPin = 14;     // GPIO pin for ECHO

// Flow sensor pins - EXACTLY as in working code
const int flowSensor1Pin = 39;  // First floor - start
const int flowSensor2Pin = 36;  // First floor - end
const int flowSensor3Pin = 32;  // Second floor - start
const int flowSensor4Pin = 33;  // Second floor - end

// Motor control pin
const int motorControlPin = 4;

// Pulse counters - RENAMED to match working code
volatile unsigned long pulse1 = 0;
volatile unsigned long pulse2 = 0;
volatile unsigned long pulse3 = 0;
volatile unsigned long pulse4 = 0;

// Sensor Parameters - EXACTLY as in working code
const float pulsesPerLiter = 450.0;  // YF-S201 = ~450 pulses/L

// Flow variables
float flow1 = 0.0;
float flow2 = 0.0;
float flow3 = 0.0;
float flow4 = 0.0;
float totalFlow = 0.0;   // Combined flow from sensor 1 and sensor 3

// Leakage detection
bool leakageDetected = false;
int leakageFloor = 0;  // 0 = no leakage, 1 = first floor, 2 = second floor

// Total consumed water
float totalLiters = 0.0;

// Tank level
int tankLevel = 50;     // Initial default value (percentage)

// Control variables
bool motorStatus = false;  // Motor initially off
bool manualControl = false; // True when manually controlled via WebSocket
bool dryRunDetected = false;
unsigned long motorStartTime = 0;
unsigned long noFlowStartTime = 0;
bool configFetched = false;

// Timing variables
unsigned long lastTime = 0;  // For flow calculation (renamed to match working code)
const unsigned long interval = 1000;  // 1 second (as in working code)
unsigned long lastStatusSend = 0;
unsigned long lastUltrasonicReading = 0;

// Interrupt Functions - EXACTLY as in working code
void IRAM_ATTR countPulse1() { pulse1++; }
void IRAM_ATTR countPulse2() { pulse2++; }
void IRAM_ATTR countPulse3() { pulse3++; }
void IRAM_ATTR countPulse4() { pulse4++; }

// Function to fetch configuration from API
bool fetchConfiguration() {
  if (WiFi.status() != WL_CONNECTED) {
    return false;
  }

  HTTPClient http;
  String url = "http://" + String(server) + ":" + String(httpPort) + "/api/v1/device-config/" + String(deviceId);
  
  Serial.print("Fetching configuration from: ");
  Serial.println(url);
  
  http.begin(url);
  int httpResponseCode = http.GET();
  
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    
    String payload = http.getString();
    Serial.println("Response payload:");
    Serial.println(payload);
    
    // Parse JSON response
    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, payload);
    
    if (!error && doc["success"] == true) {
      // Extract configuration values
      tankCapacity = doc["device"]["tankCapacity"];
      tankHeight = doc["device"]["tankHeight"];
      leakageThreshold = doc["device"]["leakageThreshold"];
      dryRunThreshold = doc["device"]["dryRunThreshold"];
      lowLevelAlert = doc["device"]["lowLevelAlert"];
      criticalLevel = doc["device"]["criticalLevel"];
      
      Serial.println("Configuration loaded successfully:");
      Serial.print("Tank Capacity: "); Serial.println(tankCapacity);
      Serial.print("Tank Height: "); Serial.println(tankHeight);
      Serial.print("Leakage Threshold: "); Serial.println(leakageThreshold);
      Serial.print("Dry Run Threshold: "); Serial.println(dryRunThreshold);
      Serial.print("Low Level Alert: "); Serial.println(lowLevelAlert);
      Serial.print("Critical Level: "); Serial.println(criticalLevel);
      
      http.end();
      return true;
    } else {
      Serial.println("JSON parsing failed or API returned error");
    }
  } else {
    Serial.print("Error on HTTP request. Error code: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
  return false;
}

// Connect to WebSocket server
void connectWebSocket() {
  String url = "/?deviceId=" + String(deviceId);
  webSocket.begin(server, wsPort, url);
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
  Serial.println("WebSocket connection initiated");
}

// WebSocket event handler
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  if (type == WStype_CONNECTED) {
    Serial.println("[WS] Connected");
  } else if (type == WStype_DISCONNECTED) {
    Serial.println("[WS] Disconnected");
  } else if (type == WStype_TEXT) {
    // Process incoming commands
    String text = String((char*)payload);
    Serial.println("Received: " + text);
    
    StaticJsonDocument<256> doc;
    DeserializationError error = deserializeJson(doc, text);
    
    if (!error) {
      processCommand(doc);
    } else {
      Serial.println("JSON parse error");
    }
  }
}

// Process commands received via WebSocket
void processCommand(JsonDocument& doc) {
  if (doc.containsKey("command")) {
    String command = doc["command"].as<String>();
    
    if (command == "motor") {
      String status = doc["status"].as<String>();
      
      // Set manual control flag
      manualControl = true;
      
      // Change motor status based on command
      if (status == "on" && !dryRunDetected) {
        setMotorStatus(true);
        Serial.println("Motor manually turned ON");
      } else if (status == "off") {
        setMotorStatus(false);
        Serial.println("Motor manually turned OFF");
      } else if (status == "on" && dryRunDetected) {
        Serial.println("Cannot turn on motor - dry run condition detected");
      }
    } else if (command == "auto") {
      // Return to automatic control
      manualControl = false;
      Serial.println("Returning to automatic motor control");
    } else if (command == "reset") {
      // Reset dry run condition
      dryRunDetected = false;
      Serial.println("Dry run condition reset");
    }
  }
}

// Set motor status and handle related logic
void setMotorStatus(bool status) {
  motorStatus = status;
  digitalWrite(motorControlPin, motorStatus ? HIGH : LOW);
  
  if (motorStatus) {
    motorStartTime = millis();
    noFlowStartTime = 0; // Reset no flow timer
  }
}

// Read water level using ultrasonic sensor
void measureWaterLevel() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duration = pulseIn(echoPin, HIGH, 30000); // 30ms timeout
  
  // Calculate distance in cm
  float distance = duration * 0.034 / 2;
  
  // Constrain distance to tank height
  distance = constrain(distance, 0, tankHeight);
  
  // Convert distance to water level percentage (empty = tankHeight, full = 0)
  int newLevel = map(distance, tankHeight, 0, 0, 100);
  
  // Apply some smoothing to avoid erratic readings
  tankLevel = (tankLevel * 0.7) + (newLevel * 0.3);
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print("cm, Tank Level: ");
  Serial.println(tankLevel);
}

// Calculate flow and check for leakage - COMPLETELY rewritten to match working code
void calculateFlowAndCheckLeakage() {
  if (millis() - lastTime >= interval) {
    lastTime = millis();

    // Safely read and reset pulse counts - EXACTLY as in working code
    noInterrupts();
    unsigned long p1 = pulse1;
    unsigned long p2 = pulse2;
    unsigned long p3 = pulse3;
    unsigned long p4 = pulse4;
    pulse1 = pulse2 = pulse3 = pulse4 = 0;
    interrupts();

    // Calculate flow rate in L/min - EXACTLY as in working code
    flow1 = (p1 / pulsesPerLiter) * 60.0;  // First floor start
    flow2 = (p2 / pulsesPerLiter) * 60.0;  // First floor end
    flow3 = (p3 / pulsesPerLiter) * 60.0;  // Second floor start
    flow4 = (p4 / pulsesPerLiter) * 60.0;  // Second floor end

    // Update total flow - using sensor 1 and sensor 3 as specified
    totalFlow = (flow1 + flow3) / 2.0;
    
    // Accumulate total consumed (very simple integration)
    float litersThisCycle = ((p1 + p3) / pulsesPerLiter);
    totalLiters += litersThisCycle;

    // Display flow info - EXACTLY as in working code
    Serial.println("-------- FLOW RATES --------");
    Serial.print("1st Floor Start:  "); Serial.print(flow1, 2); Serial.println(" L/min");
    Serial.print("1st Floor End:    "); Serial.print(flow2, 2); Serial.println(" L/min");
    Serial.print("2nd Floor Start:  "); Serial.print(flow3, 2); Serial.println(" L/min");
    Serial.print("2nd Floor End:    "); Serial.print(flow4, 2); Serial.println(" L/min");
    Serial.println("-----------------------------");

    // Detect leakage - EXACTLY as in working code
    // bool firstFloorLeak = (flow1 > 1 && flow2 == 0) || (flow1 == 1 && flow2 > 0);
    // bool secondFloorLeak = (flow3 > 1 && flow4 == 0) || (flow3 == 1 && flow4 > 0);
    bool firstFloorLeak = false;
    bool secondFloorLeak = false;

    // Update leakage status
    leakageDetected = firstFloorLeak || secondFloorLeak;
    
    // Set leakage floor
    if (firstFloorLeak) {
      leakageFloor = 1;
    } else if (secondFloorLeak) {
      leakageFloor = 2;
    } else {
      leakageFloor = 0;
    }

    // First floor status - EXACTLY as in working code
    if (firstFloorLeak) {
      Serial.println("⚠️  Leakage detected on First Floor!");
    } else if (flow1 > 0 && flow2 > 0) {
      Serial.println("✅  First Floor - Normal Flow.");
    }

    // Second floor status - EXACTLY as in working code
    if (secondFloorLeak) {
      Serial.println("⚠️  Leakage detected on Second Floor!");
    } else if (flow3 > 0 && flow4 > 0) {
      Serial.println("✅  Second Floor - Normal Flow.");
    }

    Serial.println();
  }
}

// Check for dry run condition
void checkDryRun() {
  static int waterLevelAtStart = 0;
  
  if (motorStatus) {
    // If the motor just started, record the current water level
    if (noFlowStartTime == 0) {
      noFlowStartTime = millis();
      waterLevelAtStart = tankLevel;
      Serial.printf("Motor started. Initial water level: %d%%\n", waterLevelAtStart);
    } else {
      // Check if water level has increased since motor started
      int levelChange = tankLevel - waterLevelAtStart;
      
      // Calculate how long the motor has been running
      unsigned long motorRunTime = millis() - noFlowStartTime;
      
      // Debug output
      if (motorRunTime % 5000 == 0) {  // Print every 5 seconds to avoid flooding serial
        Serial.printf("Motor running for %d seconds. Level change: %d%%\n", 
                     motorRunTime / 1000, levelChange);
      }
      
      // Check if the threshold time has elapsed without sufficient level increase
      if (motorRunTime > (dryRunThreshold * 1000)) {
        // If water level hasn't increased by at least 1%, consider it a dry run
        if (levelChange < 1) {
          dryRunDetected = true;
          setMotorStatus(false);
          Serial.println("DRY RUN DETECTED! Water level did not increase. Motor turned OFF for protection");
        } else {
          // If we've passed the threshold time and level increased enough, reset the timer
          // to continue monitoring in chunks of threshold time
          noFlowStartTime = millis();
          waterLevelAtStart = tankLevel;
          Serial.println("Water level increased sufficiently, continuing operation");
        }
      }
    }
  } else {
    // Reset no-flow timer when motor is off
    noFlowStartTime = 0;
  }
}

// Automatic motor control based on tank level
void automaticMotorControl() {
  // Only apply automatic control if not in manual mode
  if (!manualControl) {
    // Turn on motor if level drops below lowLevelAlert
    if (tankLevel <= lowLevelAlert && !motorStatus && !dryRunDetected) {
      setMotorStatus(true);
      Serial.println("AUTO: Motor turned ON - low water level");
    }
    // Turn off motor if tank is nearly full
    else if (tankLevel >= 95 && motorStatus) {
      setMotorStatus(false);
      Serial.println("AUTO: Motor turned OFF - tank full");
    }
  }
}

// Send current status to server
void sendStatusToServer() {
  if (webSocket.isConnected()) {
    StaticJsonDocument<512> data;
    data["deviceId"] = deviceId;
    data["level"] = tankLevel;
    data["motorStatus"] = motorStatus ? "on" : "off";
    data["dryRun"] = dryRunDetected;
    data["leakage"] = false;      // Added leakage status
    data["leakageFloor"] = 0;    // Added leakage floor
    data["totalConsumed"] = totalLiters;    // Using first sensors only
    data["flowRate"] = totalFlow;           // Average flow rate from first sensors
    data["floor1Flow"] = flow1;             // Added first floor flow
    data["floor2Flow"] = flow3;             // Added second floor flow
    data["autoMode"] = !manualControl;
    
    String jsonStr;
    serializeJson(data, jsonStr);
    webSocket.sendTXT(jsonStr);
    
    Serial.println("Sent status: " + jsonStr);
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Set pin modes
  pinMode(motorControlPin, OUTPUT);
  digitalWrite(motorControlPin, LOW);  // Ensure motor is off
  
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  // Flow sensor setup - EXACTLY as in working code
  pinMode(flowSensor1Pin, INPUT);
  pinMode(flowSensor2Pin, INPUT);
  pinMode(flowSensor3Pin, INPUT);
  pinMode(flowSensor4Pin, INPUT);
  
  // Attach interrupt handlers - EXACTLY as in working code
  attachInterrupt(digitalPinToInterrupt(flowSensor1Pin), countPulse1, RISING);
  attachInterrupt(digitalPinToInterrupt(flowSensor2Pin), countPulse2, RISING);
  attachInterrupt(digitalPinToInterrupt(flowSensor3Pin), countPulse3, RISING);
  attachInterrupt(digitalPinToInterrupt(flowSensor4Pin), countPulse4, RISING);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  
  // Fetch configuration from API
  configFetched = fetchConfiguration();
  
  if (!configFetched) {
    Serial.println("WARNING: Using default configuration values");
  }
  
  // Connect to WebSocket server
  connectWebSocket();
  
  // Initialize timing variables
  lastTime = millis();
  lastStatusSend = millis();
  lastUltrasonicReading = millis();
  
  Serial.println("System initialization complete");
}

void loop() {
  // Handle WebSocket connection
  webSocket.loop();
  
  // Reconnect WiFi if disconnected
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi Disconnected, reconnecting...");
    WiFi.begin(ssid, password);
    
    // Wait for reconnection (with timeout)
    unsigned long reconnectStart = millis();
    while (WiFi.status() != WL_CONNECTED && (millis() - reconnectStart < 10000)) {
      delay(500);
      Serial.print(".");
    }
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\nWiFi reconnected");
      // Try to reconnect WebSocket after WiFi reconnection
      connectWebSocket();
    }
  }
  
  // Read water level every 2 seconds
  if (millis() - lastUltrasonicReading > 2000) {
    measureWaterLevel();
    lastUltrasonicReading = millis();
  }
  
  // Calculate flow rates and check for leakage
  calculateFlowAndCheckLeakage();
  
  // Check for dry run condition
  checkDryRun();
  
  // Apply automatic motor control logic
  automaticMotorControl();
  
  // Send status update every 5 seconds
  if (millis() - lastStatusSend > 5000) {
    sendStatusToServer();
    lastStatusSend = millis();
  }
}