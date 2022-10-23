import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const requests = {
    getAcademic:(_,{id})=>
        generalRequest(`${URL}/${entryPoint}/${id}`, 'GET')  ,

    getAllAcademic:(_)=>
        generalRequest(`${URL}/${entryPoint}`, 'GET'), 
    
    getMaterias:(_,{id})=>
        generalRequest(`${URL}/${entryPoint}/materias/${id}`, 'GET')  ,
    
    getPrograma:(_)=>
        generalRequest(`${URL}/${entryPoint}/student-program/${id}`, 'GET'),

    createAcademic:(_,{academic})=>
        generalRequest(`${URL}/${entryPoint}`, 'POST', academic),
    

};

export default requests;