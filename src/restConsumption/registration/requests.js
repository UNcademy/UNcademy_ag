import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const requests = {
    getRegistration:(_,{id})=>
        generalRequest(`${URL}/Registration/${id}`, 'GET')  ,

    createRegistration: (_, { registration }) =>
        generalRequest(`${URL}/CreateRegistration`, 'POST', registration),

    updateRegistration:(_,{id},{registration})=>
        generalRequest(`${URL}/UpdateRegistration/${id}`, 'POST', registration)
};

export default requests;


