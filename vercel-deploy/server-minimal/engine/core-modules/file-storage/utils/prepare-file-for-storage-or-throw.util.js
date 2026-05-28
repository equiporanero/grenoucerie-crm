"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "prepareFileForStorageOrThrow", {
    enumerable: true,
    get: function() {
        return prepareFileForStorageOrThrow;
    }
});
const _extractfileinfoorthrowutils = require("../../file/utils/extract-file-info-or-throw.utils");
const _sanitizefileutils = require("../../file/utils/sanitize-file.utils");
const prepareFileForStorageOrThrow = async ({ sourceFile, resourcePath })=>{
    const bufferForExtract = typeof sourceFile === 'string' ? Buffer.from(sourceFile, 'utf8') : Buffer.isBuffer(sourceFile) ? sourceFile : Buffer.from(sourceFile);
    const { mimeType, ext } = await (0, _extractfileinfoorthrowutils.extractFileInfoOrThrow)({
        file: bufferForExtract,
        filename: resourcePath
    });
    const sanitizedSourceFile = (0, _sanitizefileutils.sanitizeFile)({
        file: sourceFile,
        ext,
        mimeType
    });
    return {
        sourceFile: sanitizedSourceFile,
        mimeType
    };
};

//# sourceMappingURL=prepare-file-for-storage-or-throw.util.js.map