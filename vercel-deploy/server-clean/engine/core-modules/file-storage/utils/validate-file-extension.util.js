"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFileExtension", {
    enumerable: true,
    get: function() {
        return validateFileExtension;
    }
});
const _core = require("@lingui/core");
const _allowedextensionsbyapplicationfilefolderconstant = require("../constants/allowed-extensions-by-application-file-folder.constant");
const _hasallowedextensionutil = require("./has-allowed-extension.util");
const validateFileExtension = ({ resourcePath, fileFolder })=>{
    const allowedExtensions = _allowedextensionsbyapplicationfilefolderconstant.ALLOWED_EXTENSIONS_BY_APPLICATION_FILE_FOLDER[fileFolder];
    if (!allowedExtensions) {
        return {
            isValid: true
        };
    }
    if (!(0, _hasallowedextensionutil.hasAllowedExtension)({
        filePath: resourcePath,
        allowedExtensions
    })) {
        return {
            isValid: false,
            error: _core.i18n._(/*i18n*/ {
                id: "s6LppJ",
                message: "Invalid file extension. Allowed extensions: {0}",
                values: {
                    0: Object.keys(allowedExtensions).join(', ')
                }
            })
        };
    }
    return {
        isValid: true
    };
};

//# sourceMappingURL=validate-file-extension.util.js.map