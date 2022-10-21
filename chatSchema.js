const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    message: {
        type: String,
        required:true
    }
  
});

const chat = mongoose.model("message", Schema);
module.exports = chat;