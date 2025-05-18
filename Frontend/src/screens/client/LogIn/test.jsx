import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WaterTankDisplay = () => {
  const [data, setData] = useState(null);
  const [usageData, setUsageData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [loading, setLoading] = useState(false);
  const [controlLoading, setControlLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/data/23232');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchUsageData = async (period) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/usage/23232?period=${period}`);
      const json = await res.json();
      setUsageData(json.chartData || []);
    } catch (err) {
      console.error("Error fetching usage data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsageData(selectedPeriod);
    
    const dataInterval = setInterval(fetchData, 1000);
    const usageInterval = setInterval(() => fetchUsageData(selectedPeriod), 60000);
    
    return () => {
      clearInterval(dataInterval);
      clearInterval(usageInterval);
    };
  }, [selectedPeriod]);

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const toggleMotor = async () => {
    if (!data) return;
    
    // Determine the new status (opposite of current)
    const newStatus = data.motorStatus === 'on' ? 'off' : 'on';
    
    setControlLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/control/23232/motor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error('Failed to control motor');
      }
      
      // Update local state immediately for better UX
      setData(prev => ({
        ...prev,
        motorStatus: newStatus
      }));
      
    } catch (error) {
      console.error("Error controlling motor:", error);
      alert("Failed to control motor. Please try again.");
    } finally {
      setControlLoading(false);
    }
  };

  const getPeriodText = () => {
    switch (selectedPeriod) {
      case '24h': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '1m': return 'Last Month';
      case '1y': return 'Last Year';
      default: return 'Last 24 Hours';
    }
  };

  // Calculate water level visually
  const calculateWaterLevel = () => {
    if (!data) return 0;
    return data.level;
  };

  return (
    <div style={{ padding: 20, maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#0077b6', textAlign: 'center', marginBottom: '20px' }}>Water Tank Monitor - Device ID: 23232</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        {/* Water Tank Visualization */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Current Status</h3>
          {data ? (
            <>
              <div style={{ 
                width: '100%', 
                height: '200px', 
                border: '2px solid #0077b6', 
                borderRadius: '5px', 
                position: 'relative', 
                overflow: 'hidden',
                margin: '0 auto 20px'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  width: '100%', 
                  height: `${calculateWaterLevel()}%`, 
                  backgroundColor: '#0096c7', 
                  transition: 'height 0.5s ease-in-out' 
                }}></div>
                <div style={{ 
                  position: 'absolute', 
                  width: '100%', 
                  textAlign: 'center', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  fontWeight: 'bold',
                  color: '#023e8a',
                  textShadow: '1px 1px 2px white'
                }}>
                  {calculateWaterLevel()}%
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button 
                  onClick={toggleMotor}
                  disabled={controlLoading}
                  style={{ 
                    padding: '12px', 
                    borderRadius: '5px', 
                    backgroundColor: data.motorStatus === 'on' ? '#d4edda' : '#f8d7da',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: data.motorStatus === 'on' ? '#155724' : '#721c24',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    gridColumn: '1 / span 2'
                  }}
                >
                  {controlLoading ? 'Processing...' : `Motor: ${data.motorStatus.toUpperCase()} (Click to ${data.motorStatus === 'on' ? 'TURN OFF' : 'TURN ON'})`}
                </button>
                
                <div style={{ 
                  padding: '10px', 
                  borderRadius: '5px', 
                  backgroundColor: data.leakage ? '#f8d7da' : '#d4edda',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  <span>Leakage: {data.leakage ? 'YES' : 'NO'}</span>
                </div>
                
                <div style={{ 
                  padding: '10px', 
                  borderRadius: '5px', 
                  backgroundColor: '#e2e3e5',
                  textAlign: 'center',
                }}>
                  <span>Flow Rate: <strong>{data.flowRate ? data.flowRate.toFixed(2) : '0.00'} L/min</strong></span>
                </div>
                
                <div style={{ 
                  padding: '10px', 
                  borderRadius: '5px', 
                  backgroundColor: '#e2e3e5',
                  textAlign: 'center',
                  gridColumn: '1 / span 2'
                }}>
                  <span>Total Consumed: <strong>{data.totalConsumed ? data.totalConsumed.toFixed(2) : '0.00'} L</strong></span>
                </div>
              </div>
              
              <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '15px' }}>
                Last Updated: {new Date(data.createdAt).toLocaleString()}
              </p>
            </>
          ) : (
            <p style={{ textAlign: 'center' }}>Loading data...</p>
          )}
        </div>
        
        {/* Usage Chart */}
        <div style={{ flex: '2', minWidth: '300px', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>Water Usage - {getPeriodText()}</h3>
            <select 
              value={selectedPeriod} 
              onChange={handlePeriodChange}
              style={{ 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #ccc',
                backgroundColor: '#fff'
              }}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="1m">Last Month</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
          
          {loading ? (
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Loading chart data...
            </div>
          ) : usageData && usageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={usageData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: 'Liters', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value} L`, 'Water Consumed']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="consumption" 
                  name="Water Consumption"
                  stroke="#0077b6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              No data available for selected period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterTankDisplay;