import React, { useState } from 'react';
import StudentContext from './StudentContext';

const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);

  const updateStudentId = (newId) => {
    setStudentId(newId);
  };

  return (
    <StudentContext.Provider value={{ studentId, updateStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;