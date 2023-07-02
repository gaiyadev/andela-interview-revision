const mongoose  = require('mongoose')


const PostSchema = new mongoose.Schema({
title: {
    type: String
},
    body: {
    type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post