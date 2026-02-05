import mongoose from "mongoose"



export const charContent = new mongoose.Schema({
    version: {type: Number},
    bio: {type: String},
    name: {type: String}, 
    age: {type: Number}, 
    gender: {type: String}
})

export const characterSchema = new mongoose.Schema({
   projectId: { type: String },
   number: { type: Number },
   imageUrl: { type: String },
   details: [charContent]
})

