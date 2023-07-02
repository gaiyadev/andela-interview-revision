const Post  = require('../models/post')


exports.fetchAll = async (req, res) => {
    const { search } = req.query;
    // Construct the search filter if search query is provided
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
    try {
        const posts = await Post.find(filter)
            .populate('user', '_id email')
            .select('_id title body').sort({ _id: -1 })
        return res.status(200).json({message: "login successfully", status: 200, data: posts})
    }catch (e) {
        return res.status(500).json({message: "An error occurred", status: 500})
    }

}

exports.createPost = async (req, res) => {
    const { title, body} = req.body
    const id = req.user._id.toString()
    try {
        const post = { title, body, user: id}
        const savePost = await Post.create(post)
        return res.status(201).json({message: "successfully", status: 201, data: {_id: savePost._id}})
    }catch (e) {
        return res.status(500).json({message: "An error occurred", status: 500})
    }

}

exports.fetchPost = async (req, res) => {
    const { id } = req.params
    try {
        const savePost = await Post.findById(id).populate('user')
        return res.status(200).json({message: "successfully", status: 200, data: savePost})
    }catch (e) {
        return res.status(500).json({message: "An error occurred", status: 500})
    }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const savePost = await Post.deleteOne({_id: id})
        return res.status(200).json({message: "successfully", status: 200, data: savePost})
    }catch (e) {
        console.log(e)
        return res.status(500).json({message: "An error occurred", status: 500})
    }
}

exports.updatePost = async (req, res) => {
    const { title, body} = req.body
    const { id } = req.params
    try {
        const updatedUser = await Post.findByIdAndUpdate(
            id,
            { title, body },
            { new: true }
        );
        return res.status(200).json({message: "successfully", status: 200, data: updatedUser})
    }catch (e) {
        return res.status(500).json({message: "An error occurred", status: 500})
    }
}