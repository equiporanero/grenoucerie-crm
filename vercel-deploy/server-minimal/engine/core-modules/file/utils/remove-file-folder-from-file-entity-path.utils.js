"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeFileFolderFromFileEntityPath", {
    enumerable: true,
    get: function() {
        return removeFileFolderFromFileEntityPath;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const removeFileFolderFromFileEntityPath = (path)=>{
    const [fileFolder, ..._path] = path.split('/');
    if (!Object.values(_types.FileFolder).includes(fileFolder)) throw new _common.BadRequestException(`File folder ${fileFolder} is not allowed`);
    return path.replace(`${fileFolder}/`, '');
};

//# sourceMappingURL=remove-file-folder-from-file-entity-path.utils.js.map