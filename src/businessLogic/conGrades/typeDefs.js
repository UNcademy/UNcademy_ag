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
      isNum: Boolean!
      absences: Int!
      studentName: String!
      grade: String!
      weight: Int!
  }`;

export const finalGradesQueries = `
      finalGradesByGroup(groupId: Int!): [FinalGrade]!
      finalGradesByStudent(studentName: String!): [FinalGrade]!
      finalGradesByGroupAndStudent(groupId: Int!, studentName: String!): FinalGrade!
  `;

export const finalGradesMutations = `
    createFinalGrade(finalGrade: FinalGradeInput!): FinalGrade
`;

export const statsTypeDef = `
  type Stats {
      group_id: Int
      participation_percentage: Int
      approbation_percentage: Int
      average_grade: Int
      standard_deviation: Int
      best_grade: Int
      worst_grade: Int
  }`;

export const statsQueries = `
      statsByGroup(groupId: Int!):Stats!
`