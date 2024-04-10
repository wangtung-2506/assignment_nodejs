import mongoose,{ Schema } from "mongoose"

const authSchema = new Schema({   
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type: String,
        enums: ["user", "admin"],
        default: "user"
    }

},{timestamps:true});

export default mongoose.model("User",authSchema);