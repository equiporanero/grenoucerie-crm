"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractFileInfoOrThrow", {
    enumerable: true,
    get: function() {
        return extractFileInfoOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _filetype = require("file-type");
const _mrmime = require("mrmime");
const _utils = require("twenty-shared/utils");
const _filestorageexception = require("../../file-storage/interfaces/file-storage-exception");
const _pdf = require("@file-type/pdf");
const _twentymimepolicyconstant = require("../constants/twenty-mime-policy.constant");
const _buildfileinfoutils = require("./build-file-info.utils");
const fileTypeParser = new _filetype.FileTypeParser({
    customDetectors: [
        _pdf.detectPdf
    ]
});
const extractFileInfoOrThrow = async ({ file, filename })=>{
    const { ext: declaredExt } = (0, _buildfileinfoutils.buildFileInfo)(filename);
    const { ext: detectedExt, mime: detectedMime } = await fileTypeParser.fromBuffer(file) ?? {};
    if ((0, _utils.isDefined)(detectedExt) && (0, _utils.isDefined)(detectedMime)) {
        return {
            mimeType: detectedMime,
            ext: detectedExt
        };
    }
    const ext = declaredExt;
    let mimeType = 'application/octet-stream';
    if ((0, _guards.isNonEmptyString)(ext)) {
        // Twenty policy wins over the ext-based fallback for the (small) set of
        // extensions where mrmime's IANA mapping collides with a developer-tooling
        // convention. This branch is only reached when file-type's magic-byte
        // sniff returned nothing — when the bytes actually match (e.g. a real
        // MPEG-TS video at foo.ts), we already returned above.
        //
        // For .ts/.tsx the policy is also load-bearing for correctness: without
        // it, lookup('ts') → 'video/mp2t' is in file-type's supportedMimeTypes,
        // so the check below would throw INVALID_EXTENSION on every TypeScript
        // source upload.
        const policyMime = _twentymimepolicyconstant.TWENTY_MIME_POLICY[ext];
        if ((0, _utils.isDefined)(policyMime)) {
            return {
                mimeType: policyMime,
                ext
            };
        }
        const mimeTypeFromExtension = (0, _mrmime.lookup)(ext);
        if (mimeTypeFromExtension && _filetype.supportedMimeTypes.has(mimeTypeFromExtension)) {
            throw new _filestorageexception.FileStorageException(`File content does not match its extension. The file has extension '${ext}' (expected mime type: ${mimeTypeFromExtension}), but the file content could not be detected as this type. The file may be corrupted, have the wrong extension, or be a security risk.`, _filestorageexception.FileStorageExceptionCode.INVALID_EXTENSION, {
                userFriendlyMessage: /*i18n*/ {
                    id: "bAGU1r",
                    message: "The file extension doesn't match the file content. Please check that your file is not corrupted and has the correct extension."
                }
            });
        }
        mimeType = mimeTypeFromExtension ?? 'application/octet-stream';
    }
    return {
        mimeType,
        ext
    };
};

//# sourceMappingURL=extract-file-info-or-throw.utils.js.map