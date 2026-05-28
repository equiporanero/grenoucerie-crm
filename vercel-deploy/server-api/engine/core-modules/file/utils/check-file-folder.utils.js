"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkFileFolder", {
    enumerable: true,
    get: function() {
        return checkFileFolder;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _kebabcase = require("../../../../utils/kebab-case");
const checkFileFolder = (filePath)=>{
    const allowedFolders = Object.values(_types.FileFolder).map((value)=>(0, _kebabcase.kebabCase)(value));
    const sanitizedFilePath = filePath.replace(/\0/g, '');
    const [rootFolder] = sanitizedFilePath.split('/');
    if (!allowedFolders.includes(rootFolder)) {
        throw new _common.BadRequestException(`Folder ${rootFolder} is not allowed`);
    }
    return rootFolder;
};

//# sourceMappingURL=check-file-folder.utils.js.map