import * as Path from 'path';
import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Routes from './routes';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import * as config from './config';
import User from './models/user';
import boom from 'boom';

const app  = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
app.connection({port: 3000});

app.ext('onPreResponse',(req,res) => {
  if (req.response.isBoom && req.response.data) {
    req.response.output.payload.data = req.response.data;
  }
  return res["continue"]();
});

app.ext('onPreAuth',(req,res) => {
    let authorization = req.raw.req.headers.authorization;
    let parts = authorization != null ? authorization.split(/\s+/) : void 0;
    if ((parts != null) && parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
        let tokenPayload = jwt.decode(parts[1]);
        if ((tokenPayload != null) && tokenPayload.scope !== 'admin' && (tokenPayload.remoteAddress !== req.info.remoteAddress || tokenPayload.host !== req.info.host)) {
            return res(boom.unauthorized('Invalid token'));
        }
    }
    return res["continue"]();
});

mongoose.connection.on('connected', function() {
  return app.register([
    {
      register: require('hapi-auth-jwt2')
    },
    {
        register: Inert
    }
  ], function(err) {
    app.auth.strategy('jwt', 'jwt', true, {
      key: config.API.JWTSecret,
      verifyOptions: {
        algorithms: ['HS512']
      },
      validateFunc: function(decoded, request, cb) {
        return User.find({
          username: decoded.username,
          scope: decoded.scope
        }).then(function(users) {
          if (users.length === 1) {
            return cb(null, true, decoded);
          } else {
            return cb(null, false, {});
          }
        });
      }
    });
    app.auth.scope = ['admin', 'user'];

    // load all routes
    require('./routes')(app)

    //serves up frontend
    app.route({
        method: 'GET',
        path: '/{param*}',
        config: {
            auth: false,
        },
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });
    return app.start((err) => {
        if (err){
            throw err;
        } 
        console.log('Server running at:', app.info.uri);
        console.log('admin token:', jwt.sign({ username: 'admin', scope: 'admin' }, config.API.JWTSecret, { algorithm: 'HS512' }));
        console.log('user token:', jwt.sign({ username: 'user', scope: 'user' }, config.API.JWTSecret, { algorithm: 'HS512' }))
    });
  });
});

mongoose.connect(config.mongo.uri, config.mongo.settings);

module.exports = app;