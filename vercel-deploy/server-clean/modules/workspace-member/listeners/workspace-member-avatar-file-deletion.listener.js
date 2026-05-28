"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMemberAvatarFileDeletionListener", {
    enumerable: true,
    get: function() {
        return WorkspaceMemberAvatarFileDeletionListener;
    }
});
const _common = require("@nestjs/common");
const _EntityNotFoundError = require("typeorm/error/EntityNotFoundError");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _ondatabasebatcheventdecorator = require("../../../engine/api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
const _filecorepictureservice = require("../../../engine/core-modules/file/file-core-picture/services/file-core-picture.service");
const _extractfileidfromurlutil = require("../../../engine/core-modules/file/files-field/utils/extract-file-id-from-url.util");
const _workspaceeventbatchtype = require("../../../engine/workspace-event-emitter/types/workspace-event-batch.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMemberAvatarFileDeletionListener = class WorkspaceMemberAvatarFileDeletionListener {
    async handleUpdate(payload) {
        const fileIdsToDelete = this.getFileIdsToDeleteFromUpdateEvent(payload);
        await this.deleteCorePictures(fileIdsToDelete, payload.workspaceId);
    }
    async handleDestroyOrDeleteEvent(payload) {
        const fileIdsToDelete = this.getFileIdsToDeleteFromDestroyOrDeleteEvent(payload);
        await this.deleteCorePictures(fileIdsToDelete, payload.workspaceId);
    }
    async deleteCorePictures(fileIds, workspaceId) {
        for (const fileId of fileIds){
            try {
                await this.fileCorePictureService.deleteCorePicture({
                    workspaceId,
                    fileId
                });
            } catch (error) {
                if (error instanceof _EntityNotFoundError.EntityNotFoundError) {
                    continue;
                }
                throw error;
            }
        }
    }
    getFileIdsToDeleteFromUpdateEvent(payload) {
        return payload.events.map((event)=>{
            const beforeAvatarUrl = event.properties.before.avatarUrl;
            if (!(0, _utils.isDefined)(beforeAvatarUrl)) {
                return undefined;
            }
            const beforeFileId = (0, _extractfileidfromurlutil.extractFileIdFromUrl)(beforeAvatarUrl, _types.FileFolder.CorePicture);
            const afterFileId = (0, _extractfileidfromurlutil.extractFileIdFromUrl)(event.properties.after.avatarUrl ?? '', _types.FileFolder.CorePicture);
            return beforeFileId !== afterFileId ? beforeFileId : undefined;
        }).filter(_utils.isDefined);
    }
    getFileIdsToDeleteFromDestroyOrDeleteEvent(payload) {
        return payload.events.map((event)=>(0, _utils.isDefined)(event.properties.before.avatarUrl) ? (0, _extractfileidfromurlutil.extractFileIdFromUrl)(event.properties.before.avatarUrl, _types.FileFolder.CorePicture) : undefined).filter(_utils.isDefined);
    }
    constructor(fileCorePictureService){
        this.fileCorePictureService = fileCorePictureService;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workspaceMember', _databaseeventaction.DatabaseEventAction.UPDATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceMemberAvatarFileDeletionListener.prototype, "handleUpdate", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workspaceMember', _databaseeventaction.DatabaseEventAction.DESTROYED),
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('workspaceMember', _databaseeventaction.DatabaseEventAction.DELETED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceMemberAvatarFileDeletionListener.prototype, "handleDestroyOrDeleteEvent", null);
WorkspaceMemberAvatarFileDeletionListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filecorepictureservice.FileCorePictureService === "undefined" ? Object : _filecorepictureservice.FileCorePictureService
    ])
], WorkspaceMemberAvatarFileDeletionListener);

//# sourceMappingURL=workspace-member-avatar-file-deletion.listener.js.map