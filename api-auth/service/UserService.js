const UserRepository = require('../repositories/UserRepository');
const userRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const transport = require("../utils/transporter");

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
   return newUser;
}

let findUser = async (req,res) => {
    let username = req.params.username;
    let user = await UserRepository.findByUsername(username);

    res.json(user);
}

let authenticate = async (req, res, next) => {
    let data = { ...req.body };
    console.log("incearca si el");
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

let confirmation = async (req, res) => {
    await jwt.verify(req.params.token,transport.EMAIL_SECRET,
        async function(err,userVerif){
        if(err){
            console.log(err); // Token has expired, has been tampered with, etc
            //return err;
        }else
            try{
                const id = userVerif.user;
                const user =await userRepository.update( id, { confirmed: true });  
            }catch(e){
                console.log('error');
            }
        });
    
    return res.redirect('https://ro.pinterest.com/pin/694469205030540262/')
    //return res.redirect('http:/localhost:9000/auth/user/login'); //pentru ca nu am o pagina implementata pe
                                                            // frontend pentru login, nu se va deschide acest 
                                                            //link, insa pentru testare, am lasat link-ul de mai
                                                            // sus ca se redirectioneaza pagina si este posibila
                                                            //acum logarea in aplicatie
}    




module.exports = { get, getById, remove, update, authenticate, findUser, register, confirmation };