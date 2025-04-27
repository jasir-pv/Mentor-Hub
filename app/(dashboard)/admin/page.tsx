import AttendenceChart from '@/components/AttendenceChart'
import RoundChart from '@/components/Chart'
import EventCalender from '@/components/EventCalender'
import FinanceChart from '@/components/FinanceChart'
import Stats from '@/components/Stats'
import React from 'react'

type Props = {}

const AdminPage = (props: Props) => {
  return (
    <div className='mt-4 flex justify-between'>

    
    <div className='w-full'>
      {/* stats */}
      <Stats />

      {/* middle */}
      <div className='flex flex-col mt-4 gap-4  sm:flex-row'>
      <RoundChart />
      <AttendenceChart />
      </div>

      <div>
        <FinanceChart />
      </div>
    </div>

    {/* Right side Calender */}
    <div className='hidden sm:block md:block'>
        <EventCalender />
    </div>

    </div>
  )
}

export default AdminPage