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
        finalGradesByGroupAndStudent: (_, {groupId, studentName}) => {
            return conGradesRequests.finalGradesByGroupAndStudent(_, {groupId, studentName})
        },
        statsByGroup: (_, {groupId} ) => {
            return conGradesRequests.statsByGroup(_, {groupId})
        }
    },
    Mutation:{
        createFinalGrade: async (_, {groupId}) => {
            const courseDetails = await gradesRequests.classListDetails(_, {groupId});
            let finalGradeInput = [];
            const classList = courseDetails.classListDetails;
            for (const student of classList.EnrolledStudents){
                for (const tasks of student.tasks){
                    let calcGrade = null
                    if (classList.isNum){
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
                        courseGroup: classList.courseGroup,
                        isNum: classList.isNum,
                        studentName: student.studentName,
                        absences: student.absences,
                        weight: tasks.weight,
                        grade:calcGrade
                    }
                    finalGradeInput.push(input)
                }
            }
            await conGradesRequests.createFinalGrade(_, finalGradeInput)
            return {message: "Las notas definitivas y las estadísticas de "+classList.courseGroup+" han sido creadas"}
        }
    }
}

export default conGradesResolvers