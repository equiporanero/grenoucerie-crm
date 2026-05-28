"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateWebhookSecret", {
    enumerable: true,
    get: function() {
        return generateWebhookSecret;
    }
});
const _crypto = require("crypto");
const generateWebhookSecret = ()=>{
    return (0, _crypto.randomBytes)(32).toString('hex');
};

//# sourceMappingURL=generate-webhook-secret.util.js.map