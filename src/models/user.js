import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import boom from 'boom'
import * as util from '../util';

const UserSchema = new mongoose.Schema({
    scope: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

UserSchema.statics.validateLogin = function(username, plainPassword) {
  return this.find({
    username: username
  }).then(function(docs) {
    if (docs.length !== 1) {
      return null;
    }
    return new Promise(function(resolve, reject) {
      return bcrypt.compare(plainPassword, docs[0].passwordHash, function(err, res) {
        if (err) {
          reject(err);
        }
        if (res) {
          return resolve(docs[0].toJSON());
        } else {
          return resolve(null);
        }
      });
    });
  });
};

UserSchema.statics.saveNewUser = function(username, plainPassword, scope) {
  var self;
  self = this;
  return self.find({
    username: username
  }).then(function(docs) {
    if (docs.length > 0) {
      throw boom.badRequest('Username already exists');
    }
    return new Promise(function(resolve, reject) {
      return bcrypt.hash(plainPassword, 10, function(err, hash) {
        var newUser;
        if (err) {
          reject(err);
        }
        newUser = new self();
        newUser.username = username;
        newUser.scope = scope;
        newUser.passwordHash = hash;
        return resolve(newUser);
      });
    });
  }).then(function(newUser) {
    return newUser.save().then(function() {
      return newUser;
    });
  });
};

UserSchema.statics.deleteUser = function(username){
    return this.findOneAndRemove({username: username}).exec().then(record => {
        if(record === null){throw boom.badRequest('Username does not exist')}
        return true;
    })
};

UserSchema.path('username').validate(((value) => {
    return !util.nullOrEmpty(value)
}),'username cannont be blank');

UserSchema.path('scope').validate(((value) => {
    return !util.nullOrEmpty(value)
}),'scope cannont be blank');

UserSchema.path('passwordHash').validate(((value) => {
    return !util.nullOrEmpty(value)
}),'passwordHash cannont be blank');

module.exports = mongoose.model('User', UserSchema);