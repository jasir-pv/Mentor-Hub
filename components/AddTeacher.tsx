// components/students/StudentForm.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type StudentData = {
  id?: number;
  reg_no?: string;
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
  status?: 'Joined' | 'Pending' | 'Inactive';
  profile_pic?: string;
};

interface StudentFormProps {
  initialData?: StudentData;
  onClose?: () => void;
  isModal?: boolean;
  onSave?: (data: StudentData) => void;
}

const AddStudent: React.FC<StudentFormProps> = ({
  initialData,
  onClose,
  isModal = false,
  onSave,
}) => {
  const [studentData, setStudentData] = useState<StudentData>(
    initialData || {
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
      status: 'Pending',
      profile_pic: '',
    }
  );

  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.profile_pic || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const isEditMode = Boolean(initialData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // preview + base64 store
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setStudentData((prev) => ({ ...prev, profile_pic: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditMode
        ? `/api/students/${studentData.id}`
        : '/api/students';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const savedStudent = await response.json();
        alert(
          isEditMode
            ? 'Student updated successfully!'
            : 'Student added successfully!'
        );

        if (onSave) onSave(savedStudent);

        if (isModal && onClose) {
          onClose();
        } else {
          router.push('/students');
          router.refresh();
        }
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      router.push('/students');
    }
  };

  return (
    <div
      className={
        isModal
          ? 'fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4'
          : 'p-6'
      }
    >
      <div
        className={`bg-white w-full max-w-4xl rounded-[40px] p-6 overflow-y-auto max-h-[90vh] relative ${
          isModal ? '' : 'border border-gray-200 shadow-md'
        }`}
      >
        {isModal && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <X size={24} />
          </button>
        )}

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
              <label className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-purple-600 cursor-pointer flex items-center gap-1">
                <FiUpload size={14} />
                Upload
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Student Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Name*', name: 'name', type: 'text', required: true },
              { label: 'Email*', name: 'email', type: 'email', required: true },
              { label: 'Phone*', name: 'phone', type: 'tel', required: true },
              { label: 'Whatsapp', name: 'whatsapp', type: 'tel' },
              {
                label: 'Parent Name*',
                name: 'parentName',
                type: 'text',
                required: true,
              },
              {
                label: 'Parent Occupation',
                name: 'parentOccupation',
                type: 'text',
              },
              { label: 'Place*', name: 'place', type: 'text', required: true },
              {
                label: 'Pincode*',
                name: 'pincode',
                type: 'text',
                required: true,
              },
              {
                label: 'Teacher',
                name: 'teacher',
                type: 'text',
                required: false,
              },
            ].map(({ label, name, type, required }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={(studentData as any)[name] || ''}
                  onChange={handleInputChange}
                  required={required}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
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
              />
            </div>

            {/* Enrollment */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Enrollment Type*
              </label>
              <select
                name="enrollmentType"
                value={studentData.enrollmentType}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="package">Package</option>
                <option value="repackage">Repackage</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status*</label>
              <select
                name="status"
                value={studentData.status}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="Joined">Joined</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Processing...'
                : isEditMode
                ? 'Update Student'
                : 'Add Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
