export const get = function(req,reply){
    console.log('test get');
    return reply('test get');
};

export const post = function(req,reply){
    console.log('test post');
    return reply('test post');
};