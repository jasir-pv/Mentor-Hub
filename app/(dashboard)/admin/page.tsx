import AttendenceChart from '@/components/AttendenceChart'
import RoundChart from '@/components/Chart'
import FinanceChart from '@/components/FinanceChart'
import Stats from '@/components/Stats'
import React from 'react'

type Props = {}

const AdminPage = (props: Props) => {
  return (
    <div className='mt-4'>
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
  )
}

export default AdminPage