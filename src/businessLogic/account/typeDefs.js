export const loginTypeDef = `
    input Login {
        username: String!
        password: String!
    }
`;

export const registerTypeDef = `
    input Register {
        user_name: String!
        user_type:  String!
        password: String!
        full_name: String!
        document: Int!
        dep_document: String!
        city_document: String!
        program: String!
        genre: String!
        email: String!
        un_mail: String!
        birth_place: String!
        cel: Int!
        age: Int!
        country: String!
        blood_type: String!
        address: String!
        army_card: Boolean!
    }
    type AccountResult {
        statusCode: Int
        method: String
        message: String
        data: Data
    }
    type Data {
        accessToken: String
    }
`

export const accountQueries = `
      login(loginBody: Login!): AccountResult
      validate(token: String!): AccountResult
  `;

export const accountMutations = `
      register(registerBody: Register!): AccountResult
  `;