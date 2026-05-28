"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TemporaryDirManager", {
    enumerable: true,
    get: function() {
        return TemporaryDirManager;
    }
});
const _path = require("path");
const _promises = /*#__PURE__*/ _interop_require_wildcard(require("node:fs/promises"));
const _uuid = require("uuid");
const _logicfunctionexecutortmpdirfolder = require("../constants/logic-function-executor-tmpdir-folder");
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
const TEMPORARY_LAMBDA_FOLDER = 'lambda-build';
const LAMBDA_ZIP_FILE_NAME = 'lambda.zip';
let TemporaryDirManager = class TemporaryDirManager {
    async init() {
        const sourceTemporaryDir = (0, _path.join)(this.temporaryDir);
        const lambdaZipPath = (0, _path.join)(this.temporaryDir, LAMBDA_ZIP_FILE_NAME);
        await _promises.mkdir(sourceTemporaryDir, {
            recursive: true
        });
        return {
            sourceTemporaryDir,
            lambdaZipPath
        };
    }
    async clean() {
        await _promises.rm(this.temporaryDir, {
            recursive: true,
            force: true
        });
    }
    constructor(){
        this.temporaryDir = (0, _path.join)(_logicfunctionexecutortmpdirfolder.LOGIC_FUNCTION_EXECUTOR_TMPDIR_FOLDER, `${TEMPORARY_LAMBDA_FOLDER}-${(0, _uuid.v4)()}`);
    }
};

//# sourceMappingURL=temporary-dir-manager.js.map