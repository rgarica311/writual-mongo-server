import { GraphQLJSON } from 'graphql-scalars'
import { getProjectData, getAllProjectsSharedWithUser, getProjectScenes } from "../resolvers"
import { createProject, deleteProject, shareProject, updateProject, createScene, createCharacter } from "../mutations"
export const ProjectType = `#graphql

    scalar JSON

    type Query {
        getProjectData(input: ProjectFilters): [Project]
    }

    type Mutation {
        createProject(input: ProjectInput): Project
        deleteProject(id: String): String
        shareProject(id: String, user: String): Project
        createScene(scene: SceneInput): Scene
        updateProject(project: ProjectInput): Project
        createCharacter(character: CharacterInput): Character
    }

    type Project {
        id: String!
        created_date: String
        modified_date: String
        revision: Int
        user: String!
        sharedWith: [String]
        type: ProjectType!
        time_period: String
        genre: String
        title: String!
        logline: String
        budget: Int
        similar_projects: [String]
        scenes: [Scene]
        characters: [Character]
        outline: Outline
        insporation: Insporation
        treatment: Treatment 
        screenplay: Screenplay
        feedback: Feedback
    }

    input ProjectFilters {
        id: String
        created_date: String
        modified_date: String
        revision: Int
        user: String!
        sharedWith: [String]
        type: ProjectType
        time_period: String
        genre: String
        title: String
        logline: String
        budget: Int
        similar_projects: [String]
        scenes: [SceneInput]
        characters: [CharacterInput]
        outline: OutlineInput
        insporation: InsporationInput
        treatment: TreatmentInput
        screenplay: ScreenplayInput
        feedback: FeedbackInput
    }

    input ProjectFilters {
        filters: ProjectFilters
    }

    input ProjectInput {
        user: String!
        project_id: String
        sharedWith: [String]
        type: ProjectType!
        genre: String
        time_period: String
        title: String!
        logline: String
        budget: Int
        similar_projects: [String]
        scenes: [SceneInput]
        characters: [CharacterInput]
        outline: OutlineInput
        insporation: InsporationInput
        treatment: TreatmentInput
        screenplay: ScreenplayInput
        feedback: FeedbackInput
    }

    type Feedback  {
        project_id: String
        user: String
        feedback_content: FeedbackContent
    }

    type FeedbackContent {
        text: String
        revision: Int
    }

    input FeedbackContentInput {
        text: String
        revision: Int
    }

    input FeedbackInput {
        user: String
        feedback_content: FeedbackContentInput
    }

    type SceneContent {
        thesis: String
        antithesis: String
        synthesis: String 
        summary: String
        version: Int
        act: Int
        step: String
    }

    input SceneContentInput {
        thesis: String
        antithesis: String
        synthesis: String 
        summary: String
        version: Int
        act: Int
        step: String
    }

    type Scene {
        project_id: String
        number: Int
        versions: [SceneContent]
    }

    input SceneInput {
        project_id: String!
        number: Int
        versions: [SceneContentInput]
    }

    type Character {
        project_id: String
        name: String
        details: [CharacterDetails]
    }

    type CharacterDetails {
        version: Int
        gender: String
        age: Int
        bio: String
        need: String
        want: String
    }

    input CharacterDetailsInput {
        version: Int
        gender: String
        age: Int
        bio: String
        need: String
        want: String
    }

    input CharacterInput {
        project_id: String
        name: String
        details: [CharacterDetailsInput]
    }

    enum ProjectType {
        Film
        Feature 
        Television
        Short 
    }

    type Treatment {
        project_id: String
        versions: [TreatmentContent]
    }

    input TreatmentInput {
        versions: [TreatmentContentInput]
    }

    type TreatmentContent {
        version: Int
        text: String
    }

    input TreatmentContentInput {
        version: Int
        text: String
    }

    type Screenplay {
        project_id: String
        versions: [ScreenplayContent]
    }

    type  ScreenplayContent  {
        version: Int
        text: String
    }

    input ScreenplayInput {
        version: Int
        text: String
    }

    type Insporation  {
        project_id: String
        scratch: String
        images: [String]
        videos: [String]
    }

    input InsporationInput  {
        scratch: String
        images: [String]
        videos: [String]
    }

    type Outline {   
            project_id: String
            user: String
            format: OutlineFormat 
    }

    input OutlineInput {
            user: String!
            format: OutlineFormatInput
    }

    type OutlineFormat {
            format_id: String
            name: String
            steps: [OutlineSteps]
    }

    input OutlineFormatInput {
        name: String
        steps: [OutlineStepsInput]
    }

    type OutlineSteps {
            step_id: String
            name: String
            number: Int
            act: String
            instructions: String
    }

    input OutlineStepsInput {
            name: String
            number: Int
            act: String
            instructions: String
    }
   
   
`;

export const resolvers = {
    Query: {
        getProjectData
    },
    Mutation: {
        createProject, deleteProject, shareProject, updateProject, createScene, createCharacter
    },
    JSON: GraphQLJSON
}