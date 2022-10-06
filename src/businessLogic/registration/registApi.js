const { RESTDataSource } = require('apollo-datasource-rest');
import { url, port, entryPoint } from './server';

const serverConfig = require('../../restConsumption/registration/server');
const URL = `http://${url}:${port}`;

class AccountAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = serverConfig.url;`http://${url}:${port}`;
    }


}
