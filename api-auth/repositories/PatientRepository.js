var Patient = require('../models/Patient');
var Repository = require('./Repository');
const { patient } = require('../models/RoleEnum');

class PatientRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByUser(userId) {
        return await this.model.find({ user: userId }).exec();
    }
}

var patientRepository = new PatientRepository(Patient);

module.exports = patientRepository;