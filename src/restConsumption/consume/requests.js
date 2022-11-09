import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const requests = {
    consumeSubject:(_,{code})=>
        generalRequest(`${URL}/consume/${code}`, 'GET')
};

export default requests;
