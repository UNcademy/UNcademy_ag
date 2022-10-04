import searchRequests from '../../restConsumption/search/requests';

const searchResolvers = {
    Query: {
        searchByProfessor: (_, { teacherName }) => {
            return searchRequests.searchByProfessor(_, {teacherName})
        }
    }
}

export default searchResolvers;