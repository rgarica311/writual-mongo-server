import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers } from '../resolvers';
import { typeDefs } from '../type-defs';
import { PORT } from '../app-config';
import { schema } from './schemas/schema'

const app = express();
const httpServer = http.createServer(app)
const server = new ApolloServer(
    {
        schema
    }
);

const startServer = async () => {
    await server.start()

    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
}

startServer()
console.log(`🚀 Server ready at http://localhost:4000`);
