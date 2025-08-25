'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import AddTeacher from "./AddTeacher";
import { useRouter } from "next/navigation";


interface TeacherListProps {
  userRole: string;
  onAddTeacher: () => void;
}

const TeacherDetails: React.FC<TeacherListProps> = ({ userRole, onAddTeacher }) => {  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddTeacher, setShowAddTeacher] = useState(false);

  const router = useRouter();


  // ✅ Fetch teachers directly from DB (API route using Prisma)
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
        alert("Failed to load teachers from database.");
      }finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // ✅ Delete teacher
  const handleDelete = async (id: number) => {
    const teacherToDelete = teachers.find((teacher) => teacher.id === id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${teacherToDelete?.name}?`
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/teachers/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
          alert(`Teacher ${teacherToDelete?.name} deleted successfully.`);
        } else {
          alert("Failed to delete teacher");
        }
      } catch (error) {
        console.error("Error deleting teacher:", error);
        alert("Error deleting teacher");
      }
    }
  };

  // ✅ Edit teacher
  const handleEdit = (id: number) => {
    router.push(`/teachers/${id}`);
  };



   if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="mt-4 mb-3 text-xl font-semibold">Teacher Details</h2>

        {/* Show Add button only if Admin */}
        {userRole === "admin" && (
          <Button
            onClick={onAddTeacher}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            Add Teachers
          </Button>
        )}
      </div>


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
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b">
                  <td className="p-4 text-sm">{teacher.emp_id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                        <Image
                          src={teacher.profile_pic || "/default-avatar.png"}
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
                  <td className="p-4 text-sm">{teacher.department}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      {teacher.subjects?.map((subject: string, index: number) => (
                        <span key={index} className="text-xs">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      {teacher.classes_handled?.map((cls: string, index: number) => (
                        <span key={index} className="text-xs">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      className={`px-2 py-0 text-[12px] rounded-md ${
                        teacher.status === "Active"
                          ? "bg-green-500"
                          : teacher.status === "On Leave"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      } text-white`}
                    >
                      {teacher.status}
                    </Button>
                  </td>
                  <td className="p-4 text-right flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="p-2"
                      onClick={() => handleEdit(teacher.id)}
                    >
                      <FaEdit className="text-gray-500" />
                    </Button>
                    <Button
                      variant="outline"
                      className="p-2"
                      onClick={() => handleDelete(teacher.id)}
                    >
                      <FaTrash className="text-red-500" />
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
  );
};

export default TeacherDetails;
