export const finalGradesTypeDef = `
  type FinalGrade {
      groupId: Int!
      studentName: String!
      finalGrade: String!
      absences: Int!
      approved: Boolean!
      reason: String
  }
  input FinalGradeInput {
      groupId: Int!
      studentName: String!
      finalGrade: String!
      absences: Int!
      approved: Boolean!
      reason: String
  }`;

export const finalGradesQueries = `
      finalGradeByGroup(groupId: Int!): [FinalGrade]!
      finalGradeByStudent(studentName: String!): [FinalGrade]!
      finalGradeByGroupAndStudent(groupId: Int!, studentName: String!): FinalGrade!
  `;

export const finalGradesMutations = `
    createFinalGrade(finalGrade: FinalGradeInput!): FinalGrade
`;

export const statsTypeDef = `
  type Stats {
      groupId: Int!
      participationPer: Int!
      approbationPer: Int!
      averageGrade: Int
      standardDev: Int
      bestGrade: Int
      worstGrade: Int
  }`;

export const statsQueries = `
      statsByGroup(groupId: Int!):Stats!
`