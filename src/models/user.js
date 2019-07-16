const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');

require('../db/connect');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    login: {
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 20,
        require: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Invalid email');
            }
        },
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 100,
        validate(password) {
            if (password.toLowerCase() === 'password') {
                throw new Error('Password cannot equal to \'password\'');
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Hash password before storing
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    
    next();
});

// Finds a user by password, login or email
userSchema.statics.findByCredentials = async (login_email, password) => {
    let user = await User.findOne({
        login: login_email,
    });

    if (!user) {
        user = await User.findOne({
            email: login_email,
        });

        if (!user) {
            return;
        }
    }

    // Check if password compares the hashed one
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return;
    }

    return user;
};

// Generate JWT
userSchema.methods.generateWebToken = async function () {
    let token = await jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
    this.tokens.push({
        token
    });

    await this.save();

    return token;
};

userSchema.statics.findByToken = async (token) => {
    let _id  = await jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({
        _id,
        'tokens.token': token
    });

    if (!user) {
        return;
    }

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;