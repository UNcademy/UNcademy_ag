import gradesResolvers from '../restConsumption/grades/resolvers';
import searchResolvers from '../restConsumption/search/resolvers';

export const combinedResolvers = {
    Mutation: {
        createClassListAuto: async (_, {teacherName}) => {
            const data = await searchResolvers.Query.searchByProfessor(_,{teacherName})
            const classList = {
                teacherName: data[0].docenteTitular,
                semester: data[0].semestre,
                courseName: data[0].Materium.nombre,
                courseGroup: data[0].numeroGrupo,
                isNum: true,
                classroom: "404-401",
                schedule: "7-9",
                wDays: "Mar,Jue"
            }
            return gradesResolvers.Mutation.createClassList(_, {classList})
        }
    }
}

export const combinedMutations = `
    createClassListAuto(teacherName: String!): NewClassList!
`;