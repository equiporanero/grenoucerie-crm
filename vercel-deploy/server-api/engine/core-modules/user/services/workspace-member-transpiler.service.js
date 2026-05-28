"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMemberTranspiler", {
    enumerable: true,
    get: function() {
        return WorkspaceMemberTranspiler;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _fileurlservice = require("../../file/file-url/file-url.service");
const _extractfileidfromurlutil = require("../../file/files-field/utils/extract-file-id-from-url.util");
const _fromRoleEntityToRoleDtoutil = require("../../../metadata-modules/role/utils/fromRoleEntityToRoleDto.util");
const _types = require("twenty-shared/types");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMemberTranspiler = class WorkspaceMemberTranspiler {
    async generateSignedAvatarUrl({ workspaceId, workspaceMember }) {
        if (!(0, _utils.isDefined)(workspaceMember.avatarUrl) || !(0, _guards.isNonEmptyString)(workspaceMember.avatarUrl)) {
            return '';
        }
        const fileId = (0, _extractfileidfromurlutil.extractFileIdFromUrl)(workspaceMember.avatarUrl, _types.FileFolder.CorePicture);
        if (!(0, _utils.isDefined)(fileId)) {
            return '';
        }
        return this.fileUrlService.signFileByIdUrl({
            fileId,
            workspaceId,
            fileFolder: _types.FileFolder.CorePicture
        });
    }
    async toWorkspaceMemberDto({ userWorkspace, workspaceMemberEntity, userWorkspaceRoles }) {
        const { avatarUrl: avatarUrlFromEntity, id, name, userEmail, colorScheme, locale, timeFormat, timeZone, dateFormat, calendarStartDay, numberFormat } = workspaceMemberEntity;
        const avatarUrl = await this.generateSignedAvatarUrl({
            workspaceId: userWorkspace.workspaceId,
            workspaceMember: {
                avatarUrl: avatarUrlFromEntity,
                id
            }
        });
        const roles = (0, _fromRoleEntityToRoleDtoutil.fromRoleEntitiesToRoleDtos)(userWorkspaceRoles);
        if (!(0, _utils.isDefined)(userEmail)) {
            throw new Error(`Workspace member ${id} has no userEmail`);
        }
        return {
            id,
            name,
            userEmail,
            avatarUrl,
            userWorkspaceId: userWorkspace.id,
            colorScheme,
            dateFormat: dateFormat,
            locale,
            timeFormat: timeFormat,
            timeZone,
            roles,
            calendarStartDay,
            numberFormat: numberFormat
        };
    }
    async toWorkspaceMemberDtos(allWorkspaceEntitiesBundles) {
        return Promise.all(allWorkspaceEntitiesBundles.map((bundle)=>this.toWorkspaceMemberDto(bundle)));
    }
    async toDeletedWorkspaceMemberDto(workspaceMember, userWorkspaceId) {
        const { avatarUrl: avatarUrlFromEntity, id, name, userEmail } = workspaceMember;
        if (!(0, _utils.isDefined)(userEmail)) {
            throw new Error(`Workspace member ${id} has no userEmail`);
        }
        const avatarUrl = userWorkspaceId ? await this.generateSignedAvatarUrl({
            workspaceId: userWorkspaceId,
            workspaceMember: {
                avatarUrl: avatarUrlFromEntity,
                id
            }
        }) : null;
        return {
            id,
            name,
            userEmail,
            avatarUrl,
            userWorkspaceId: userWorkspaceId ?? null
        };
    }
    async toDeletedWorkspaceMemberDtos(workspaceMembers, userWorkspaceId) {
        return Promise.all(workspaceMembers.map((workspaceMember)=>this.toDeletedWorkspaceMemberDto(workspaceMember, userWorkspaceId)));
    }
    constructor(fileUrlService){
        this.fileUrlService = fileUrlService;
    }
};
WorkspaceMemberTranspiler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService
    ])
], WorkspaceMemberTranspiler);

//# sourceMappingURL=workspace-member-transpiler.service.js.map