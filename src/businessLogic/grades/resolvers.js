import gradesRequests from '../../restConsumption/grades/requests';
import searchRequests from '../../restConsumption/search/requests';

const gradesResolvers = {
    Query: {
        // Ya están listas
        classListDetails: (_, { id }) => {
            return gradesRequests.classListDetails(_, {id})
        },
        getTasks: (_, { classId, teacherId }) => {
            return gradesRequests.getTasks(_, { classId, teacherId })
        },

        // TODO ¿De dónde obtengo teacherName que lleva info? (si es del jwt, ¿cómo?)
        getSchedule: (_, { info }) => {
            return gradesRequests.getSchedule(_, {info})
        },
    },
    Mutation: {

        /* TODO:
            1. ¿Para todos los profesores (cuándo)? ¿O así individual apenas se registre el usuario?
            2. Pensar cómo manejo el tema de los subgrupos (docenteEspecifico == docenteTotular
            3. ¿Cómo manejo errores?
         */
        createClassList: async (_, {teacherName}) => {
            const data = await searchRequests.searchByProfessor(_,{teacherName})
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
                }
                await gradesRequests.createClassList(_, {classList})
            }
            return {message: "Las listas de clase de " + teacherName + " se crearon exitosamente"}
        },

        //TODO: Dado que no hay un rol de administrador, ¿deberíamos dejar que todo esto lo maneje el profesor o no?
        updateClassList: (_, { id, classList }) => {
            return gradesRequests.updateClassList(_, {id, classList})
        },
        deleteClassList: (_, { id }) => {
            return gradesRequests.deleteClassList(_, { id })
        },
        removeTeacher: (_, { id, classId }) => {
            return gradesRequests.removeTeacher(_, { id, classId })
        },
        updateStudent: (_, { id, student }) => {
            return gradesRequests.updateStudent(_, { id, student })
        },
        updateTeacher: (_, { id, classId, teacher }) => {
            return gradesRequests.updateTeacher(_, { id, classId, teacher })
        },

        //TODO: Quitar estos 2 cuando ya estén funcionando en el Business Logic de inscribir/cancelar asignaturas
        enrollStudent: (_, { student }) => {
            return gradesRequests.enrollStudent(_, { student })
        },
        removeStudent: (_, { id, classId }) => {
            return gradesRequests.removeStudent(_, { id, classId })
        },

        // TODO: Revisar de dónde obtengo el teacherName x2
        approval: (_, { classId, studentId, grade }) => {
            return gradesRequests.approval(_, { classId, studentId, grade })
        },

        //Estas ya están listas
        createTasks: (_, { classId, tasks }) => {
            return gradesRequests.createTasks(_, { classId, tasks })
        },
        updateTask: (_, { id, task }) => {
            return gradesRequests.updateTask(_, { id, task })
        },
        deleteTasks: (_, { classId }) => {
            return gradesRequests.deleteTasks(_, { classId })
        },
        addAbsences: (_, { classId, studentId, absences }) => {
            return gradesRequests.addAbsences(_, { classId, studentId, absences })
        },
        addGrade: (_, { classId, studentId, taskId, grade }) => {
            return gradesRequests.addGrade(_, { classId, studentId, taskId, grade })
        },
        editGrade: (_, { classId, studentId, taskId, grade }) => {
            return gradesRequests.editGrade(_, { classId, studentId, taskId, grade })
        },
    }
}

export default gradesResolvers;