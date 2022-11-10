import consumeRequests from '../../restConsumption/consume/requests';


const consumeResolvers = {
    Query: {
        consumeSubject: (_, {code}) => {
            console.log(code)
            return consumeRequests.consumeSubject(_,{code})
        }
    },
}

export default consumeResolvers;