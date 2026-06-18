import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    aiUsage: {
        summaryCount: { type: Number, default: 0 },
        summaryLastReset: { type: Date, default: Date.now },
        
        parserCount: { type: Number, default: 0 },
        parserLastReset: { type: Date, default: Date.now },
        
        imageCount: { type: Number, default: 0 },
        imageLastReset: { type: Date, default: Date.now }
    }
}, {timestamps: true})

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", UserSchema) 

export default User