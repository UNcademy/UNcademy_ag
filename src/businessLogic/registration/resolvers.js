import registrationRequests from '../../restConsumption/registration/requests';

const registrationResolvers = {
    Query: {
        getRegistration: async(_, { id }) => { 
            return await registrationRequests.getRegistration(_,{id})
        
        },
    },

    Mutation: {
        createRegistration: (_, {registration}) => {
            return registrationRequests.createRegistration(_, { registration })
        },
        updateRegistration:(_,{id},{registration})=>{
            return registrationRequests.updateRegistration(_,{id},{registration})
        },
    }
}

export default registrationResolvers;