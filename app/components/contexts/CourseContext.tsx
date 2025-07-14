import { Course } from "lib/models/course";
import { createContext, ReactNode, useContext, useState } from "react";


interface CourseContextType {
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
}

const CourseContext = createContext<CourseContextType|undefined>(undefined);

export const CourseProvider = ({ children }: {children:ReactNode}) => {
  const [selectedCourse,setSelectedCourse] = useState<Course|null>(null);

  return (
    <CourseContext.Provider value={{ selectedCourse, setSelectedCourse }}>
      {children}
    </CourseContext.Provider>
  ) 
}

export const useStoredCourseData = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useStoredCourseData must be used within a CourseProvider');
  }
  return context;
}