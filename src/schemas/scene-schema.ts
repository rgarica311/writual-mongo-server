import mongoose from "mongoose"

export const sceneContent = new mongoose.Schema({
    version: {type: Number},
    locked: { type: Boolean},
    thesis: {type: String},
    antithesis: {type: String},
    synthesis: {type: String},
    synopsis: {type: String},
    act: {type: Number},
    step: {type: String},
    sceneHeading: {type: String},
})

export const sceneSchema = new mongoose.Schema({
    projectId: {type: String},
    number: {type: Number},
    activeVersion: {type: Number},
    lockedVersion: {type: Number},
    newVersion: {type: Boolean},
    newScene: {type: Boolean},
    versions: [sceneContent]
})