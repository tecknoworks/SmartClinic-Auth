const PatientRepository = require('../repositories/PatientRepository');
const AddressRepository = require('../repositories/AdressRepository');

let get = async (req, res) => {
    let address = await AddressRepository.get();
    res.json(address);
}

let getById = async (req, res) => {
    let id = req.params.id;
    let address = await AddressRepository.findById(id);

    res.json(address);
}

let getByPatientId = async (req, res) => {
    let id = req.params.id;
    let address = await AddressRepository.findByPatient(id);

    res.json(address);
}


let remove = async (req, res) => {
    let id = req.params.id;
    let address = await AddressRepository.remove(id);

    res.json(address);
}

let update = async (req,res) => {
    let id = req.params.id;
    let data = {...req.body };

    let newAddress = await AddressRepository.update(id,data);
   res.json(newAddress);
}

module.exports = { get, getById, getByPatientId, remove, update };