import { div } from 'framer-motion/client'
import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const Stats = () => {
  return (
    <div className='flex gap-8'>
        {/* Students */}
    <div>
    <h3 className='text-lg font-medium '>Students</h3>
    <div className='flex h-44 rounded-2xl bg-white w-64 mt-2'>

        <div className="relative flex flex-col gap-x-4 h-full  ">
            <div className='absolute rounded-full p-2 mt-6 ml-6 bg-orange-600'>
            <RxAvatar className='text-white w-[30px] h-[30px]'/>
            </div>
            <div className='ml-6 mt-24'>
                <p > Total Students = 240</p>
                <p>Active Students = 218</p>
            </div>

        </div>  
    </div>
    
    </div>

        {/* Teachers */}
    <div>
    <h3 className='text-lg font-medium '>Teachers</h3>
    <div className='flex h-44 rounded-2xl bg-white w-64 mt-2'>

        <div className="relative flex flex-col gap-x-4 h-full  ">
            <div className='absolute rounded-full p-2 mt-6 ml-6 bg-green-800'>
                <RxAvatar className='text-white w-[30px] h-[30px]'/>
            </div>
            <div className='ml-6 mt-24'>
                <p > Total Teachers = 18</p>
                <p>Active Students = 17</p>
            </div>

        </div>  
    </div>
    
    </div>

    </div>
  )
}

export default Stats
