import profileRequests from '../../restConsumption/profile/requests';

const profileResolvers = {
    Query: {
        viewProfile: (_, { username }) => {
            return profileRequests.viewProfile(_, { username })
        },
    },
    Mutation: {
        updateProfile: (_, { username, profile }) => {
            return profileRequests.updateProfile(_, { username, profile })
        }
    }
}

export default profileResolvers;