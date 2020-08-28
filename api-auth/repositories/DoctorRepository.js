var Doctor = require('../models/Doctor');
var Repository = require('./Repository');
const axios = require('axios')

class DoctorRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByUser(userId) {
        return await this.model.find({ user: userId }).exec();
    }

    async functionWithPromise(item) { //a function that returns a promise
        return Promise.resolve('ok')
    }

    async getRating(doctorId) {
        let rating = await axios.get(`http://localhost:9001/review/getAverageRating/${doctorId}`)

        return Math.round((rating.data + Number.EPSILON) * 100) / 100
    }

    async getData(data) {
        return Promise.all(data.map(doctor => this.getRating(doctor._id)))
    }

    async findDoctor() {
        let data = await this.model.aggregate([
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            }
        ])

        let ratings = await this.getData(data)
        let i = 0

        data.forEach(doctor => {
            
            doctor.rating = ratings[i]
            i++
        })
        console.log(data)
        return data
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
}

var doctorRepository = new DoctorRepository(Doctor);

module.exports = doctorRepository;