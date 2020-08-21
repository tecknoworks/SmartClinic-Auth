var mongoose = require('mongoose');

var User = require('./User');
var Address = require('./Address');

const patientSchema = new mongoose.Schema({
    medical_history:{
        type: String,
        require: false
    },
    information:{
        type: String,
        require: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addresses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Address'
    }]
})

patientSchema.pre('findOneAndRemove', function(next){
    Address.deleteMany( {patient:this._conditions._id}).exec();
    next();
});


mongoose.set('useFindAndModify', false);
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;