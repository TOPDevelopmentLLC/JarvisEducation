import { Administrator } from "./administrator";
import { Course } from "./course";
import { Report, ReportType } from "./report";
import { Student } from "./student";
import { Teacher } from "./teacher";

export const mockStudentData: Student[] = [
    {
        name: 'Naruto Uzumaki'
    },
    {
        name: 'Sasuke Uchiha'
    },
    {
        name: 'Sakura Haruno'
    },
    {
        name: 'Neji Hyuga'
    },
    {
        name: 'Rock Lee'
    },
    {
        name: 'Shikamaru Nara'
    }
]

export const mockTeacherData: Teacher[] = [
    {
        name: 'Kakashi Hatake'
    },
    {
        name: 'Asuma Sarutobi'
    },
    {
        name: 'Might Guy'
    },
    {
        name: 'Jiraiya'
    }
]

export const mockAdminData: Administrator[] = [
    {
        name: 'Hashirama Senju'
    },
    {
        name: 'Tobirama Senju'
    },
    {
        name: 'Hiruzen Sarutobi'
    },
    {
        name: 'Minato Namikaze'
    },
    {
        name: 'Tsunade'
    }
]

export const mockCourseData: Course[] = [
    {
        title: 'Ninjutsu Training',
        description: 'Ninja training in Ninjutsu.'
    },
    {
        title: 'Taijutsu Training',
        description: 'Ninja training in Taijutsu.'
    }
]

export const mockReportData: Report[] = [
    {
        type: ReportType.Attendance,
        description: 'Student was not in class'
    },
    {
        type: ReportType.Attendance,
        description: 'Student was not in class'
    },
    {
        type: ReportType.Attendance,
        description: 'Student was not in class'
    },
    {
        type: ReportType.Attendance,
        description: 'Student was not in class'
    }
]