const { Schema, model } = require("mongoose");


const docSchema = new Schema({
    fileUrl: {type: String, required: true},
    branch: {type: String, required: true},
    sem: {type: String, required: true},
    fileName: {type: String, required: true},
    subject: {type: String, required: true},
    uploadedAt: {type: Date, default: Date.now},
    isPyq: {type: Boolean, default: false}
})

const Document = model('Document', docSchema)
module.exports = Document