const { Schema, model, Types } = require("mongoose")
const schema = new Schema({
    message: {
        type: String,
        required: true,
        minlength: 10
    },
    student: {
        type: Types.ObjectId,
        ref: 'student'
    }
},
    { timestamps: true })
module.exports = model("message", schema);