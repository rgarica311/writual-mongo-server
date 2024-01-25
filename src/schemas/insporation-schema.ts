import mongoose from "mongoose";

export const insporationSchema = new mongoose.Schema({
    project_id: { type: String}, 
    scratch: { type: String }, 
    images:  { type: [String]  }, 
    videos: { type: [String]  }
})