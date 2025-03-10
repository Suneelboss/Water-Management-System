import React from 'react'
import Menu from './components/Menu'

const Events = () => {
  return (
    <div className='flex'>
      <Menu />
      <div className='pl-5 flex-1'>
        <h1 className='mt-11 text-3xl mb-9'>Event List:</h1>
        <div className='flex flex-col gap-7'>
          <div className='p-5 h-14 w-[90%] flex shadow-lg items-center border border-gray-200'>
            <h2 className='text-2xl w-[45%]'>Motor ON</h2>
            <h2 className='w-[44%] '>TIME : 3:30</h2>
            <h2>DATE : 2020/01/6</h2>
          </div>
          <div className='p-5 h-14 w-[90%] flex shadow-lg items-center border border-gray-200'>
            <h2 className='text-2xl w-[45%] '>leakage Detected</h2>
            <h2 className='w-[44%]'>TIME : 3:30</h2>
            <h2>DATE : 2020/01/6</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events