import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
import request from "request-promise-native";

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
    Query: {
        searchByProfessor: (_, { teacherName }) => {
            return generalRequest(`${URL}/groupByProfessor/${teacherName}`, 'GET')
        }
    }
};

export default resolvers;