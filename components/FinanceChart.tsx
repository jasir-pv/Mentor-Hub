'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 3000, expense: 1398 },
  { name: 'Sep', income: 2000, expense: 9800 },
  { name: 'Oct', income: 2780, expense: 3908 },
  { name: 'Nov', income: 1890, expense: 4800 },
  { name: 'Dec', income: 2390, expense: 3800 },
];

type Props = {}

const FinanceChart = (props: Props) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h1 className="text-xl font-bold mb-4">Finance Overview</h1>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#4F46E5" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="expense" stroke="#F59E0B" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FinanceChart
