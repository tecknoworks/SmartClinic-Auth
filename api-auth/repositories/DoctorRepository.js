var Doctor = require('../models/Doctor');
var User = require('../models/User');
var Repository = require('./Repository');

class DoctorRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByUser(userId) {
        return await this.model.find({ user: userId }).exec();
    }

    async update(id, doctorParam) {
        const doctor = await Doctor.findById(id);

        if (!doctor) throw new Error("Doctor not found");

        Object.assign(doctor, doctorParam);

        const doc = await doctor.save();
        console.log("123")
        return doc;
    }

    async getBySpeciality(speciality) {
        const doctors = await Doctor.find({ speciality: speciality }, function (err, res) {
            if (err) {
                return err
            }
        })
        return doctors
    }


    async findDoctor(){
        let data = await this.model.aggregate([
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'user',
                    foreignField:  '_id',
                    as: 'userDetails'
                }
            }
        ])
 
        return data
    }

}

var doctorRepository = new DoctorRepository(Doctor);

module.exports = doctorRepository;