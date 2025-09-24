const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        maxlength: [30, 'User Name musn\'t exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'E-mail must be unique'],
        validate: [validator.isEmail, 'Invalid Email'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    authenticatedByGoogle: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
        default: new Date()
    }

    // add exams

}, 
{
    timestamps: true
}
);

userSchema.methods.comparePasswords = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);