export const searchTypeDef = `
  type Subgroup {
      id: Int!
      identificadorSubGrupo: Int!
      docenteEspecifico: String!
      salon: String!
      hora: String!
      dias: String!
      GrupoId: Int!
  } 
  type Course {
      id: Int!
      nombre: String!
      codigoMateria: String!
      creditos: Int!
      cupos: Int!
      tipologia: String!
      descripcion: String!
      prerequisitos: String!
  }
  type Group {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
      Materium: Course!
      subGrupos: [Subgroup!]!
  }
`;

export const searchQueries = `
      searchByProfessor(teacherName: String!): [Group]
  `;