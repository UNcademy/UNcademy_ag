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
        createFinalGrade: async (_, { id } ) => {
            const courseDetails = await gradesRequests.classListDetails(_, {id});
            let finalGradeInput = [];
            for (const student of courseDetails.EnrolledStudents){
                for (const tasks of student.Tasks){
                    let calcGrade = null
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
                        courseGroup: courseDetails.courseGroup,
                        isNum: courseDetails.isNum,
                        studentName: student.Student.studentName,
                        absences: student.absences,
                        weight: tasks.weight,
                        grade:calcGrade
                    }
                    finalGradeInput.push(input)
                }
            }
            console.log(finalGradeInput)
            await conGradesRequests.createFinalGrade(_, {finalGradeInput})
            return {message: "Las notas definitivas y las estadísticas de "+ courseDetails.courseGroup+" han sido creadas"}
        }
    }
}

export default conGradesResolvers