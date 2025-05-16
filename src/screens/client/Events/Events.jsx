import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Filter, Search, History as HistoryIcon, X } from 'lucide-react';
import Sidebar from '../Components/Sidebar';

// Sample events data
const sampleEvents = [
  {
    id: "evt-1",
    type: "pump-on",
    description: "Pump turned ON due to low water level",
    timestamp: "2023-06-15T08:30:00",
    details: "Water level was at 18% and pump was activated automatically"
  },
  {
    id: "evt-2",
    type: "leak-detected",
    description: "Possible leak detected in main pipeline",
    timestamp: "2023-06-14T14:45:00",
    details: "Flow difference detected between input and output sensors"
  },
  {
    id: "evt-3",
    type: "dry-run",
    description: "Dry run condition detected",
    timestamp: "2023-06-13T10:15:00",
    details: "Pump was running without water flow for more than 2 minutes"
  },
  {
    id: "evt-4",
    type: "pump-off",
    description: "Pump turned OFF automatically",
    timestamp: "2023-06-13T09:20:00",
    details: "Water level reached 85% and pump was turned off automatically"
  },
  {
    id: "evt-5",
    type: "leak-resolved",
    description: "Leak issue resolved",
    timestamp: "2023-06-12T16:30:00",
    details: "Leak in the main pipeline was fixed"
  },
];

// Get icon and color based on event type
const getEventProperties = (type) => {
  switch (type) {
    case "pump-on":
      return { color: "text-green-500 bg-green-50", icon: "⚡" };
    case "pump-off":
      return { color: "text-slate-500 bg-slate-50", icon: "🔌" };
    case "leak-detected":
      return { color: "text-red-500 bg-red-50", icon: "💧" };
    case "leak-resolved":
      return { color: "text-blue-500 bg-blue-50", icon: "✓" };
    case "dry-run":
      return { color: "text-amber-500 bg-amber-50", icon: "☀️" };
    default:
      return { color: "text-gray-500 bg-gray-50", icon: "ℹ️" };
  }
};

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format time for display
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Group events by date
const groupEventsByDate = (events) => {
  const grouped = {};

  events.forEach(event => {
    const date = formatDate(event.timestamp);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(event);
  });

  return grouped;
};

const EventHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const typeFilterRef = useRef(null);
  const dateFilterRef = useRef(null);

  // Get unique event types
  const uniqueEventTypes = [...new Set(sampleEvents.map(event => event.type))];

  // Apply filters
  useEffect(() => {
    let result = sampleEvents;

    // Apply search filter
    if (searchTerm !== "") {
      result = result.filter(event =>
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedTypes.length > 0) {
      result = result.filter(event => selectedTypes.includes(event.type));
    }

    // Apply date filter
    if (startDate) {
      const startDateTime = new Date(startDate);
      result = result.filter(event => new Date(event.timestamp) >= startDateTime);
    }

    if (endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999); // Set to end of day
      result = result.filter(event => new Date(event.timestamp) <= endDateTime);
    }

    setFilteredEvents(result);
  }, [searchTerm, selectedTypes, startDate, endDate]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Toggle type filter
  const toggleTypeFilter = () => {
    setShowTypeFilter(!showTypeFilter);
    setShowDateFilter(false);
  };

  // Toggle date filter
  const toggleDateFilter = () => {
    setShowDateFilter(!showDateFilter);
    setShowTypeFilter(false);
  };

  // Handle type filter change
  const handleTypeFilterChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Handle date filter change
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTypes([]);
    setStartDate("");
    setEndDate("");
  };

  // Handle clicks outside filter dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeFilterRef.current && !typeFilterRef.current.contains(event.target)) {
        setShowTypeFilter(false);
      }
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target)) {
        setShowDateFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Group events by date for display
  const groupedEvents = groupEventsByDate(filteredEvents);

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full ml-48'>
        <div className="container ml-64 items-center flex-row mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col space-y-8">
            {/* Page header */}
            <div>
              <h1 className="text-2xl font-semibold">Event History</h1>
              <p className="text-gray-500 mt-1">View all system events and activities</p>
            </div>

            {/* Search and filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-9 py-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex space-x-2">
                {/* Type Filter Button */}
                <div className="relative" ref={typeFilterRef}>
                  <button
                    className={`px-3 py-2 border rounded-md flex items-center text-sm ${selectedTypes.length ? 'bg-blue-50 border-blue-300' : 'border-gray-300'}`}
                    onClick={toggleTypeFilter}
                  >
                    <Filter className="h-4 w-4 mr-1.5" />
                    <span>Filter {selectedTypes.length > 0 && `(${selectedTypes.length})`}</span>
                  </button>

                  {/* Type Filter Dropdown */}
                  {showTypeFilter && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      <div className="p-3 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Filter by type</h3>
                          {selectedTypes.length > 0 && (
                            <button
                              className="text-xs text-blue-600"
                              onClick={clearFilters}
                            >
                              Clear all
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {uniqueEventTypes.map(type => (
                          <div
                            key={type}
                            className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleTypeFilterChange(type)}
                          >
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type)}
                              readOnly
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="ml-2">{type.replace('-', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Date Filter Button */}
                <div className="relative" ref={dateFilterRef}>
                  <button
                    className={`px-3 py-2 border rounded-md flex items-center text-sm ${(startDate || endDate) ? 'bg-blue-50 border-blue-300' : 'border-gray-300'}`}
                    onClick={toggleDateFilter}
                  >
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>Date Range</span>
                  </button>

                  {/* Date Filter Dropdown */}
                  {showDateFilter && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      <div className="p-3 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Filter by date</h3>
                          {(startDate || endDate) && (
                            <button
                              className="text-xs text-blue-600"
                              onClick={clearFilters}
                            >
                              Clear dates
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="p-3 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start date
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={startDate}
                            onChange={handleStartDateChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End date
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={endDate}
                            onChange={handleEndDateChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active filters display */}
            {(selectedTypes.length > 0 || startDate || endDate) && (
              <div className="flex flex-wrap gap-2 pb-1">
                {selectedTypes.map(type => (
                  <div key={type} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {type.replace('-', ' ')}
                    <button
                      onClick={() => handleTypeFilterChange(type)}
                      className="ml-1.5 inline-flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {(startDate || endDate) && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {startDate && endDate ? `${startDate} to ${endDate}` : startDate ? `From ${startDate}` : `Until ${endDate}`}
                    <button
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                      }}
                      className="ml-1.5 inline-flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {(selectedTypes.length > 0 || startDate || endDate) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-600 ml-2"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Event timeline */}
            <div className="space-y-6">
              {Object.keys(groupedEvents).length > 0 ? (
                Object.entries(groupedEvents).map(([date, events]) => (
                  <div key={date} className="space-y-4">
                    <div className="sticky top-0 bg-gray-50 py-2 z-10">
                      <h3 className="text-sm font-medium text-gray-500">{date}</h3>
                      <div className="h-px bg-gray-200 mt-2" />
                    </div>

                    <div className="space-y-4">
                      {events.map(event => {
                        const { color, icon } = getEventProperties(event.type);
                        return (
                          <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
                            <div className="flex">
                              <div className={`flex items-center justify-center h-10 w-10 rounded-full ${color} mr-4`}>
                                <span>{icon}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="text-sm font-medium">{event.description}</h4>
                                  <span className="text-xs text-gray-500">{formatTime(event.timestamp)}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{event.details}</p>
                                <div className="mt-2">
                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                    {event.type.replace('-', ' ')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <HistoryIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No events found</h3>
                  <p className="mt-1 text-gray-500">
                    {searchTerm || selectedTypes.length > 0 || startDate || endDate
                      ? "Try adjusting your search or filter criteria"
                      : "System events will appear here"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHistory;