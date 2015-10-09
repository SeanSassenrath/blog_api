var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var authHelper = require('./user_auth_helpers.js')()

var secret = config.secret;

module.exports = function(app, express) {
  var userApiRouter = express.Router();

  //test authHelper
  userApiRouter.get('/test', authHelper.authenticateUser)

}