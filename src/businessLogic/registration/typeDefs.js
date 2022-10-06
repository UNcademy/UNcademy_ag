export const registrationTypesDef=`
    type registration{
        idStudent:String!
        subjects:[String]
    }
    input registrationInput{
        idStudent:String!
        subjects:[String]
    }

`;
export const registrationQueries=`
    getRegistration(id:String!):registration!
`;

export const registrationMutations=`
    createRegistration(reg:registrationInput!):registration!
    updateRegistration(id:String, reg:registrationInput!):registration!
`;
