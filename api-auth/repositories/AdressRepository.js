var Address = require('../models/Address');
var Repository = require('./Repository');

class AddressRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByPatient(patientId) {
        return await this.model.find({ patient: patientId }).exec();
    }

    async update(id,addressParam){
        const address = await Address.findById(id);

        //validate
        if(!address) throw new Error("Address not found");

        // copy addressParam properties to user
        Object.assign(address, addressParam);

        const add = await address.save();
        return add;
    }
}

var addressRepository = new AddressRepository(Address);

module.exports = addressRepository;