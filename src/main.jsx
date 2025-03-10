import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Login from './screens/Login.jsx'
import Home from './screens/Home.jsx'
import Events from './screens/Events.jsx'
import Settings from './screens/Settings.jsx'
import User from './screens/User.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route index element={<Login/>}/>
        <Route path="home" element={<Home/>} />
        <Route path="events" element={<Events/>} />
        <Route path='setting' element={<Settings/>}/>
        <Route path='user' element={<User/>}/>
        

      </Routes>
    </Router>
  </StrictMode>,
)
