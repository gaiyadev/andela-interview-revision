const User = require('../models/user')
const jwt  =require('jsonwebtoken')

exports.createUser = async (req, res)=> {
    const { email, password} = req.body

    const user = {email, password}
    try{
        const savedUser = await User.create(user)
        return res.status(201).json({message: "Created successfully", status: 201, data: {
            id: savedUser.id
            }})
    }catch (err) {
        return res.status(500).json({message: "An error occurred", status: 500})
    }
}

exports.loginUser = async (req, res)=> {
    const { email, password} = req.body

    try{
        const findUser = await User.findOne({email: email})
        if(!findUser) return res.status(403).json({message: "Invalid", status: 403})

        if(password !== findUser.password) return res.status(403).json({message: "Invalid cred", status: 403})

        const payload = {email: findUser.email, id: findUser._id}

        const accessToken = jwt.sign(payload, 'secret')

        return res.status(200).json({message: "login successfully", status: 200, data: {
                email: findUser.email,
                _id: findUser._id,
                accessToken
            }})
    }catch (err) {
        console.log(err)
        return res.status(500).json({message: "An error occurred", status: 500})
    }
}