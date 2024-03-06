const mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {type: String, require: true, index: { unique: true }},
  password: {type: String, require: true},
})

UserSchema.pre('save', async function (next) {
  const user = this;
  
  //only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  //generate a salt with error
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //if there is an error, return the error message
    if (err) return next(err);

    //if not error, hash the password with new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      //if the hash password gives an error
      if (err) return next(err);
      
      //if not override the password inputted with the hashed one
      user.password = hash;
      next();
    });
  });
})

//password verification
UserSchema.method.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('UserSchema', UserSchema);

/*
//UserSchema.method.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err)
    cb(null , isMatch)
  })
}


/*
userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
  user.password = hash;
  return next();
});

*/

/*
const mongose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
  username: {type: String, require: true, unique: true},
  password: {type: Strin, require: true};
})

userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
  user.password = hash;
  return next()
})

//only hash the password if it has been modified or is new
if (!user.isModified('password)) return next()

bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
  if (err) return next(err);

  //hash the password using new salt
  bcrypt.hash(user.password, salt, function(err, hash){
    if (err) return next(err);

    user.password = hash;
    next()
  })
})
*/