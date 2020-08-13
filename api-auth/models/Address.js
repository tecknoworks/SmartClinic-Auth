var mongoose = require('mongoose');

var Patient = require('./Patient');

const addressSchema = new mongoose.Schema({
    city:{
        type: String,
        require: false
    },
    county:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
})

mongoose.set('useFindAndModify', false);
const Address = mongoose.model('Address', addressSchema);
module.exports = Address;