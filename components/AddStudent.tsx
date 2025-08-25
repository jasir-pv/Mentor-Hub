import React, { useState } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';

type StudentData = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  parentName: string;
  parentOccupation: string;
  place: string;
  pincode: string;
  address: string;
  teacher: string;
  enrollmentType: 'package' | 'repackage';
  photo?: File | null;
};

const AddStudent = ({ onClose, onSave }: { onClose: () => void; onSave: (data: StudentData) => void }) => {
  const [studentData, setStudentData] = useState<StudentData>({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    parentName: '',
    parentOccupation: '',
    place: '',
    pincode: '',
    address: '',
    teacher: '',
    enrollmentType: 'package',
    photo: null
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStudentData(prev => ({
        ...prev,
        photo: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

 // Update the handleSubmit function in AddStudent.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    
    if (response.ok) {
      const newStudent = await response.json();
      onSave(newStudent);
    } else {
      console.error('Failed to create student');
      alert('Failed to create student');
    }
  } catch (error) {
    console.error('Error creating student:', error);
    alert('Error creating student');
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Student</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                {previewImage ? (
                  <Image 
                    src={previewImage} 
                    alt="Preview" 
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

          <div className="flex justify-center gap-6 mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="enrollmentType"
                checked={studentData.enrollmentType === 'package'}
                onChange={() => setStudentData(prev => ({...prev, enrollmentType: 'package'}))}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">Package</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="enrollmentType"
                checked={studentData.enrollmentType === 'repackage'}
                onChange={() => setStudentData(prev => ({...prev, enrollmentType: 'repackage'}))}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">Repackage</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={studentData.name}
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
                value={studentData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone No.*</label>
              <input
                type="tel"
                name="phone"
                value={studentData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Whatsapp No.</label>
              <input
                type="tel"
                name="whatsapp"
                value={studentData.whatsapp}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Whatsapp number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name*</label>
              <input
                type="text"
                name="parentName"
                value={studentData.parentName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Parent's name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Occupation</label>
              <input
                type="text"
                name="parentOccupation"
                value={studentData.parentOccupation}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Parent's occupation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Place*</label>
              <input
                type="text"
                name="place"
                value={studentData.place}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="City/Town"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode*</label>
              <input
                type="text"
                name="pincode"
                value={studentData.pincode}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Postal code"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
              <input
                type="text"
                name="address"
                value={studentData.address}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Full address"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Teacher</label>
              <input
                type="text"
                name="teacher"
                value={studentData.teacher}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Teacher's name"
              />
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
              Add Student
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;