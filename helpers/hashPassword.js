'use strict'

const crypto = require('crypto')

function hashPassword (input) {
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', process.env.SECRET)
                    .update(input)
                    .digest('hex');
    return hash                
}

module.exports = hashPassword