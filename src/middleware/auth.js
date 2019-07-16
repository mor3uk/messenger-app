const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        let token = req.header('Authorization').replace('Bearer ', '');
        let user  = await User.findByToken(token);
        if (!user) {
            throw new Error();
        }
    
        req.user  = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(404).send('Please authenticate');
    }
    
};

module.exports = auth;