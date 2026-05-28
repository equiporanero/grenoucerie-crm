"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildFileInfo", {
    enumerable: true,
    get: function() {
        return buildFileInfo;
    }
});
const _uuid = require("uuid");
const buildFileInfo = (filename)=>{
    const parts = filename.split('.');
    const ext = parts.length > 1 ? parts.pop() || '' : '';
    const name = `${(0, _uuid.v4)()}${ext ? `.${ext}` : ''}`;
    return {
        ext,
        name
    };
};

//# sourceMappingURL=build-file-info.utils.js.map