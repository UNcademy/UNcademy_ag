'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */


/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */


/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { statusCode, error: {message} } = originalError;
		return { message, statusCode, path };
	}
	return data;
}

const messageTypeDef = `
  type Message {
        message: String!
  }
`;

const classListTypeDef = `
  type ClassList {
      semester: String!
      courseName: String!
      courseGroup: Int!
      EnrolledStudents: [GradedStudent]
      Teachers: [TeacherInfo]
  }
  type NewClassList {
      teacherId: Int!
      teacherName: String!
      classListId: Int!
      semester: String!
      courseName: String!
      courseGroup: Int!
      isNum: Boolean!
  }
  input ClassListInput {
      teacherName: String!
      semester: String!
      courseName: String!
      courseGroup: Int!
      isNum: Boolean!
      classroom: String!
      schedule: String!
      wDays: String!
  }
  input ClassListUpdate {
      semester: String!
      courseName: String!
      courseGroup: Int!
      isNum: Boolean
  }`;

const classListQueries = `
      classListDetails(id: Int!): ClassList!
  `;

const classListMutations = `
    createClassList(classList: ClassListInput!): NewClassList!
    updateClassList(id:Int!, classList: ClassListUpdate!): Message
    deleteClassList(id: Int!): Message
`;

const studentTypeDef = `
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

const studentMutations = `
    enrollStudent(student: StudentInput!): EnrolledStudent!
    updateStudent(id:Int!, student: StudentUpdate!): Message
    removeStudent(id: Int!, classId: Int!): Message
    addAbsences(classId: Int!, studentId: Int!, absences: Absences!): Message
`;

const teacherTypeDef = `
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
      teacherName: String!
      TeacherRole: TeacherRole!
  }
  `;

const teacherMutations = `
    updateTeacher(id:Int!, classId: Int!, teacher: TeacherUpdate!): Message
    removeTeacher(id: Int!, classId: Int!): Message
`;

const taskTypeDef = `
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

const taskQueries = `
      getTasks(classId: Int!, teacherId: Int!): [Task!]!
  `;

const taskMutations = `
    createTasks(classId: Int!, tasks: TasksInput!): Message
    updateTask(id: Int!, task: TaskName!): Message
    deleteTasks(classId: Int!): Message
`;

const gradeTypeDef = `
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

const gradeMutations = `
    approval(classId: Int!, studentId: Int!, grade: NoNumGrade!): Message
    addGrade(classId: Int!, studentId: Int!, taskId: Int!, grade: NumGrade!): NewGrade!
    editGrade(classId: Int!, studentId: Int!, taskId: Int!, grade: NumGrade!): Message
`;

const scheduleTypeDef = `
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

const scheduleQuery = `
      getSchedule(info: TeacherSelect!): Week!
  `;

const url = 'localhost';
const port = '8090';

const URL = `http://${url}:${port}`;

const resolvers = {
    Query: {
        classListDetails: (_, { id }) =>
            generalRequest(`${URL}/class/${id}`, 'GET'),
        getTasks: (_, { classId, teacherId }) =>
            generalRequest(`${URL}/class/${classId}/getTasks/${teacherId}`, 'GET'),
        getSchedule: (_, { info }) =>
            generalRequest(`${URL}/schedule/teacher`, 'GET', info),
    },
    Mutation: {
        createClassList: (_, { classList }) =>
            generalRequest(`${URL}/addClass`, 'POST', classList),
        updateClassList: (_, { id, classList }) =>
            generalRequest(`${URL}/class/${id}/edit`, 'PUT', classList),
        deleteClassList: (_, { id }) =>
            generalRequest(`${URL}/class/${id}/delete`, 'DELETE'),
        enrollStudent: (_, { student }) =>
            generalRequest(`${URL}/addStudent`, 'POST', student),
        updateStudent: (_, { id, student }) =>
            generalRequest(`${URL}/editStudent/${id}`, 'PUT', student),
        removeStudent: (_, { id, classId }) =>
            generalRequest(`${URL}/class/${classId}/student/${id}/remove`, 'DELETE'),
        updateTeacher: (_, { id, classId, teacher }) =>
            generalRequest(`${URL}/class/${classId}/teacher/${id}/edit`, 'PUT', teacher),
        removeTeacher: (_, { id, classId }) =>
            generalRequest(`${URL}/class/${classId}/teacher/${id}/remove`, 'DELETE'),
        createTasks: (_, { classId, tasks }) =>
            generalRequest(`${URL}/class/${classId}/addTasks`, 'POST', tasks),
        updateTask: (_, { id, task }) =>
            generalRequest(`${URL}/editTask/${id}`, 'PUT', task),
        deleteTasks: (_, { classId }) =>
            generalRequest(`${URL}/class/${classId}/deleteTasks`, 'DELETE'),
        addAbsences: (_, { classId, studentId, absences }) =>
            generalRequest(`${URL}/class/${classId}/student/${studentId}/addAbsences`, 'PUT', absences),
        approval: (_, { classId, studentId, grade }) =>
            generalRequest(`${URL}/class/${classId}/student/${studentId}/grade`, 'PUT', grade),
        addGrade: (_, { classId, studentId, taskId, grade }) =>
            generalRequest(`${URL}/class/${classId}/student/${studentId}/grade/${taskId}`, 'POST', grade),
        editGrade: (_, { classId, studentId, taskId, grade }) =>
            generalRequest(`${URL}/class/${classId}/student/${studentId}/grade/${taskId}`, 'PUT', grade),
    }
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
    [
        'scalar JSON',
        messageTypeDef,
        classListTypeDef,
        studentTypeDef,
        teacherTypeDef,
        taskTypeDef,
        gradeTypeDef,
        scheduleTypeDef
    ],
    [
        classListQueries,
        taskQueries,
        scheduleQuery
    ],
    [
        classListMutations,
        studentMutations,
        teacherMutations,
        taskMutations,
        gradeMutations
    ]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: merge(
        { JSON: GraphQLJSON }, // allows scalar JSON
        resolvers
    )
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
