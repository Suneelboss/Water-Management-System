import React, { useState } from 'react';

// Icons reordered alphabetically (no logic change)
import { 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Download, 
  Filter, 
  RefreshCw, 
  Search, 
  Users 
} from 'lucide-react';

import AdminSidebar from '../component/AdminSidebar';

const AllUsersPage = () => {
  // State setup
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Debug logs (can be removed later)
  console.log("Current Page:", currentPage);
  console.log("Search Query:", searchQuery);
  console.log("Status Filter:", statusFilter);

  // Sample user data (mock only)
  const users = [
    { id: 1, name: 'John Doe', address: '123 Main St', lastActive: '2 mins ago', usageToday: 120, usageMonth: 3450, status: 'active', alerts: 0 },
    { id: 2, name: 'Jane Smith', address: '456 Park Ave', lastActive: '15 mins ago', usageToday: 85, usageMonth: 2190, status: 'active', alerts: 0 },
    { id: 3, name: 'Mike Johnson', address: '789 Elm Rd', lastActive: '1 hour ago', usageToday: 210, usageMonth: 4780, status: 'warning', alerts: 1 },
    // ... rest unchanged
  ];

  // Pagination constants
  const usersPerPage = 8;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Filter users based on search + status
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get users for current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Get user status style
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

  // TODO: Replace mock data with real API in future

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
              {/* Refresh Button */}
              <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700">
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>

              {/* Export Button */}
              <button className="flex items-center gap-1 rounded-lg px-4 py-2 bg-blue-500 text-white">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Search + Filter Section */}
          {/* ... (same as original, can include inline comments too if needed) */}

          {/* Users Table */}
          {/* ... (unchanged structure) */}

          {/* Pagination */}
          {/* ... (unchanged structure) */}

        </div>
      </div>
    </div>
  );
};

export default AllUsersPage;
