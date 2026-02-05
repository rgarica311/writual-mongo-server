import mongoose from "mongoose";

export const insporationSchema = new mongoose.Schema({
    projectId: { type: String}, 
    scratch: { type: String }, 
    images:  { type: [String]  }, 
    videos: { type: [String]  }
})