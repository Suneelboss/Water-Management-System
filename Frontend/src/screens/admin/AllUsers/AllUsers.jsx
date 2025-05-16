import React, { useState } from 'react';
import { RefreshCw, Search, Filter, Download, ArrowLeft, ArrowRight, Users, AlertTriangle, Clock } from 'lucide-react';
import AdminSidebar from '../component/AdminSidebar';

const AllUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample user data
  const users = [
    { id: 1, name: 'John Doe', address: '123 Main St', lastActive: '2 mins ago', usageToday: 120, usageMonth: 3450, status: 'active', alerts: 0 },
    { id: 2, name: 'Jane Smith', address: '456 Park Ave', lastActive: '15 mins ago', usageToday: 85, usageMonth: 2190, status: 'active', alerts: 0 },
    { id: 3, name: 'Mike Johnson', address: '789 Elm Rd', lastActive: '1 hour ago', usageToday: 210, usageMonth: 4780, status: 'warning', alerts: 1 },
    { id: 4, name: 'Sarah Williams', address: '321 Oak Dr', lastActive: '3 hours ago', usageToday: 45, usageMonth: 1860, status: 'active', alerts: 0 },
    { id: 5, name: 'Robert Brown', address: '654 Pine Ln', lastActive: '1 day ago', usageToday: 0, usageMonth: 950, status: 'inactive', alerts: 0 },
    { id: 6, name: 'Emily Davis', address: '987 Maple St', lastActive: '2 days ago', usageToday: 78, usageMonth: 2340, status: 'active', alerts: 0 },
    { id: 7, name: 'David Wilson', address: '753 Cedar Rd', lastActive: '3 hours ago', usageToday: 156, usageMonth: 3670, status: 'active', alerts: 0 },
    { id: 8, name: 'Lisa Taylor', address: '159 Birch Ave', lastActive: '5 hours ago', usageToday: 92, usageMonth: 2850, status: 'active', alerts: 0 },
    { id: 9, name: 'Daniel Clark', address: '357 Spruce Blvd', lastActive: '1 day ago', usageToday: 0, usageMonth: 1450, status: 'inactive', alerts: 0 },
    { id: 10, name: 'Karen Lee', address: '258 Willow Way', lastActive: '20 mins ago', usageToday: 175, usageMonth: 3980, status: 'warning', alerts: 2 },
    { id: 11, name: 'Steven Thompson', address: '753 Aspen Ln', lastActive: '4 hours ago', usageToday: 63, usageMonth: 1920, status: 'active', alerts: 0 },
    { id: 12, name: 'Laura Martinez', address: '654 Redwood St', lastActive: '2 days ago', usageToday: 0, usageMonth: 2150, status: 'inactive', alerts: 0 },
    { id: 13, name: 'Brian Johnson', address: '369 Sequoia Rd', lastActive: '30 mins ago', usageToday: 118, usageMonth: 3250, status: 'active', alerts: 0 },
    { id: 14, name: 'Amanda White', address: '147 Cypress Dr', lastActive: '1 hour ago', usageToday: 94, usageMonth: 2680, status: 'active', alerts: 0 },
    { id: 15, name: 'Christopher Lewis', address: '258 Sycamore Ave', lastActive: '45 mins ago', usageToday: 143, usageMonth: 3740, status: 'warning', alerts: 1 },
  ];

  // Pagination logic
  const usersPerPage = 8;
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  // Filter users based on search and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Get current page users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const getUserStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getUserStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'warning': return 'Warning';
      case 'inactive': return 'Inactive';
      default: return 'Unknown';
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
              <h1 className="text-2xl font-semibold text-gray-800">All Users</h1>
              <p className="text-gray-600">View and manage all system users</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700">
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
              <button className="flex items-center gap-1 rounded-lg px-4 py-2 bg-blue-500 text-white">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    placeholder="Search users by name or address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Filter size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Status:</span>
                </div>
                <select
                  className="block w-40 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="warning">Warning</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage Today</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage This Month</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center`}>
                          <span className="text-blue-600 font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.usageToday} L</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.usageMonth} L</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full ${getUserStatusColor(user.status)} mr-2`}></div>
                        <div className="text-sm text-gray-900">{getUserStatusLabel(user.status)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {user.lastActive}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Edit</button>
                        {user.alerts > 0 && (
                          <div className="flex items-center text-yellow-500">
                            <AlertTriangle size={14} className="mr-1" />
                            <span>{user.alerts}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastUser, filteredUsers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredUsers.length}</span> users
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <ArrowLeft size={16} className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {[...Array(totalPages).keys()].map(number => (
                    <button
                      key={number + 1}
                      onClick={() => setCurrentPage(number + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === number + 1
                          ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                      }`}
                    >
                      {number + 1}
                    </button>
                  ))}
                  
                  <button
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Next</span>
                    <ArrowRight size={16} className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsersPage;