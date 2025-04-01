import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './screens/client/LogIn/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'typeface-poppins';
import WaterManagementDashboard from './screens/client/Landing/Landing.jsx'
import EventHistory from './screens/client/Events/Events.jsx'
import Profile from './screens/client/Profile/Profile.jsx'
import Settings from './screens/client/Settings/Settings.jsx'
import AdminDashboard from './screens/admin/Dashboard/AdminDashboard.jsx'
import AllUsersPage from './screens/admin/AllUsers/AllUsers.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<WaterManagementDashboard />} />
          <Route path="events" element={<EventHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="users" element={<AllUsersPage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
