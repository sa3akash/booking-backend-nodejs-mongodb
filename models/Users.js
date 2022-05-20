import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type:String, required:true, trim:true, unique:true, },
    email:{type:String, required:true, trim:true, unique:true, },
    password:{type:String, required:true},
    isAdmin:{type:Boolean, default:false}
},{timestamps:true})



export default mongoose.model('User', UserSchema, 'users');