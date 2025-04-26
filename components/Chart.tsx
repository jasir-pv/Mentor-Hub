'use client'

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [


  {
    name: 'Girls',
    uv: 8.63,
    pv: 3908,
    fill: '#a4de6c',
  },

  {
    name: 'Boys',
    uv: 6.67,
    pv: 4800,
    fill: '#ffc658',
  },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '20px',
};

type Props = {}

const RoundChart = (props: Props) => {
  return (
    <div className="w-1/4 h-[400px]"> {/* Added fixed dimensions */}
      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Students</h1>
      </div>

      {/* Chart */}
      <div className="w-full h-[calc(100%-80px)]"> {/* Adjusted height */}
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="20%" 
            outerRadius="80%" 
            barSize={15} 
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey="uv"
            />
            <Legend 
              iconSize={10} 
              layout="vertical" 
              verticalAlign="middle" 
              wrapperStyle={style} 
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RoundChart