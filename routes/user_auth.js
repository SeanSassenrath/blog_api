var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var config = require('../config');
var authHelper = require('./helpers/user_auth_helpers.js')()

var secret = config.secret;

module.exports = function(app, express) {
  var authRouter = express.Router();

  //test authHelper
  // authRouter.get('/authenticate', authHelper.authenticateUser)
  authRouter.route("/verify")

    .post(function(req, res) {
    console.log(req.body.username);

    User.findOne({username: req.body.username}).select('password').exec(function(err, user) {
      if (err) throw err;

      if(!user) {
        res.json({
          message: "user not found"
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            message: "incorrect password"
          });
        } else {
          console.log("issuing a token")
          var token = jwt.sign(user, secret, {
            expiresInMinutes: 1440
          })

          res.json({
            success: "true",
            message: "token issued",
            token: token
          })
        }
      }
    })
  })

  authRouter.route("/users")

    .post(function(req, res) {
      var user = new User();
      user.name = req.body.name;
      user.username = req.body.username;
      user.password = req.body.password;

      user.save(function(err) {
        if (err) res.send(err);
        res.json({message: "User created"})
      })
    })

    .get(function(req,res) {
      User.find(function(err, users) {
        if (err) res.send(err);
        res.json(users);
      })
    })

  authRouter.use(function(req, res, next) {
    console.log("Someone just came to my app")
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    if (token) {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.json({message: "Failed to authenticate token"})
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else {
      return res.status(403).send({
        message: "No token provided"
      })
    }
  })

  return authRouter;

}