const UserRepository = require('../repositories/UserRepository');

let get = async (req, res) => {
    let users = await UserRepository.get();
    res.json(users);
}

let getById = async (req, res) => {
    let id = req.params.id;
    let user = await UserRepository.findById(id);

    res.json(user);
}


let post = async (req, res) => {
    let data = { ...req.body };

    //ar fi necesar ceva validare

    let user = await UserRepository.create(data);
    res.json(user);
}

let remove = async (req, res) => {
    let id = req.params.id;
    let user = await UserRepository.remove(id);

    res.json(user);
}

let update = async (req,res) => {
    let id = req.params.id;
    let data = {...req.body };

    let newUser = await UserRepository.update(id,data);
    res.json(newUser);
}

module.exports = { get, getById, post, remove, update };