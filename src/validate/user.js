import Joi from 'joi';
import boomSchema from "./common/boom";

const newUserRequest = {
  username: Joi.string().required(),
  password: Joi.string().required()
};

const newUserResponse = Joi.alternatives()["try"](boomSchema, {
  result: Joi.boolean()
}).required();

const deleteRequest = {
  username: Joi.string().required()
};

const deleteResponse = Joi.alternatives()["try"](boomSchema, {
  result: Joi.boolean()
}).required();

module.exports = {
  create: {
    validate: {
      payload: newUserRequest
    },
    response: {
      schema: newUserResponse
    }
  },
  "delete": {
    validate: {
      payload: deleteRequest
    },
    response: {
      schema: deleteResponse
    }
  }
};

