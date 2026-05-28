"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validatePathSegmentsSafety", {
    enumerable: true,
    get: function() {
        return validatePathSegmentsSafety;
    }
});
const _core = require("@lingui/core");
const MAX_SEGMENT_LENGTH = 255;
const MAX_PATH_LENGTH = 1024;
const SAFE_SEGMENT_PATTERN = /^[a-zA-Z0-9._-]+$/;
const validatePathSegmentsSafety = ({ resourcePath })=>{
    if (resourcePath.length > MAX_PATH_LENGTH) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "PxO731",
                message: "Resource path exceeds maximum length of {MAX_PATH_LENGTH} characters",
                values: {
                    MAX_PATH_LENGTH: MAX_PATH_LENGTH
                }
            })
        };
    }
    if (resourcePath.includes('//') || resourcePath.endsWith('/')) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "1mnXbh",
                message: "Resource path must not contain empty segments or trailing slashes"
            })
        };
    }
    const segments = resourcePath.split('/');
    for (const segment of segments){
        if (segment.length > MAX_SEGMENT_LENGTH) {
            return {
                isValid: false,
                error: _core.i18n._(/*i18n*/ {
                    id: "5VSRdB",
                    message: "A path segment exceeds the maximum length of 255 characters"
                })
            };
        }
        if (!SAFE_SEGMENT_PATTERN.test(segment)) {
            return {
                isValid: false,
                error: _core.i18n._(/*i18n*/ {
                    id: "HC18ok",
                    message: "A path segment contains invalid characters. Only alphanumeric, dots, dashes and underscores are allowed"
                })
            };
        }
    }
    return {
        isValid: true
    };
};

//# sourceMappingURL=validate-path-segments-safety.util.js.map