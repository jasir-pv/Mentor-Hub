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
      },{
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
    <div className="">
    <h2 className="mt-4 mb-3 text-xl font-semibold">Student Details</h2>

    <div className="rounded-3xl border border-gray-200 shadow-md overflow-hidden max-h-[345px]">
        <Table className="w-full max-h-12">
            <TableHeader className="bg-orange-200 ">
                <TableRow>
                    <TableHead className="text-left p-4">Reg No</TableHead>
                    <TableHead className="text-left p-4">Students</TableHead>
                    <TableHead className="text-left p-4">Class</TableHead>
                    <TableHead className="text-left p-4">Teacher</TableHead>
                    <TableHead className="text-left p-4">Status</TableHead>
                    <TableHead className="text-right p-4">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="mt-2 bg-white">
                {students.map((student, index) => (
                    <TableRow key={index} className="border-b">
                        <TableCell className="p-4">{student.regNo}</TableCell>
                        <TableCell className="p-4">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                                    <Image src={student.profilePic} alt={student.name} width={40} height={40} className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-medium">{student.name}</p>
                                    <p className="text-xs text-gray-500">{student.email}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="p-4">{student.className}</TableCell>
                        <TableCell className="p-4">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                                    <Image src={student.teacherPic} alt={student.teacherName} width={40} height={40} className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-medium">{student.teacherName}</p>
                                    <p className="text-xs text-gray-500">{student.teacherEmail}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="p-4">
                            <Button className="bg-green-500 text-white px-3 py-1 rounded-md">{student.status}</Button>
                        </TableCell>
                        <TableCell className="p-4 text-right">
                            <Button variant="outline" className="p-2">
                                <FaEdit className="text-gray-500" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
</div>
  )
}

export default StudentDetails
