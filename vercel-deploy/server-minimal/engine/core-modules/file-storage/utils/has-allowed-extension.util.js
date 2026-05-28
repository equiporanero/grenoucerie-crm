"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hasAllowedExtension", {
    enumerable: true,
    get: function() {
        return hasAllowedExtension;
    }
});
const _path = require("path");
const hasAllowedExtension = ({ filePath, allowedExtensions })=>{
    const ext = (0, _path.extname)(filePath).toLowerCase();
    return allowedExtensions[ext] === true;
};

//# sourceMappingURL=has-allowed-extension.util.js.map