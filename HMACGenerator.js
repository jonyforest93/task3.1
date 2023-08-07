const crypto = require('crypto');

class HMACGenerator {
    constructor(key) {
        this.key = key;
    }

    generateHMAC(move) {
        const hmac = crypto.createHmac('sha256', this.key);
        hmac.update(move);
        return hmac.digest('hex');
    }
}

module.exports = HMACGenerator;