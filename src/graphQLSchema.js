import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
    messageTypeDef,
    classListMutations, classListQueries, classListTypeDef,
    studentMutations, studentTypeDef,
    teacherTypeDef, teacherMutations,
    taskTypeDef, taskQueries, taskMutations,
    gradeTypeDef, gradeMutations,
    scheduleTypeDef, scheduleQuery
} from './restConsumption/grades/typeDefs';

import {
    searchAllCampusTypedef, searchAllCampusQueries, searchAllFacultiesTypedef,
    searchAllFacultiesQueries, searchAllSubjectsTypedef, searchAllSubjectsQueries, 
    searchSubjectByNameQueries, searchSubjectByCodeQueries, searchSubjectByTypeQueries,
    searchSubjectByIdQueries, searchSubjectByKeywordQueries, searchmateriaByPlanTypedef, 
    searchmateriaByPlanQueries, groupBynumerTypeDef, groupBynumerQueries, 
    searchByProfessorTypeDef, searchByProfessorQueries, groupByQuotaTypeDef, 
    groupByQuotaQueries, groupByIdTypeDef, groupByIdQueries, subGrupoByGrupoIdTypeDef,
    subGrupoByGrupoIdQueries

} from './restConsumption/search/typeDefs';

import {
    combinedResolvers, combinedMutations
} from './businessLogic/grades';

import gradesResolvers from './restConsumption/grades/resolvers';
import searchResolvers from './restConsumption/search/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
    [
        'scalar JSON',
        messageTypeDef,
        classListTypeDef,
        studentTypeDef,
        teacherTypeDef,
        taskTypeDef,
        gradeTypeDef,
        scheduleTypeDef,
        searchAllCampusTypedef,
        searchAllFacultiesTypedef,
        searchAllSubjectsTypedef,
        searchmateriaByPlanTypedef,
        groupBynumerTypeDef,
        searchByProfessorTypeDef,
        groupByQuotaTypeDef,
        groupByIdTypeDef,
        subGrupoByGrupoIdTypeDef,
        searchSubjectByTypeQueries,
        groupBynumerQueries,
        searchmateriaByPlanQueries,
        searchByProfessorQueries,
        groupByQuotaQueries,
        groupByIdQueries,
        subGrupoByGrupoIdQueries
    ],
    [
        classListQueries,
        taskQueries,
        scheduleQuery,
        searchAllCampusQueries,
        searchAllFacultiesQueries,
        searchAllSubjectsQueries,
        searchSubjectByNameQueries,
        searchSubjectByCodeQueries,
        searchSubjectByIdQueries,
        searchSubjectByKeywordQueries
    ],
    [
        classListMutations,
        studentMutations,
        teacherMutations,
        taskMutations,
        gradeMutations,
        combinedMutations
    ]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: merge(
        { JSON: GraphQLJSON }, // allows scalar JSON
        gradesResolvers,
        searchResolvers,
        combinedResolvers
    )
});
