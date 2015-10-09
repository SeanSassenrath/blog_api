
module.exports = function() {

  return {
    authenticateUser: authenticateUser
  }

  var authenticateUser = function(req, res) {
    // console.log(req.body.username);
    console.log('TEST')

  //   User.findOne({
  //     username: req.body.username
  //   }).select('password').exec(function(err, user) {
  //     if(err) throw err;
  //     if(!user) {
  //       res.json({
  //         success: false,
  //         message: 'Auth failed. User not found.'
  //       });
  //     } else if(user) {
  //       var validPassword = user.comparePassword(req.body.password);
  //       if(!validPassword) {
  //         res.json({
  //           success: false,
  //           message: 'Auth failed. Wrong password.'
  //         });
  //       } else {
  //         var token = jwt.sign(user, secret, {
  //           expiresInMinutes: 1440
  //         });
  //         res.json({
  //           success: true,
  //           message: 'Token issued.',
  //           token: token
  //         });
  //       }
  //     }
  //   });
  }

}