import { GraphQLJSON } from 'graphql-scalars'

export const typeDef = `#graphql
    type Project {
        id: String!
        type: ProjectType!
        title: String!
        logline: String
        budget: Int
        similar_projects: [String]
        scenes: [Scene]
        characters: [Character]
        outline: Outline
    }

    type Scene {
        id: String!
        
        thesesis: String
        antithesis: String
        synthesis: String 
        summary: String
        scene_number: Number
        version: Number
        act: Number
        step: Step
    }

    type Character {
        name: String
        gender: String
        age: Number
        bio: String
        need: String
        want: String
    }

    enum ProjectType {
        Film
        Television
        Short
    }

    enum Outline {
        Hero's_Jooourrney
        Anatomy_of_Story

    }
`;

export const resolvers = {
    Query: {

    },
    Mutation: {

    },
    JSON: GraphQLJSON
}