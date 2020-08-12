var mongoose = require('mongoose');

var User = require('./User');

const doctorSchema = new mongoose.Schema({
    speciality: {
        type: String,
        reuire: true
    },
    room:{
        type: String,
        reuire: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

doctorSchema.pre('findByIdAndRemove', function(next){
    User.deleteOne( {user: this._conditions._id }).exec();
    next();
});

mongoose.set('useFindAndModify', false);
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;