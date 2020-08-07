var mongoose = require('mongoose');

var User = require('./User');

const patientSchema = new mongoose.Schema({
    medical_history:{
        type: String,
        require: false
    },
    information:{
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

patientSchema.pre('findOneAndRemove', function(next){
    User.deleteOne( {user: this._conditions._id }).exec();
    next();
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;