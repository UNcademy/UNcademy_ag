export const messageTypeDef = `
  type Message {
        message: String!
  }
`;

export const classListTypeDef = `
  type ClassList {
      semester: String!
      courseName: String!
      courseGroup: Int!
      EnrolledStudents: [GradedStudent]
      Teachers: [TeacherInfo]
  }
  input ClassListUpdate {
      semester: String!
      courseName: String!
      courseGroup: Int!
      isNum: Boolean
  }`;

export const classListQueries = `
      classListDetails(id: Int!): ClassList!
  `;

export const classListMutations = `
    createClassList(teacherName: String!): Message
    updateClassList(id:Int!, classList: ClassListUpdate!): Message
    deleteClassList(id: Int!): Message
`;

export const studentTypeDef = `
  type EnrolledStudent {
      studentId: Int!
      studentName: String!
      studyProgram: String!
      classListId: Int!
      semester: String!
      courseName: String!
      courseGroup: Int!
      isNum: Boolean!
  }
  input StudentInput {
      studentName: String!
      studyProgram: String!
      semester: String!
      courseName: String!
      courseGroup: Int!
  }
  input StudentUpdate {
      studentName: String!
      studyProgram: String!
  }
  input Absences {
      absences: Int!
      maxAbsences: Int!
  }
  type StudentInfo {
      studentId: Int!
      studentName: String!
      studyProgram: String!
  }
  type GradedStudent {
      Student: StudentInfo!
      absences: Int
      isApproved: Boolean
      Tasks: [GradedTask]
  }
  `;

export const studentMutations = `
    enrollStudent(student: StudentInput!): EnrolledStudent!
    updateStudent(id:Int!, student: StudentUpdate!): Message
    removeStudent(id: Int!, classId: Int!): Message
    addAbsences(classId: Int!, studentId: Int!, absences: Absences!): Message
`;

export const teacherTypeDef = `
  input TeacherUpdate {
      classroom: String
      schedule: String!
      wDays: String!
      isHead: Boolean
  }
  type TeacherRole {
      isHead: Boolean!
  }
  type TeacherInfo {
      teacherId: Int!
      teacherName: String!
      TeacherRole: TeacherRole!
  }
  `;

export const teacherMutations = `
    updateTeacher(id:Int!, classId: Int!, teacher: TeacherUpdate!): Message
    removeTeacher(id: Int!, classId: Int!): Message
`;

export const taskTypeDef = `
  type Task {
      taskId: Int!
      taskName: String!
      weight: Int!
      TeacherRoleTeacherTeacherId: Int!
      TeacherRoleClassListClassListId: Int!
  } 
  input TaskAssign {
      taskName: String!
      weight: Int!
      assigned: String!
  }
  input TasksInput {
      teacherName: String!
      tasks: [TaskAssign!]!
  }
  input TaskName {
      taskName: String!
  }
  type GradedTask {
      taskName: String!
      weight: Int!
      Grade: GradeValue
  }
  `;

export const taskQueries = `
      getTasks(classId: Int!, teacherId: Int!): [Task!]!
  `;

export const taskMutations = `
    createTasks(classId: Int!, tasks: TasksInput!): Message
    updateTask(id: Int!, task: TaskName!): Message
    deleteTasks(classId: Int!): Message
`;

export const gradeTypeDef = `
  input NoNumGrade {
      teacherName: String!
      isApproved: Boolean!
  }
  input NumGrade {
      value: Int!
  }
  type GradeValue {
      value: Int
  }
  type NewGrade {
      value: Int!
      EnrolledStudentStudentStudentId: Int!
      EnrolledStudentClassListClassListId: Int!
      TaskTaskId: Int!
  }
  `;

export const gradeMutations = `
    approval(classId: Int!, studentId: Int!, grade: NoNumGrade!): Message
    addGrade(classId: Int!, studentId: Int!, taskId: Int!, grade: NumGrade!): NewGrade!
    editGrade(classId: Int!, studentId: Int!, taskId: Int!, grade: NumGrade!): Message
`;

export const scheduleTypeDef = `
  type ScheduleInfo {
      schedule: String!
      id: Int!
      course: String!
      group: Int!
      classroom: String!
  }
  type Week {
      monday: [ScheduleInfo]
      tuesday: [ScheduleInfo]
      wednesday: [ScheduleInfo]
      thursday: [ScheduleInfo]
      friday: [ScheduleInfo]
      saturday: [ScheduleInfo]
  }
  input TeacherSelect {
      teacherName: String!
      semester: String!
  }
  `;

export const scheduleQuery = `
      getSchedule(info: TeacherSelect!): Week!
  `;