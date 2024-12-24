import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    important:{
        type:Boolean,
        default:false
    },
    complete:{
        type:Boolean,
        default:false,
    },
    
},{timestamps:true})

export const Task = mongoose.model("Task",taskSchema)