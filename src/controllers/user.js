const boom = require('boom');
const UserModel = require('../models/user');

export const login = function(req,res) {
    UserModel
        .saveNewUser(req.payload.username, req.payload.password, 'user')
        .then(user => {
            return res({result:true});
        }, err => {
            return res(boom.wrap(err));
        })
};

export const deleteUser = function(req,res){
    UserModel
        .deleteUser(req.payload.username)
        .then(result => {
            return res({result:result});
        }, err => {
            return res(boom.wrap(err));
        })
};