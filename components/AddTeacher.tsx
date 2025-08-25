import React, { useState } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';

type TeacherData = {
  emp_id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[];
  classes_handled: string[];
  status: 'Active' | 'On Leave' | 'Inactive';
  profile_pic?: string; // Changed from File to string for URL
};

const AddTeacher = ({ onClose, onSave }: { onClose: () => void; onSave: (data: TeacherData) => void }) => {
  const [teacherData, setTeacherData] = useState<TeacherData>({
    emp_id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    subjects: [],
    classes_handled: [],
    status: 'Active',
    profile_pic: ''
  });

  const [subjectsInput, setSubjectsInput] = useState('');
  const [classesInput, setClassesInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeacherData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setTeacherData(prev => ({
          ...prev,
          profile_pic: result // Store base64 string for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSubject = () => {
    if (subjectsInput.trim()) {
      setTeacherData(prev => ({
        ...prev,
        subjects: [...prev.subjects, subjectsInput.trim()]
      }));
      setSubjectsInput('');
    }
  };

  const removeSubject = (index: number) => {
    setTeacherData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  const addClass = () => {
    if (classesInput.trim()) {
      setTeacherData(prev => ({
        ...prev,
        classes_handled: [...prev.classes_handled, classesInput.trim()]
      }));
      setClassesInput('');
    }
  };

  const removeClass = (index: number) => {
    setTeacherData(prev => ({
      ...prev,
      classes_handled: prev.classes_handled.filter((_, i) => i !== index)
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData), // send plain JSON
    });

    if (response.ok) {
      const newTeacher = await response.json();
      onSave(newTeacher); // update UI
      alert("Teacher added successfully!");
    } else {
      const errorData = await response.json();
      alert(`Failed to add teacher: ${errorData.error || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error adding teacher:", error);
    alert("Error adding teacher. Please try again.");
  }
};



  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-[40px] p-6 overflow-y-auto max-h-[90vh] relative popup-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Teacher</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                {previewImage ? (
                  <Image 
                    src={previewImage} 
                    alt="Preview" 
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-4xl">📷</div>
                )}
              </div>
              <label className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-purple-600 border border-purple-100 cursor-pointer hover:bg-purple-50 transition-colors flex items-center">
                <FiUpload className="mr-1" size={14} />
                Upload
                <input 
                  type="file" 
                  name="profile_image"
                  className="hidden" 
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">
              JPEG, PNG up to 5MB (1000px recommended)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID*</label>
              <input
                type="text"
                name="emp_id"
                value={teacherData.emp_id}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="EMP001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={teacherData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={teacherData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="teacher@school.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone No.*</label>
              <input
                type="tel"
                name="phone"
                value={teacherData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
              <input
                type="text"
                name="department"
                value={teacherData.department}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Mathematics, Science, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
              <select
                name="status"
                value={teacherData.status}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            {/* Subjects Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={subjectsInput}
                  onChange={(e) => setSubjectsInput(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add subject (e.g., Mathematics)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSubject();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addSubject}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacherData.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {subject}
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Classes Handled Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Classes Handled</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={classesInput}
                  onChange={(e) => setClassesInput(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add class (e.g., 10A)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addClass();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addClass}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacherData.classes_handled.map((cls, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {cls}
                    <button
                      type="button"
                      onClick={() => removeClass(index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 text-white"
            >
              Add Teacher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;