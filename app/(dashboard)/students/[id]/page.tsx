'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

type StudentData = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  parentName: string;
  parentOccupation?: string;
  place: string;
  pincode: string;
  address: string;
  teacher?: string;
  enrollmentType: 'package' | 'repackage';
  photo?: File | null;
};

const StudentDetailPage = ({
  onClose,
}: {
  onClose: () => void;
}) => {
 

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
    photo: null,
  });


  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const isEditMode = Boolean(id);

  // ✅ Fetch existing student if editing
  // useEffect(() => {
  //   if (isEditMode) {
  //     fetch(`/api/students/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setStudentData({ ...data, photo: null }); // don’t preload photo file
  //         setPreviewImage(data.profile_pic || null);
  //       });
  //   }
  // }, [id, isEditMode]);

  // ✅ Handle input change
  
  
  useEffect(() => {
    if (params.id) {
      fetch(`/api/students/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setStudent(data);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>Student not found</div>;


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStudentData((prev) => ({
        ...prev,
        photo: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(studentData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    const res = await fetch(isEditMode ? `/api/students/${id}` : '/api/students', {
      method: isEditMode ? 'PUT' : 'POST',
      body: formData,
    });

    if (res.ok) {
      alert(isEditMode ? 'Student updated successfully!' : 'Student added successfully!');
      onClose();
      router.refresh(); // refresh students list
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-[40px] p-6 overflow-y-auto max-h-[90vh] relative">
        
        {/* Close button (X) */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Edit Student' : 'Add New Student'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Profile Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-4xl">📷</div>
                )}
              </div>
              <label className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md cursor-pointer flex items-center gap-1 text-purple-600">
                <FiUpload size={14} />
                Upload
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* Enrollment Type */}
          <div className="flex justify-center gap-6 mb-8">
            {['package', 'repackage'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="enrollmentType"
                  checked={studentData.enrollmentType === type}
                  onChange={() => setStudentData((prev) => ({ ...prev, enrollmentType: type as 'package' | 'repackage' }))}
                  className="h-4 w-4 text-purple-600"
                />
                <span className="text-gray-700 capitalize">{type}</span>
              </label>
            ))}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Name*', name: 'name', type: 'text', required: true },
              { label: 'Email*', name: 'email', type: 'email', required: true },
              { label: 'Phone*', name: 'phone', type: 'tel', required: true },
              { label: 'Whatsapp', name: 'whatsapp', type: 'tel' },
              { label: 'Parent Name*', name: 'parentName', type: 'text', required: true },
              { label: 'Parent Occupation', name: 'parentOccupation', type: 'text' },
              { label: 'Place*', name: 'place', type: 'text', required: true },
              { label: 'Pincode*', name: 'pincode', type: 'text', required: true },
            ].map(({ label, name, type, required }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={(studentData as any)[name] || ''}
                  onChange={handleInputChange}
                  required={required}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder={label}
                />
              </div>
            ))}

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address*</label>
              <input
                type="text"
                name="address"
                value={studentData.address}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Full address"
              />
            </div>

            {/* Teacher */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Assigned Teacher</label>
              <input
                type="text"
                name="teacher"
                value={studentData.teacher || ''}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Teacher's name"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              {isEditMode ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDetailPage;
