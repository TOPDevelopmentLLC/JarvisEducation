import { Course } from "lib/models/course";
import { mockCourseData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface CourseContextType {
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
}

const CourseContext = createContext<CourseContextType|undefined>(undefined);

export const CourseProvider = ({ children }: {children:ReactNode}) => {
  const [courses, setCourses] = useState<Course[]>(mockCourseData);
  const [selectedCourse,setSelectedCourse] = useState<Course|null>(null);

  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.courseId !== courseId));
  };

  return (
    <CourseContext.Provider value={{
      courses,
      selectedCourse,
      setSelectedCourse,
      addCourse,
      deleteCourse
    }}>
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