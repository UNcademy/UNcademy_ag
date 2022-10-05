import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from '../utilities';

import {
    messageTypeDef,
    classListMutations, classListQueries, classListTypeDef,
    studentMutations, studentTypeDef,
    teacherTypeDef, teacherMutations,
    taskTypeDef, taskQueries, taskMutations,
    gradeTypeDef, gradeMutations,
    scheduleTypeDef, scheduleQuery,
} from '../businessLogic/grades/typeDefs';

import {
    searchAllCampusQueries, searchAllCampusTypedef,
    searchAllFacultiesQueries, searchAllFacultiesTypedef,
    searchAllSubjectsQueries, searchAllSubjectsTypedef,
    searchByProfessorQueries, searchByProfessorTypeDef,
    searchmateriaByPlanQueries, searchmateriaByPlanTypedef,
    subGrupoByGrupoIdQueries, subGrupoByGrupoIdTypeDef,
    groupByIdQueries, groupByIdTypeDef,
    groupBynumerQueries, groupBynumerTypeDef,
    groupByQuotaQueries, groupByQuotaTypeDef,
    searchSubjectByCodeQueries,
    searchSubjectByIdQueries,
    searchSubjectByKeywordQueries,
    searchSubjectByNameQueries,
    searchSubjectByTypeQueries

} from '../businessLogic/search/typeDefs';

import {
    finalGradesTypeDef, finalGradesQueries, finalGradesMutations,
    statsTypeDef, statsQueries
} from '../businessLogic/conGrades/typeDefs'

import gradesResolvers from '../businessLogic/grades/resolvers';
import searchResolvers from "../businessLogic/search/resolvers";
import conGradesResolvers from "../businessLogic/conGrades/resolvers";

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
        /*searchAllCampusTypedef,
        searchAllFacultiesTypedef,
        searchAllSubjectsTypedef,
        searchByProfessorTypeDef,
        searchmateriaByPlanTypedef,
        subGrupoByGrupoIdTypeDef,
        groupByIdTypeDef,
        groupBynumerTypeDef,
        groupByQuotaTypeDef,*/
        finalGradesTypeDef,
        statsTypeDef
    ],
    [
        classListQueries,
        taskQueries,
        scheduleQuery,
        /*searchAllCampusQueries,
        searchAllFacultiesQueries,
        searchAllSubjectsQueries,
        searchByProfessorQueries,
        searchmateriaByPlanQueries,
        subGrupoByGrupoIdQueries,
        groupByIdQueries,
        groupBynumerQueries,
        groupByQuotaQueries,
        searchSubjectByCodeQueries,
        searchSubjectByIdQueries,
        searchSubjectByKeywordQueries,
        searchSubjectByNameQueries,
        searchSubjectByTypeQueries,*/
        finalGradesQueries,
        statsQueries
    ],
    [
        classListMutations,
        studentMutations,
        teacherMutations,
        taskMutations,
        gradeMutations,
        finalGradesMutations
    ]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: merge(
        { JSON: GraphQLJSON }, // allows scalar JSON
        gradesResolvers,
        //searchResolvers,
        conGradesResolvers
    )
});
