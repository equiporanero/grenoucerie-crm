"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateMessageFolderParentIdToExternalIdCommand", {
    enumerable: true,
    get: function() {
        return MigrateMessageFolderParentIdToExternalIdCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _messagefolderentity = require("../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
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
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
let MigrateMessageFolderParentIdToExternalIdCommand = class MigrateMessageFolderParentIdToExternalIdCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const folders = await this.messageFolderRepository.find({
            where: {
                workspaceId
            }
        });
        const idToExternalIdMap = new Map();
        const existingExternalIds = new Set();
        for (const folder of folders){
            if (folder.externalId) {
                idToExternalIdMap.set(folder.id, folder.externalId);
                existingExternalIds.add(folder.externalId);
            }
        }
        let migratedCount = 0;
        for (const folder of folders){
            if (!folder.parentFolderId) {
                continue;
            }
            if (!UUID_REGEX.test(folder.parentFolderId)) {
                continue;
            }
            // Already points to a valid externalId — skip even if it looks like a UUID
            if (existingExternalIds.has(folder.parentFolderId)) {
                continue;
            }
            const parentExternalId = idToExternalIdMap.get(folder.parentFolderId);
            if (!parentExternalId) {
                this.logger.warn(`Folder ${folder.id}: parent ${folder.parentFolderId} not found or has no externalId, setting to null`);
                if (!isDryRun) {
                    await this.messageFolderRepository.update(folder.id, {
                        parentFolderId: null
                    });
                }
                migratedCount++;
                continue;
            }
            if (isDryRun) {
                this.logger.log(`[DRY RUN] Would update folder ${folder.id}: parentFolderId ${folder.parentFolderId} -> ${parentExternalId}`);
            } else {
                await this.messageFolderRepository.update(folder.id, {
                    parentFolderId: parentExternalId
                });
            }
            migratedCount++;
        }
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Migrated ${migratedCount} folder(s) for workspace ${workspaceId}`);
    }
    constructor(messageFolderRepository, workspaceIteratorService){
        super(workspaceIteratorService), this.messageFolderRepository = messageFolderRepository, this.workspaceIteratorService = workspaceIteratorService;
    }
};
MigrateMessageFolderParentIdToExternalIdCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500011000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:migrate-message-folder-parent-id-to-external-id',
        description: 'Migrate messageFolder parentFolderId from internal UUID references to external IDs'
    }),
    _ts_param(0, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService
    ])
], MigrateMessageFolderParentIdToExternalIdCommand);

//# sourceMappingURL=1-21-workspace-command-1775500011000-migrate-message-folder-parent-id-to-external-id.command.js.map