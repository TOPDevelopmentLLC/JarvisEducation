import { Administrator } from "lib/models/administrator";
import { Course } from "lib/models/course";
import { Report, ReportType } from "lib/models/report";
import { Student } from "lib/models/student";
import { Teacher } from "lib/models/teacher";
import { Code } from "lib/models/code";
import { Team } from "lib/models/team";

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
        name: 'Patricia Henderson',
        assignedCodeIds: []
    },
    {
        adminId: '2',
        name: 'James Sullivan',
        assignedCodeIds: []
    },
    {
        adminId: '3',
        name: 'Margaret Foster',
        assignedCodeIds: []
    },
    {
        adminId: '4',
        name: 'William Roberts',
        assignedCodeIds: []
    },
    {
        adminId: '5',
        name: 'Linda Coleman',
        assignedCodeIds: []
    }
]

export const mockCourseData: Course[] = [
    {
        courseId: '1',
        title: 'Algebra I',
        description: 'Introduction to algebraic concepts including equations, inequalities, and functions.',
        classroomNumber: '201',
        startTime: '8:00 AM',
        endTime: '8:50 AM'
    },
    {
        courseId: '2',
        title: 'English Literature',
        description: 'Analysis of classic and contemporary literature with focus on reading comprehension and writing skills.',
        classroomNumber: '305',
        startTime: '9:00 AM',
        endTime: '9:50 AM'
    },
    {
        courseId: '3',
        title: 'Biology',
        description: 'Study of living organisms, cells, genetics, and ecosystems.',
        classroomNumber: '412',
        startTime: '10:00 AM',
        endTime: '11:30 AM'
    },
    {
        courseId: '4',
        title: 'U.S. History',
        description: 'Comprehensive study of American history from colonial times to present day.',
        classroomNumber: '218',
        startTime: '1:00 PM',
        endTime: '1:50 PM'
    },
    {
        courseId: '5',
        title: 'Physical Education',
        description: 'Development of physical fitness, health awareness, and teamwork through sports and activities.',
        classroomNumber: 'GYM-A',
        startTime: '2:00 PM',
        endTime: '3:30 PM'
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

export const mockCodeData: Code[] = [
    {
        codeId: '1',
        name: 'Code 1',
        description: 'Fight Breakout'
    },
    {
        codeId: '2',
        name: 'Code 2',
        description: 'Medical Emergency'
    },
    {
        codeId: '3',
        name: 'Code 3',
        description: '911 Medical Emergency'
    },
    {
        codeId: '4',
        name: 'Code 4',
        description: '911 On-Premise Threat'
    }
]

export const mockTeamData: Team[] = [
    {
        teamId: '1',
        name: 'Emergency Response Team',
        description: 'First responders for all emergency situations',
        memberIds: ['1', '2', '3'], // Mix of teacher and admin IDs
        assignedCodeIds: ['1', '2', '3', '4']
    },
    {
        teamId: '2',
        name: 'Student Support Team',
        description: 'Dedicated to student welfare and support services',
        memberIds: ['1', '4'],
        assignedCodeIds: ['2']
    },
    {
        teamId: '3',
        name: 'Safety & Security Team',
        description: 'Campus safety and security management',
        memberIds: ['2', '5'],
        assignedCodeIds: ['1', '4']
    }
]