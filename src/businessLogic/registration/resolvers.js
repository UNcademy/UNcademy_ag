import registrationRequests from '../../restConsumption/registration/requests';

const registrationResolvers = {
    Query: {
        getRegistration: async(_, { id }) => { 
            return await registrationRequests.getRegistration(_,{id})
        
        },
        getAppointment:(_, { id }) => {
            return  registrationRequests.getAppointment(_,{id})
        },
        getSubjects:(_, { id }) => {
            return  registrationRequests.getSubjects(_,{id})
        },
        getAllSubjects:(_)=>{
            return registrationRequests.getAllSubjects(_)
        }

    },

    Mutation: {
        createRegistration: (_, {registration}) => {
            return registrationRequests.createRegistration(_, { registration })
        },
        updateRegistration:(_,{id},{registration})=>{
            return registrationRequests.updateRegistration(_,{id},{registration})
        },
        createAppointment: (_, {appointment}) => {
            return registrationRequests.createAppointment(_, { appointment })
        },
    }
}

export default registrationResolvers;