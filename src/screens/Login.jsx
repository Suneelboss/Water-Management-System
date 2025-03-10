import React from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate("/home")
  }
  return (
    <div className=' h-screen  flex items-center justify-evenly'>
      <div className='flex flex-col items-center justify-center'>
        <img className='h-[32rem]' src="https://t4.ftcdn.net/jpg/00/84/51/19/360_F_84511920_vqkA4itOgZeS9f4AJlRyFNWwQWJmgPaS.jpg" alt="picture" />
        <div className='flex gap-3'>
          <h1 className='text-4xl font-bold'>Water</h1>
          <h1 className='text-4xl'>Controller</h1>
        </div>
      </div>
      <div className=' w-[55vh] flex flex-col gap-5 '>
        <center className='mb-7 text-3xl font-normal'>Login your Account </center>
        <form className='flex flex-col'>
          <label className='p-3' for="text">Username</label>
          <input type="email" placeholder='Enter your Username' className='p-3 h-16 outline-none rounded-2xl bg-gray-100' id='e-mail' />
          <br/>
          <label className='p-3' for="password">Password</label>
          <input type="password" placeholder='Enter your Password' className='p-3 h-16 outline-none rounded-2xl bg-gray-100' id='password' />
          <button className='h-20 mt-12 text-2xl font-bold text-white border rounded-xl p-2 px-4 bg-[#42B0FF]' onClick={handleLogIn}>Login</button>
        </form>
        <div>
           <button className='p-3 text-red-500  text-base'> Forget Password?</button>
        </div>


      </div>
    </div>
  )
}

export default Login