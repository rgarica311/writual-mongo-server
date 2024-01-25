import mongoose from "mongoose";

const screenplayContent = new mongoose.Schema({
    version: { type: Number },
    text:  { type: String }
})

export const screenplaySchema  = new mongoose.Schema({
    project_id: { type: String },
    versions: { type:  [screenplayContent] }
})