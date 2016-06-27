const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const util = ('../util');
const boom = require('boom');

const UserSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

UserSchema.statics.validateLogin = function validateLogin(username, plainPassword){
    this
        .find({username: username})
        .then(docs => {
            if(docs.length !== 1){return null}
            return new Promise((resolve,reject) => {
                bcrypt.compare(plainPassword, docs[0].passwordHash,(err,result) =>{
                    if (err) { return reject(err); }
                    return result ? resolve(docs[0].toJSON()) : reject(null);
                })
            })
        })
};

UserSchema.statics.saveNewUser = function saveNewUser(username, plainPassword, role){
    this
        .find({username: username})
        .then(docs => {
            if(docs.length > 0){throw boom.badRequest('Username already exists')}
            return new Promise((resolve,reject) => {
                bcrypt.hash(plainPassword,10,(err,hash) => {
                    if (err) { return reject(err); }
                    var newUser = new this();
                    newUser.username = username;
                    newUser.role = role;
                    neUSer.passwordHash = hash;
                    resolve(newUser)
                })
            })
        })
        .then(newUser => {
            newUser.save().then(() => {
                return newUser;
            })
        })
};

UserSchema.statics.deleteUser = function deleteUser(username){
    this.findOneAndRemove({username: username}).exec().then(record => {
        if(record === null){throw boom.badRequest('Username does not exist')}
        return true;
    })
};

UserSchema.path('username').validate(((value) => {
    return !util.nullOrEmpty(value)
}),'username cannont be blank');

UserSchema.path('role').validate(((value) => {
    return !util.nullOrEmpty(value)
}),'role cannont be blank');

UserSchema.path('passwordHash').validate(((value) => {
    return !util.nullOrEmpty(value)
}),'passwordHash cannont be blank');

module.exports = mongoose.model('User', UserSchema);