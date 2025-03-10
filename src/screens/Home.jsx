import React, { useState } from 'react'
import Menu from './components/Menu'
import { LineChart } from "@mui/x-charts"


const Home = () => {
  const [percentage, setPercentage] = useState('70%')
  return (
    <div className='flex flex-row'>
      <Menu />
      <div className='flex flex-col w-[45rem] justify-evenly'>
        <div className='flex justify-center gap-14'>
          <div className='flex flex-col items-center'>
            <div className='h-5 w-20 bg-black rounded-2xl'></div>
            <div className='flex flex-col-reverse align-bottom p-2 h-80 w-80 border-2 rounded-2xl'>
              <div className={`w-[100%] bg-blue-500 rounded-2xl`} style={{ height: percentage }}></div>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='mt-5 h-80 w-14 flex flex-col-reverse align-bottom bg-[#D9D9D9]'>
              <div className={`w-[100%] bg-blue-500`} style={{ height: percentage }}></div>
            </div>
            <h2 className='text-[blue] text-2xl font-bold'>70%</h2>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='h-72 p-5 w-[30rem] border border-gray-200 rounded-2xl'>
            <div className='flex flex-col justify-between'>
              <div>
                <h1 className='mb-4 font-bold text-2xl'>Motor</h1>
                <h2 className='text-xl'>Status:  ON</h2>
                <h2 className='text-xl'>Run time:  00h001m23s</h2>
              </div>
              <div>
                <h1 className='my-5 font-bold text-2xl '>Manual Control</h1>
                <div className='flex gap-10'>
                  <button className='h-12 w-36 bg-[#2CF421] rounded-2xl text-xl font-bold text-white'>Turn ON</button>
                  <button className='h-12 w-36 bg-[#E74C3C] rounded-2xl text-xl font-bold text-white'>Turn OFF</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-evenly'>
        <div className='w-[38rem] h-80 border border-gray-200 rounded-2xl'>
          <LineChart
            series={[
              { curve: "natural", data: [0, 5, 2, 6, 3, 9.3, 5, 2, 6, 3, 9.3, 4] },
              { curve: "natural", data: [6, 3, 7, 9.5, 4, 2, 5, 2, 6, 3, 9.3, 5] },
            ]}
            xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Api','May','Jun','Jul','Aug','Sep','Oug','Nov','Dec'], scaleType: 'band' }]}
          />
        </div>
        <div className=' flex flex-col items-center gap-5'>
          <button className='h-28 w-[30rem] rounded-2xl bg-[#88FF8C] text-white font-bold text-2xl drop-shadow-xl'>No Leakage</button>
          <button className='h-28 w-[30rem] rounded-2xl bg-[#FF5555] text-white font-bold text-2xl drop-shadow-xl'>Dry Run Detected</button>
        </div>
      </div>

    </div>
  )
}

export default Home