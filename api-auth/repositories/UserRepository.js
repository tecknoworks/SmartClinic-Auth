var User = require('../models/User');
var Repository = require('./Repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async authenticate({ username, password }) {
        const user = await this.model.findOne({ username });
        console.log("parola: ", password);
        console.log("user hash: ", user.hash);
        if (user && bcrypt.compareSync(password, user.hash)) {
            const token = jwt.sign({ sub: user.id }, "String to initialize the key", { expiresIn: '7d' });
            return {
                ...user.toJSON(),
                token
            };
        }
    }

    async create(userParam) {
        // validate
        if (await this.model.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }
        const user = new User(userParam);
        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        const uu = await user.save();
        return uu;
    }

    async update(id, userParam) {
        const user = await User.findById(id);
    
        // validate
        if (!user) throw 'User not found';
        if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }
        // hash password if it was entered
        if (userParam.password) {
            userParam.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // copy userParam properties to user
        Object.assign(user, userParam);
    
        await user.save();
    }
}

var userRepository = new UserRepository(User);

module.exports = userRepository;