"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedAccountMetadataService", {
    enumerable: true,
    get: function() {
        return ConnectedAccountMetadataService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _appoauthrevokeservice = require("../../core-modules/application/connection-provider/refresh/services/app-oauth-revoke.service");
const _calendarchannelentity = require("../calendar-channel/entities/calendar-channel.entity");
const _connectedaccountexception = require("./connected-account.exception");
const _connectedaccountentity = require("./entities/connected-account.entity");
const _messagechannelentity = require("../message-channel/entities/message-channel.entity");
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
let ConnectedAccountMetadataService = class ConnectedAccountMetadataService {
    async findByUserWorkspaceId({ userWorkspaceId, workspaceId }) {
        return this.repository.find({
            where: {
                userWorkspaceId,
                workspaceId
            }
        });
    }
    async findById({ id, workspaceId }) {
        return this.repository.findOne({
            where: {
                id,
                workspaceId
            }
        });
    }
    async findByIdAndUserWorkspaceId({ id, userWorkspaceId, workspaceId }) {
        return this.repository.findOne({
            where: {
                id,
                userWorkspaceId,
                workspaceId
            }
        });
    }
    async verifyOwnership({ id, userWorkspaceId, workspaceId }) {
        const connectedAccount = await this.repository.findOne({
            where: {
                id,
                workspaceId
            }
        });
        if (!connectedAccount) {
            throw new _connectedaccountexception.ConnectedAccountException(`Connected account ${id} not found`, _connectedaccountexception.ConnectedAccountExceptionCode.CONNECTED_ACCOUNT_NOT_FOUND);
        }
        if (connectedAccount.visibility !== 'workspace' && connectedAccount.userWorkspaceId !== userWorkspaceId) {
            throw new _connectedaccountexception.ConnectedAccountException(`Connected account ${id} does not belong to user workspace ${userWorkspaceId}`, _connectedaccountexception.ConnectedAccountExceptionCode.CONNECTED_ACCOUNT_OWNERSHIP_VIOLATION);
        }
        return connectedAccount;
    }
    async getUserConnectedAccountIds({ userWorkspaceId, workspaceId }) {
        const accounts = await this.repository.find({
            where: {
                userWorkspaceId,
                workspaceId
            },
            select: [
                'id'
            ]
        });
        return accounts.map((account)=>account.id);
    }
    async getWorkspaceSharedConnectedAccountIds({ workspaceId }) {
        const accounts = await this.repository.find({
            where: {
                workspaceId,
                visibility: 'workspace'
            },
            select: [
                'id'
            ]
        });
        return accounts.map((account)=>account.id);
    }
    async create(data) {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
    async update({ id, workspaceId, data }) {
        await this.repository.update({
            id,
            workspaceId
        }, data);
        return this.repository.findOneOrFail({
            where: {
                id,
                workspaceId
            }
        });
    }
    async delete({ id, workspaceId }) {
        const connectedAccount = await this.repository.findOneOrFail({
            where: {
                id,
                workspaceId
            }
        });
        const [messageChannelCount, calendarChannelCount] = await Promise.all([
            this.messageChannelRepository.count({
                where: {
                    connectedAccountId: id,
                    workspaceId
                }
            }),
            this.calendarChannelRepository.count({
                where: {
                    connectedAccountId: id,
                    workspaceId
                }
            })
        ]);
        this.logger.log(`WorkspaceId: ${workspaceId} Deleting connected account ${id} with ${messageChannelCount} message channel(s) and ${calendarChannelCount} calendar channel(s)`);
        await this.appOAuthRevokeService.revokeIfApp(connectedAccount);
        await this.repository.delete({
            id,
            workspaceId
        });
        return connectedAccount;
    }
    constructor(repository, calendarChannelRepository, messageChannelRepository, appOAuthRevokeService){
        this.repository = repository;
        this.calendarChannelRepository = calendarChannelRepository;
        this.messageChannelRepository = messageChannelRepository;
        this.appOAuthRevokeService = appOAuthRevokeService;
        this.logger = new _common.Logger(ConnectedAccountMetadataService.name);
    }
};
ConnectedAccountMetadataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _appoauthrevokeservice.AppOAuthRevokeService === "undefined" ? Object : _appoauthrevokeservice.AppOAuthRevokeService
    ])
], ConnectedAccountMetadataService);

//# sourceMappingURL=connected-account-metadata.service.js.map