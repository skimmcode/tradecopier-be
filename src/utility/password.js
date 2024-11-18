const bcrypt = require('bcryptjs');

const hash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(15));

const comparepassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

module.exports = {
hash,
comparepassword
}