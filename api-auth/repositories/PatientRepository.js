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

        //validate
        if(!patient) throw new Error("Doctor not found");

        // copy patientParams properties to user
        Object.assign(patient, patientParams);

        const pat = await patient.save();
        return pat;
    }
}

var patientRepository = new PatientRepository(Patient);

module.exports = patientRepository;