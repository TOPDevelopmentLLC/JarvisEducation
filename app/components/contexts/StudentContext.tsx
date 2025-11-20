import { Student } from "lib/models/student";
import { createContext, ReactNode, useContext, useState } from "react";


interface StudentContextType {
  students: Student[];
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
  addReportToStudent: (studentId: string, reportId: string) => void;
  removeReportFromStudent: (studentId: string, reportId: string) => void;
}

const StudentContext = createContext<StudentContextType|undefined>(undefined);

export const StudentProvider = ({ children }: {children:ReactNode}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent,setSelectedStudent] = useState<Student|null>(null);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.studentId !== studentId));
  };

  const addReportToStudent = (studentId: string, reportId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.studentId === studentId) {
        const currentReports = student.reportIds || [];
        if (!currentReports.includes(reportId)) {
          return {
            ...student,
            reportIds: [...currentReports, reportId]
          };
        }
      }
      return student;
    }));

    // Update selectedStudent if it's the one being modified
    if (selectedStudent?.studentId === studentId) {
      const currentReports = selectedStudent.reportIds || [];
      if (!currentReports.includes(reportId)) {
        setSelectedStudent({
          ...selectedStudent,
          reportIds: [...currentReports, reportId]
        });
      }
    }
  };

  const removeReportFromStudent = (studentId: string, reportId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.studentId === studentId) {
        const currentReports = student.reportIds || [];
        return {
          ...student,
          reportIds: currentReports.filter(id => id !== reportId)
        };
      }
      return student;
    }));

    // Update selectedStudent if it's the one being modified
    if (selectedStudent?.studentId === studentId) {
      const currentReports = selectedStudent.reportIds || [];
      setSelectedStudent({
        ...selectedStudent,
        reportIds: currentReports.filter(id => id !== reportId)
      });
    }
  };

  return (
    <StudentContext.Provider value={{
      students,
      selectedStudent,
      setSelectedStudent,
      setStudents,
      addStudent,
      deleteStudent,
      addReportToStudent,
      removeReportFromStudent
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