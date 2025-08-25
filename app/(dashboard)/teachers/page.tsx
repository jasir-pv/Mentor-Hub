// app/teachers/page.tsx
'use client';

import AddTeacher from '@/components/AddTeacher';
import TeacherDetails from '@/components/TeachersDetails';
import { useState } from 'react';


const TeachersPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="container mx-auto p-2">
      <TeacherDetails
        userRole='admin' 
        onAddTeacher={() => setShowAddModal(true)} 
      />
      
      {showAddModal && (
        <AddTeacher 
          onClose={() => setShowAddModal(false)}
          isModal={true}
        />
      )}
    </div>
  );
};

export default TeachersPage;