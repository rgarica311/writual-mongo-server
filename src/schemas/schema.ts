import { merge } from 'lodash';
import { ProjectType as project, resolvers as projectResolvers } from '../typeDefs/project'
import { makeExecutableSchema } from '@graphql-tools/schema';

const resolvers = {

}

export const schema = makeExecutableSchema({
    typeDefs: [project],
    resolvers: merge(resolvers, projectResolvers),

})