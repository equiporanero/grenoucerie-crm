"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarChannelMetadataService", {
    enumerable: true,
    get: function() {
        return CalendarChannelMetadataService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _calendarchannelexception = require("./calendar-channel.exception");
const _calendarchannelentity = require("./entities/calendar-channel.entity");
const _connectedaccountmetadataservice = require("../connected-account/connected-account-metadata.service");
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
let CalendarChannelMetadataService = class CalendarChannelMetadataService {
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
        return this.findByConnectedAccountIds({
            connectedAccountIds: userAccountIds,
            workspaceId
        });
    }
    async findByConnectedAccountIdForUser({ connectedAccountId, userWorkspaceId, workspaceId }) {
        await this.connectedAccountMetadataService.verifyOwnership({
            id: connectedAccountId,
            userWorkspaceId,
            workspaceId
        });
        return this.findByConnectedAccountId({
            connectedAccountId,
            workspaceId
        });
    }
    async findByConnectedAccountId({ connectedAccountId, workspaceId }) {
        return this.repository.find({
            where: {
                connectedAccountId,
                workspaceId
            }
        });
    }
    async findByConnectedAccountIds({ connectedAccountIds, workspaceId }) {
        if (connectedAccountIds.length === 0) {
            return [];
        }
        return this.repository.find({
            where: {
                connectedAccountId: (0, _typeorm1.In)(connectedAccountIds),
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
        const calendarChannel = await this.repository.findOne({
            where: {
                id,
                workspaceId
            }
        });
        if (!calendarChannel) {
            throw new _calendarchannelexception.CalendarChannelException(`Calendar channel ${id} not found`, _calendarchannelexception.CalendarChannelExceptionCode.CALENDAR_CHANNEL_NOT_FOUND);
        }
        const userAccountIds = await this.connectedAccountMetadataService.getUserConnectedAccountIds({
            userWorkspaceId,
            workspaceId
        });
        if (!userAccountIds.includes(calendarChannel.connectedAccountId)) {
            throw new _calendarchannelexception.CalendarChannelException(`Calendar channel ${id} does not belong to user workspace ${userWorkspaceId}`, _calendarchannelexception.CalendarChannelExceptionCode.CALENDAR_CHANNEL_OWNERSHIP_VIOLATION);
        }
        return calendarChannel;
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
        const calendarChannel = await this.repository.findOneOrFail({
            where: {
                id,
                workspaceId
            }
        });
        await this.repository.delete({
            id,
            workspaceId
        });
        return calendarChannel;
    }
    constructor(repository, connectedAccountMetadataService){
        this.repository = repository;
        this.connectedAccountMetadataService = connectedAccountMetadataService;
    }
};
CalendarChannelMetadataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _connectedaccountmetadataservice.ConnectedAccountMetadataService === "undefined" ? Object : _connectedaccountmetadataservice.ConnectedAccountMetadataService
    ])
], CalendarChannelMetadataService);

//# sourceMappingURL=calendar-channel-metadata.service.js.map