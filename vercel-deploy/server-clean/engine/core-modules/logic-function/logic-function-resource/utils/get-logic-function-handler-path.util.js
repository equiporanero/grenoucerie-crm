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
    get getLogicFunctionBaseFolderPath () {
        return getLogicFunctionBaseFolderPath;
    },
    get getRelativePathFromBase () {
        return getRelativePathFromBase;
    }
});
const _path = require("path");
const getLogicFunctionBaseFolderPath = (handlerPath)=>{
    return (0, _path.dirname)((0, _path.dirname)(handlerPath));
};
const getRelativePathFromBase = (handlerPath, baseFolderPath)=>{
    return handlerPath.replace(`${baseFolderPath}/`, '');
};

//# sourceMappingURL=get-logic-function-handler-path.util.js.map