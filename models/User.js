const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        bycrptPassword: {
            type: String,
        },
        argonPassword: {
            type: String,
        },
        picture: {
            type: String,
            default:"",
        },
    }, {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)