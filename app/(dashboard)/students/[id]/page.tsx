// app/students/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AddStudent from '@/components/AddStudent';

const EditStudentPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/students/${id}`)
        .then(res => res.json())
        .then(data => {
          setStudentData(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          alert('Failed to load student data');
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

  if (!studentData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Student not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <AddStudent initialData={studentData} />
    </div>
  );
};

export default EditStudentPage;
