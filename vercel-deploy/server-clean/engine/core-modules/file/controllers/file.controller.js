"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileController", {
    enumerable: true,
    get: function() {
        return FileController;
    }
});
const _common = require("@nestjs/common");
const _promises = require("node:stream/promises");
const _path = require("path");
const _express = require("express");
const _types = require("twenty-shared/types");
const _validatefilepathutil = require("../../file-storage/utils/validate-file-path.util");
const _fileexception = require("../file.exception");
const _fileapiexceptionfilter = require("../filters/file-api-exception.filter");
const _filebyidguard = require("../guards/file-by-id.guard");
const _fileservice = require("../services/file.service");
const _setfileresponseheadersutils = require("../utils/set-file-response-headers.utils");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../guards/public-endpoint.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let FileController = class FileController {
    async getPublicAssets(res, req, workspaceId, applicationId) {
        const filepath = (0, _path.join)(...req.params.path);
        const filePathValidationResult = (0, _validatefilepathutil.validateFilePath)({
            resourcePath: filepath,
            fileFolder: _types.FileFolder.PublicAsset
        });
        if (!filePathValidationResult.isValid) {
            throw new _fileexception.FileException('File not found', _fileexception.FileExceptionCode.FILE_NOT_FOUND);
        }
        const fileStream = await this.fileService.getFileStreamByPath({
            workspaceId,
            applicationId,
            fileFolder: _types.FileFolder.PublicAsset,
            filepath
        }).catch((error)=>{
            this.logger.error('getFileStreamByPath failed unexpectedly', {
                error
            });
            throw new _fileexception.FileException('Error retrieving file', _fileexception.FileExceptionCode.INTERNAL_SERVER_ERROR);
        });
        if (fileStream === null) {
            throw new _fileexception.FileException('File not found', _fileexception.FileExceptionCode.FILE_NOT_FOUND);
        }
        const { stream, mimeType } = fileStream;
        (0, _setfileresponseheadersutils.setFileResponseHeaders)(res, mimeType);
        try {
            await (0, _promises.pipeline)(stream, res);
        } catch (error) {
            this.logger.error('Public asset stream failed mid-transfer', {
                error
            });
            if (!res.headersSent) {
                throw new _fileexception.FileException('Error streaming file from storage', _fileexception.FileExceptionCode.INTERNAL_SERVER_ERROR);
            }
            res.destroy();
        }
    }
    async getFileById(res, req, fileFolder, fileId) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const workspaceId = req?.workspaceId;
        const fileResponse = await this.fileService.getFileResponseById({
            fileId,
            workspaceId,
            fileFolder
        }).catch((error)=>{
            this.logger.error('getFileResponseById failed unexpectedly', {
                error
            });
            throw new _fileexception.FileException('Error retrieving file', _fileexception.FileExceptionCode.INTERNAL_SERVER_ERROR);
        });
        if (fileResponse === null) {
            throw new _fileexception.FileException('File not found', _fileexception.FileExceptionCode.FILE_NOT_FOUND);
        }
        if (fileResponse.type === 'redirect') {
            return res.redirect(fileResponse.presignedUrl);
        }
        (0, _setfileresponseheadersutils.setFileResponseHeaders)(res, fileResponse.mimeType);
        try {
            await (0, _promises.pipeline)(fileResponse.stream, res);
        } catch (error) {
            this.logger.error('File-by-id stream failed mid-transfer', {
                error
            });
            if (!res.headersSent) {
                throw new _fileexception.FileException('Error streaming file from storage', _fileexception.FileExceptionCode.INTERNAL_SERVER_ERROR);
            }
            res.destroy();
        }
    }
    constructor(fileService){
        this.fileService = fileService;
        this.logger = new _common.Logger(FileController.name);
    }
};
_ts_decorate([
    (0, _common.Get)('public-assets/:workspaceId/:applicationId/*path'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Res)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_param(2, (0, _common.Param)('workspaceId')),
    _ts_param(3, (0, _common.Param)('applicationId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Response === "undefined" ? Object : _express.Response,
        typeof _express.Request === "undefined" ? Object : _express.Request,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], FileController.prototype, "getPublicAssets", null);
_ts_decorate([
    (0, _common.Get)('file/:fileFolder/:id'),
    (0, _common.UseGuards)(_filebyidguard.FileByIdGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Res)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_param(2, (0, _common.Param)('fileFolder')),
    _ts_param(3, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Response === "undefined" ? Object : _express.Response,
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _filebyidguard.SupportedFileFolder === "undefined" ? Object : _filebyidguard.SupportedFileFolder,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], FileController.prototype, "getFileById", null);
FileController = _ts_decorate([
    (0, _common.Controller)(),
    (0, _common.UseFilters)(_fileapiexceptionfilter.FileApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fileservice.FileService === "undefined" ? Object : _fileservice.FileService
    ])
], FileController);

//# sourceMappingURL=file.controller.js.map