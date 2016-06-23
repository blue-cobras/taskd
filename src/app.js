'use strict';
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const app  = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
const Routes = require('./routes');
app.connection({port: 3000});
app.register(Inert, () => {});

for (var route in Routes) {
    app.route(Routes[route]);
}

app.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

app.start((err) => {
    if (err){
        throw err;
    } 
    console.log('Server running at:', app.info.uri);
});