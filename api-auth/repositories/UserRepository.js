var User = require('../models/User');
var Repository = require('./Repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transport = require("../utils/transporter");


class UserRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async authenticate({ username, password }) {
        const user = await this.model.findOne({ username });
        if(!user.confirmed) throw new Error('Please confirm your email to login')
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
        
        const userHasEmail = await this.model.findOne({email : userParam.email});
        if (userHasEmail!=null)
            if(userHasEmail.confirmed)
             throw 'Email already "'+ userParam.email + '" taken'
        
        const user = new User(userParam);
        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }

        // save user
        const uu = await user.save();

        const emailToken = jwt.sign(
          {user: uu.id}, transport.EMAIL_SECRET, {expiresIn: '1d'}
        );
        const url = `http://localhost:9000/auth/user/confirmation/${emailToken}`;
        
        await transport.sendgrid.send({
            to: uu.email,
            from:"oanaplopeanu11@gmail.com",
            subject: 'Confirm Email',
            html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
        }, function (err,res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Success.");
            }
        });
        return uu;

    }

    async update(id, userParam) {
        const user = await User.findById(id);
        // validate
        if (!user) throw 'User not found';
        if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }

        if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
            throw 'Email "' + userParam.email + '" is already taken';
        }
        // hash password if it was entered
        if (userParam.password) {
            userParam.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // copy userParam properties to user
        Object.assign(user, userParam);

        // if email updated, then we have to check it first
        //if(userParam.email != null) user.confirmed = false;

        const uu = await user.save();
        return uu;
    }

    async changePassord(param){
        const user = await this.model.findOne({email : param.email});
        //console.log(param.email);
        if(!user) throw "User not found!";

        const pass =  Math.random().toString(36).substring(7);
        
        const passToken = jwt.sign(
            {user: user.id, pass}, transport.EMAIL_SECRET, {expiresIn: '1d'}
        );
        const url = `http://localhost:9000/auth/user/confirmPassword/${passToken}`;
    
        await transport.sendgrid.send({
            to: user.email,
            from:"oanaplopeanu11@gmail.com",
            subject: 'Change password',
            html: `By accessing this link your account password will be:   <b>${pass}</b> 
                    <div>
                    Access the link and log in: <a href="${url}">${url}</a>
                    </div>
                    <div>
                    You cand always change the password inside your profile
                    </div>`,
        }, function (err,res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Success.");
            }
        });

        return user;
    }


}

var userRepository = new UserRepository(User);

module.exports = userRepository;