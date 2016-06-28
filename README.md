# taskd
Team manager built in Node

* make sure you have node/npm/gulp installed
* run "gulp" from root to build and start the server (localhost:3000)
* frontend filed will be moved to dist/public
* known issue with nodemon not restarting on windows on file change

### API Endpoints - all requests except login requre a JWT
* `/api/login` - takes `{"username":"user123","password":"pwd123"}` will return JWT or error
* `/api/refreshToken` - will refresh token CURRENTLY UNTESTED
* `/api/user/create` - will create a user and return true/false, requires admin scope (role)
* `/api/user/delete` - will delete a user and return true/false, requires admin scope (role) CURRENTLY UNTESTED