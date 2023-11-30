const bcrypt = require('bcrypt');

const utils = {
    hashPassword: async (password) => {
        const hash = await bcrypt.hash(password, 10);
        console.log(hash);
        return hash;
    }
}

module.exports = utils;