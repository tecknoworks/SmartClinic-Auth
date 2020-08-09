const UserRepository = require('../repositories/UserRepository');
const userRepository = require('../repositories/UserRepository');


let get = async (req, res) => {
    let users = await UserRepository.get();
    res.json(users);
}

let getById = async (req, res) => {
    let id = req.params.id;
    let user = await UserRepository.findById(id);

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

let findUser = async (req,res) => {
    let username = req.params.username;
    let user = await UserRepository.findByUsername(username);

    res.json(user);
}

let authenticate = async (req, res, next) => {
    let data = { ...req.body };
    await userRepository.authenticate(data)
            .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
}

let register = async (req, res, next) => {
    let data = { ...req.body };
    await userRepository.create(data)
            .then(user => res.json(user))
            .catch(err => next(err));
}




module.exports = { get, getById, remove, update, authenticate, findUser, register };