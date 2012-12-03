var config = {
  appName : 'YOURAPP'
, cookieSecret : 'secret secret secret'
, sessionSecret : 'secret secret secret'
, userDB : 'users'
, couch_url : "http://admin:password@127.0.0.1:5984"

};

// GITHUB AUTH
config.GITHUB_CLIENT_ID = "change me"
config.GITHUB_CLIENT_SECRET = "change me"
config.GITHUB_CALLBACK = "change me"

if (process.env.NODE_ENV == 'local'){ 
}

if (process.env.NODE_ENV == 'production'){
}


module.exports = config
