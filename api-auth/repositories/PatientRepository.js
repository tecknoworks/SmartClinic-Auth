var Address = require('../models/Address');
var Patient = require('../models/Patient');
var Repository = require('./Repository');

class PatientRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByUser(userId) {
        return await this.model.find({ user: userId }).exec();
    }

    async update(id,patientParams){
        const patient = await Patient.findById(id);

        if(!patient) throw new Error("Patient not found");

        Object.assign(patient, patientParams);

        const pat = await patient.save();
        return pat;
    }

    async addAdress(patientId,address){
        return await this.model.findByIdAndUpdate(patientId, {$push: {addresses: address.id}}, {new: true, useFindAndModify:false});
    }

    async removeAddress(patientId,addressId){
        const patient = await this.model.findById(patientId);
        const address = await Address.findByIdAndRemove(addressId);

        let addresses = patient.addresses.filter(address => {return address != addressId});
        patient.addresses = addresses;

        const newPatient = await patient.save();
        return newPatient;
    }
}

var patientRepository = new PatientRepository(Patient);

module.exports = patientRepository;