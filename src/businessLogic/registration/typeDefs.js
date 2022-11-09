export const registrationTypesDef=`
    type Registration{
        idStudent:String!
        idProgram:String!
        subjects:[subject]
    }
    input registrationInput{
        idStudent:String!
        idProgram:String!
        subjects:[subjectInput]
    }

    type subject{
        idSubject:String
        nameSubject:String
        cupSubject:Int
        days:String
        time:Int
        requirements:[String]
    }
    input subjectInput{
        idSubject:String
        nameSubject:String
        cupSubject:Int
        days:String
        time:Int
        requirements:[String]
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
    getRegistration(id:String!):Registration!
    getAppointment(id:String!):appointment!
    getSubjects(id:String!):subject!
    getAllSubjects:[subject]!
`;

export const registrationMutations=`
    createRegistration(reg:registrationInput):Registration
    updateRegistration(id:String, reg:registrationInput!):Registration!
    createAppointment(appoint:appointmentInput):String!
`;
