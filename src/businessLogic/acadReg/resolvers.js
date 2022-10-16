import academicRequests from '../../restConsumption/acadReg/requests'

const academicResolvers = {
    Query: {
        getAcademic:(_,{id})=>{
            return academicRequests.getAcademic(_,{id})
        },
        getAllAcademic:(_)=>{
            return academicRequests.getAllAcademic(_)
        },

        getMaterias:(_,{id})=>{
            return academicRequests.getMaterias(_,{id})
        },
        getPrograma:(_,{id})=>{
            return academicRequests.getPrograma(_,{id})
        }

    },

    Mutation: {
        createAcademic:(_, {academic})=>{
            return academicRequests.createAcademic(_,{academic})

        },

    }

}

export default academicResolvers;