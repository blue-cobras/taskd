import * as TestCtrl from "../controllers/test";

module.exports =  [
    {
        method: 'GET',
        path:  '/api/test',
        handler: TestCtrl.get,
        config: { 
            auth:false
        }
    },
    {
        method: 'POST',
        path:  '/api/test',
        handler: TestCtrl.post,
        config: {
 
        }
    }
]; 