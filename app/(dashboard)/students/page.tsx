// app/students/page.tsx
'use client';

import { useState } from 'react';
import StudentDetails from '@/components/StudentDetails';
import AddStudent from '@/components/AddStudent';

const StudentsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="container mx-auto p-2">
      <StudentDetails 
        userRole="admin" 
        onAddStudent={() => setShowAddModal(true)} 
      />

      {showAddModal && (
        <AddStudent 
          onClose={() => setShowAddModal(false)} 
          isModal={true} 
        />
      )}
    </div>
  );
};

export default StudentsPage;
