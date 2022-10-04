import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const requests = {
    login: (_, { loginBody }) =>
        generalRequest(`${URL}/login`, 'POST', loginBody),
    register: (_, { registerBody }) =>
        generalRequest(`${URL}/register`, 'POST', registerBody),
    validate: (_, { token }) =>
        generalRequest(`${URL}/validate`, 'GET', headers=token )
};

export default requests;