import { Administrator } from "lib/models/administrator";
import { Course } from "lib/models/course";
import { Report, ReportType } from "lib/models/report";
import { Student } from "lib/models/student";
import { Teacher } from "lib/models/teacher";
import { Code } from "lib/models/code";
import { Team } from "lib/models/team";
import { Comment } from "lib/models/comment";

// Mock current user ID for testing purposes
// Set to admin:1 (Patricia Henderson) to test comment editing
export const mockCurrentUserId = 'admin:1';

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
        name: 'Robert Thompson',
        teamIds: ['1', '2']
    },
    {
        teacherId: '2',
        name: 'Jennifer Wilson',
        teamIds: ['1']
    },
    {
        teacherId: '3',
        name: 'Michael Chen',
        teamIds: ['3']
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
        teamIds: ['1']
    },
    {
        adminId: '2',
        name: 'James Sullivan',
        teamIds: ['2']
    },
    {
        adminId: '3',
        name: 'Margaret Foster',
        teamIds: ['3']
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

export const mockCommentData: Comment[] = [
    {
        commentId: '1',
        userId: 'teacher:1', // Robert Thompson
        fullName: 'Robert Thompson',
        bodyText: 'Parent was contacted and confirmed Emma was sick at home.',
        timestamp: new Date('2024-01-15T09:30:00'),
        reportId: '1'
    },
    {
        commentId: '2',
        userId: 'admin:1', // Patricia Henderson
        fullName: 'Patricia Henderson',
        bodyText: 'Follow-up meeting scheduled with student and parents for next week.',
        timestamp: new Date('2024-01-15T10:15:00'),
        reportId: '2'
    },
    {
        commentId: '3',
        userId: 'teacher:2', // Jennifer Wilson
        fullName: 'Jennifer Wilson',
        bodyText: 'Student showed improvement in behavior after our discussion.',
        timestamp: new Date('2024-01-16T14:20:00'),
        reportId: '2'
    },
    {
        commentId: '4',
        userId: 'teacher:3', // Michael Chen
        fullName: 'Michael Chen',
        bodyText: 'Bus delay was confirmed as the cause of tardiness.',
        timestamp: new Date('2024-01-15T11:00:00'),
        reportId: '3'
    },
    {
        commentId: '5',
        userId: 'admin:2', // James Sullivan
        fullName: 'James Sullivan',
        bodyText: 'Both students have been separated and counseling sessions arranged.',
        timestamp: new Date('2024-01-15T13:45:00'),
        reportId: '4'
    },
    {
        commentId: '6',
        userId: 'teacher:5', // David Patterson
        fullName: 'David Patterson',
        bodyText: 'Will continue to monitor the situation closely.',
        timestamp: new Date('2024-01-15T14:00:00'),
        reportId: '4'
    }
];

export const mockReportData: Report[] = [
    {
        reportId: '1',
        type: ReportType.Attendance,
        description: 'Emma Johnson was absent without notification',
        comments: [mockCommentData[0]]
    },
    {
        reportId: '2',
        type: ReportType.Behavior,
        description: 'Liam Williams disrupted class discussion and refused to follow instructions',
        comments: [mockCommentData[1], mockCommentData[2]]
    },
    {
        reportId: '3',
        type: ReportType.Attendance,
        description: 'Noah Davis arrived 20 minutes late to class',
        comments: [mockCommentData[3]]
    },
    {
        reportId: '4',
        type: ReportType.Conflict,
        description: 'Verbal altercation between Ethan Garcia and another student during lunch',
        comments: [mockCommentData[4], mockCommentData[5]]
    },
    {
        reportId: '5',
        type: ReportType.Behavior,
        description: 'Sophia Rodriguez was using phone during instruction time',
        comments: []
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
        memberIds: ['teacher:1', 'teacher:2', 'admin:1'], // Format: "teacher:{id}" or "admin:{id}"
        assignedCodeIds: ['1', '2', '3', '4']
    },
    {
        teamId: '2',
        name: 'Student Support Team',
        description: 'Dedicated to student welfare and support services',
        memberIds: ['teacher:1', 'admin:2'],
        assignedCodeIds: ['2']
    },
    {
        teamId: '3',
        name: 'Safety & Security Team',
        description: 'Campus safety and security management',
        memberIds: ['teacher:3', 'admin:3'],
        assignedCodeIds: ['1', '4']
    }
]