import searchRequests from '../../restConsumption/search/requests';

const searchResolvers = {
    Query: {
        searchAllCampus: (_) => {
            return searchRequests.searchAllCampus(_)
        },
        searchAllFaculties: (_) => {
            return searchRequests.searchAllFaculties(_)
        },
        searchAllSubjects: (_) => {
            return searchRequests.searchAllSubjects(_)
        },
        searchSubjectByName: (_, { courseName }) => {
            return searchRequests.searchSubjectByName(_, { courseName })
        },
        searchSubjectByType: (_, { courseType }) => {
            return searchRequests.searchSubjectByType(_, { courseType })
        },
        searchSubjectByCode: (_, { courseCode }) => {
            return searchRequests.searchSubjectByCode(_, { courseCode })
        },
        searchSubjectById: (_, { courseId }) => {
            return searchRequests.searchSubjectById(_, { courseId })
        },
        searchSubjectByKeyword: (_, { keyword }) => {
            return searchRequests.searchSubjectByKeyword(_, { keyword })
        },
        searchmateriaByPlan: (_, { Id }) => {
            return searchRequests.searchmateriaByPlan(_, { Id })
        },
        groupBynumer: (_, { groupNumber }) => {
            return searchRequests.groupBynumer(_, { groupNumber })
        },
        searchByProfessor: (_, { teacherName }) => {
            return searchRequests.searchByProfessor(_, {teacherName})
        },
        groupByQuota: (_) => {
            return searchRequests.groupByQuota(_)
        },
        groupById: (_, { groupId }) => {
            return searchRequests.groupById(_, { groupId })
        },
        subGrupoByGrupoId: (_, { subGroupId }) => {
            return searchRequests.subGrupoByGrupoId(_, { subGroupId })
        },
    }
}

export default searchResolvers;