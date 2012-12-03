var configs = require('../config')


module.exports.route = function(app){

  /*
  * GET home page.
  */
  app.get('/', function(req, res){
    return res.render('index', { appName: configs.appName, title: 'Hello, World', user:req.user });
  });


}
