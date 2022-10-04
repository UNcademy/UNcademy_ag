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
    createClassList(teacherName: String!): Message
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
      teacherId: Int!
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

// TODO: Los types no pueden llevar nombres duplicados

//Campus





//Faculties





//Subjects














//Study plan







//Group

const finalGradesTypeDef = `
  type FinalGrade {
      groupId: Int!
      studentName: String!
      finalGrade: String!
      absences: Int!
      approved: Boolean!
      reason: String
  }
  input FinalGradeInput {
      groupId: Int!
      studentName: String!
      finalGrade: String!
      absences: Int!
      approved: Boolean!
      reason: String
  }`;

const finalGradesQueries = `
      finalGradeByGroup(groupId: Int!): [FinalGrade]!
      finalGradeByStudent(studentName: String!): [FinalGrade]!
      finalGradeByGroupAndStudent(groupId: Int!, studentName: String!): FinalGrade!
  `;

const finalGradesMutations = `
    createFinalGrade(finalGrade: FinalGradeInput!): FinalGrade
`;

const statsTypeDef = `
  type Stats {
      groupId: Int!
      participationPer: Int!
      approbationPer: Int!
      averageGrade: Int
      standardDev: Int
      bestGrade: Int
      worstGrade: Int
  }`;

const statsQueries = `
      statsByGroup(groupId: Int!):Stats!
`;

const url = 'localhost';
const port = '8090';

const URL = `http://${url}:${port}`;

const requests = {
    classListDetails: (_, { id }) =>
        generalRequest(`${URL}/class/${id}`, 'GET'),
    getTasks: (_, { classId, teacherId }) =>
        generalRequest(`${URL}/class/${classId}/getTasks/${teacherId}`, 'GET'),
    getSchedule: (_, { info }) =>
        generalRequest(`${URL}/schedule/teacher`, 'GET', info),
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
};

const url$1 = 'localhost';
const port$1 = '8080';
const entryPoint = 'search';

const URL$1 = `http://${url$1}:${port$1}/${entryPoint}`;

const requests$1 = {
    searchAllCampus: (_) =>
        generalRequest(`${URL$1}/sedes`, 'GET'),

    searchAllFaculties: (_) =>
        generalRequest(`${URL$1}/facultades`, 'GET'),

    searchAllSubjects: (_) =>
        generalRequest(`${URL$1}/materias`, 'GET'),

    searchSubjectByName: (_, { courseName }) =>
        generalRequest(`${URL$1}/nombre/${courseName}`, 'GET'),

    searchSubjectByCode: (_, { courseCode }) =>
        generalRequest(`${URL$1}/codigo/${courseCode}`, 'GET'),

    searchSubjectByType: (_, { courseType }) =>
        generalRequest(`${URL$1}/tipologia/${courseType}`, 'GET'),

    searchSubjectById: (_, { courseId }) =>
        generalRequest(`${URL$1}/id/${courseId}`, 'GET'),

    searchSubjectByKeyword: (_, { keyword }) =>
        generalRequest(`${URL$1}/keyword/${keyword}`, 'GET'),

    searchmateriaByPlan: (_, { Id }) =>
        generalRequest(`${URL$1}/materiaByPlan/${Id}`, 'GET'),

    groupBynumer: (_, { groupNumber }) =>
        generalRequest(`${URL$1}/groupBynumer/${groupNumber}`, 'GET'),

    searchByProfessor: (_, { teacherName }) =>
        generalRequest(`${URL$1}/groupByProfessor/${teacherName}`, 'GET'),

    groupByQuota: (_) =>
        generalRequest(`${URL$1}/groupByQuota`, 'GET'),

    groupById: (_, {groupId}) =>
        generalRequest(`${URL$1}/groupById/${groupId}`, 'GET'),

    subGrupoByGrupoId: (_, {subGroupId}) =>
        generalRequest(`${URL$1}/subGrupoByGrupoId/${subGroupId}`, 'GET')
};

const gradesResolvers = {
    Query: {
        // Ya están listas
        classListDetails: (_, { id }) => {
            return requests.classListDetails(_, {id})
        },
        getTasks: (_, { classId, teacherId }) => {
            return requests.getTasks(_, { classId, teacherId })
        },

        // TODO ¿De dónde obtengo teacherName que lleva info? (si es del jwt, ¿cómo?)
        getSchedule: (_, { info }) => {
            return requests.getSchedule(_, {info})
        },
    },
    Mutation: {

        /* TODO:
            1. ¿Para todos los profesores (cuándo)? ¿O así individual apenas se registre el usuario?
            2. Pensar cómo manejo el tema de los subgrupos (docenteEspecifico == docenteTotular
            3. ¿Cómo manejo errores?
         */
        createClassList: async (_, {teacherName}) => {
            const data = await requests$1.searchByProfessor(_,{teacherName});
            for (const res of data){
                const classList = {
                    teacherName: res.docenteTitular,
                    semester: res.semestre,
                    courseName: res.Materium.nombre,
                    courseGroup: res.numeroGrupo,
                    isNum: res.Materium.esNumerico,
                    classroom: res.subGrupos[0].salon,
                    schedule: res.subGrupos[0].hora,
                    wDays: res.subGrupos[0].dias,
                };
                await requests.createClassList(_, {classList});
            }
            return {message: "Las listas de clase de " + teacherName + " se crearon exitosamente"}
        },

        //TODO: Dado que no hay un rol de administrador, ¿deberíamos dejar que todo esto lo maneje el profesor o no?
        updateClassList: (_, { id, classList }) => {
            return requests.updateClassList(_, {id, classList})
        },
        deleteClassList: (_, { id }) => {
            return requests.deleteClassList(_, { id })
        },
        removeTeacher: (_, { id, classId }) => {
            return requests.removeTeacher(_, { id, classId })
        },
        updateStudent: (_, { id, student }) => {
            return requests.updateStudent(_, { id, student })
        },
        updateTeacher: (_, { id, classId, teacher }) => {
            return requests.updateTeacher(_, { id, classId, teacher })
        },

        //TODO: Quitar estos 2 cuando ya estén funcionando en el Business Logic de inscribir/cancelar asignaturas
        enrollStudent: (_, { student }) => {
            return requests.enrollStudent(_, { student })
        },
        removeStudent: (_, { id, classId }) => {
            return requests.removeStudent(_, { id, classId })
        },

        // TODO: Revisar de dónde obtengo el teacherName x2
        approval: (_, { classId, studentId, grade }) => {
            return requests.approval(_, { classId, studentId, grade })
        },

        //Estas ya están listas
        createTasks: (_, { classId, tasks }) => {
            return requests.createTasks(_, { classId, tasks })
        },
        updateTask: (_, { id, task }) => {
            return requests.updateTask(_, { id, task })
        },
        deleteTasks: (_, { classId }) => {
            return requests.deleteTasks(_, { classId })
        },
        addAbsences: (_, { classId, studentId, absences }) => {
            return requests.addAbsences(_, { classId, studentId, absences })
        },
        addGrade: (_, { classId, studentId, taskId, grade }) => {
            return requests.addGrade(_, { classId, studentId, taskId, grade })
        },
        editGrade: (_, { classId, studentId, taskId, grade }) => {
            return requests.editGrade(_, { classId, studentId, taskId, grade })
        },
    }
};

const url$2 = 'localhost';
const port$2 = '3000';

const URL$2 = `http://${url$2}:${port$2}`;

const request$1 = {
    finalGradesByGroup: (_, { groupId }) =>
        generalRequest(`${URL$2}/finalgrade/group/${groupId}`, 'GET'),
    finalGradesByStudent: (_, { studentName }) =>
        generalRequest(`${URL$2}/finalgrade/student/${studentName}`, 'GET'),
    finalGradesByStudentAndGroup: (_, { groupId, studentName }) =>
        generalRequest(`${URL$2}/finalgrade/student/${groupId}/${studentName}`, 'GET'),
    getStats: (_, { groupId }) =>
        generalRequest(`${URL$2}/stats/${groupId}`, 'GET'),
    createFinalGrade: (_, { finalGrade }) =>
        generalRequest(`${URL$2}/finalgrade/save`, 'POST', finalGrade),
};

const conGradesResolvers = {
    Query:{
        finalGradesByGroup: (_,{ groupId }) => {
            return request$1.finalGradesByGroup(_, {groupId})
        },
        finalGradesByStudent: (_, { studentName }) => {
            return request$1.finalGradesByStudent(_, {studentName})
        },
        finalGradesByStudentAndGroup: (_, {groupId, studentName}) => {
            return request$1.finalGradesByStudentAndGroup(_, {groupId, studentName})
        },
        getStats: (_, {groupId} ) => {
            return request$1.getStats(_, {groupId})
        }
    },
    Mutation:{
        createFinalGrade: async (_, {groupId}) => {
            const courseDetails = await requests.classListDetails(_, {groupId});

        }
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
        scheduleTypeDef,
        /*searchAllCampusTypedef,
        searchAllFacultiesTypedef,
        searchAllSubjectsTypedef,
        searchByProfessorTypeDef,
        searchmateriaByPlanTypedef,
        subGrupoByGrupoIdTypeDef,
        groupByIdTypeDef,
        groupBynumerTypeDef,
        groupByQuotaTypeDef,*/
        finalGradesTypeDef,
        statsTypeDef
    ],
    [
        classListQueries,
        taskQueries,
        scheduleQuery,
        /*searchAllCampusQueries,
        searchAllFacultiesQueries,
        searchAllSubjectsQueries,
        searchByProfessorQueries,
        searchmateriaByPlanQueries,
        subGrupoByGrupoIdQueries,
        groupByIdQueries,
        groupBynumerQueries,
        groupByQuotaQueries,
        searchSubjectByCodeQueries,
        searchSubjectByIdQueries,
        searchSubjectByKeywordQueries,
        searchSubjectByNameQueries,
        searchSubjectByTypeQueries,*/
        finalGradesQueries,
        statsQueries
    ],
    [
        classListMutations,
        studentMutations,
        teacherMutations,
        taskMutations,
        gradeMutations,
        finalGradesMutations
    ]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: merge(
        { JSON: GraphQLJSON }, // allows scalar JSON
        gradesResolvers,
        //searchResolvers,
        conGradesResolvers
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
