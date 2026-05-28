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
    get readJsonFile () {
        return readJsonFile;
    },
    get readJsonFileOrThrow () {
        return readJsonFileOrThrow;
    }
});
const _fs = require("fs");
const _path = require("path");
const _applicationexception = require("../../application.exception");
const readJsonFile = async (dir, filename)=>{
    const filePath = (0, _path.join)(dir, filename);
    try {
        const content = await _fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch  {
        return null;
    }
};
const readJsonFileOrThrow = async (dir, filename)=>{
    const result = await readJsonFile(dir, filename);
    if (result === null) {
        throw new _applicationexception.ApplicationException(`${filename} not found or invalid in resolved package`, _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED);
    }
    return result;
};

//# sourceMappingURL=read-json-file.util.js.map