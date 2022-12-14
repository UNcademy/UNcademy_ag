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
    scheduleTypeDef, scheduleQuery
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
    statsTypeDef, statsQueries,
    actTypeDef, actQueries
} from '../businessLogic/conGrades/typeDefs'

import {
    registrationTypesDef,
    registrationQueries,
    registrationMutations
} from '../businessLogic/registration/typeDefs';

import{
    acadRegTypesDef,
    academicQueries,
    academicMutations
} from '../businessLogic/acadRec/typeDefs';

import {
    loginTypeDef, registerTypeDef, accountQueries, accountMutations
} from '../businessLogic/account/typeDefs'

import { viewProfileTypeDef, updateProfileTypeDef, profileQueries, profileMutations } from '../businessLogic/profile/typeDefs';

import {consumeTypesDef, consumeQueries} from '../businessLogic/consume/typeDefs';

import gradesResolvers from '../businessLogic/grades/resolvers';
import searchResolvers from "../businessLogic/search/resolvers";
import registrationResolvers from '../businessLogic/registration/resolvers';
import conGradesResolvers from "../businessLogic/conGrades/resolvers";
import accountResolvers from "../businessLogic/account/resolvers";
import profileResolvers from '../businessLogic/profile/resolvers';
import academicResolvers from '../businessLogic/acadRec/resolvers';
import consumeResolvers from '../businessLogic/consume/resolvers';

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
        searchByProfessorTypeDef,
        searchmateriaByPlanTypedef,
        subGrupoByGrupoIdTypeDef,
        groupByIdTypeDef,
        groupBynumerTypeDef,
        groupByQuotaTypeDef,
        registrationTypesDef,
        acadRegTypesDef,
        finalGradesTypeDef,
        statsTypeDef,
        loginTypeDef,
        registerTypeDef,
        viewProfileTypeDef, 
        updateProfileTypeDef,
        actTypeDef,
        consumeTypesDef
    ],
    [
        classListQueries,
        taskQueries,
        scheduleQuery,
        searchAllCampusQueries,
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
        searchSubjectByTypeQueries,
        finalGradesQueries,
        statsQueries,
        registrationQueries,
        accountQueries,
        profileQueries,
        actQueries,
        academicQueries,
        consumeQueries
    ],
    [
        classListMutations,
        studentMutations,
        teacherMutations,
        taskMutations,
        gradeMutations,
        registrationMutations,
        finalGradesMutations,
        accountMutations,
        profileMutations,
        academicMutations
    ]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: merge(
        { JSON: GraphQLJSON }, // allows scalar JSON
        gradesResolvers,
        searchResolvers,
        conGradesResolvers,
        registrationResolvers,
        accountResolvers,
        profileResolvers,
        academicResolvers,
        consumeResolvers
    )
});
