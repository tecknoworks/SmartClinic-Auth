const PatientRepository = require("../repositories/PatientRepository");
const UserRepository = require ("../repositories/UserRepository");
const AddressRepository = require("../repositories/AdressRepository");

let get = async (req, res) => {
    let patients = await PatientRepository.get();
    res.json(patients);
}

let getById = async (req, res) => {
    let id = req.params.id;

    let patient = await PatientRepository.findById(id);
    res.json(patient);
}

let getByUserId = async (req, res) => {
    let id = req.params.id;
    let patient = await PatientRepository.findByUser(id);

    res.json(sortedTiers);
}

let post = async (req, res, next) => {
    try {
        let data = { ...req.body };
        let user = await UserRepository.findById(data.user);

        if (user == null) {
            res.status(404).json({
                message: 'User not found!'
            });
            return;
        }

        let patient= await PatientRepository.create(data);
        res.json(patient);
    } catch (e) {
        next(e);
    }
}

let remove = async (req, res) => {
    let id = req.params.id;

    let patient = await PatientRepository.remove(id);
    res.json(patient);
}

let update = async (req,res) => {
    let id = req.params.id;
    let data = {...req.body };

    let newPatient = await PatientRepository.update(id,data);
   res.json(newPatient);
}

let addAddress = async (req, res) => {
    let id = req.params.id;
    let data = { ...req.body };

    let address = await AddressRepository.create(data);
    let patient = await PatientRepository.addAdress(id, address);

    res.json(patient);
}

let deleteAddress = async(req,res) =>{
    const patientId = req.params.patientId;
    const addressId = req.params.addressId;

    let patient = await PatientRepository.findById(patientId);
    if(!patient) throw new Error ("Patient not found!");

    let address = await AddressRepository.findById(addressId);
    if(!address) throw new Error("Address not found!");

    let newAddress =await  PatientRepository.removeAddress(patientId, addressId);
    res.json(newAddress);
}


module.exports = { get, getById, getByUserId, post, remove, update, addAddress, deleteAddress };