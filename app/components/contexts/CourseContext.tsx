import { Course } from "lib/models/course";
import { createContext, ReactNode, useContext, useState } from "react";


const CourseContext = createContext(null);

export const CourseProvider = ({ children }: {children:ReactNode}) => {
    const [selectedCourse,setSelectedCourse] = useState<Course|null>(null);

      return (
        <CourseContext.Provider value={{ selectedCourse, setSelectedCourse }}>
            {children}
        </CourseContext.Provider>
      )
      
}

export const useSelectedCourse = () => useContext(CourseContext);