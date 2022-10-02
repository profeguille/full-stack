const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/usuarios.models.js');
const { isValidPassword, createHash } = require('../utils/helpers/bcrypt.js');

function configPassport(passport) {
  passport.use(
    'login',
    new LocalStrategy((username, password, done) => {
      Usuarios.findOne({ username: username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          console.log('User Not Found with username ' + username);
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null, false);
        }

        //QUEDA LOGUEADO!
        return done(null, user);
      });
    })
  );

  passport.use(
    'signup',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        Usuarios.findOne({ username: username }, function (err, user) {
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }

          if (user) {
            console.log('User already exists');
            return done(null, false);
          }

          const newUser = {
            username: username,
            password: createHash(password),
          };
          Usuarios.create(newUser, (err, user) => {
            if (err) {
              console.log('Error in Saving user: ' + err);
              return done(err);
            }
            console.log(user);
            console.log('User Registration succesful');
            //QUEDA LOGUEADO
            return done(null, user);
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
  });
}
module.exports = { configPassport };
