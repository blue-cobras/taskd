const TestCtrl = require('../controllers/test');

module.exports =  [
    {
        method: 'GET',
        path:  '/test',
        handler: TestCtrl.get,
        config: { 

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