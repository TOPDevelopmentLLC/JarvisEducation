import { Teacher } from "lib/models/teacher";
import { createContext, ReactNode, useContext, useState } from "react";


interface TeacherContextType {
  selectedTeacher: Teacher | null;
  setSelectedTeacher: (teacher: Teacher | null) => void;
}

const TeacherContext = createContext<TeacherContextType|undefined>(undefined);

export const TeacherProvider = ({ children }: {children:ReactNode}) => {
  const [selectedTeacher,setSelectedTeacher] = useState<Teacher|null>(null);

  return (
    <TeacherContext.Provider value={{ selectedTeacher, setSelectedTeacher }}>
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