import { generalRequest, getRequest } from '../../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
    Query: {
        invoiceDetailList: (_, {}) =>
            generalRequest(`${URL}/invoice-details`, 'GET'),
        invoiceDetail: (_, { id }) =>
            generalRequest(`${URL}/invoice-details/${id}`, 'GET'),
        invoiceList: (_, {}) =>
            generalRequest(`${URL}/invoice`, 'GET'),
        invoice: (_, { userId }) =>
            generalRequest(`${URL}/invoice/?user_id=${userId}`, 'GET'),
    },
    Mutation: {
        createInvoiceDetail: (_, { invoiceDetail }) =>
            generalRequest(`${URL}/invoice-details`, 'POST', invoiceDetail),
        createInvoice: (_, { invoice }) =>
            generalRequest(`${URL}/invoice`, 'POST', invoice),
    }
};

export default resolvers;