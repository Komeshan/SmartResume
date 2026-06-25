import mongoose from "mongoose";

const AiCacheSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inputText: { type: String, required: true },
    outputText: { type: String, required: true },
    type: { type: String, required: true } // 'summary' or 'experience'
}, { timestamps: true });

// Create compound index for fast lookups
AiCacheSchema.index({ userId: 1, inputText: 1 });

const AiCache = mongoose.model("AiCache", AiCacheSchema);
export default AiCache;
