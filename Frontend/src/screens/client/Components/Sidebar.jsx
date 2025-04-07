import React from 'react';
import { useLocation } from 'react-router-dom';
import { RefreshCw, AlertTriangle, Info, Clock, Droplet, Activity, CheckCircle, LayoutDashboard, History, Settings, User } from 'lucide-react';

const Sidebar = () => {
  // Mock useLocation to simulate active route
  const location = useLocation();
  
  // Helper function to conditionally join classNames (like the cn utility)
  const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  const SidebarLink = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;

    return (
      <a
        href={to}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-gray-100",
          isActive 
            ? "bg-blue-50 text-blue-700 font-medium" 
            : "text-gray-500 hover:text-gray-900"
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </a>
    );
  };

  return (
    <div className="w-64 bg-gray-50 border-r h-[100vh] fixed flex flex-col p-4">
      <div className="mb-6 px-3">
        <a href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-blue-500 text-white flex items-center justify-center">
            <div className="water-wave" />
            <Droplet className="h-5 w-5 m-auto" />
          </div>
          <span className="text-lg font-medium">AquaSentry</span>
        </a>
      </div>

      <nav className="space-y-1">
        <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarLink to="/events" icon={History} label="Event History" />
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
        <SidebarLink to="/profile" icon={User} label="Profile" />
      </nav>
      
      <div className="mt-auto pt-4 border-t">
        <div className="px-3 text-xs text-gray-500">
          © 2023 AquaSentry
        </div>
      </div>
    </div>
  );
};

export default Sidebar;