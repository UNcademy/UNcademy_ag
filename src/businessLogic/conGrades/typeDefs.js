export const finalGradesTypeDef = `
  type FinalGrade {
      group_id: Int!
      student_name: String!
      final_grade: String!
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
      finalGradesByGroupAndStudent(groupId: Int!, studentName: String!): [FinalGrade]!
  `;

export const finalGradesMutations = `
    createFinalGrade(id: Int!): Message
`;

export const statsTypeDef = `
  type Stats {
      group_id: Int!
      participation_percentage: Float!
      approbation_percentage: Float!
      average_grade: Float
      standard_deviation: Float
      best_grade: Float
      worst_grade: Float
  }`;

export const statsQueries = `
      statsByGroup(groupId: Int!):[Stats]!
`