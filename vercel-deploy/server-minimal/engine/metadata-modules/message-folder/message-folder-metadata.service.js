"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageFolderMetadataService", {
    enumerable: true,
    get: function() {
        return MessageFolderMetadataService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _connectedaccountmetadataservice = require("../connected-account/connected-account-metadata.service");
const _messagefolderentity = require("./entities/message-folder.entity");
const _messagefolderexception = require("./message-folder.exception");
const _messagechannelmetadataservice = require("../message-channel/message-channel-metadata.service");
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
let MessageFolderMetadataService = class MessageFolderMetadataService {
    async findAll(workspaceId) {
        return this.repository.find({
            where: {
                workspaceId
            }
        });
    }
    async findByUserWorkspaceId({ userWorkspaceId, workspaceId }) {
        const userAccountIds = await this.connectedAccountMetadataService.getUserConnectedAccountIds({
            userWorkspaceId,
            workspaceId
        });
        const userChannels = await this.messageChannelMetadataService.findByConnectedAccountIds({
            connectedAccountIds: userAccountIds,
            workspaceId
        });
        const userChannelIds = userChannels.map((channel)=>channel.id);
        return this.findByMessageChannelIds({
            messageChannelIds: userChannelIds,
            workspaceId
        });
    }
    async findByMessageChannelIdForUser({ messageChannelId, userWorkspaceId, workspaceId }) {
        await this.messageChannelMetadataService.verifyOwnership({
            id: messageChannelId,
            userWorkspaceId,
            workspaceId
        });
        return this.findByMessageChannelId({
            messageChannelId,
            workspaceId
        });
    }
    async findByMessageChannelId({ messageChannelId, workspaceId }) {
        return this.repository.find({
            where: {
                messageChannelId,
                workspaceId
            }
        });
    }
    async findByMessageChannelIds({ messageChannelIds, workspaceId }) {
        if (messageChannelIds.length === 0) {
            return [];
        }
        return this.repository.find({
            where: {
                messageChannelId: (0, _typeorm1.In)(messageChannelIds),
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
    async verifyOwnership({ id, userWorkspaceId, workspaceId }) {
        const messageFolder = await this.repository.findOne({
            where: {
                id,
                workspaceId
            }
        });
        if (!messageFolder) {
            throw new _messagefolderexception.MessageFolderException(`Message folder ${id} not found`, _messagefolderexception.MessageFolderExceptionCode.MESSAGE_FOLDER_NOT_FOUND);
        }
        const userAccountIds = await this.connectedAccountMetadataService.getUserConnectedAccountIds({
            userWorkspaceId,
            workspaceId
        });
        const messageChannel = await this.messageChannelMetadataService.findById({
            id: messageFolder.messageChannelId,
            workspaceId
        });
        if (!messageChannel || !userAccountIds.includes(messageChannel.connectedAccountId)) {
            throw new _messagefolderexception.MessageFolderException(`Message folder ${id} does not belong to user workspace ${userWorkspaceId}`, _messagefolderexception.MessageFolderExceptionCode.MESSAGE_FOLDER_OWNERSHIP_VIOLATION);
        }
        return messageFolder;
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
    async updateMany({ ids, workspaceId, data }) {
        await this.repository.update({
            id: (0, _typeorm1.In)(ids),
            workspaceId
        }, data);
        return this.repository.find({
            where: {
                id: (0, _typeorm1.In)(ids),
                workspaceId
            }
        });
    }
    async delete({ id, workspaceId }) {
        const messageFolder = await this.repository.findOneOrFail({
            where: {
                id,
                workspaceId
            }
        });
        await this.repository.delete({
            id,
            workspaceId
        });
        return messageFolder;
    }
    constructor(repository, messageChannelMetadataService, connectedAccountMetadataService){
        this.repository = repository;
        this.messageChannelMetadataService = messageChannelMetadataService;
        this.connectedAccountMetadataService = connectedAccountMetadataService;
    }
};
MessageFolderMetadataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagechannelmetadataservice.MessageChannelMetadataService === "undefined" ? Object : _messagechannelmetadataservice.MessageChannelMetadataService,
        typeof _connectedaccountmetadataservice.ConnectedAccountMetadataService === "undefined" ? Object : _connectedaccountmetadataservice.ConnectedAccountMetadataService
    ])
], MessageFolderMetadataService);

//# sourceMappingURL=message-folder-metadata.service.js.map