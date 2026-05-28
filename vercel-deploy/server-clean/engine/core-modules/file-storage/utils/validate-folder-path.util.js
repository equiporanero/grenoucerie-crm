"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFolderPath", {
    enumerable: true,
    get: function() {
        return validateFolderPath;
    }
});
const _path = require("path");
const _core = require("@lingui/core");
const _validatepathsegmentssafetyutil = require("./validate-path-segments-safety.util");
const _validatesaferelativepathutil = require("./validate-safe-relative-path.util");
const validateFolderPath = ({ folderPath })=>{
    const safePathResult = (0, _validatesaferelativepathutil.validateSafeRelativePath)({
        resourcePath: folderPath
    });
    if (!safePathResult.isValid) {
        return safePathResult;
    }
    const segmentsSafetyResult = (0, _validatepathsegmentssafetyutil.validatePathSegmentsSafety)({
        resourcePath: folderPath
    });
    if (!segmentsSafetyResult.isValid) {
        return segmentsSafetyResult;
    }
    const extension = (0, _path.extname)(folderPath);
    if (extension.length > 0) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "Hxo3YN",
                message: "Folder path must not contain a file extension — use deleteFile for file paths"
            })
        };
    }
    return {
        isValid: true
    };
};

//# sourceMappingURL=validate-folder-path.util.js.map