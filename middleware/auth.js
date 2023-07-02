const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authGuard = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, 'secret');
        const { id } = decoded;
        const user = await User.findById(id) .select('_id email');
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
