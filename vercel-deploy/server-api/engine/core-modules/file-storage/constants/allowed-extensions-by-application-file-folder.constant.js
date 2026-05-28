"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ALLOWED_EXTENSIONS_BY_APPLICATION_FILE_FOLDER", {
    enumerable: true,
    get: function() {
        return ALLOWED_EXTENSIONS_BY_APPLICATION_FILE_FOLDER;
    }
});
const _types = require("twenty-shared/types");
const ALLOWED_EXTENSIONS_BY_APPLICATION_FILE_FOLDER = {
    [_types.FileFolder.BuiltLogicFunction]: {
        '.mjs': true
    },
    [_types.FileFolder.BuiltFrontComponent]: {
        '.mjs': true
    },
    [_types.FileFolder.Source]: {
        '.ts': true,
        '.tsx': true,
        '.json': true
    },
    [_types.FileFolder.Dependencies]: {
        '.json': true,
        '.lock': true
    }
};

//# sourceMappingURL=allowed-extensions-by-application-file-folder.constant.js.map