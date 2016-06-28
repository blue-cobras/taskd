import * as LoginCtrl from "../controllers/login";
import * as LoginValidation from "../validate/login";

module.exports = [
  {
    method: 'POST',
    path: '/api/login',
    handler: LoginCtrl.login,
    config: {
      auth: false,
      response: LoginValidation.login.response,
      validate: LoginValidation.login.validate
    }
  }, {
    method: 'POST',
    path: '/api/refreshToken',
    handler: LoginCtrl.refreshToken,
    config: {
      auth: false,
      response: LoginValidation.refreshToken.response,
      validate: LoginValidation.refreshToken.validate
    }
  }
];