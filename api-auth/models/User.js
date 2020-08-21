var mongoose = require('mongoose');
const role = require('./RoleEnum')

const Doctor = require('./Doctor');
const Patient = require('./Patient');

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
        },

        doctor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dcotor'
        },

        patient:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dcotor'
        }
    }
);

userSchema.pre('findOneAndRemove', function(next){
    console.log('aici sunt');
    Patient.deleteOne( {user:this._conditions._id}).exec();
    Doctor.deleteOne( {user:this._conditions._id}).exec();
    next();
});

mongoose.set('useFindAndModify', false);
const User = mongoose.model('User',userSchema);
module.exports = User;