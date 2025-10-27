import { Teacher } from "lib/models/teacher";
import { mockTeacherData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface TeacherContextType {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  addTeacher: (teacher: Teacher) => void;
  deleteTeacher: (teacherId: string) => void;
  assignTeacherToCourse: (teacherId: string, courseId: string) => void;
  unassignTeacherFromCourse: (teacherId: string, courseId: string) => void;
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

  const assignTeacherToCourse = (teacherId: string, courseId: string) => {
    setTeachers(prev => prev.map(teacher => {
      if (teacher.teacherId === teacherId) {
        const currentCourses = teacher.assignedCourseIds || [];
        if (!currentCourses.includes(courseId)) {
          return {
            ...teacher,
            assignedCourseIds: [...currentCourses, courseId]
          };
        }
      }
      return teacher;
    }));
  };

  const unassignTeacherFromCourse = (teacherId: string, courseId: string) => {
    setTeachers(prev => prev.map(teacher => {
      if (teacher.teacherId === teacherId) {
        const currentCourses = teacher.assignedCourseIds || [];
        return {
          ...teacher,
          assignedCourseIds: currentCourses.filter(id => id !== courseId)
        };
      }
      return teacher;
    }));
  };

  return (
    <TeacherContext.Provider value={{
      teachers,
      selectedTeacher,
      setSelectedTeacher,
      addTeacher,
      deleteTeacher,
      assignTeacherToCourse,
      unassignTeacherFromCourse
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