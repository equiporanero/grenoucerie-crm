"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateMessagingInfrastructureToMetadataCommand", {
    enumerable: true,
    get: function() {
        return MigrateMessagingInfrastructureToMetadataCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _guards = require("@sniptt/guards");
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _featureflagservice = require("../../../../engine/core-modules/feature-flag/services/feature-flag.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagefolderentity = require("../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
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
let MigrateMessagingInfrastructureToMetadataCommand = class MigrateMessagingInfrastructureToMetadataCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isMigrated = await this.featureFlagService.isFeatureEnabled('IS_CONNECTED_ACCOUNT_MIGRATED', workspaceId);
        if (isMigrated) {
            this.logger.log(`Messaging infrastructure migration already completed for workspace ${workspaceId}. Skipping.`);
            return;
        }
        const isDryRun = options.dryRun ?? false;
        const connectedAccountWorkspaceRepository = await this.twentyORMGlobalManager.getRepository(workspaceId, 'connectedAccount');
        const messageChannelWorkspaceRepository = await this.twentyORMGlobalManager.getRepository(workspaceId, 'messageChannel');
        const calendarChannelWorkspaceRepository = await this.twentyORMGlobalManager.getRepository(workspaceId, 'calendarChannel');
        const messageFolderWorkspaceRepository = await this.twentyORMGlobalManager.getRepository(workspaceId, 'messageFolder');
        const connectedAccounts = await connectedAccountWorkspaceRepository.find();
        const messageChannels = await messageChannelWorkspaceRepository.find();
        const calendarChannels = await calendarChannelWorkspaceRepository.find();
        const messageFolders = await messageFolderWorkspaceRepository.find();
        const workspaceMemberIdToUserWorkspaceIdMap = await this.buildWorkspaceMemberIdToUserWorkspaceIdMap(workspaceId);
        const connectedAccountsWithMissingHandle = connectedAccounts.filter((account)=>!account.handle);
        const connectedAccountsWithUnresolvedOwner = connectedAccounts.filter((account)=>!workspaceMemberIdToUserWorkspaceIdMap.has(account.accountOwnerId));
        const messageChannelsWithMissingHandle = messageChannels.filter((channel)=>!channel.handle);
        const calendarChannelsWithMissingHandle = calendarChannels.filter((channel)=>!channel.handle);
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Workspace ${workspaceId}: ` + `${connectedAccounts.length} connected accounts, ` + `${messageChannels.length} message channels, ` + `${calendarChannels.length} calendar channels, ` + `${messageFolders.length} message folders`);
            if (connectedAccountsWithMissingHandle.length > 0) {
                this.logger.warn(`[DRY RUN] ${connectedAccountsWithMissingHandle.length} connected accounts have empty handle`);
            }
            if (connectedAccountsWithUnresolvedOwner.length > 0) {
                this.logger.warn(`[DRY RUN] ${connectedAccountsWithUnresolvedOwner.length} connected accounts have unresolvable accountOwnerId (no matching userWorkspace)`);
            }
            if (messageChannelsWithMissingHandle.length > 0) {
                this.logger.warn(`[DRY RUN] ${messageChannelsWithMissingHandle.length} message channels have empty handle`);
            }
            if (calendarChannelsWithMissingHandle.length > 0) {
                this.logger.warn(`[DRY RUN] ${calendarChannelsWithMissingHandle.length} calendar channels have empty handle`);
            }
            return;
        }
        let migratedConnectedAccountIds = new Set(connectedAccounts.map((account)=>account.id));
        let migratedMessageChannelIds = new Set(messageChannels.map((channel)=>channel.id));
        if (connectedAccounts.length > 0) {
            const coreConnectedAccounts = connectedAccounts.filter((workspaceEntity)=>{
                const userWorkspaceId = workspaceMemberIdToUserWorkspaceIdMap.get(workspaceEntity.accountOwnerId);
                if (!userWorkspaceId) {
                    this.logger.warn(`Skipping connected account ${workspaceEntity.id}: no userWorkspace found for workspaceMember ${workspaceEntity.accountOwnerId}`);
                    return false;
                }
                return true;
            }).map((workspaceEntity)=>{
                const handleAliases = (0, _guards.isNonEmptyString)(workspaceEntity.handleAliases) ? workspaceEntity.handleAliases.split(',').map((alias)=>alias.trim()) : null;
                return {
                    id: workspaceEntity.id,
                    handle: workspaceEntity.handle ?? '',
                    provider: workspaceEntity.provider,
                    accessToken: workspaceEntity.accessToken,
                    refreshToken: workspaceEntity.refreshToken,
                    lastCredentialsRefreshedAt: workspaceEntity.lastCredentialsRefreshedAt,
                    authFailedAt: workspaceEntity.authFailedAt,
                    handleAliases,
                    scopes: workspaceEntity.scopes,
                    connectionParameters: workspaceEntity.connectionParameters,
                    userWorkspaceId: workspaceMemberIdToUserWorkspaceIdMap.get(workspaceEntity.accountOwnerId),
                    workspaceId,
                    createdAt: workspaceEntity.createdAt,
                    updatedAt: workspaceEntity.updatedAt
                };
            });
            if (coreConnectedAccounts.length > 0) {
                await this.connectedAccountRepository.save(coreConnectedAccounts);
                this.logger.log(`Migrated ${coreConnectedAccounts.length} connected accounts for workspace ${workspaceId}`);
            }
            migratedConnectedAccountIds = new Set(coreConnectedAccounts.map((account)=>account.id));
        }
        if (messageChannels.length > 0) {
            const coreMessageChannels = messageChannels.filter((workspaceEntity)=>migratedConnectedAccountIds.has(workspaceEntity.connectedAccountId)).map((workspaceEntity)=>({
                    id: workspaceEntity.id,
                    visibility: workspaceEntity.visibility,
                    handle: workspaceEntity.handle ?? '',
                    type: workspaceEntity.type,
                    isContactAutoCreationEnabled: workspaceEntity.isContactAutoCreationEnabled,
                    contactAutoCreationPolicy: workspaceEntity.contactAutoCreationPolicy,
                    messageFolderImportPolicy: workspaceEntity.messageFolderImportPolicy,
                    excludeNonProfessionalEmails: workspaceEntity.excludeNonProfessionalEmails,
                    excludeGroupEmails: workspaceEntity.excludeGroupEmails,
                    pendingGroupEmailsAction: workspaceEntity.pendingGroupEmailsAction,
                    isSyncEnabled: workspaceEntity.isSyncEnabled,
                    syncCursor: workspaceEntity.syncCursor,
                    syncedAt: workspaceEntity.syncedAt ? new Date(workspaceEntity.syncedAt) : null,
                    syncStatus: workspaceEntity.syncStatus ?? 'NOT_SYNCED',
                    syncStage: workspaceEntity.syncStage,
                    syncStageStartedAt: workspaceEntity.syncStageStartedAt ? new Date(workspaceEntity.syncStageStartedAt) : null,
                    throttleFailureCount: workspaceEntity.throttleFailureCount,
                    throttleRetryAfter: workspaceEntity.throttleRetryAfter ? new Date(workspaceEntity.throttleRetryAfter) : null,
                    connectedAccountId: workspaceEntity.connectedAccountId,
                    workspaceId,
                    createdAt: workspaceEntity.createdAt,
                    updatedAt: workspaceEntity.updatedAt
                }));
            if (coreMessageChannels.length > 0) {
                await this.messageChannelRepository.save(coreMessageChannels);
                this.logger.log(`Migrated ${coreMessageChannels.length} message channels for workspace ${workspaceId}`);
            }
            migratedMessageChannelIds = new Set(coreMessageChannels.map((channel)=>channel.id));
        }
        if (calendarChannels.length > 0) {
            const coreCalendarChannels = calendarChannels.filter((workspaceEntity)=>migratedConnectedAccountIds.has(workspaceEntity.connectedAccountId)).map((workspaceEntity)=>({
                    id: workspaceEntity.id,
                    handle: workspaceEntity.handle ?? '',
                    syncStatus: workspaceEntity.syncStatus ?? 'NOT_SYNCED',
                    syncStage: workspaceEntity.syncStage,
                    visibility: workspaceEntity.visibility,
                    isContactAutoCreationEnabled: workspaceEntity.isContactAutoCreationEnabled,
                    contactAutoCreationPolicy: workspaceEntity.contactAutoCreationPolicy,
                    isSyncEnabled: workspaceEntity.isSyncEnabled,
                    syncCursor: workspaceEntity.syncCursor,
                    syncedAt: workspaceEntity.syncedAt ? new Date(workspaceEntity.syncedAt) : null,
                    syncStageStartedAt: workspaceEntity.syncStageStartedAt ? new Date(workspaceEntity.syncStageStartedAt) : null,
                    throttleFailureCount: workspaceEntity.throttleFailureCount,
                    connectedAccountId: workspaceEntity.connectedAccountId,
                    workspaceId,
                    createdAt: workspaceEntity.createdAt,
                    updatedAt: workspaceEntity.updatedAt
                }));
            await this.calendarChannelRepository.save(coreCalendarChannels);
            this.logger.log(`Migrated ${coreCalendarChannels.length} calendar channels for workspace ${workspaceId}`);
        }
        if (messageFolders.length > 0) {
            const externalIdToFolderIdMap = new Map(messageFolders.map((folder)=>[
                    folder.externalId,
                    folder.id
                ]));
            const coreMessageFolders = messageFolders.filter((workspaceEntity)=>migratedMessageChannelIds.has(workspaceEntity.messageChannelId)).map((workspaceEntity)=>{
                let resolvedParentFolderId = null;
                if ((0, _guards.isNonEmptyString)(workspaceEntity.parentFolderId)) {
                    resolvedParentFolderId = externalIdToFolderIdMap.get(workspaceEntity.parentFolderId) ?? null;
                    if (!resolvedParentFolderId) {
                        this.logger.warn(`Message folder ${workspaceEntity.id}: could not resolve parentFolderId externalId "${workspaceEntity.parentFolderId}" to a UUID`);
                    }
                }
                return {
                    id: workspaceEntity.id,
                    name: workspaceEntity.name,
                    syncCursor: workspaceEntity.syncCursor,
                    isSentFolder: workspaceEntity.isSentFolder,
                    isSynced: workspaceEntity.isSynced,
                    parentFolderId: resolvedParentFolderId,
                    externalId: workspaceEntity.externalId,
                    pendingSyncAction: workspaceEntity.pendingSyncAction,
                    messageChannelId: workspaceEntity.messageChannelId,
                    workspaceId,
                    createdAt: workspaceEntity.createdAt,
                    updatedAt: workspaceEntity.updatedAt
                };
            });
            await this.messageFolderRepository.save(coreMessageFolders);
            this.logger.log(`Migrated ${coreMessageFolders.length} message folders for workspace ${workspaceId}`);
        }
    }
    async buildWorkspaceMemberIdToUserWorkspaceIdMap(workspaceId) {
        const workspaceMemberRepository = await this.twentyORMGlobalManager.getRepository(workspaceId, 'workspaceMember', {
            shouldBypassPermissionChecks: true
        });
        const workspaceMembers = await workspaceMemberRepository.find();
        const userWorkspaces = await this.userWorkspaceRepository.find({
            where: {
                workspaceId
            },
            select: [
                'id',
                'userId'
            ]
        });
        const userWorkspaceIdByUserId = new Map(userWorkspaces.map((userWorkspace)=>[
                userWorkspace.userId,
                userWorkspace.id
            ]));
        return new Map(workspaceMembers.filter((member)=>userWorkspaceIdByUserId.has(member.userId)).map((member)=>[
                member.id,
                userWorkspaceIdByUserId.get(member.userId)
            ]));
    }
    constructor(twentyORMGlobalManager, connectedAccountRepository, messageChannelRepository, calendarChannelRepository, messageFolderRepository, userWorkspaceRepository, featureFlagService, workspaceIteratorService){
        super(workspaceIteratorService), this.twentyORMGlobalManager = twentyORMGlobalManager, this.connectedAccountRepository = connectedAccountRepository, this.messageChannelRepository = messageChannelRepository, this.calendarChannelRepository = calendarChannelRepository, this.messageFolderRepository = messageFolderRepository, this.userWorkspaceRepository = userWorkspaceRepository, this.featureFlagService = featureFlagService, this.workspaceIteratorService = workspaceIteratorService;
    }
};
MigrateMessagingInfrastructureToMetadataCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500012000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:migrate-messaging-infrastructure-to-metadata',
        description: 'Backfill connectedAccount, messageChannel, calendarChannel, and messageFolder to core metadata schema'
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService,
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService
    ])
], MigrateMessagingInfrastructureToMetadataCommand);

//# sourceMappingURL=1-21-workspace-command-1775500012000-migrate-messaging-infrastructure-to-metadata.command.js.map