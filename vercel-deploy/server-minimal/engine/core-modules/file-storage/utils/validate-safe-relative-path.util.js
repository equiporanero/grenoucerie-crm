"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateSafeRelativePath", {
    enumerable: true,
    get: function() {
        return validateSafeRelativePath;
    }
});
const _path = require("path");
const _core = require("@lingui/core");
const validateSafeRelativePath = ({ resourcePath })=>{
    if (resourcePath.length === 0) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "Q7KCby",
                message: "Resource path must not be empty"
            })
        };
    }
    if (resourcePath.includes('\0')) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "uAJ5BF",
                message: "Resource path contains null bytes"
            })
        };
    }
    if ((0, _path.isAbsolute)(resourcePath)) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "s7cqdG",
                message: "Resource path must be relative, not absolute"
            })
        };
    }
    if (resourcePath.includes('\\')) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "lS6C4L",
                message: "Resource path must not contain backslashes"
            })
        };
    }
    const normalized = (0, _path.normalize)(resourcePath);
    if (normalized.split(_path.sep).includes('..')) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "SkT3Lf",
                message: "Resource path must not contain path traversal (..)"
            })
        };
    }
    return {
        isValid: true
    };
};

//# sourceMappingURL=validate-safe-relative-path.util.js.map