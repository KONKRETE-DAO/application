const mongoose = require('mongoose')
const CodeSchema = new mongoose.Schema(
    {
        value: { type: String, unique: true, required: true },
        name: String,
        email: { type: String, unique: true, sparse: true },
        usageCount: Number,
    },
    { timestamps: true }
)
module.exports = mongoose.models.Code || mongoose.model('Code', CodeSchema)
