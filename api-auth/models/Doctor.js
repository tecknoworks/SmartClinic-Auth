var mongoose = require('mongoose');

var User = require('./User');

const doctorSchema = new mongoose.Schema({
    speciality: {
        type: String,
        reuqire: true
    },
    room:{
        type: String,
        reuqire: false
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