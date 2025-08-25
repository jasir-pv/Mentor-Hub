'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddStudent from "./AddStudent";

interface StudentDetailsProps {
  userRole: string;
  onAddStudent?: () => void;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ userRole, onAddStudent }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ✅ Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        alert("Failed to load students from database.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // ✅ Delete student
  const handleDelete = async (id: number) => {
    const studentToDelete = students.find((student) => student.id === id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${studentToDelete?.name}?`
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setStudents((prev) => prev.filter((student) => student.id !== id));
          alert(`${studentToDelete?.name} deleted successfully.`);
        } else {
          alert("Failed to delete student");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Error deleting student");
      }
    }
  };

  // ✅ Edit student
  const handleEdit = (id: number) => {
    router.push(`/students/${id}`);
  };

  // ✅ Show loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="mt-4 mb-3 text-xl font-semibold">Student Details</h2>

        {userRole === "admin" && (
          <Button
            onClick={onAddStudent}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            Add Students
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 shadow-md overflow-x-auto overflow-y-hidden h-full">
        <table className="w-full max-h-12">
          <thead className="bg-orange-100">
            <tr>
              <th className="text-left p-4">Reg No</th>
              <th className="text-left p-4">Student</th>
              <th className="text-left p-4">Class</th>
              <th className="text-left p-4">Teacher</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Action</th>
            </tr>
          </thead>
          <tbody className="mt-2 bg-white">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="p-4 text-sm">{student.reg_no}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                        <Image
                          src={student.profile_pic || "/default-avatar.png"}
                          alt="student"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{student.class_name}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                        <Image
                          src={student.teacher_pic || "/default-avatar.png"}
                          alt="teacher"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{student.teacher_name}</p>
                        <p className="text-xs text-gray-500">{student.teacher_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      className={`px-2 py-0 text-[12px] rounded-md ${
                        student.status === "Joined"
                          ? "bg-green-500"
                          : student.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      } text-white`}
                    >
                      {student.status}
                    </Button>
                  </td>
                  <td className="p-4 text-right flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="p-2"
                      onClick={() => handleEdit(student.id)}
                    >
                      <FaEdit className="text-gray-500" />
                    </Button>
                    <Button
                      variant="outline"
                      className="p-2"
                      onClick={() => handleDelete(student.id)}
                    >
                      <FaTrash className="text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
