"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "logicFunctionCreateHash", {
    enumerable: true,
    get: function() {
        return logicFunctionCreateHash;
    }
});
const _crypto = require("crypto");
const logicFunctionCreateHash = (fileContent)=>{
    return (0, _crypto.createHash)('sha512').update(fileContent).digest('hex').substring(0, 32);
};

//# sourceMappingURL=logic-function-create-hash.utils.js.map