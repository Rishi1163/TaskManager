import mongoose ,{Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    task:[{
        type:mongoose.Types.ObjectId,
        ref:"Task"
    }]
},{timestamps:true})

export const User = mongoose.model("User",userSchema)