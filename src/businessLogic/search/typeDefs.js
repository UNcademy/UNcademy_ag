//Campus
export const searchAllCampusTypedef = `
    type Campus {
        id: Int!
        nombre: String!
    }
`;

export const searchAllCampusQueries = `
    searchAllCampus: [Campus]
`;


//Faculties
export const searchAllFacultiesTypedef = `
    type Faculties {
        id: Int!
        nombre: String!
    }
`;

export const searchAllFacultiesQueries = `
    searchAllFaculties: [Faculties]
`;


//Subjects
export const searchAllSubjectsTypedef = `
    type PlanEstudios {
        id: Int!
        nombre: String!
        creditosDisOpt: Int!
        creditosDisObl: Int!
        creditosFunOpt: Int!
        creditosFunObl: Int!
        creditosLibElc: Int!
        creditosTraGrado: Int!
    }
    type Courses {
        id: Int!
        nombre: String!
        codigoMateria: String!
        creditos: Int!
        cupos: Int!
        tipologia: String!
        descripcion: String!
        prerequisitos: String!
        PlanEstudios: [PlanEstudios!]!
    }
`;

export const searchAllSubjectsQueries = `
      searchAllSubjects: [Courses]
`;

export const searchSubjectByNameQueries = `
      searchSubjectByName(courseName: String!): [Courses]
`;

export const searchSubjectByCodeQueries = `
      searchSubjectByCode(courseCode: String!): [Courses]
`;

export const searchSubjectByTypeQueries = `
      searchSubjectByType(courseType: String!): [Courses]
`;

export const searchSubjectByIdQueries = `
      searchSubjectById(courseId: Int!): [Courses]
`;

export const searchSubjectByKeywordQueries = `
      searchSubjectByKeyword(keyword: String!): [Courses]
`;

//Study plan

export const searchmateriaByPlanTypedef = `
    type CoursesByPlan {
        id: Int!
        nombre: String!
        codigoMateria: String!
        creditos: Int!
        cupos: Int!
        tipologia: String!
        descripcion: String!
        prerequisitos: String!
    }
    type PlanEstudiosByType {
        nombre: String!
        FacultadId: Int!
        NivelEstudioId: Int!
        Materia: [CoursesByPlan!]!
    }
`;


export const searchmateriaByPlanQueries = `
        searchmateriaByPlan(Id: Int!): [PlanEstudiosByType]
`;


//Group

export const groupBynumerTypeDef = `
  type CourseBynumer {
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
      Materium: CourseBynumer!
  }
`;

export const groupBynumerQueries = `
    groupBynumer(groupNumber: Int!): [Group]
  `;

export const searchByProfessorTypeDef = `
  type Subgroup {
      id: Int!
      identificadorSubGrupo: Int!
      docenteEspecifico: String!
      salon: String!
      hora: String!
      dias: String!
      GrupoId: Int!
  } 
  type CourseByProfessor {
      id: Int!
      nombre: String!
      codigoMateria: String!
      creditos: Int!
      cupos: Int!
      tipologia: String!
      descripcion: String!
      prerequisitos: String!
      esNumerico: Boolean!
  }
  type GroupByProfessor {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
      Materium: CourseByProfessor!
      subGrupos: [Subgroup!]!
  }
`;

export const searchByProfessorQueries = `
      searchByProfessor(teacherName: String!): [GroupByProfessor]
  `;

export const groupByQuotaTypeDef = `
  type GroupByQuota {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
      Materium: Course!
  }
`;

export const groupByQuotaQueries = `
    groupByQuota: [GroupByQuota]
  `;


export const groupByIdTypeDef = `
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
  type GroupById {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
      Materium: Course!
  }
`;

export const groupByIdQueries = `
    groupById(groupId: Int!): [GroupById]
  `;

export const subGrupoByGrupoIdTypeDef = `
  type GroupByGrupoId {
      id: Int!
      numeroGrupo: Int!
      cuposDisponibles: Int!
      docenteTitular: String!
      semestre: String!
      MateriumId: Int!
  }
  type SubgroupByGrupoId {
    id: Int!
    identificadorSubGrupo: Int!
    docenteEspecifico: String!
    salon: String!
    hora: String!
    dias: String!
    GrupoId: Int!
    Grupo: GroupByGrupoId
} 
`;

export const subGrupoByGrupoIdQueries = `
    subGrupoByGrupoId(subGroupId: Int!): [SubgroupByGrupoId]
  `;