import conGradesRequests from '../../restConsumption/conGrades/requests'
import gradesRequests from '../../restConsumption/grades/requests'
import searchRequests from "../../restConsumption/search/requests";

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
        },
        generateAct: async (_, {groupId}) => {
            let gradesList = await conGradesRequests.finalGradesByGroup(_, {groupId});
            for (let grade of gradesList) {
                if (!isNaN(+grade.finalGrade)) {
                    grade.finalGrade = parseInt(grade.finalGrade, 10);
                }
                if (grade.approved) {
                    grade.approved = "Aprobada";
                } else if (!grade.approved) {
                    grade.approved = "Reprobada";
                }
            }
            const groupDetails = searchRequests.groupBynumer(_, {groupId});
            const courseName = groupDetails.Materium.nombre;
            const teacherName = groupDetails.docenteTitular;
            const date = new Date;
            const currentDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            const actInput = {
                courseName,
                teacherName,
                currentDate,
                gradesList
            }
            await conGradesRequests.generateAct(_,{actInput});
            return {message: "El acta del curso " + gradesList[1].groupId + " grupo " + gradesList[1].groupId + " ha sido creada"}
        },
        getAct: async (_,{actId}) => {
            return {message: conGradesRequests.getAct(_,{actId})};
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
};

export default conGradesResolvers