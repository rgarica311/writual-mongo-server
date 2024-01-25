import mongoose from "mongoose"

export const sceneContent = new mongoose.Schema({
    version: {type: Number},
    thesis: {type: String},
    antithesis: {type: String},
    synthesis: {type: String},
    summary: {type: String},
    act: {type: Number},
    step: {type: String}
})

export const sceneSchema = new mongoose.Schema({
   project_id: {type: String},
   number: {type: Number},
   versions: [sceneContent]
})