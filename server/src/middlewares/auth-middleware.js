const passport = require('passport');
exports.userAuth = passport.authenticate('', {session:false})