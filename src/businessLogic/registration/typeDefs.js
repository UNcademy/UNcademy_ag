export const registrationTypesDef=`
    type registration{
        idStudent:String!
        subjects:[String]
    }
    input registrationInput{
        idStudent:String!
        subjects:[String]
    }
    type appointment{
        id: String!
        idStudent:String!
        idProgram:String
        date:String
        dateEnd:String
    }
    input appointmentInput{
        id: String!
        idStudent:String!
        idProgram:String
        date:String
        dateEnd:String
    }

`;
export const registrationQueries=`
    getRegistration(id:String!):registration!
    getAppointment(id:String!):appointment!
`;

export const registrationMutations=`
    createRegistration(reg:registrationInput!):registration!
    updateRegistration(id:String, reg:registrationInput!):registration!
    createAppointment(appoint:appointmentInput):String
`;
