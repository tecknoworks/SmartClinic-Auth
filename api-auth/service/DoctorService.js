const UserRepository = require('../repositories/UserRepository');
const DoctorRepository = require('../repositories/DoctorRepository');

let get = async (req, res) => {
    let doctor = await DoctorRepository.findDoctor();
    res.json(doctor);
}

let getById = async (req, res) => {
    let id = req.params.id;
    let doctor = await DoctorRepository.findById(id);

    res.json(doctor);
}

let getBySpeciality = async(req, res, next) => {
   
    await DoctorRepository.getBySpeciality(req.body.speciality)
    .then(
        doctors => {
            res.json(doctors)
        }
    )
    .catch(err => next(err))
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
    res.json(doctor);
}

let remove = async (req, res) => {
    let id = req.params.id;
    let doctor = await DoctorRepository.remove(id);

    res.json(doctor);
}

let update = async (req,res) => {
    let id = req.params.id;
    let data = {...req.body };

    let newDoctor = await DoctorRepository.update(id,data);
    res.json(newDoctor)
}

module.exports = { get, getById, getByUserId, post, remove, update, getBySpeciality };