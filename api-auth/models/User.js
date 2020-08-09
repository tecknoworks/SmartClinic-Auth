var mongoose = require('mongoose');
const role = require('./RoleEnum')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true
        },

        lastName: {
            type: String,
            require: true
        },

        username: {
            type: String,
            require: true
        },

        hash: {
            type: String,
            require: true
        },

        phone: {
            type: String,
            require : true
        },

        role: {
            type: role
        }

    }
);



const User = mongoose.model('User',userSchema);
module.exports = User;