import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const requests = {
    getRegistration:(_,{id})=>
        generalRequest(`${URL}/Registration/${id}`, 'GET')  ,

    getSubjects:(_,{id})=>
        generalRequest(`${URL}/Subject/${id}`, 'GET'),

    getAllSubjects:()=>
        generalRequest(`${URL}/Subjects`, 'GET'),

    createRegistration: (_, { registration }) =>
        generalRequest(`${URL}/CreateRegistration`, 'POST', registration),

    updateRegistration:(_,{id},{registration})=>
        generalRequest(`${URL}/UpdateRegistration/${id}`, 'POST', registration),

    getAppointment:(_,{id})=>
        generalRequest(`${URL}/Appointment/${id}`, 'GET'),

    createAppointment:(_, { appointment }) =>
        generalRequest(`${URL}/CreateAppointment`, 'POST', appointment)

};

export default requests;


