import { Administrator } from "lib/models/administrator";
import { Course } from "lib/models/course";
import { Report, ReportType } from "lib/models/report";
import { Student } from "lib/models/student";
import { Teacher } from "lib/models/teacher";

export const mockStudentData: Student[] = [
    {
        studentId: '1',
        name: 'Naruto Uzumaki'
    },
    {
        studentId: '2',
        name: 'Sasuke Uchiha'
    },
    {
        studentId: '3',
        name: 'Sakura Haruno'
    },
    {
        studentId: '4',
        name: 'Neji Hyuga'
    },
    {
        studentId: '5',
        name: 'Rock Lee'
    },
    {
        studentId: '6',
        name: 'Shikamaru Nara'
    }
]

export const mockTeacherData: Teacher[] = [
    {
        teacherId: '1',
        name: 'Kakashi Hatake'
    },
    {
        teacherId: '2',
        name: 'Asuma Sarutobi'
    },
    {
        teacherId: '3',
        name: 'Might Guy'
    },
    {
        teacherId: '4',
        name: 'Jiraiya'
    }
]

export const mockAdminData: Administrator[] = [
    {
        adminId: '1',
        name: 'Hashirama Senju'
    },
    {
        adminId: '2',
        name: 'Tobirama Senju'
    },
    {
        adminId: '3',
        name: 'Hiruzen Sarutobi'
    },
    {
        adminId: '4',
        name: 'Minato Namikaze'
    },
    {
        adminId: '5',
        name: 'Tsunade'
    }
]

export const mockCourseData: Course[] = [
    {
        courseId: '1',
        title: 'Ninjutsu Training',
        description: 'Ninja training in Ninjutsu.'
    },
    {
        courseId: '2',
        title: 'Taijutsu Training',
        description: 'Ninja training in Taijutsu.'
    }
]

export const mockReportData: Report[] = [
    {
        reportId: '1',
        type: ReportType.Attendance,
        description: 'Student was not in class'
    },
    {
        reportId: '2',
        type: ReportType.Attendance,
        description: 'Student was not in class'
    },
    {
        reportId: '3',
        type: ReportType.Attendance,
        description: 'Student was not in class'
    },
    {
        reportId: '4',
        type: ReportType.Attendance,
        description: 'Student was not in class'
    }
]