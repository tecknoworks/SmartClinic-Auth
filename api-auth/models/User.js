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

        confirmed: {
            type: Boolean,
            defaultValue: false,
        },

        phone: {
            type: String,
            require : true
        },

        email:{
            type: String,
            require: true,
            unique: true
        },


        role: {
            type: role
        }
    }
);
mongoose.set('useFindAndModify', false);
const User = mongoose.model('User',userSchema);
module.exports = User;