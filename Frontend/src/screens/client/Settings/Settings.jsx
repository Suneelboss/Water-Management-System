import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Slider from "./components/Slider";

export default function Settings() {
  // Tank settings
  const [tankCapacity, setTankCapacity] = useState(1000);
  const [tankHeight, setTankHeight] = useState(200);

  // Threshold settings
  const [leakageThreshold, setLeakageThreshold] = useState(10);
  const [dryRunThreshold, setDryRunThreshold] = useState(15);
  const [lowWaterLevel, setLowWaterLevel] = useState(20);
  const [criticalWaterLevel, setCriticalWaterLevel] = useState(10);

  // Notification settings
  const [pumpStatusNotification, setPumpStatusNotification] = useState(true);
  const [leakageNotification, setLeakageNotification] = useState(true);
  const [dryRunNotification, setDryRunNotification] = useState(true);
  const [waterLevelNotification, setWaterLevelNotification] = useState(true);

  // Handle save settings
  const handleSaveSettings = () => {
    console.log("Saving settings:", {
      tankCapacity,
      tankHeight,
      leakageThreshold,
      dryRunThreshold,
      lowWaterLevel,
      criticalWaterLevel,
      notifications: {
        pumpStatus: pumpStatusNotification,
        leakage: leakageNotification,
        dryRun: dryRunNotification,
        waterLevel: waterLevelNotification
      }
    });

    alert("Settings saved successfully!");
  };

  const resetToDefault = () => {
    setTankCapacity(1000);
    setTankHeight(200);
    setLeakageThreshold(10);
    setDryRunThreshold(15);
    setLowWaterLevel(20);
    setCriticalWaterLevel(10);
    setPumpStatusNotification(true);
    setLeakageNotification(true);
    setDryRunNotification(true);
    setWaterLevelNotification(true);
  };

  // // Custom slider component
  // const Slider = ({ value, min, max, onChange }) => {
  //   const percentage = ((value - min) / (max - min)) * 100;

  //   const handleSliderChange = (e) => {
  //     const newValue = Number(e.target.value);
  //     onChange(newValue);
  //   };

  //   return (
  //     <div className="relative w-full h-6 flex items-center">
  //       <div className="absolute w-full h-1 bg-gray-200 rounded"></div>
  //       <div
  //         className="absolute h-2 bg-water-600 rounded"
  //         style={{ width: `${percentage}%` }}
  //       ></div>
  //       <input
  //         type="range"
  //         min={min}
  //         max={max}
  //         value={value}
  //         onChange={handleSliderChange}
  //         className="absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
  //       />
  //     </div>
  //   );
  // };

  // Custom toggle switch component
  const ToggleSwitch = ({ checked, onChange }) => {
    return (
      <div
        className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${checked ? 'bg-blue-500' : 'bg-gray-200'}`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-transform ${checked ? 'left-7' : 'left-1'}`}
        ></div>
      </div>
    );
  };
  const Seperator = () => {
    return (
      <div className="shrink-0 h-[1px] w-full mb-6 bg-[#e2e8f0]"> </div>
    );
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full ml-48'>
        <div className="bg-gray-50 min-h-screen p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-900">System Settings</h1>
              <p className="text-sm text-gray-600">Configure your water management system parameters</p>
            </div>

            {/* Tank configuration */}
            <div className="bg-white rounded-lg shadow-gray-300 border shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 mr-2 text-water-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <line x1="12" y1="6" x2="12" y2="10" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                  </svg>
                </div>
                <h2 className="text-base font-medium text-gray-900">Tank Configuration</h2>
              </div>
              <Seperator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tank Capacity (Liters)
                  </label>
                  <input
                    type="number"
                    value={tankCapacity}
                    onChange={(e) => setTankCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Total capacity of your water tank in liters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tank Height (cm)
                  </label>
                  <input
                    type="number"
                    value={tankHeight}
                    onChange={(e) => setTankHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Physical height of your water tank in centimeters
                  </p>
                </div>
              </div>
            </div>

            {/* Threshold Settings */}
            <div className="bg-white rounded-lg shadow-gray-300 border shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 mr-2 text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h2 className="text-base font-medium text-gray-900">Threshold Settings</h2>
              </div>

              <Seperator />

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      Leakage Detection Threshold (ml)
                    </label>
                    <span className="text-sm font-medium text-gray-900">{leakageThreshold} ml</span>
                  </div>
                  <Slider
                    value={leakageThreshold}
                    min={1}
                    max={500}
                    onChange={setLeakageThreshold}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Flow difference percentage that triggers leak detection
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      Dry Run Detection Time (seconds)
                    </label>
                    <span className="text-sm font-medium text-gray-900">{dryRunThreshold} sec</span>
                  </div>
                  <Slider
                    value={dryRunThreshold}
                    min={30}
                    max={300}
                    onChange={setDryRunThreshold}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Time threshold for detecting pump running without water flow
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      Low Water Level Alert (%)
                    </label>
                    <span className="text-sm font-medium text-gray-900">{lowWaterLevel}%</span>
                  </div>
                  <Slider
                    value={lowWaterLevel}
                    min={5}
                    max={40}
                    onChange={setLowWaterLevel}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Water level percentage that triggers low water alerts
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      Critical Water Level (%)
                    </label>
                    <span className="text-sm font-medium text-gray-900">{criticalWaterLevel}%</span>
                  </div>
                  <Slider
                    value={criticalWaterLevel}
                    min={1}
                    max={15}
                    onChange={setCriticalWaterLevel}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Water level percentage that triggers critical alerts and automatic actions
                  </p>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-gray-300 border shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 mr-2 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <h2 className="text-base font-medium text-gray-900">Notification Settings</h2>
              </div>

              <Seperator />

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Pump Status Updates</h3>
                    <p className="text-xs text-gray-500">Notify when pump turns on or off</p>
                  </div>
                  <ToggleSwitch
                    checked={pumpStatusNotification}
                    onChange={setPumpStatusNotification}
                  />
                </div>

                <div className="border-t border-gray-100"></div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Leakage Alerts</h3>
                    <p className="text-xs text-gray-500">Notify when a leak is detected</p>
                  </div>
                  <ToggleSwitch
                    checked={leakageNotification}
                    onChange={setLeakageNotification}
                  />
                </div>

                <div className="border-t border-gray-100"></div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Dry Run Alerts</h3>
                    <p className="text-xs text-gray-500">Notify when pump is running dry</p>
                  </div>
                  <ToggleSwitch
                    checked={dryRunNotification}
                    onChange={setDryRunNotification}
                  />
                </div>

                <div className="border-t border-gray-100"></div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Water Level Alerts</h3>
                    <p className="text-xs text-gray-500">Notify on low or critical water levels</p>
                  </div>
                  <ToggleSwitch
                    checked={waterLevelNotification}
                    onChange={setWaterLevelNotification}
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center"
                onClick={resetToDefault}
              >
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Reset to Default
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 flex items-center"
                onClick={handleSaveSettings}
              >
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}