"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFilePath", {
    enumerable: true,
    get: function() {
        return validateFilePath;
    }
});
const _core = require("@lingui/core");
const _validatefileextensionutil = require("./validate-file-extension.util");
const _validatepathsegmentssafetyutil = require("./validate-path-segments-safety.util");
const _validatesaferelativepathutil = require("./validate-safe-relative-path.util");
const validateFilePath = ({ resourcePath, fileFolder })=>{
    const safePathResult = (0, _validatesaferelativepathutil.validateSafeRelativePath)({
        resourcePath
    });
    if (!safePathResult.isValid) {
        return safePathResult;
    }
    const segmentsSafetyResult = (0, _validatepathsegmentssafetyutil.validatePathSegmentsSafety)({
        resourcePath
    });
    if (!segmentsSafetyResult.isValid) {
        return segmentsSafetyResult;
    }
    const segments = resourcePath.split('/');
    const filename = segments[segments.length - 1];
    if (!filename.includes('.')) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "I7Jff2",
                message: "Filename must have an extension"
            })
        };
    }
    return (0, _validatefileextensionutil.validateFileExtension)({
        resourcePath,
        fileFolder
    });
};

//# sourceMappingURL=validate-file-path.util.js.map