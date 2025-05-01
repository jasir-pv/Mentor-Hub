'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import { dummyStudents } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AddStudent from './AddStudent';

const StudentDetails = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [showAddStudent, setShowAddStudent] = useState(false);

  const handleDelete = (id: number) => {
    const studentToDelete = students.find((student) => student.id === id);
    const confirmDelete = window.confirm(`Are you sure you want to delete ${studentToDelete?.name}?`);
    if (confirmDelete) {
      setStudents((prev) => prev.filter((student) => student.id !== id));
      alert(`${studentToDelete?.name} deleted successfully.`);
    }
  };

  const AddStudentPopup = () => (
    <AddStudent 
    onClose={() => setShowAddStudent(false)}
    onSave={(studentData) => {
      // Handle saving the student data
      console.log('New student:', studentData);
      setShowAddStudent(false);
    }}
  />
  );

  return (
    <div className="relative">
      <div className="flex justify-between">
        <h2 className="mt-4 mb-3 text-xl font-semibold">Teacher Details</h2>
        <button
         onClick={() => setShowAddStudent(true)}
          className="rounded-lg px-2 py-1 mr-8 h-8 mt-4 bg-cyan-500 flex items-center justify-center"
        >
          <p className="text-white font-medium text-sm">Add Students</p>
        </button>
      </div>

      {showAddStudent && <AddStudentPopup />}

      <div className="rounded-2xl border border-gray-200 shadow-md overflow-y-hidden">
        <Table className="w-full max-h-12">
          <TableHeader className="bg-orange-100">
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
            {students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student.id} className="border-b">
                  <TableCell className="p-4">{student.reg_no}</TableCell>
                  <TableCell className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                        <Image
                          src={student.profile_pic}
                          alt="student"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-4">{student.class_name}</TableCell>
                  <TableCell className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                        <Image
                          src={student.teacher_pic}
                          alt="teacher"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{student.teacher_name}</p>
                        <p className="text-xs text-gray-500">{student.teacher_email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-4">
                    <Button
                      className={`px-3 py-1 rounded-md ${
                        student.status === 'Joined'
                          ? 'bg-green-300'
                          : student.status === 'Pending'
                          ? 'bg-yellow-300'
                          : 'bg-gray-300'
                      } text-white`}
                    >
                      {student.status}
                    </Button>
                  </TableCell>
                  <TableCell className="p-4 text-right ">
                    <Button variant="outline" className="p-2">
                      <FaEdit className="text-gray-500" />
                    </Button>
                    <Button variant="outline" className="p-2 ml-2" onClick={() => handleDelete(student.id)}>
                      <MdDelete className="text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentDetails;