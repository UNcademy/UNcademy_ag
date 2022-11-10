export const consumeTypesDef=`
    type consumesubject{
        code:String!
        name:String
        vigency:Boolean
        level:String
        credits:Int
        campus:String
        faculty:String
        departament:String
        basic_academic_unit:String
        academic_level:String
        content:[String]
    }
    
`;
export const consumeQueries = `
      consumeSubject(code: Int!): consumesubject!
  `;