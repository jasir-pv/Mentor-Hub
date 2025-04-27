'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Keep minimal default styles
import './tailwind-calendar.css'; // Very small reset we'll add
import { div } from 'framer-motion/client';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {}

const events= [
    {
        id: 1,
        title:"Independence Day",
        time: '8:00 PM - 10:00 PM',
        description: 'lorem ipsum color sit ament constructor and dislsd asdlf vv'
    },
    {
        id: 2,
        title:"Republic Day",
        time: '8:00 PM - 10:00 PM',
        description: 'lorem ipsum color sit ament constructor and dislsd asdlf vv'
    },
    {
        id: 3,
        title:"Annual Day",
        time: '8:00 PM - 10:00 PM',
        description: 'lorem ipsum color sit ament constructor and dislsd asdlf vv'
    }
]

const EventCalendar = (props: Props) => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full ml-2 right-0">
      <Calendar
        onChange={onChange}
        value={value}
        className="w-full [&_.react-calendar__navigation]:flex [&_.react-calendar__navigation]:justify-center [&_.react-calendar__navigation]:items-center [&_.react-calendar__navigation]:mb-4
                  [&_.react-calendar__navigation__label]:text-lg [&_.react-calendar__navigation__label]:font-semibold
                  [&_.react-calendar__navigation__arrow]:text-xl
                  [&_.react-calendar__month-view__weekdays]:text-center [&_.react-calendar__month-view__weekdays]:uppercase [&_.react-calendar__month-view__weekdays]:text-xs [&_.react-calendar__month-view__weekdays]:font-semibold [&_.react-calendar__month-view__weekdays]:text-gray-400
                  [&_.react-calendar__tile]:py-3 [&_.react-calendar__tile]:text-sm [&_.react-calendar__tile]:rounded-xl
                  [&_.react-calendar__tile]:transition-all [&_.react-calendar__tile]:duration-300
                  [&_.react-calendar__tile:hover]:bg-gray-100
                  [&_.react-calendar__tile--active]:bg-indigo-600 [&_.react-calendar__tile--active]:text-white [&_.react-calendar__tile--active]:font-bold
                  [&_.react-calendar__tile--now]:bg-amber-500 [&_.react-calendar__tile--now]:text-white [&_.react-calendar__tile--now]:font-bold
                  [&_.react-calendar__navigation__prev2-button]:hidden [&_.react-calendar__navigation__next2-button]:hidden"
      />


      {/* Events */}

      <div className='flex flex-col gap-4'>
            {events.map(event => {
                return (
                <div className='p-4 bg-gray-100 rounded-xl' key={event.id}>
                    <h3 className='text-m font-medium'>{event.title}</h3>
                    <p className='text-sm text-gray-600'>{event.time}</p>
                    <p className='text-sm text-gray-500'>{event.description}</p>
                </div>
                )
            })}
            </div>

    </div>
  );
}

export default EventCalendar;
