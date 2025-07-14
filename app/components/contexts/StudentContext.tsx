import { Student } from "lib/models/student";
import { createContext, ReactNode, useContext, useState } from "react";


interface StudentContextType {
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
}

const StudentContext = createContext<StudentContextType|undefined>(undefined);

export const StudentProvider = ({ children }: {children:ReactNode}) => {
  const [selectedStudent,setSelectedStudent] = useState<Student|null>(null);

  return (
    <StudentContext.Provider value={{ selectedStudent, setSelectedStudent }}>
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