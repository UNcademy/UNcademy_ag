export const loginTypeDef = `
    type Login {
        username: String!
        password: String!
    }
`;

export const registerTypeDef = `
    type Register {
        user_name: String!,
        user_type:  String!,
        password: String!,
        full_name: String!,
        document: String!,
        state: Boolean!,
        dep_document: String!,
        city_document: String!,
        genre: String!,
        email: String!,
        un_mail: String!,
        birth_place: String!,
        cel: String!,
        age: Int!,
        country: String!,
        blood_type: String!,
        address: String!,
        army_card: Boolean!
    }
`