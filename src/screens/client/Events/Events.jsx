import React, { useState } from 'react';
import { Calendar, Filter, Search, History as HistoryIcon } from 'lucide-react';
import Sidebar from '../Components/Sidebar';

// Sample events data
const sampleEvents = [
  {
    id: "evt-1",
    type: "pump-on",
    description: "Pump turned ON due to low water level",
    timestamp: "2024-06-15T08:30:00",
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

  // Filter events based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredEvents(sampleEvents);
    } else {
      const filtered = sampleEvents.filter(event =>
        event.description.toLowerCase().includes(term) ||
        event.type.toLowerCase().includes(term)
      );
      setFilteredEvents(filtered);
    }
  };

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
                <button className="px-3 py-2 border border-gray-300 rounded-md flex items-center text-sm">
                  <Filter className="h-4 w-4 mr-1.5 " />
                  <span>Filter</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>Date Range</span>
                </button>
              </div>
            </div>

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
                          <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4  shadow-lg">
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
                    {searchTerm ? "Try adjusting your search filter" : "System events will appear here"}
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