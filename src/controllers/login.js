import jwt from 'jsonwebtoken';
import boom from 'boom';
import LoginModel from '../models/user';
import config from '../config';

export const login = (req,res) => {
    LoginModel
        .validateLogin(req.payload.username, req.payload.password)
        .then(doc => {
            if(doc === null){return res(boom.unauthorized('Invalid username or password'))}

            let tokenPayload = {
                username: doc.username,
                scope: doc.scope,
                remoteAddress: req.info.remoteAddress,
                host: req.info.host
            };

            let token = jwt.sign(tokenPayload, config.API.JWTSecret, {
                expiresIn: config.API.defaultTokenExp,
                algorithm: 'HS512'
            });

            return res({result: token});
        });
};

export const refreshToken = (req,res) => {
    jwt.verify(req.payload.token, config.API.JWTSecret, (err,decoded) => {
        if(err){return res(boom.badRequest('Invalid Token'))}

        let token = jwt.sign(decoded, config.API.JWTSecret, {
            expiresIn: config.API.defaultTokenExp,
            algorithm: 'HS512'
        });

        return res({result: token});
    });
};