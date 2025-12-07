# API Endpoints & Testing Guide

This document lists all available API endpoints for the University Portal, along with example requests using the seeded data.

## Base URL
`http://localhost:8080`

## 0. File Management (`/files`)
Use these endpoints for file upload and download operations.

| Method | Endpoint | Description | Example URL |
| :--- | :--- | :--- | :--- |
| `POST` | `/files/upload` | Upload a file (multipart/form-data) | `/files/upload` |
| `GET` | `/files/download?path={filename}` | Download a file | `/files/download?path=abc123.pdf` |

**Upload File (`POST /files/upload`)**
- Content-Type: `multipart/form-data`
- Form field: `file`
- Returns: filename string (use this as `fileUrl` in assignment/submission requests)

## 1. Student Portal (`/student`)
Use these endpoints to view data for a specific student.
**Seeded Student IDs**: 1 to 50

| Method | Endpoint | Description | Example URL |
| :--- | :--- | :--- | :--- |
| `GET` | `/student/{studentId}` | Get student profile | `/student/1` |
| `GET` | `/student/{studentId}/courses` | Get enrolled courses (includes assignments) | `/student/1/courses` |
| `GET` | `/student/{studentId}/marks` | Get marks for all courses | `/student/1/marks` |
| `GET` | `/student/{studentId}/attendance` | Get attendance summary | `/student/1/attendance` |
| `POST` | `/student/assignment/submit` | Submit an assignment | *(See JSON Body below)* |

## 2. Teacher Portal (`/teacher`)
Use these endpoints for teacher operations.
**Seeded Teacher IDs**: 1 to 10
**Seeded Course Codes**: CS-101, CS-102, CS-201, etc.
**Seeded Batches**: Batch-A, Batch-B, Batch-C, Batch-D, Batch-E

| Method | Endpoint | Description | Example URL |
| :--- | :--- | :--- | :--- |
| `GET` | `/teacher/{teacherId}/courses` | Get courses taught by teacher | `/teacher/1/courses` |
| `GET` | `/teacher/courses/{courseCode}/{batchName}` | Get students in a course & batch | `/teacher/courses/CS-101/Batch-A` |
| `POST` | `/teacher/course/{courseId}/attendance` | Mark attendance for students | `/teacher/course/1/attendance` |
| `POST` | `/teacher/announcement` | Create an announcement | *(See JSON Body below)* |
| `POST` | `/teacher/assignment` | Create an assignment | *(See JSON Body below)* |
| `GET` | `/teacher/assignment/{assignmentId}/submissions` | Get student submissions for an assignment | `/teacher/assignment/1/submissions` |
| `POST` | `/teacher/marks` | Record marks for a student | *(See JSON Body below)* |
| `GET` | `/teacher/{teacherId}` | Get teacher profile | `/teacher/2` |
| `DELETE` | `/teacher/delannouncement/{id}` | Delete an announcement by ID | `/teacher/delannouncement/2` |

### Example JSON Bodies for Teacher POST Requests

**Mark Attendance (`POST /teacher/course/1/attendance`)**
```json
[
  {
    "studentId": 1,
    "present": true
  },
  {
    "studentId": 2,
    "present": false
  }
]
```

**Create Announcement (`POST /teacher/announcement`)**
```json
{
  "courseId": 1,
  "message": "Class is cancelled tomorrow."
}
```

**Create Assignment (`POST /teacher/assignment`)**
```json
{
  "title": "Lab 1",
  "description": "Complete the lab manual.",
  "dueDate": "2024-12-31",
  "teacherId": 1,
  "courseId": 1,
  "fileUrl": "path/to/saved/file.pdf"
}
```

**Submit Assignment (`POST /student/assignment/submit`)**
```json
{
  "studentId": 12,
  "assignmentId": 5,
  "fileUrl": "path/to/uploaded/student/file.pdf"
}
```

**Get Assignment Submissions (`GET /teacher/assignment/{assignmentId}/submissions`)**
Returns a list of student submissions for the specified assignment:
```json
[
  {
    "studentName": "Ahsan Khan",
    "studentId": 12,
    "fileUrl": "submission_12_5.pdf",
    "submittedAt": "2024-12-15T10:30:00"
  }
]
```

**Note:** Assignments are now included in the `GET /student/{studentId}/courses` response. Each course object contains an `assignments` array with assignment details and status (pending/submitted/late).

**Record Marks (`POST /teacher/marks`)**
```json
{
  "studentId": 1,
  "courseId": 1,
  "quizMarks": 8.5,
  "assignmentMarks": 9.0,
  "midsMarks": 22.0,
  "finalMarks": 45.0
}
```

## 3. Admin Portal (`/admin`)
Use these endpoints for administrative tasks.

| Method | Endpoint | Description | Example URL |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/teachers` | Get all teachers | `/admin/teachers` |
| `GET` | `/admin/courses/{courseCode}/{batchName}` | Get students (Admin view) | `/admin/courses/CS-101/Batch-A` |
| `POST` | `/admin/student` | Create a new student | *(See JSON Body below)* |
| `POST` | `/admin/teacher` | Create a new teacher | *(See JSON Body below)* |
| `POST` | `/admin/course` | Create a new course | *(See JSON Body below)* |
| `POST` | `/admin/batch/assign` | Assign students to a batch | *(See JSON Body below)* |
| `POST` | `/admin/course/assign-teacher` | Assign teacher to course | *(See JSON Body below)* |
| `POST` | `/admin/course/assign-students` | Assign students to course | *(See JSON Body below)* |

### Example JSON Bodies for Admin POST Requests

**Create Teacher (`POST /admin/teacher`)**
```json
{
  "name": "Prof. Sara Khan",
  "regNo": "T-011",
  "emailAddress": "sara.khan@university.edu",
  "contactNumber": "0300-1234567",
  "guardianNumber": "0300-7654321",
  "fatherName": "Khan Senior",
  "program": "Computer Science",
  "session": "FA24",
  "semester": "3",
  "campus": "ISL",
  "className": "CS-3A",
  "nationality": "Pakistani",
  "dob": "1985-06-15",
  "profilePic": "https://example.com/teacher11.jpg",
  "password": "secret123",
  "qualification": "MSCS",
  "specialization": "Web Development"
}
```

**Create Student (`POST /admin/student`)**
```json
{
  "name": "John Doe",
  "regNo": "CS-999",
  "emailAddress": "john.doe@student.com",
  "contactNumber": "0300-1234567",
  "program": "BSCS",
  "session": "2024-2028",
  "semester": "1",
  "campus": "Main",
  "className": "CS-1A",
  "dob": "2005-01-01",
  "password": "password123",
  "batch": "Batch-A"
}
```

**Assign Batch (`POST /admin/batch/assign`)**
```json
{
  "studentIds": [1, 2, 3],
  "batch": "Batch-B"
}
```
