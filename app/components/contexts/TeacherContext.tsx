import { Teacher } from "lib/models/teacher";
import { createContext, ReactNode, useContext, useState } from "react";


const TeacherContext = createContext(null);

export const TeacherProvider = ({ children }: {children:ReactNode}) => {
    const [selectedTeacher,setSelectedTeacher] = useState<Teacher|null>(null);

      return (
        <TeacherContext.Provider value={{ selectedTeacher, setSelectedTeacher }}>
            {children}
        </TeacherContext.Provider>
      )
      
}

export const useSelectedTeacher = () => useContext(TeacherContext);