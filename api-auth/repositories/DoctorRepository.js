var Doctor = require('../models/Doctor');
var Repository = require('./Repository');

class DoctorRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByUser(userId) {
        return await this.model.find({ user: userId }).exec();
    }
}

var doctorRepository = new DoctorRepository(Doctor);

module.exports = doctorRepository;