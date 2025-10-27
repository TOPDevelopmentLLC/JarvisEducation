import { Teacher } from "lib/models/teacher";
import { mockTeacherData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface TeacherContextType {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  addTeacher: (teacher: Teacher) => void;
  deleteTeacher: (teacherId: string) => void;
}

const TeacherContext = createContext<TeacherContextType|undefined>(undefined);

export const TeacherProvider = ({ children }: {children:ReactNode}) => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeacherData);
  const [selectedTeacher,setSelectedTeacher] = useState<Teacher|null>(null);

  const addTeacher = (teacher: Teacher) => {
    setTeachers(prev => [...prev, teacher]);
  };

  const deleteTeacher = (teacherId: string) => {
    setTeachers(prev => prev.filter(t => t.teacherId !== teacherId));
  };

  return (
    <TeacherContext.Provider value={{
      teachers,
      selectedTeacher,
      setSelectedTeacher,
      addTeacher,
      deleteTeacher
    }}>
      {children}
    </TeacherContext.Provider>
  )
}

export const useStoredTeacherData = (): TeacherContextType => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error('useStoredTeacherData must be used within a TeacherProvider');
  }
  return context;
}