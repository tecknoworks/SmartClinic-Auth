const UserRepository = require('../repositories/UserRepository');
const DoctorRepository = require('../repositories/DoctorRepository');

let get = async (req, res) => {
    let doctor = await DoctorRepository.get();
    res.json(doctor);
}

let getById = async (req, res) => {
    let id = req.params.id;
    let doctor = await DoctorRepository.findById(id);

    res.json(doctor);
}

let getByUserId = async (req, res) => {
    let id = req.params.id;
    let patient = await DoctorRepository.findByUser(id);

    res.json(patient);
}

let post = async (req, res) => {
    let data = { ...req.body };
    let user = await UserRepository.findById(data.user);

    if (user == null) {
        res.status(404).json({
            message: 'User not found!'
        });

        return;
    }

    let doctor = await DoctorRepository.create(data);
    res.json(post);
}

let remove = async (req, res) => {
    let id = req.params.id;
    let doctor = await DoctorRepository.remove(id);

    res.json(doctor);
}

let update = async (req,res) => {
    let id = req.params.id;
    let doctor = await DoctorRepository.findById(id);
    if(!doctor) throw new Error("Doctor not found");

    let data = {...req.body };
    if(!data.id) data.id = id;
    if(!data.speciality) data.speciality = doctor.speciality;
    if(!data.room) data.room = doctor.room;
    if(!data.user) data.user = doctor.user;

    await DoctorRepository.update(id,data);
    res.json( await DoctorRepository.findById(id));
}

module.exports = { get, getById, getByUserId, post, remove, update };