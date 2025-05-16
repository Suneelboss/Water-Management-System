import { Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for the water level chart
const waterLevelData = [
  { time: "00:00", level: 65 },
  { time: "03:00", level: 59 },
  { time: "06:00", level: 45 },
  { time: "09:00", level: 50 },
  { time: "12:00", level: 65 },
  { time: "15:00", level: 60 },
  { time: "18:00", level: 75 },
  { time: "21:00", level: 70 },
  { time: "24:00", level: 65 },
];

export default function WaterLevelChart({ timeRange = "24h" }) {
  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-xl shadow-gray-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-water-600 mr-2" />
            <h2 className="text-lg font-semibold">Water Level History</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Last 24 hours monitoring</p>
        </div>
        <div>
          <select className="input-primary py-1 px-3 text-sm" defaultValue={timeRange}>
            <option value="6h">Last 6 hours</option>
            <option value="12h">Last 12 hours</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
          </select>
        </div>
      </div>

      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={waterLevelData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#40a9ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#40a9ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#f0f0f0" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#f0f0f0" }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #f0f0f0",
              }}
              formatter={(value) => [`${value}%`, "Water Level"]}
            />
            <Area
              type="monotone"
              dataKey="level"
              stroke="#40a9ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorLevel)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
