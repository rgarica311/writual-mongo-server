import mongoose from "mongoose"

export const formatStep = new mongoose.Schema({
    step_id: {type: String},
    name: {type: String},
    number:  {type: Number},
    act: {type:  String},
    intructions: {type: String}
})

export const formatSchema = new mongoose.Schema({
    format_id: {type: String},
    name: {type: String},
    steps: {type: [formatStep]}
})

export const  outlineSchema = new mongoose.Schema({
   id: {type: String},
   user: {type:  String},
   project_id: {type: String},
   format: {type: formatSchema}
})