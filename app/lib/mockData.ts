import { Administrator } from "lib/models/administrator";
import { Course } from "lib/models/course";
import { Report, ReportType } from "lib/models/report";
import { Student } from "lib/models/student";
import { Teacher } from "lib/models/teacher";

export const mockStudentData: Student[] = [
    {
        studentId: '1',
        name: 'Emma Johnson'
    },
    {
        studentId: '2',
        name: 'Liam Williams'
    },
    {
        studentId: '3',
        name: 'Olivia Brown'
    },
    {
        studentId: '4',
        name: 'Noah Davis'
    },
    {
        studentId: '5',
        name: 'Ava Martinez'
    },
    {
        studentId: '6',
        name: 'Ethan Garcia'
    },
    {
        studentId: '7',
        name: 'Sophia Rodriguez'
    },
    {
        studentId: '8',
        name: 'Mason Anderson'
    }
]

export const mockTeacherData: Teacher[] = [
    {
        teacherId: '1',
        name: 'Robert Thompson'
    },
    {
        teacherId: '2',
        name: 'Jennifer Wilson'
    },
    {
        teacherId: '3',
        name: 'Michael Chen'
    },
    {
        teacherId: '4',
        name: 'Sarah Mitchell'
    },
    {
        teacherId: '5',
        name: 'David Patterson'
    }
]

export const mockAdminData: Administrator[] = [
    {
        adminId: '1',
        name: 'Patricia Henderson'
    },
    {
        adminId: '2',
        name: 'James Sullivan'
    },
    {
        adminId: '3',
        name: 'Margaret Foster'
    },
    {
        adminId: '4',
        name: 'William Roberts'
    },
    {
        adminId: '5',
        name: 'Linda Coleman'
    }
]

export const mockCourseData: Course[] = [
    {
        courseId: '1',
        title: 'Algebra I',
        description: 'Introduction to algebraic concepts including equations, inequalities, and functions.',
        classroomNumber: '201'
    },
    {
        courseId: '2',
        title: 'English Literature',
        description: 'Analysis of classic and contemporary literature with focus on reading comprehension and writing skills.',
        classroomNumber: '305'
    },
    {
        courseId: '3',
        title: 'Biology',
        description: 'Study of living organisms, cells, genetics, and ecosystems.',
        classroomNumber: '412'
    },
    {
        courseId: '4',
        title: 'U.S. History',
        description: 'Comprehensive study of American history from colonial times to present day.',
        classroomNumber: '218'
    },
    {
        courseId: '5',
        title: 'Physical Education',
        description: 'Development of physical fitness, health awareness, and teamwork through sports and activities.',
        classroomNumber: 'GYM-A'
    }
]

export const mockReportData: Report[] = [
    {
        reportId: '1',
        type: ReportType.Attendance,
        description: 'Emma Johnson was absent without notification'
    },
    {
        reportId: '2',
        type: ReportType.Behavior,
        description: 'Liam Williams disrupted class discussion and refused to follow instructions'
    },
    {
        reportId: '3',
        type: ReportType.Attendance,
        description: 'Noah Davis arrived 20 minutes late to class'
    },
    {
        reportId: '4',
        type: ReportType.Conflict,
        description: 'Verbal altercation between Ethan Garcia and another student during lunch'
    },
    {
        reportId: '5',
        type: ReportType.Behavior,
        description: 'Sophia Rodriguez was using phone during instruction time'
    }
]