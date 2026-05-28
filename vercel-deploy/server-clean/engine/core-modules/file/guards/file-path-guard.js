"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilePathGuard", {
    enumerable: true,
    get: function() {
        return FilePathGuard;
    }
});
const _common = require("@nestjs/common");
const _extractfileinfofromrequestutils = require("../utils/extract-file-info-from-request.utils");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FilePathGuard = class FilePathGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { filename, fileSignature, ignoreExpirationToken } = (0, _extractfileinfofromrequestutils.extractFileInfoFromRequest)(request);
        if (!fileSignature) {
            return false;
        }
        try {
            const payload = await this.jwtWrapperService.verifyJwtToken(fileSignature, ignoreExpirationToken ? {
                ignoreExpiration: true
            } : {});
            if (!payload.workspaceId || !payload.filename || filename !== payload.filename) {
                return false;
            }
        } catch  {
            return false;
        }
        const decodedPayload = this.jwtWrapperService.decode(fileSignature, {
            json: true
        });
        request.workspaceId = decodedPayload.workspaceId;
        return true;
    }
    constructor(jwtWrapperService){
        this.jwtWrapperService = jwtWrapperService;
    }
};
FilePathGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService
    ])
], FilePathGuard);

//# sourceMappingURL=file-path-guard.js.map