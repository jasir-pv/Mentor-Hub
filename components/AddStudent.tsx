// components/teachers/TeacherForm.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type TeacherData = {
  emp_id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[];
  classes_handled: string[];
  status: 'Active' | 'On Leave' | 'Inactive';
  profile_pic?: string;
};

interface TeacherFormProps {
  initialData?: TeacherData;
  onClose?: () => void;
  isModal?: boolean;
}

const AddStudent: React.FC<TeacherFormProps> = ({ 
  initialData, 
  onClose, 
  isModal = false 
}) => {
  const [teacherData, setTeacherData] = useState<TeacherData>(
    initialData || {
      emp_id: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      subjects: [],
      classes_handled: [],
      status: 'Active',
      profile_pic: '',
    }
  );

  const [subjectsInput, setSubjectsInput] = useState('');
  const [classesInput, setClassesInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.profile_pic || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const isEditMode = Boolean(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeacherData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setTeacherData(prev => ({ ...prev, profile_pic: result }));
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
    setIsSubmitting(true);
    
    try {
      const url = isEditMode ? `/api/teachers/${initialData?.emp_id}` : '/api/teachers';
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherData),
      });

      if (response.ok) {
        alert(isEditMode ? "Teacher updated successfully!" : "Teacher added successfully!");
        
        if (isModal && onClose) {
          onClose();
        } else {
          router.push('/teachers');
          router.refresh();
        }
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className={isModal ? "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4" : "p-6"}>
      <div className={`bg-white w-full max-w-4xl rounded-[40px] p-6 overflow-y-auto max-h-[90vh] relative ${isModal ? '' : 'border border-gray-200 shadow-md'}`}>
        {isModal && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <X size={24} />
          </button>
        )}

        <h2 className="text-2xl font-bold mb-6">{isEditMode ? "Edit Teacher" : "Add New Teacher"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Profile Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                {previewImage ? (
                  <Image src={previewImage} alt="Preview" width={128} height={128} className="object-cover" />
                ) : <div className="text-gray-400 text-4xl">📷</div>}
              </div>
              <label className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-purple-600 cursor-pointer flex items-center gap-1">
                <FiUpload size={14} />
                Upload
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Employee ID*', name: 'emp_id', type: 'text', required: true },
              { label: 'Name*', name: 'name', type: 'text', required: true },
              { label: 'Email*', name: 'email', type: 'email', required: true },
              { label: 'Phone*', name: 'phone', type: 'tel', required: true },
              { label: 'Department*', name: 'department', type: 'text', required: true },
            ].map(({ label, name, type, required }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={(teacherData as any)[name] || ''}
                  onChange={handleInputChange}
                  required={required}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-1">Status*</label>
              <select
                name="status"
                value={teacherData.status}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Subjects */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Subjects</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={subjectsInput}
                  onChange={e => setSubjectsInput(e.target.value)}
                  placeholder="Add subject"
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); addSubject(); } }}
                />
                <Button type="button" onClick={addSubject} className="bg-purple-600 hover:bg-purple-700 text-white">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacherData.subjects.map((s, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    {s} <button type="button" onClick={() => removeSubject(i)} className="ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Classes Handled */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Classes Handled</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={classesInput}
                  onChange={e => setClassesInput(e.target.value)}
                  placeholder="Add class"
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); addClass(); } }}
                />
                <Button type="button" onClick={addClass} className="bg-purple-600 hover:bg-purple-700 text-white">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacherData.classes_handled.map((c, i) => (
                  <span key={i} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    {c} <button type="button" onClick={() => removeClass(i)} className="ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

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
              {isSubmitting ? 'Processing...' : isEditMode ? 'Update Teacher' : 'Add Teacher'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;