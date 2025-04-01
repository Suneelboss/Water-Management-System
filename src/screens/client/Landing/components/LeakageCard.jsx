import { useState } from "react";
import { Info, AlertTriangle, Droplet, PhoneCall } from "lucide-react";

export default function LeakageStatus({
  hasLeak = false,
  leakConfidence = 0,
  leakLocation = "Unknown",
  detectedAt = "N/A",
  isLoading = false,
}) {
  const [isExpanded, setIsExpanded] = useState(hasLeak);

  const handleCallPlumber = () => {
    
  };

  const handleViewHistory = () => {
    
  };

  return (
    <div className={`glass rounded-xl transition-all duration-300 hover:shadow-lg overflow-hidden ${hasLeak ? "" : ""}`}>
      {isLoading ? (
        <div className="p-6 h-full flex flex-col justify-center items-center">
          <div className="spinner"></div>
          <p className="mt-4 text-sm text-gray-500">Checking system for leaks...</p>
        </div>
      ) : (
        <div className="border border-red-400 rounded-xl p-1">
          <div className={`p-5 rounded-lg  sm:p-6 ${hasLeak ? "bg-red-50 " : ""}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Leakage Detection</h3>
                <div className="flex items-center mt-1 text-sm">
                  {hasLeak ? (
                    <>
                      <span className="inline-block h-2 w-2 rounded-full mr-2 bg-red-500 animate-pulse" />
                      <span className="text-red-500 font-medium">Leak Detected</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-block h-2 w-2 rounded-full mr-2 bg-green-500" />
                      <span className="text-green-500">No Leaks Detected</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
            {(isExpanded || hasLeak) && (
              <div className="mt-4">
                {hasLeak ? (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-300">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-red-500">Leak details</h4>
                        <ul className="mt-2 text-sm space-y-2">
                          <li className="flex justify-between">
                            <span className="text-gray-500">Confidence:</span>
                            <span className="font-medium">{leakConfidence}%</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">Location:</span>
                            <span className="font-medium">{leakLocation}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">Detected at:</span>
                            <span className="font-medium">{detectedAt}</span>
                          </li>
                        </ul>
                        <div className="mt-4">
                          <button className="w-full bg-red-500 rounded-full flex px-3 py-2 text-white" onClick={handleCallPlumber}>
                            <PhoneCall className="h-4 w-4 mr-2" /> Call Plumber
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-300">
                    <div className="flex items-start">
                      <Droplet className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-green-500">System is operating normally</h4>
                        <p className="mt-1 text-sm text-gray-500">The leak detection system is active and monitoring. No issues detected.</p>
                        <p className="mt-3 text-xs text-gray-500">Last checked: Just now</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="px-6 py-3 bg-gray-100 border-t flex justify-between items-center text-xs text-gray-500">
            <span>System status: {hasLeak ? "Alert" : "Normal"}</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors" onClick={handleViewHistory}>
              View history
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
