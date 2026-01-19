import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{type:String,requried:true},
    description:{type:String,requried:true},
    location:{type:String,requried:true},
    category:{type:String,requried:true},
    level:{type:String,requried:true},
    salary:{type:Number,requried:true},
    date:{type:Number,requried:true},
    visible:{type:Boolean,default:true},
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:'Company',required:true}
})

const Job = mongoose.model('Job',jobSchema)


export default Job;