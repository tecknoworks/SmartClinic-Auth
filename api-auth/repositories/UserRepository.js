var User = require('../models/User');
var Repository = require('./Repository');

class UserRepository extends Repository {
    constructor(model) {
        super(model);
    }
}

var userRepository = new UserRepository(User);

module.exports = userRepository;