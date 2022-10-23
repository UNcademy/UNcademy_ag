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
	    Cel: Int!    
	    Tel: Int!    
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
	    CreatedAt: String!
	    UpdatedAt: String!
    }
`;

export const updateProfileTypeDef = `
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
        Cel: Int!    
        Tel: Int!    
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
        CreatedAt: String!
        UpdatedAt: String!
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
      updateProfile(username: String!, profile: Profile!): ProfileResult
  `;