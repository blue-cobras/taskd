import Joi from 'joi';
import boomSchema from "./common/boom";
import _ from 'lodash';

const loginRequest = {
  username: Joi.string().required(),
  password: Joi.string().required()
};

const loginResponse = Joi.alternatives()["try"](boomSchema, {
  result: Joi.string()
}).required();

const refreshTokenRequest = {
  token: Joi.string().required()
};

const refreshTokenResponse = Joi.alternatives()["try"](boomSchema, {
  result: Joi.string()
}).required();

module.exports = {
  login: {
    validate: {
      payload: loginRequest
    },
    response: {
      schema: loginResponse
    }
  },
  refreshToken: {
    validate: {
      payload: refreshTokenRequest
    },
    response: {
      schema: refreshTokenResponse
    }
  }
};
