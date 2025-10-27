import { Student } from "lib/models/student";
import { mockStudentData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface StudentContextType {
  students: Student[];
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  addStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
}

const StudentContext = createContext<StudentContextType|undefined>(undefined);

export const StudentProvider = ({ children }: {children:ReactNode}) => {
  const [students, setStudents] = useState<Student[]>(mockStudentData);
  const [selectedStudent,setSelectedStudent] = useState<Student|null>(null);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.studentId !== studentId));
  };

  return (
    <StudentContext.Provider value={{
      students,
      selectedStudent,
      setSelectedStudent,
      addStudent,
      deleteStudent
    }}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStoredStudentData = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStoredStudentData must be used within a StudentProvider');
  }
  return context;
};