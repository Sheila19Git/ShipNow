const mongoose = require("mongoose");
const { USER_ROLES, DOCUMENT_TYPES } = require("../constants");

const documentSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true
        },
        generatedName: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        mimeType: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        documentType: {
            type: String,
            enum: Object.values(DOCUMENT_TYPES),
            required: true
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    { _id: true }
);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        default: USER_ROLES.USER
    },
    documents: {
        type: [documentSchema],
        default: []
    }
});

module.exports = mongoose.model("User", userSchema);