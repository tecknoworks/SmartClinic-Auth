var Doctor = require('../models/Doctor');
var Repository = require('./Repository');

class DoctorRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByUser(userId) {
        return await this.model.find({ user: userId }).exec();
    }

    async update(id,doctorParam){
        const doctor = await Doctor.findById(id);
        //validate
        if(!doctor) throw new Error("Doctor not found");

        // copy doctorParam properties to user
        Object.assign(doctor, doctorParam);

        const doc = await doctor.save();
        console.log("123")
        return doc;
    }
}

var doctorRepository = new DoctorRepository(Doctor);

module.exports = doctorRepository;