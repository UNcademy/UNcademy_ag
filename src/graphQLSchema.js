import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {

} from './UNcademy/registration/typeDefs';


// merge the typeDefs
const mergedTypeDefs = mergeSchemas(

);

// Generate the schema object from your types definition.
export default makeExecutableSchema({

});
