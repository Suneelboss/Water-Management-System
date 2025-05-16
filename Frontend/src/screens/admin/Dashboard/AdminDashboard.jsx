import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { RefreshCw, AlertTriangle, Info, Users, Droplet, Activity, CheckCircle, ArrowRight, Settings, Filter } from 'lucide-react';

import WaterLevelChart from '../../client/Landing/components/WaterLevelChart';
import AdminSidebar from '../component/AdminSidebar';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');

  // Sample data for water usage over time
  const waterUsageData = [
    { name: 'Jan', usage: 2400 },
    { name: 'Feb', usage: 1398 },
    { name: 'Mar', usage: 9800 },
    { name: 'Apr', usage: 3908 },
    { name: 'May', usage: 4800 },
    { name: 'Jun', usage: 3800 },
    { name: 'Jul', usage: 4300 },
  ];

  // Sample user data
  const users = [
    { id: 1, name: 'John Doe', address: '123 Main St', lastActive: '2 mins ago', usageToday: 120, status: 'active' },
    { id: 2, name: 'Jane Smith', address: '456 Park Ave', lastActive: '15 mins ago', usageToday: 85, status: 'active' },
    { id: 3, name: 'Mike Johnson', address: '789 Elm Rd', lastActive: '1 hour ago', usageToday: 210, status: 'warning' },
    { id: 4, name: 'Sarah Williams', address: '321 Oak Dr', lastActive: '3 hours ago', usageToday: 45, status: 'active' },
    { id: 5, name: 'Robert Brown', address: '654 Pine Ln', lastActive: '1 day ago', usageToday: 0, status: 'inactive' },
  ];

  // Sample data for water distribution by area
  const distributionData = [
    { name: 'Residential', value: 65 },
    { name: 'Commercial', value: 25 },
    { name: 'Industrial', value: 10 },
  ];

  // Sample data for pump performance
  const pumpPerformanceData = [
    { name: 'Pump 1', efficiency: 92, runtime: 5.2 },
    { name: 'Pump 2', efficiency: 88, runtime: 4.8 },
    { name: 'Pump 3', efficiency: 95, runtime: 3.5 },
    { name: 'Pump 4', efficiency: 82, runtime: 6.1 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getUserStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full ml-64 bg-gray-50 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">System overview and management</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700">
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
              <button className="flex items-center gap-1 rounded-lg px-4 py-2 bg-blue-500 text-white">
                <Settings size={16} />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Top Row Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Total Users */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-gray-600 text-sm">Total Users</h2>
                <Users size={18} className="text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">1,247</div>
              <div className="text-xs text-green-500 mt-1">+23 this month</div>
            </div>

            {/* Total Water Consumption */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-gray-600 text-sm">Total Consumption</h2>
                <Droplet size={18} className="text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">305,420 L</div>
              <div className="text-xs text-green-500 mt-1">-5% from last week</div>
            </div>

            {/* Active Alerts */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-gray-600 text-sm">Active Alerts</h2>
                <AlertTriangle size={18} className="text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">7</div>
              <div className="text-xs text-gray-500 mt-1">3 require attention</div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-gray-600 text-sm">System Health</h2>
                <CheckCircle size={18} className="text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">98%</div>
              <div className="text-xs text-gray-500 mt-1">All systems operational</div>
            </div>
          </div>

          {/* Water Usage Chart & User List */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Water Usage Chart */}
            <div className='col-span-2'>
              <WaterLevelChart />
            </div>


            {/* User List Card */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-gray-800">Recent Users</h2>
                <button className="text-sm text-blue-500 flex items-center">
                  View All <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-64">
                {users.map(user => (
                  <div key={user.id} className="border-b border-gray-100 py-3 last:border-none">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getUserStatusColor(user.status)} mr-2`}></div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">{user.name}</h3>
                          <p className="text-xs text-gray-500">{user.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-800">{user.usageToday} L</div>
                        <div className="text-xs text-gray-500">Last active: {user.lastActive}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Row - Distribution Chart & Pump Performance */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Water Distribution */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-gray-800">Water Distribution by Area</h2>
                <button className="text-sm flex items-center text-gray-500">
                  <Filter size={14} className="mr-1" /> Filter
                </button>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pump Performance */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-gray-800">Pump Performance</h2>
                <button className="text-sm flex items-center text-gray-500">
                  <Filter size={14} className="mr-1" /> Filter
                </button>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={pumpPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#3B82F6" name="Efficiency %" />
                  <Bar dataKey="runtime" fill="#10B981" name="Runtime (hrs)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row - Recent Activity Table */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-gray-800">Recent Activity</h2>
              <button className="text-sm text-blue-500 flex items-center">
                View All <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Unusual Water Usage</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mike Johnson</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">789 Elm Rd</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">10:23 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Warning</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">System Maintenance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">System</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Main Facility</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">9:15 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Pump Activation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Jane Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">456 Park Ave</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">8:45 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Normal</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">New User Registration</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Robert Brown</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">654 Pine Ln</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yesterday</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Leak Detection Alert</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">System</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Area B, Sector 7</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yesterday</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Alert</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;