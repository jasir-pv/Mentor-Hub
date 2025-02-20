import { div } from 'framer-motion/client'
import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const Stats = () => {
  return (
    <div>
    <h3 className='text-lg font-medium '>Students</h3>
    <div className='flex h-44 rounded-2xl bg-white w-64 mt-2'>

        <div className="relative flex flex-col gap-x-4 h-full  ">
            <div className='absolute rounded-full p-4 mt-6 ml-6 bg-orange-600'>
                <RxAvatar />
            </div>
            <div className='ml-6 mt-24'>
                <p > Total Students = 240</p>
                <p>Active Students = 218</p>
            </div>

        </div>
      
    </div>
    </div>
  )
}

export default Stats
