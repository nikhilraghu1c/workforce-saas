import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        organizationId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        }, 
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["ADMIN", "EMPLOYEE"],
            default: "EMPLOYEE",
        },
        designation: String,
        skills: [String],
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
            default: "ACTIVE",
        },
    }, {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);