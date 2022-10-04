import conGradesRequests from '../../restConsumption/conGrades/requests'
import gradesRequests from '../../restConsumption/grades/requests'

const conGradesResolvers = {
    Query:{
        finalGradesByGroup: (_,{ groupId }) => {
            return conGradesRequests.finalGradesByGroup(_, {groupId})
        },
        finalGradesByStudent: (_, { studentName }) => {
            return conGradesRequests.finalGradesByStudent(_, {studentName})
        },
        finalGradesByStudentAndGroup: (_, {groupId, studentName}) => {
            return conGradesRequests.finalGradesByStudentAndGroup(_, {groupId, studentName})
        },
        getStats: (_, {groupId} ) => {
            return conGradesRequests.getStats(_, {groupId})
        }
    },
    Mutation:{
        createFinalGrade: async (_, {groupId}) => {
            const courseDetails = await gradesRequests.classListDetails(_, {groupId})

        }
    }
}

export default conGradesResolvers