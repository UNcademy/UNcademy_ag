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
    searchQueries, searchTypeDef
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
        searchTypeDef
    ],
    [
        classListQueries,
        taskQueries,
        scheduleQuery,
        searchQueries
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
