import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <div>
      <div className='h-screen w-80 bg-[#D9D9D9]'>
        <div className='flex justify-center '>
          <h2 className=' p-7 text-4xl font-bold'>WTC</h2>
        </div>
        <div className='px-10 pt-7 flex flex-col gap-10 '>
          <NavLink  to="/home"
          className={({ isActive}) => 
            isActive
               ? "hover:cursor-pointer text-3xl  font-bold"
              : "hover:cursor-pointer text-3xl"
          }>Dashboard</NavLink>
          <NavLink  to="/events"
          className={({ isActive }) =>
            isActive
               ? "hover:cursor-pointer text-3xl font-bold"
              : "hover:cursor-pointer text-3xl"
          }>Events</NavLink>
          <NavLink 
           to="/setting"
          className={({ isActive }) =>
            isActive
              ? "hover:cursor-pointer text-3xl font-bold"
              : "hover:cursor-pointer text-3xl"
          }>Setting</NavLink>
          <NavLink 
           to="/user"
          className={({ isActive }) =>
            isActive
              ? "hover:cursor-pointer text-3xl font-bold"
              : "hover:cursor-pointer text-3xl"
          }>Users</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Menu