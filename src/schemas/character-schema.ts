import mongoose from "mongoose"



export const charContent = new mongoose.Schema({
    version: {type: Number},
    bio: {type: String},
    name: {type: String}, 
    age: {type: Number}, 
    gender: {type: String}
})

export const characterSchema = new mongoose.Schema({
   project_id: {type: String},
   number: {type: Number},
   details: [charContent]
})

