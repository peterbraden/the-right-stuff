var _ = require('underscore')
  , fs = require('fs')
  , config = require('./config')
  , couch = require('nano')(config.couch_url)
  , userdb = couch.use(config.userDB)


var User = function(opts){
  _.extend(this, opts);
}

User.prototype.save = function(cb){
  var user = this
  userdb.insert(this, this.id, function(err, body){
    if (cb) { cb(null, user) }
  });
}

User.create = function(opts, cb){
  var user = new User(opts);
  user.save(cb)
}

User.createFromGithub = function(ghprofile, cb){

  var opts = {
      id : ghprofile.id
    , displayName : ghprofile.displayName
    , github : ghprofile
  }

  User.create(opts, cb)
}


User.findOrCreate = function(opts, cb){
  var id = opts.id

  userdb.get(id, function(err, body){
    if (err){
      return User.createFromGithub(opts, cb);
    }

    var user = new User(body);
    cb(null, user);
  })
}

User.findById = function(id, cb){
  userdb.get(id, function(err, body){
    if (err){
      return cb("User not found")
    }
    var user = new User(body);
    cb(null, user);
  })
}

module.exports.User = User
