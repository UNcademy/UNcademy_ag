export const viewProfileTypeDef = `
    type Profile {
        UserName: String!
	    UserType: String! 
	    Password: String!
	    FullName: String!
	    Document: Int!
	    Email: String!
	    Active: Boolean!
	    DepDocument: String!   
	    CityDocument: String! 
	    Genre: String!
	    UNMail: String!
	    Cel: Float!    
	    Tel: Float!    
	    Age: Int!    
	    BirthPlace: String! 
	    Country: String! 
	    BloodType: String! 
	    Address: String! 
	    ArmyCard: Boolean!   
	    MotherFullName: String! 
	    MotherDocument: Int!    
	    FatherFullName: String! 
	    FatherDocument: Int!
    }
`;

export const updateProfileTypeDef = `
    input InputProfile {
        Email: String!
        Cel: Float!    
        Tel: Float!     
        Address: String!
    }
    type ProfileResult {
        statusCode: Int
        method: String
        message: String
        data: Profile
    }
`

export const profileQueries = `
      viewProfile(username: String!): ProfileResult
  `;

export const profileMutations = `
      updateProfile(username: String!, profile: InputProfile!): ProfileResult
  `;