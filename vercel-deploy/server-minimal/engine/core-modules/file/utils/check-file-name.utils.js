"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkFilename", {
    enumerable: true,
    get: function() {
        return checkFilename;
    }
});
const _common = require("@nestjs/common");
const _path = require("path");
const checkFilename = (filename)=>{
    const sanitizedFilename = filename.replace(/\0/g, '');
    if (!sanitizedFilename || sanitizedFilename.includes('/') || sanitizedFilename.includes('\\') || !sanitizedFilename.includes('.')) {
        throw new _common.BadRequestException(`Filename '${filename}' is not allowed`);
    }
    return (0, _path.basename)(sanitizedFilename);
};

//# sourceMappingURL=check-file-name.utils.js.map