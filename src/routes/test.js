import * as TestCtrl from "../controllers/test";

module.exports =  [
    {
        method: 'GET',
        path:  '/test',
        handler: TestCtrl.get,
        config: { 
            auth:false
        }
    },
    {
        method: 'POST',
        path:  '/test',
        handler: TestCtrl.post,
        config: {
 
        }
    }
]; 