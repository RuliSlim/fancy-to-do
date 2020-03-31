const bcrypt = require('bcrypt');

const hashedPassword = password => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

const compare = (password, user) => {
  return bcrypt.compareSync(password, user);
}

module.exports = {
  hashedPassword,
  compare
};