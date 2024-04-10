import mongoose,{ Schema } from "mongoose"

const sinhvienSchema = new Schema({
    name:{
        type:String,
        required:true,
       minLength:6
    },
    age:{
        type:Number,
        required:true,
        min:0
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    }

},{timestamps:true});

export default mongoose.model("Sinhvien",sinhvienSchema);