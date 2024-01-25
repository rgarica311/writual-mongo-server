import mongoose from "mongoose";
import { ProjectType } from "../enums"
import { sceneSchema, characterSchema } from "./"
import  { outlineSchema } from "./outline-schema"
import { insporationSchema } from "./insporation-schema"
import { treatmentSchema }  from "./treatment-schema"
import { screenplaySchema } from "./screenplay-schema"
import { feedbackSchema } from "./feedback-schema"

export const projectSchema = new mongoose.Schema({
    id: { type: String },
    created_date:  { type: String  },
    modified_date: { type: String },
    revision:  { type: Number },
    user: { type: String },
    sharedWith: { type: [String] },
    type: { type: String, enum: ProjectType },
    genre: { type: String },
    title: { type: String },
    logline:{ type:  String },
    budget: { type: Number },
    time_period: {type: String},
    similar_projects: [String],
    scenes: { type: [sceneSchema] },
    characters: { type: [characterSchema] },
    outline: { type: outlineSchema }, 
    insporation: { type: insporationSchema },  //Continue exending  project schema from here
    treatment: {type: treatmentSchema  }, 
    screenplay: { type: screenplaySchema },
    feedback: { type: feedbackSchema }
   
})