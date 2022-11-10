import consumeRequests from '../../restConsumption/consume/requests';


const consumeResolvers = {
    Query: {
        consumeSubject:async(_, {code}) => {
            return  await consumeRequests.consumeSubject(_,{code})
        }
    },
}

export default consumeResolvers;