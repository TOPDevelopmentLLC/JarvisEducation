import { Student } from "lib/models/student";
import { createContext, ReactNode, useContext, useState } from "react";


const StudentContext = createContext(null);

export const StudentProvider = ({ children }: {children:ReactNode}) => {
    const [selectedStudent,setSelectedStudent] = useState<Student|null>(null);

      return (
        <StudentContext.Provider value={{ selectedStudent, setSelectedStudent }}>
            {children}
        </StudentContext.Provider>
      )
      
}

export const useSelectedStudent = () => useContext(StudentContext);