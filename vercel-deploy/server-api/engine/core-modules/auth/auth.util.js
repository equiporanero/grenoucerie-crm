"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get PASSWORD_REGEX () {
        return PASSWORD_REGEX;
    },
    get compareHash () {
        return compareHash;
    },
    get decryptText () {
        return decryptText;
    },
    get encryptText () {
        return encryptText;
    },
    get hashPassword () {
        return hashPassword;
    }
});
const _crypto = require("crypto");
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const PASSWORD_REGEX = /^.{8,50}$/;
const saltRounds = 10;
const hashPassword = async (password)=>{
    return await _bcrypt.hash(password, saltRounds);
};
const compareHash = async (password, passwordHash)=>{
    return _bcrypt.compare(password, passwordHash);
};
const encryptText = (textToEncrypt, key)=>{
    const keyHash = (0, _crypto.createHash)('sha512').update(key).digest('hex').substring(0, 32);
    const iv = (0, _crypto.randomBytes)(16);
    const cipher = (0, _crypto.createCipheriv)('aes-256-ctr', keyHash, iv);
    return Buffer.concat([
        iv,
        cipher.update(textToEncrypt),
        cipher.final()
    ]).toString('base64');
};
const decryptText = (textToDecrypt, key)=>{
    const textBuffer = Buffer.from(textToDecrypt, 'base64');
    const iv = textBuffer.subarray(0, 16);
    const text = textBuffer.subarray(16);
    const keyHash = (0, _crypto.createHash)('sha512').update(key).digest('hex').substring(0, 32);
    const decipher = (0, _crypto.createDecipheriv)('aes-256-ctr', keyHash, iv);
    return Buffer.concat([
        decipher.update(text),
        decipher.final()
    ]).toString();
};

//# sourceMappingURL=auth.util.js.map