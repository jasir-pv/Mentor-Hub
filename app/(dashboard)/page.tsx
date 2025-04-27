import RoundChart from "@/components/Chart";
import AttendenceChart from '@/components/AttendenceChart'
import FinanceChart from "@/components/FinanceChart";
import Stats from "@/components/Stats";
import EventCalender from '@/components/EventCalender'



export default function Home() {
  return (
   <div>
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
<div className='hidden lg:block'>
    <EventCalender />
</div>

</div>
   </div>
  );
}
