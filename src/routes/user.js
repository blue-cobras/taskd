import * as UserCtrl from "../controllers/user";
import * as UserValidation from "../validate/user";

module.exports =  [
    {
        method: 'POST',
        path:  '/api/user/create',
        handler: UserCtrl.createNewUser,
        config: { 
            auth:{
                strategy: 'jwt',
                scope: 'admin'
            },
            response: UserValidation.create.response,
            validate: UserValidation.create.validate
        }
    },
    {
        method: 'DELETE',
        path:  '/api/user/delete',
        handler: UserCtrl.deleteUser,
        config: {
            auth:{
                strategy: 'jwt',
                scope: 'admin'
            },
            response: UserValidation.delete.response,
            validate: UserValidation.delete.validate
        }
    }
]; 