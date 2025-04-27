'use client'

import React from 'react'

type AnnouncementItem = {
  title: string
  date: string
  description: string
};

const announcements: AnnouncementItem[] = [
  {
    title: "Summer Vacation",
    date: "May 15, 2025",
    description: "The school will remain closed for summer vacation from May 15 to June 30."
  },
  {
    title: "Exam Results",
    date: "April 30, 2025",
    description: "Annual examination results will be declared on April 30."
  },
  {
    title: "New Admissions",
    date: "March 1, 2025",
    description: "Admissions open for the academic year 2025-2026."
  }
];

const Announcement = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg text-cyan-700 font-bold">Announcements</h2>

      <div className="grid gap-3">
        {announcements.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-sm font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.date}</p>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Announcement
