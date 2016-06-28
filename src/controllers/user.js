import boom from 'boom';
import UserModel from '../models/user';

export const createNewUser = (req,res) => {
    UserModel
        .saveNewUser(req.payload.username, req.payload.password, 'user')
        .then(user => {
            return res({result:true});
        }, err => {
            return res(boom.wrap(err));
        })
};

export const deleteUser = (req,res) => {
    UserModel
        .deleteUser(req.payload.username)
        .then(result => {
            return res({result:result});
        }, err => {
            return res(boom.wrap(err));
        })
};