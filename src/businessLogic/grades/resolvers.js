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

        // Duda: ¿Debo obtener teacherName del jwt?
        getSchedule: (_, { info }) => {
            return gradesRequests.getSchedule(_, {info})
        },
    },
    Mutation: {

        // TODO: Esto debe hacerse cuando se registra un profesor. Mover este código a esos resolvers
        createClassList: async (_, {teacherName}) => {
            const data = await searchRequests.searchByProfessor(_,{teacherName})
            for (const res of data){
                let wDaysArr = res.subGrupos[0].dias.split(" y ")
                let wDaysStr = ""
                for (const wDay of wDaysArr.slice(0,-1)){
                    if (wDay.substring(0,3) === "Mié"){
                        wDaysStr += "Mie"
                    } else {
                        wDaysStr += wDay.substring(0, 3) + ","
                    }
                }
                if (wDaysArr[wDaysArr.length-1].substring(0,3) === "Mié"){
                    wDaysStr += "Mie"
                } else {
                    wDaysStr += wDaysArr[wDaysArr.length-1].substring(0, 3)
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
                }
                await gradesRequests.createClassList(_, {classList})
            }
            return {message: "Las listas de clase de " + teacherName + " se crearon exitosamente"}
        },

        // Duda: ¿Quién tiene acceso a estas funciones?
        updateClassList: (_, { id, classList }) => {
            return gradesRequests.updateClassList(_, {id, classList})
        },
        deleteClassList: (_, { id }) => {
            return gradesRequests.deleteClassList(_, { id })
        },
        addTeacher: (_, { classId, teacher }) => {
            return gradesRequests.addTeacher(_, { classId, teacher })
        },
        updateTeacher: (_, { id, classId, teacher }) => {
            return gradesRequests.updateTeacher(_, { id, classId, teacher })
        },
        removeTeacher: (_, { id, classId }) => {
            return gradesRequests.removeTeacher(_, { id, classId })
        },
        updateStudent: (_, { id, student }) => {
            return gradesRequests.updateStudent(_, { id, student })
        },

        //TODO: Quitar estos 2 cuando ya estén funcionando en el Business Logic de inscribir/cancelar asignaturas
        enrollStudent: (_, { student }) => {
            return gradesRequests.enrollStudent(_, { student })
        },
        removeStudent: (_, { id, classId }) => {
            return gradesRequests.removeStudent(_, { id, classId })
        },

        // Duda: ¿Debo obtener teacherName del jwt?
        approval: (_, { classId, studentId, grade }) => {
            return gradesRequests.approval(_, { classId, studentId, grade })
        },

        // Estas ya están listas
        createTasks: (_, { classId, tasks }) => {
            return gradesRequests.createTasks(_, { classId, tasks })
        },
        updateTask: (_, { id, task }) => {
            return gradesRequests.updateTask(_, { id, task })
        },
        deleteTasks: (_, { classId }) => {
            return gradesRequests.deleteTasks(_, { classId })
        },
        addGrade: (_, { classId, studentId, taskId, grade }) => {
            return gradesRequests.addGrade(_, { classId, studentId, taskId, grade })
        },
        editGrade: (_, { classId, studentId, taskId, grade }) => {
            return gradesRequests.editGrade(_, { classId, studentId, taskId, grade })
        },
        addAbsences: (_, { classId, studentId, absences }) => {
            return gradesRequests.addAbsences(_, { classId, studentId, absences })
        },
    }
}

export default gradesResolvers;