import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, AlertTriangle, Info, Clock, Droplet, Activity, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import WaterLevelChart from './components/WaterLevelChart';
import Sidebar from '../Components/Sidebar';
import LeakageStatus from './components/LeakageCard';

const WaterManagementDashboard = () => {
  const [pumpActive, setPumpActive] = useState(false);
  const [waterLevel, setWaterLevel] = useState(19);
  const [leakStatus, setLeakStatus] = useState(false);


  const getWaterStatus = () => {
    if (waterLevel < 20) return { status: "Low", color: "text-alert-error", icon: <ChevronDown className="h-4 w-4" /> };
    if (waterLevel > 80) return { status: "High", color: "text-alert-warning", icon: <ChevronUp className="h-4 w-4" /> };
    return { status: "Normal", color: "text-alert-success", icon: <Droplet className="h-4 w-4" /> };
  };


  const { status, color, icon } = getWaterStatus();

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full ml-64'>
        <div className="bg-gray-50 p-6 rounded-lg w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Water Management Dashboard</h1>
              <p className="text-gray-600">Monitor and control your water system</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700">
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setLeakStatus(!leakStatus)}
                className="flex items-center gap-1 rounded-lg px-4 py-2 bg-blue-500 text-white">
                <AlertTriangle size={16} />
                <span>{leakStatus ? "Leak Detected" : "No Leak"}</span>
              </button>
            </div>
          </div>

          {/* Top Row Cards */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* Main Water Tank Card */}
            <div className="bg-white relative rounded-lg py-4 px-8 shadow-lg min-h-80">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-gray-800">Main Water Tank</h2>
                <Info size={18} className="text-gray-400" />
              </div>
              <div className={`flex items-center gap-2 mb-4 ${color}`}>
                {icon}
                <span className=" text-sm">{status} Level</span>
              </div>
              <div className="flex flex-col absolute top-2 left-[42%] z-50 items-center justify-center h-full text-white">
                <span className="text-3xl font-semibold text-water-900">{waterLevel}%</span>
                <span className="text-sm text-water-900">650 liters</span>
              </div>

              <div className="relative h-40 w-full bg-water-100 rounded-lg overflow-hidden mb-4">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-water-500 to-water-400 transition-all duration-1000 ease-out"
                  style={{ height: `${waterLevel}%`, transition: 'height 1s ease-in-out' }}
                >

                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <div>Capacity: 1000 liters</div>
                <div>Updated: Just now</div>
              </div>
            </div>

            {/* Main Pump Card */}
            <div className="bg-white rounded-lg p-4 shadow-lg min-h-80">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-gray-800">Main Pump</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-red-500 text-sm">Inactive</span>
                  <RefreshCw size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-8">
                <button
                  className="w-14 h-14 rounded-full border-4 border-gray-300 text-gray-400 flex items-center justify-center mb-4"
                  onClick={() => setPumpActive(!pumpActive)}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line x1="12" y1="2" x2="12" y2="12"></line>
                  </svg>
                </button>

                <p className="text-center text-black text-sm mb-1">Click to turn on</p>
                <p className="text-center text-gray-600 text-sm mb-2">Pump is currently inactive</p>
                <p className="text-center text-gray-500 text-xs">Last activated: 3 hours ago</p>
              </div>

              <div className="text-xs text-gray-400 mt-2">
                Pump ID: PUMP-001
              </div>
            </div>

            {/* Leakage Detection Card */}
            <LeakageStatus />
          </div>


          <WaterLevelChart />



          {/* Bottom Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {/* Average Daily Usage */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg">
              <h3 className="text-gray-600 text-sm mb-1">Avg. Daily Usage</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-800">245 L</div>
                  <div className="text-xs text-green-500">+12% from last week</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-water-100">
                  <Droplet className="text-water-500" size={16} />
                </div>
              </div>
            </div>

            {/* Leak Incidents */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg">
              <h3 className="text-gray-600 text-sm mb-1">Leak Incidents</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-800">0</div>
                  <div className="text-xs text-gray-500">No leaks detected this month</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50">
                  <AlertTriangle className="text-green-500" size={16} />
                </div>
              </div>
            </div>

            {/* Pump Runtime */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg">
              <h3 className="text-gray-600 text-sm mb-1">Pump Runtime</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-800">3.2 hrs</div>
                  <div className="text-xs text-gray-500">Today's total operational time</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-water-100">
                  <Activity className="text-water-500" size={16} />
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg">
              <h3 className="text-gray-600 text-sm mb-1">System Health</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-800">98%</div>
                  <div className="text-xs text-gray-500">System operating normally</div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50">
                  <CheckCircle className="text-green-500" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default WaterManagementDashboard;