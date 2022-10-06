import accountRequests from '../../restConsumption/account/requests';


const accountResolvers = {
    Query: {
        login: (_, { loginBody }) => {
            return accountRequests.login(_, { loginBody })
        },
        validate: (_, { token }) => {
            return accountRequests.validate(_, { token })
        }
    },
    Mutation: {
        register: (_, { registerBody }) => {
            return accountRequests.register(_, { registerBody })
        }
    }
}

export default accountResolvers;