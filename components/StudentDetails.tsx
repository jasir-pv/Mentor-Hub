import React from 'react'
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


  const students = [
    {
      id:1,  
      regNo: "ALBIR24 /12001",
      name: "Jasir Ahsan Pv",
      email: "jasirahsanpv40@gmail.com",
      profilePic: "/student-avt.jpg", 
      className: "Aliya Ula",
      teacherName: "John Smith",
      teacherEmail: "johnsmith@gmail.com",
      teacherPic: "/teacher-avt.jpg",
      status: "Joined",
    },

    {
        id:1,  
        regNo: "ALBIR24 /12001",
        name: "Jasir Ahsan Pv",
        email: "jasirahsanpv40@gmail.com",
        profilePic: "/student-avt.jpg", 
        className: "Aliya Ula",
        teacherName: "John Smith",
        teacherEmail: "johnsmith@gmail.com",
        teacherPic: "/teacher-avt.jpg",
        status: "Joined",
      },

      {
        id:1,  
        regNo: "ALBIR24 /12001",
        name: "Jasir Ahsan Pv",
        email: "jasirahsanpv40@gmail.com",
        profilePic: "/student-avt.jpg", 
        className: "Aliya Ula",
        teacherName: "John Smith",
        teacherEmail: "johnsmith@gmail.com",
        teacherPic: "/teacher-avt.jpg",
        status: "Joined",
      },
    // Repeat similar objects for multiple students
  ];
  

const StudentDetails = () => {
  return (
    <div>
        <h2 className='mt-6 mb-4'>Student Details</h2>

   <Table className="rounded-3xl border border-gray-200 shadow-md">
      <TableHeader className="bg-orange-200 rounded-3xl">
        <TableRow>
          <TableHead className="text-left">Reg No</TableHead>
          <TableHead className="text-left">Students</TableHead>
          <TableHead className="text-left">Class</TableHead>
          <TableHead className="text-left">Teacher</TableHead>
          <TableHead className="text-left">Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=''>
        {students.map((student, index) => (
          <TableRow key={index} className="border-b">
            <TableCell>{student.regNo}</TableCell>
            <TableCell className="flex items-center gap-2 p-5">
               <div className="rounded-full w-[40px] h-[40px] bg-slate-200 overflow-hidden flex items-start justify-center">
                  <Image src={student.profilePic} alt={student.name} width={40} height={40}  className='object-cover'/>            
               </div> 

              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-xs text-gray-500">{student.email}</p>
              </div>
            </TableCell>
            <TableCell>{student.className}</TableCell>
            <TableCell className="flex items-center gap-2">
            <div className="rounded-full w-[40px] h-[40px] bg-slate-200 overflow-hidden flex items-start justify-center">
            <Image src={student.teacherPic} alt={student.teacherName} width={40} height={40} className="object-cover" />
            </div>  
              <div>
                <p className="font-medium">{student.teacherName}</p>
                <p className="text-xs text-gray-500">{student.teacherEmail}</p>
              </div>
            </TableCell>
            <TableCell>
              <Button className="bg-green-500 text-white px-3 py-1 rounded-md">{student.status}</Button>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" className="p-2">
                <FaEdit className="text-gray-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    </div>
  )
}

export default StudentDetails
