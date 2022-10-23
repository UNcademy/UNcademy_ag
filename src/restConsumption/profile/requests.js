import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const requests = {
    viewProfile: (_, { username }) =>
        generalRequest(`${URL}/view?username=${username}`, 'GET'),
    updateProfile: (_, { username, profile }) =>
        generalRequest(`${URL}/edit?username=${username}`, 'PUT', profile),
};

export default requests;