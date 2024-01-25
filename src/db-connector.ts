import mongoose from "mongoose";
import { environment } from "../app-config";
import { projectSchema, sceneContent, sceneSchema } from './schemas'

const env = process.env.NODE_ENV || "development";

const connect = async () => {
    await mongoose.connect(environment[env].dbString);
}

connect()

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const AutoIncrement = require('mongoose-sequence')(db);

const Projects = mongoose.model('Projects', projectSchema)
const Scenes = mongoose.model('Scenes', sceneSchema)
//sceneContent.plugin(AutoIncrement, {inc_field: 'version'})
//sceneSchema.plugin(AutoIncrement, {inc_field: 'number'})
export { Projects, Scenes };