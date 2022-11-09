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
async function generalRequest(url, method, body, headers, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse,
		headers
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
      isNum: Boolean!
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
  input AddTeacher {
      teacherName: String!
      classroom: String!
      schedule: String!
      wDays: String!
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
    addTeacher(classId: Int!, teacher: AddTeacher!): Message
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

//Campus
const searchAllCampusTypedef = `
    type Campus {
        id: Int!
        nombre: String!
    }
`;

const searchAllCampusQueries = `
    searchAllCampus: [Campus]
`;


//Faculties
const searchAllFacultiesTypedef = `
    type Faculties {
        id: Int!
        nombre: String!
    }
`;

const searchAllFacultiesQueries = `
    searchAllFaculties: [Faculties]
`;


//Subjects
const searchAllSubjectsTypedef = `
    type PlanEstudios {
        id: Int!
        nombre: String!
        creditosDisOpt: Int!
        creditosDisObl: Int!
        creditosFunOpt: Int!
        creditosFunObl: Int!
        creditosLibElc: Int!
        creditosTraGrado: Int!
    }
    type Courses {
        id: Int!
        nombre: String!
        codigoMateria: String!
        creditos: Int!
        cupos: Int!
        tipologia: String!
        descripcion: String!
        prerequisitos: String!
        PlanEstudios: [PlanEstudios!]!
    }
`;

const searchAllSubjectsQueries = `
      searchAllSubjects: [Courses]
`;

const searchSubjectByNameQueries = `
      searchSubjectByName(courseName: String!): [Courses]
`;

const searchSubjectByCodeQueries = `
      searchSubjectByCode(courseCode: String!): [Courses]
`;

const searchSubjectByTypeQueries = `
      searchSubjectByType(courseType: String!): [Courses]
`;

const searchSubjectByIdQueries = `
      searchSubjectById(courseId: Int!): [Courses]
`;

const searchSubjectByKeywordQueries = `
      searchSubjectByKeyword(keyword: String!): [Courses]
`;

//Study plan

const searchmateriaByPlanTypedef = `
    type CoursesByPlan {
        id: Int!
        nombre: String!
        codigoMateria: String!
        creditos: Int!
        cupos: Int!
        tipologia: String!
        descripcion: String!
        prerequisitos: String!
    }
    type PlanEstudiosByType {
        nombre: String!
        FacultadId: Int!
        NivelEstudioId: Int!
        Materia: [CoursesByPlan!]!
    }
`;


const searchmateriaByPlanQueries = `
        searchmateriaByPlan(Id: Int!): [PlanEstudiosByType]
`;


//Group

const groupBynumerTypeDef = `
  type CourseBynumer {
      id: Int!
      nombre: String!
      codigoMateria: String!
      creditos: Int!
      cupos: Int!
      tipologia: String!
      descripcion: String!
      prerequisitos: String!
  }
  type Group {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
      Materium: CourseBynumer!
  }
`;

const groupBynumerQueries = `
    groupBynumer(groupNumber: Int!): [Group]
  `;

const searchByProfessorTypeDef = `
  type Subgroup {
      id: Int!
      identificadorSubGrupo: Int!
      docenteEspecifico: String!
      salon: String!
      hora: String!
      dias: String!
      GrupoId: Int!
  } 
  type CourseByProfessor {
      id: Int!
      nombre: String!
      codigoMateria: String!
      creditos: Int!
      cupos: Int!
      tipologia: String!
      descripcion: String!
      prerequisitos: String!
      esNumerico: Boolean!
  }
  type GroupByProfessor {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
      Materium: CourseByProfessor!
      subGrupos: [Subgroup!]!
  }
`;

const searchByProfessorQueries = `
      searchByProfessor(teacherName: String!): [GroupByProfessor]
  `;

const groupByQuotaTypeDef = `
  type GroupByQuota {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
      Materium: Course!
  }
`;

const groupByQuotaQueries = `
    groupByQuota: [GroupByQuota]
  `;


const groupByIdTypeDef = `
  type Course {
      id: Int!
      nombre: String!
      codigoMateria: String!
      creditos: Int!
      cupos: Int!
      tipologia: String!
      descripcion: String!
      prerequisitos: String!
  }
  type GroupById {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
      Materium: Course!
  }
`;

const groupByIdQueries = `
    groupById(groupId: Int!): [GroupById]
  `;

const subGrupoByGrupoIdTypeDef = `
  type GroupByGrupoId {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
  }
  type SubgroupByGrupoId {
    id: Int!
    identificadorSubGrupo: Int!
    docenteEspecifico: String!
    salon: String!
    hora: String!
    dias: String!
    GrupoId: Int!
    Grupo: GroupByGrupoId
} 
`;

const subGrupoByGrupoIdQueries = `
    subGrupoByGrupoId(subGroupId: Int!): [SubgroupByGrupoId]
  `;

const finalGradesTypeDef = `
  type FinalGrade {
      group_id: Int!
      student_name: String!
      final_grade: String!
      absences: Int!
      approved: Boolean!
      reason: String
  }
  input FinalGradeInput {
      groupId: Int!
      isNum: Boolean!
      absences: Int!
      studentName: String!
      grade: String!
      weight: Int!
  }`;

const finalGradesQueries = `
      finalGradesByGroup(groupId: Int!): [FinalGrade]!
      finalGradesByStudent(studentName: String!): [FinalGrade]!
      finalGradesByGroupAndStudent(groupId: Int!, studentName: String!): [FinalGrade]!
  `;

const finalGradesMutations = `
    createFinalGrade(id: Int!): Message
`;

const statsTypeDef = `
  type Stats {
      group_id: Int!
      participation_percentage: Float!
      approbation_percentage: Float!
      average_grade: Float
      standard_deviation: Float
      best_grade: Float
      worst_grade: Float
  }`;

const statsQueries = `
      statsByGroup(groupId: Int!):[Stats]!
`;

const actTypeDef = `
  type Act {
      courseName: String!
      teacherName: String!
      currentDate: String!
      gradesList: [FinalGrade]!
  }`;

const actQueries = `
      getAct(actId: Int!): Message
      generateAct(groupId: Int!, teacherName: String!): Message
`;

const registrationTypesDef=`
    type Registration{
        idStudent:String!
        idProgram:String!
        subjects:[subject]
    }
    type Registration2{
        idStudent:String!
        idProgram:String!
        subjects:[subject]
    }
    input registrationInput{
        idStudent:String!
        idProgram:String!
        subjects:[subjectInput]
    }

    type subject{
        idSubject:String
        nameSubject:String
        cupSubject:Int
        days:String
        time:Int
        requirements:[String]
    }
    input subjectInput{
        idSubject:String
        nameSubject:String
        cupSubject:Int
        days:String
        time:Int
        requirements:[String]
    }

    type appointment{
        id: String!
        idStudent:String!
        idProgram:String
        date:String
        dateEnd:String
    }
    input appointmentInput{
        id: String!
        idStudent:String!
        idProgram:String
        date:String
        dateEnd:String
    }

`;
const registrationQueries=`
    getRegistration(id:String!):Registration!
    getAppointment(id:String!):appointment!
    getSubjects(id:String!):subject!
    getAllSubjects:[subject]!
`;

const registrationMutations=`
    createRegistration(reg:registrationInput):Registration
    updateRegistration(id:String, reg:registrationInput!):Registration!
    createAppointment(appoint:appointmentInput):String!
`;

const acadRegTypesDef=`
    type academic{
        userId: String
        semestre: String
        creditosInscritos: Int
        creditosAprobados: Int
        creditosPendientes: Int
        creditosCursados: Int
        creditosCancelados: Int
        papa: Float
        pa: Float
        pappi: Float
        avance: String
        materias:[materia]
        programa: programa       
    }

    input academicInput{
        userId:String
        semestre:String
        creditosInscritos:Int
        creditosAprobados:Int
        creditosPendientes:Int
        creditosCursados:Int
        creditosCancelados:Int
        papa:Float
        pa:Float
        pappi:Float
        avance:String
        materias:[materiaInput]
        programa: programaInput
    }

    type materia{
        materiaId:String
        tipologia:String
        nombre:String
        nota:Float
        aprobado:Boolean
        creditos:Int
    }

    input materiaInput{
        materiaId: String
        tipologia: String
        nombre: String
        nota: Float
        aprobado: Boolean
        creditos: Int
    }

    type programa{
        programaId:String
        creditosDisciplinarOpt:Int
        creditosDisciplinarOb:Int
        creditosFundamentacionOpt:Int
        creditosFundamentacionOb:Int
        creditosLibreEleccion:Int
        creditosTrabajoDeGrado: Int
    }
    input programaInput{
        programaId:String
        creditosDisciplinarOpt:Int
        creditosDisciplinarOb:Int
        creditosFundamentacionOpt:Int
        creditosFundamentacionOb:Int
        creditosLibreEleccion:Int
        creditosTrabajoDeGrado: Int
    }
`;

const academicQueries=`
    getAcademic(id:String):[academic]
    getAllAcademic:[academic]
    getMaterias(id:String):[materia]
    getPrograma:[programa]

`;
const academicMutations=`
createAcademic(acad:academicInput):[academic]
`;

const loginTypeDef = `
    input Login {
        username: String!
        password: String!
    }
`;

const registerTypeDef = `
    input Register {
        user_name: String!
        user_type:  String!
        password: String!
        full_name: String!
        document: Int!
        dep_document: String!
        city_document: String!
        program: String!
        genre: String!
        email: String!
        un_mail: String!
        birth_place: String!
        cel: Int!
        age: Int!
        country: String!
        blood_type: String!
        address: String!
        army_card: Boolean!
    }
    type AccountResult {
        statusCode: Int
        method: String
        message: String
        data: Data
    }
    type Data {
        accessToken: String
    }
`;

const accountQueries = `
      login(loginBody: Login!): AccountResult
      validate(token: String!): AccountResult
  `;

const accountMutations = `
      register(registerBody: Register!): AccountResult
  `;

const viewProfileTypeDef = `
    type ProfileView {
        UserName: String!
	    UserType: String! 
	    Password: String!
	    FullName: String!
	    Document: Int!
	    Email: String!
	    Active: Boolean!
	    DepDocument: String!   
	    CityDocument: String! 
	    Genre: String!
	    UNMail: String!
	    Cel: Float!    
	    Tel: Float!    
	    Age: Int!    
	    BirthPlace: String! 
	    Country: String! 
	    BloodType: String! 
	    Address: String! 
	    ArmyCard: Boolean!   
	    MotherFullName: String! 
	    MotherDocument: Int!    
	    FatherFullName: String! 
	    FatherDocument: Int!
    }
`;

const updateProfileTypeDef = `
    input InputProfile {
        Email: String!
        Cel: Float!    
        Tel: Float!     
        Address: String!
    }
    type ProfileResult {
        statusCode: Int
        method: String
        message: String
        data: ProfileView
    }
`;

const profileQueries = `
      viewProfile(username: String!): ProfileResult
  `;

const profileMutations = `
      updateProfile(username: String!, profile: InputProfile!): ProfileResult
  `;

const url = '172.17.0.1';
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

    addTeacher: (_, { classId, teacher }) =>
        generalRequest(`${URL}/class/addTeacher/${classId}`, 'POST', teacher),

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

const url$1 = '172.17.0.1';
const port$1 = '8002';
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
        generalRequest(`${URL$1}/subGrupoByGrupoId/${subGroupId}`, 'GET'),

    updateGroup: (_, {id, group}) =>
        generalRequest(`${URL$1}/updateGroup/${id}`, 'PUT', group)
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

        // Duda: ¿Debo obtener teacherName del jwt?
        getSchedule: (_, { info }) => {
            return requests.getSchedule(_, {info})
        },
    },
    Mutation: {

        // TODO: Esto debe hacerse cuando se registra un profesor. Mover este código a esos resolvers
        createClassList: async (_, {teacherName}) => {
            const data = await requests$1.searchByProfessor(_,{teacherName});
            for (const res of data){
                let wDaysArr = res.subGrupos[0].dias.split(" y ");
                let wDaysStr = "";
                for (const wDay of wDaysArr.slice(0,-1)){
                    if (wDay.substring(0,3) === "Mié"){
                        wDaysStr += "Mie";
                    } else {
                        wDaysStr += wDay.substring(0, 3) + ",";
                    }
                }
                if (wDaysArr[wDaysArr.length-1].substring(0,3) === "Mié"){
                    wDaysStr += "Mie";
                } else {
                    wDaysStr += wDaysArr[wDaysArr.length-1].substring(0, 3);
                }
                const classList = {
                    teacherName: res.docenteTitular,
                    semester: res.semestre,
                    courseName: res.Materium.nombre,
                    courseGroup: res.numeroGrupo,
                    isNum: res.Materium.esNumerico,
                    classroom: res.subGrupos[0].salon,
                    schedule: res.subGrupos[0].hora,
                    wDays: wDaysStr
                };
                await requests.createClassList(_, {classList});
            }
            return {message: "Las listas de clase de " + teacherName + " se crearon exitosamente"}
        },

        // Duda: ¿Quién tiene acceso a estas funciones?
        updateClassList: (_, { id, classList }) => {
            return requests.updateClassList(_, {id, classList})
        },
        deleteClassList: (_, { id }) => {
            return requests.deleteClassList(_, { id })
        },
        addTeacher: (_, { classId, teacher }) => {
            return requests.addTeacher(_, { classId, teacher })
        },
        updateTeacher: (_, { id, classId, teacher }) => {
            return requests.updateTeacher(_, { id, classId, teacher })
        },
        removeTeacher: (_, { id, classId }) => {
            return requests.removeTeacher(_, { id, classId })
        },
        updateStudent: (_, { id, student }) => {
            return requests.updateStudent(_, { id, student })
        },

        //TODO: Quitar estos 2 cuando ya estén funcionando en el Business Logic de inscribir/cancelar asignaturas
        enrollStudent: (_, { student }) => {
            return requests.enrollStudent(_, { student })
        },
        removeStudent: (_, { id, classId }) => {
            return requests.removeStudent(_, { id, classId })
        },

        // Duda: ¿Debo obtener teacherName del jwt?
        approval: (_, { classId, studentId, grade }) => {
            return requests.approval(_, { classId, studentId, grade })
        },

        // Estas ya están listas
        createTasks: (_, { classId, tasks }) => {
            return requests.createTasks(_, { classId, tasks })
        },
        updateTask: (_, { id, task }) => {
            return requests.updateTask(_, { id, task })
        },
        deleteTasks: (_, { classId }) => {
            return requests.deleteTasks(_, { classId })
        },
        addGrade: (_, { classId, studentId, taskId, grade }) => {
            return requests.addGrade(_, { classId, studentId, taskId, grade })
        },
        editGrade: (_, { classId, studentId, taskId, grade }) => {
            return requests.editGrade(_, { classId, studentId, taskId, grade })
        },
        addAbsences: (_, { classId, studentId, absences }) => {
            return requests.addAbsences(_, { classId, studentId, absences })
        },
    }
};

const searchResolvers = {
    Query: {
        searchAllCampus: (_) => {
            return requests$1.searchAllCampus(_)
        },
        searchAllFaculties: (_) => {
            return requests$1.searchAllFaculties(_)
        },
        searchAllSubjects: (_) => {
            return requests$1.searchAllSubjects(_)
        },
        searchSubjectByName: (_, { courseName }) => {
            return requests$1.searchSubjectByName(_, { courseName })
        },
        searchSubjectByType: (_, { courseType }) => {
            return requests$1.searchSubjectByType(_, { courseType })
        },
        searchSubjectByCode: (_, { courseCode }) => {
            return requests$1.searchSubjectByCode(_, { courseCode })
        },
        searchSubjectById: (_, { courseId }) => {
            return requests$1.searchSubjectById(_, { courseId })
        },
        searchSubjectByKeyword: (_, { keyword }) => {
            return requests$1.searchSubjectByKeyword(_, { keyword })
        },
        searchmateriaByPlan: (_, { Id }) => {
            return requests$1.searchmateriaByPlan(_, { Id })
        },
        groupBynumer: (_, { groupNumber }) => {
            return requests$1.groupBynumer(_, { groupNumber })
        },
        searchByProfessor: (_, { teacherName }) => {
            return requests$1.searchByProfessor(_, {teacherName})
        },
        groupByQuota: (_) => {
            return requests$1.groupByQuota(_)
        },
        groupById: (_, { groupId }) => {
            return requests$1.groupById(_, { groupId })
        },
        subGrupoByGrupoId: (_, { subGroupId }) => {
            return requests$1.subGrupoByGrupoId(_, { subGroupId })
        },
    }
};

const url$2 = '172.17.0.1';
const port$2 = '8080';

const URL$2 = `http://${url$2}:${port$2}`;

const requests$2 = {
    getRegistration:(_,{id})=>
        generalRequest(`${URL$2}/Registration/${id}`, 'GET')  ,

    getSubjects:(_,{id})=>
    generalRequest(`${URL$2}/Subject/${id}`, 'GET'),

    getAllSubjects:()=>
    generalRequest(`${URL$2}/Subjects`, 'GET'),

    createRegistration: (_, { registration }) =>
        generalRequest(`${URL$2}/CreateRegistration`, 'POST', registration),

    updateRegistration:(_,{id},{registration})=>
        generalRequest(`${URL$2}/UpdateRegistration/${id}`, 'POST', registration),

    getAppointment:(_,{id})=>
        generalRequest(`${URL$2}/Appointment/${id}`, 'GET'),

    createAppointment:(_, { appointment }) =>
        generalRequest(`${URL$2}/CreateAppointment`, 'POST', appointment)
        

};

const registrationResolvers = {
    Query: {
        getRegistration: async(_, { id }) => { 
            return await requests$2.getRegistration(_,{id})
        
        },
        getAppointment:(_, { id }) => {
            return  requests$2.getAppointment(_,{id})
        },
        getSubjects:(_, { id }) => {
            return  requests$2.getSubjects(_,{id})
        },
        getAllSubjects:(_)=>{
            return requests$2.getAllSubjects(_)
        }

    },

    Mutation: {
        createRegistration: (_, {registration}) => {
            return requests$2.createRegistration(_, { registration })
        },
        updateRegistration:(_,{id},{registration})=>{
            return requests$2.updateRegistration(_,{id},{registration})
        },
        createAppointment: (_, {appointment}) => {
            return requests$2.createAppointment(_, { appointment })
        },
    }
};

const url$3 = '172.17.0.1';
const port$3 = '3000';

const URL$3 = `http://${url$3}:${port$3}`;

const request$1 = {
    finalGradesByGroup: (_, { groupId }) =>
        generalRequest(`${URL$3}/finalgrade/group/${groupId}`, 'GET'),
    finalGradesByStudent: (_, { studentName }) =>
        generalRequest(`${URL$3}/finalgrade/student/${studentName}`, 'GET'),
    finalGradesByGroupAndStudent: (_, { groupId, studentName }) =>
        generalRequest(`${URL$3}/finalgrade/student/${groupId}/${studentName}`, 'GET'),
    statsByGroup: (_, { groupId }) =>
        generalRequest(`${URL$3}/stats/${groupId}`, 'GET'),
    createFinalGrade: (_, { finalGradeInput }) =>
        generalRequest(`${URL$3}/finalgrade/save`, 'POST', finalGradeInput),
    generateAct: (_, {actInput}) =>
        generalRequest(`${URL$3}/act`,'POST', actInput),
    getAct: (_,{actId}) =>
        generalRequest(`${URL$3}/act/${actId}`, 'GET')
};

const conGradesResolvers = {
    Query:{
        finalGradesByGroup: (_,{ groupId }) => {
            return request$1.finalGradesByGroup(_, {groupId})
        },
        finalGradesByStudent: (_, { studentName }) => {
            return request$1.finalGradesByStudent(_, {studentName})
        },
        finalGradesByGroupAndStudent: (_, {groupId, studentName}) => {
            return request$1.finalGradesByGroupAndStudent(_, {groupId, studentName})
        },
        statsByGroup: (_, {groupId} ) => {
            return request$1.statsByGroup(_, {groupId})
        },
        generateAct: async (_, {groupId, teacherName}) => {
            let gradesList = await request$1.finalGradesByGroup(_, {groupId});
            for (let grade of gradesList) {
                if (!isNaN(+grade.final_grade)) {
                    grade.final_grade = parseInt(grade.final_grade, 10);
                }
                if (grade.approved) {
                    grade.approved = "Aprobada";
                } else if (!grade.approved) {
                    grade.approved = "Reprobada";
                }
            }
            const groupDetails = await requests.classListDetails(_, {id:groupId});
            const courseName = groupDetails.courseName;
            const date = new Date;
            const currentDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            const actInput = {
                courseName,
                teacherName,
                currentDate,
                gradesList
            };
            await request$1.generateAct(_,{actInput});
            return {message: "El acta del curso " + gradesList[0].group_id + " grupo " + gradesList[0].group_id + " ha sido creada"}
        },
        getAct: async (_,{actId}) => {
            return {message: request$1.getAct(_,{actId})};
        }
    },
    Mutation:{
        createFinalGrade: async (_, { id } ) => {
            const courseDetails = await requests.classListDetails(_, {id});
            let finalGradeInput = [];
            for (const student of courseDetails.EnrolledStudents){
                for (const tasks of student.Tasks){
                    let calcGrade = null;
                    if (courseDetails.isNum !== null){
                        calcGrade = tasks.Grade.value;
                        calcGrade = calcGrade.toString();
                    }
                    else{
                        if (student.isApproved){
                            calcGrade = "Aprobada";
                        }
                        else{
                            calcGrade = "Reprobada";
                        }
                    }
                    const input = {
                        courseGroup: id,
                        isNum: courseDetails.isNum,
                        studentName: student.Student.studentName,
                        absences: student.absences,
                        weight: tasks.weight,
                        grade:calcGrade
                    };
                    finalGradeInput.push(input);
                }
            }
            console.log(finalGradeInput);
            await request$1.createFinalGrade(_, {finalGradeInput});
            return {message: "Las notas definitivas y las estadísticas de "+ id +" han sido creadas"}
        }
    }
};

const url$4 = '172.17.0.1';
const port$4 = '8001';
const entryPoint$2 = 'api/v1';

const URL$4 = `http://${url$4}:${port$4}/${entryPoint$2}`;

const requests$3 = {
    login: (_, { loginBody }) =>
        generalRequest(`${URL$4}/login`, 'POST', loginBody),
    register: (_, { registerBody }) =>
        generalRequest(`${URL$4}/register`, 'POST', registerBody),
    validate: (_, { token }) => {
        const headers = {
            Authorization: "Bearer" + token
        };
        generalRequest(`${URL$4}/validate`, 'GET', _, headers);
    }
};

const accountResolvers = {
    Query: {
        login: (_, { loginBody }) => {
            console.log(loginBody);
            return requests$3.login(_, { loginBody })
        },
        validate: (_, { token }) => {
            return requests$3.validate(_, {token})
        }
    },
    Mutation: {
        register: (_, { registerBody }) => {
            return requests$3.register(_, { registerBody })
        }
    }
};

const url$5 = '172.17.0.1';
const port$5 = '8000';
const entryPoint$3 = 'api/v1';

const URL$5 = `http://${url$5}:${port$5}/${entryPoint$3}`;

const requests$4 = {
    viewProfile: (_, { username }) =>
        generalRequest(`${URL$5}/view?username=${username}`, 'GET'),
    updateProfile: (_, { username, profile }) =>
        generalRequest(`${URL$5}/edit?username=${username}`, 'PUT', profile),
};

const profileResolvers = {
    Query: {
        viewProfile: (_, { username }) => {
            return requests$4.viewProfile(_, { username })
        },
    },
    Mutation: {
        updateProfile: (_, { username, profile }) => {
            return requests$4.updateProfile(_, { username, profile })
        }
    }
};

const url$6 = '172.17.0.1';
const port$6 = '3333';
const entryPoint$4 = 'academic-record';

const URL$6 = `http://${url$6}:${port$6}`;

const requests$5 = {
    getAcademic:(_,{id})=>
        generalRequest(`${URL$6}/${entryPoint$4}/${id}`, 'GET')  ,

    getAllAcademic:(_)=>
        generalRequest(`${URL$6}/${entryPoint$4}`, 'GET'), 
    
    getMaterias:(_,{id})=>
        generalRequest(`${URL$6}/${entryPoint$4}/materias/${id}`, 'GET')  ,
    
    getPrograma:(_)=>
        generalRequest(`${URL$6}/${entryPoint$4}/student-program/${id}`, 'GET'),

    createAcademic:(_,{academic})=>
        generalRequest(`${URL$6}/${entryPoint$4}`, 'POST', academic),
    

};

const academicResolvers = {
    Query: {
        getAcademic:(_,{id})=>{
            return requests$5.getAcademic(_,{id})
        },
        getAllAcademic:(_)=>{
            return requests$5.getAllAcademic(_)
        },

        getMaterias:(_,{id})=>{
            return requests$5.getMaterias(_,{id})
        },
        getPrograma:(_,{id})=>{
            return requests$5.getPrograma(_,{id})
        }

    },

    Mutation: {
        createAcademic:(_, {academic})=>{
            return requests$5.createAcademic(_,{academic})

        },

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
        searchAllCampusTypedef,
        searchAllFacultiesTypedef,
        searchAllSubjectsTypedef,
        searchByProfessorTypeDef,
        searchmateriaByPlanTypedef,
        subGrupoByGrupoIdTypeDef,
        groupByIdTypeDef,
        groupBynumerTypeDef,
        groupByQuotaTypeDef,
        registrationTypesDef,
        acadRegTypesDef,
        finalGradesTypeDef,
        statsTypeDef,
        loginTypeDef,
        registerTypeDef,
        viewProfileTypeDef, 
        updateProfileTypeDef,
        actTypeDef
    ],
    [
        classListQueries,
        taskQueries,
        scheduleQuery,
        searchAllCampusQueries,
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
        searchSubjectByTypeQueries,
        finalGradesQueries,
        statsQueries,
        registrationQueries,
        accountQueries,
        profileQueries,
        actQueries,
        academicQueries
    ],
    [
        classListMutations,
        studentMutations,
        teacherMutations,
        taskMutations,
        gradeMutations,
        registrationMutations,
        finalGradesMutations,
        accountMutations,
        profileMutations,
        academicMutations
    ]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: merge(
        { JSON: GraphQLJSON }, // allows scalar JSON
        gradesResolvers,
        searchResolvers,
        conGradesResolvers,
        registrationResolvers,
        accountResolvers,
        profileResolvers,
        academicResolvers
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
