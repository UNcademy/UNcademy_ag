import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
import request from "request-promise-native";

const URL = `http://${url}:${port}/${entryPoint}`;

const requests = {
    searchByProfessor: (_, { teacherName }) =>
        generalRequest(`${URL}/groupByProfessor/${teacherName}`, 'GET')
};

export default requests;