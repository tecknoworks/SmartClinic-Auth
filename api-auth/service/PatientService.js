const { base64_encode } = require('../utils');
const PatientRepository = require("../repositories/PatientRepository");
const UserRepository = require ("../repositories/UserRepository")

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
    
    let patient = await PatientRepository.findById(id);
    if(!patient) throw new Error("Patient not found")

    let data = {...req.body };
    if(!data.id) data.id = id;
    if(!data.medical_history) data.medical_history = patient.medical_history;
    if(!data.information) data.information = patient.information;
    if(!data.user) data.user = patient.user;

    await PatientRepository.update(id,data);
    res.json(await PatientRepository.findById(id));
}

module.exports = { get, getById, getByUserId, post, remove, update };