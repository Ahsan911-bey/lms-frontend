
const BASE_URL = "http://localhost:8080";

// --- Types ---

export interface Student {
    id: number;
    name: string;
    regNo: string;
    emailAddress: string;
    contactNumber: string;
    guardianNumber: string;
    fatherName: string;
    program: string;
    session: string;
    semester: string;
    campus: string;
    className: string;
    nationality: string;
    dob: string;
    profilePic: string;
    password?: string; // Optional as it might not always be needed/safe to display
    cgpa: number;
    wifiAccount: string;
    office365Email: string;
    office365Pass?: string;
    batch: string;
}

export interface Announcement {
    id: number;
    courseId: number;
    message: string;
    timestamp: string;
}

export interface Course {
    id: number;
    courseNo: string;
    courseName: string;
    credits: number;
    teacherId: number;
    studentIds: number[];
    announcements?: Announcement[];
}

export interface AttendanceStats {
    courseId: number;
    courseName: string;
    totalClasses: number;
    presents: number;
    absents: number;
}

export interface AttendanceRecord {
    studentId: number | string;
    present: boolean;
}

export interface AnnouncementData {
    courseId: number | string;
    message: string;
}

export interface AssignmentData {
    title: string;
    description: string;
    dueDate: string; // ISO date string expected
    teacherId: number | string;
    courseId: number | string;
}

export interface MarksData {
    courseId: number;
    courseName: string;
    quizMarks: number;
    assignmentMarks: number;
    midsMarks: number;
    finalMarks: number;
}

// Admin types (Placeholders for extendability)
export interface StudentCreationData {
    [key: string]: any;
}

export interface TeacherCreationData {
    [key: string]: any;
}

export interface CourseCreationData {
    [key: string]: any;
}

export interface BatchAssignData {
    [key: string]: any;
}

export interface AssignTeacherData {
    [key: string]: any;
}

export interface AssignStudentsData {
    [key: string]: any;
}

// --- Helper Functions ---

/**
 * Generic GET request handler
 * @param endpoint - The API endpoint (e.g., "/student/1")
 * @returns Promise with the response data
 */
async function apiGet<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store", // Ensure fresh data for dynamic content
    });

    if (!res.ok) {
        throw new Error(`API GET request failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

/**
 * Generic POST request handler
 * @param endpoint - The API endpoint
 * @param body - The request body
 * @returns Promise with the response data
 */
async function apiPost<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`API POST request failed: ${res.status} ${res.statusText}`);
    }

    // Handle empty responses or non-JSON responses if necessary
    const text = await res.text();
    return text ? JSON.parse(text) : ({} as T);
}

// --- Student Portal ---

export const getStudentProfile = (studentId: number | string) =>
    apiGet<Student>(`/student/${studentId}`);

export const getStudentCourses = (studentId: number | string) =>
    apiGet<Course[]>(`/student/${studentId}/courses`);

export const getStudentMarks = (studentId: number | string) =>
    apiGet<MarksData[]>(`/student/${studentId}/marks`);

export const getStudentAttendance = (studentId: number | string) =>
    apiGet<AttendanceStats[]>(`/student/${studentId}/attendance`);

export const getStudentAssignments = (studentId: number | string) =>
    apiGet<any>(`/student/${studentId}/assignments`);

// --- Teacher Portal ---

export const getTeacherCourses = (teacherId: number | string) =>
    apiGet<any>(`/teacher/${teacherId}/courses`);

export const getTeacherCourseDetails = (courseCode: string, batchName: string) =>
    apiGet<any>(`/teacher/courses/${courseCode}/${batchName}`);

export const markAttendance = (courseId: number | string, attendanceData: AttendanceRecord[]) =>
    apiPost<any>(`/teacher/course/${courseId}/attendance`, attendanceData);

export const createAnnouncement = (data: AnnouncementData) =>
    apiPost<any>(`/teacher/announcement`, data);

export const createAssignment = (data: AssignmentData) =>
    apiPost<any>(`/teacher/assignment`, data);

export const recordMarks = (data: MarksData) =>
    apiPost<any>(`/teacher/marks`, data);

// --- Admin Portal ---

export const getAdminTeachers = () =>
    apiGet<any>(`/admin/teachers`);

export const getAdminCourseDetails = (courseCode: string, batchName: string) =>
    apiGet<any>(`/admin/courses/${courseCode}/${batchName}`);

export const createStudent = (data: StudentCreationData) =>
    apiPost<any>(`/admin/student`, data);

export const createTeacher = (data: TeacherCreationData) =>
    apiPost<any>(`/admin/teacher`, data);

export const createCourse = (data: CourseCreationData) =>
    apiPost<any>(`/admin/course`, data);

export const assignBatch = (data: BatchAssignData) =>
    apiPost<any>(`/admin/batch/assign`, data);

export const assignTeacherToCourse = (data: AssignTeacherData) =>
    apiPost<any>(`/admin/course/assign-teacher`, data);

export const assignStudentsToCourse = (data: AssignStudentsData) =>
    apiPost<any>(`/admin/course/assign-students`, data);
