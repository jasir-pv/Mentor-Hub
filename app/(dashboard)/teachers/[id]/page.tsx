// app/teachers/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AddTeacher from '@/components/AddTeacher';

const EditTeacherPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [teacherData, setTeacherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/teachers/${id}`)
        .then(res => res.json())
        .then(data => {
          setTeacherData(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          alert('Failed to load teacher data');
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!teacherData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Teacher not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <AddTeacher initialData={teacherData} />
    </div>
  );
};

export default EditTeacherPage;