import { generalRequest } from '../../utilities';

const URL = `http://172.17.0.1:9000`;

const requests = {
    consumeSubject:(_,{code})=>
        generalRequest(`${URL}/consume/${code}`, 'GET')
};

export default requests;
