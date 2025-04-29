'use client'

import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import { dummyTeachers } from "@/lib/data";

const TeacherDetails = () => {
  return (
    <div className="">
      <h2 className="mt-4 mb-3 text-xl font-semibold">Teacher Details</h2>

      <div className="rounded-2xl border border-gray-200 shadow-md overflow-x-auto overflow-y-hidden h-full">
        <table className="w-full max-h-12">
          <thead className="bg-orange-100">
            <tr>
              <th className="text-left p-4">Emp ID</th>
              <th className="text-left p-4">Teachers</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Subjects</th>
              <th className="text-left p-4">Classes</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>
          <tbody className="mt-2 bg-white">
            {dummyTeachers.length > 0 ? (
              dummyTeachers.map((teacher) => (
                <tr key={teacher.id} className="border-b">
                  <td className="p-4"><p className="text-sm">{teacher.emp_id}</p></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                        <Image
                          src={teacher.profile_pic}
                          alt="teacher"
                          width={40} 
                          height={40} 
                          className="object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{teacher.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4"><p className="text-sm">{teacher.department}</p></td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      {teacher.subjects.map((subject, index) => (
                        <span key={index} className="text-xs">{subject}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      {teacher.classes_handled.map((cls, index) => (
                        <span key={index} className="text-xs">{cls}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button className={`px-2 py-0  text-[12px] rounded-md ${
                      teacher.status === 'Active' ? 'bg-green-500' : 
                      teacher.status === 'On Leave' ? 'bg-yellow-500' : 'bg-gray-500'
                    } text-white`}>
                      {teacher.status}
                    </Button>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" className="p-2">
                      <FaEdit className="text-gray-500" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeacherDetails;