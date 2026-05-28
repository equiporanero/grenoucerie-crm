"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractFileInfoFromRequest", {
    enumerable: true,
    get: function() {
        return extractFileInfoFromRequest;
    }
});
const _filefolderinterface = require("../interfaces/file-folder.interface");
const _checkfilefolderutils = require("./check-file-folder.utils");
const _checkfilenameutils = require("./check-file-name.utils");
const extractFileInfoFromRequest = (request)=>{
    // Ex: /files/profile-picture/original/TOKEN/file.jpg
    const pathSegments = request.path.split('/').filter((segment)=>segment);
    const segments = pathSegments.slice(1);
    const filename = (0, _checkfilenameutils.checkFilename)(segments[segments.length - 1]);
    const fileSignature = segments[segments.length - 2];
    const folderSegments = segments.slice(0, segments.length - 2);
    const rawFolder = folderSegments.join('/');
    const fileFolder = (0, _checkfilefolderutils.checkFileFolder)(rawFolder);
    const ignoreExpirationToken = _filefolderinterface.fileFolderConfigs[fileFolder].ignoreExpirationToken;
    return {
        filename,
        fileSignature,
        rawFolder,
        fileFolder,
        ignoreExpirationToken
    };
};

//# sourceMappingURL=extract-file-info-from-request.utils.js.map