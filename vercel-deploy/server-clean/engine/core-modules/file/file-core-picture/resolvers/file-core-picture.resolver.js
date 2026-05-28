"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileCorePictureResolver", {
    enumerable: true,
    get: function() {
        return FileCorePictureResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _GraphQLUpload = /*#__PURE__*/ _interop_require_default(require("graphql-upload/GraphQLUpload.mjs"));
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _filewithsignurldto = require("../../dtos/file-with-sign-url.dto");
const _filecorepictureservice = require("../services/file-core-picture.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../../../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../../graphql/pipes/resolver-validation.pipe");
const _uploadprofilepicturepermissionguard = require("../../../user-workspace/guards/upload-profile-picture-permission.guard");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _streamtobuffer = require("../../../../../utils/stream-to-buffer");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let FileCorePictureResolver = class FileCorePictureResolver {
    async uploadWorkspaceLogo(workspace, { createReadStream, filename }) {
        const buffer = await (0, _streamtobuffer.streamToBuffer)(createReadStream());
        return await this.fileCorePictureService.uploadWorkspacePicture({
            file: buffer,
            filename,
            workspace
        });
    }
    async uploadWorkspaceMemberProfilePicture({ id: workspaceId }, { createReadStream, filename }) {
        const buffer = await (0, _streamtobuffer.streamToBuffer)(createReadStream());
        return await this.fileCorePictureService.uploadWorkspaceMemberProfilePicture({
            file: buffer,
            filename,
            workspaceId
        });
    }
    constructor(fileCorePictureService){
        this.fileCorePictureService = fileCorePictureService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_filewithsignurldto.FileWithSignedUrlDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)({
        name: 'file',
        type: ()=>_GraphQLUpload.default
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof FileUpload === "undefined" ? Object : FileUpload
    ]),
    _ts_metadata("design:returntype", Promise)
], FileCorePictureResolver.prototype, "uploadWorkspaceLogo", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_filewithsignurldto.FileWithSignedUrlDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _uploadprofilepicturepermissionguard.UploadProfilePicturePermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)({
        name: 'file',
        type: ()=>_GraphQLUpload.default
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof FileUpload === "undefined" ? Object : FileUpload
    ]),
    _ts_metadata("design:returntype", Promise)
], FileCorePictureResolver.prototype, "uploadWorkspaceMemberProfilePicture", null);
FileCorePictureResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filecorepictureservice.FileCorePictureService === "undefined" ? Object : _filecorepictureservice.FileCorePictureService
    ])
], FileCorePictureResolver);

//# sourceMappingURL=file-core-picture.resolver.js.map