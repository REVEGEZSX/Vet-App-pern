const passport = require('passport');
const { Strategy } = require('passport-jwt');
exports.userAuth = passport.authenticate('', {session: false})