"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplyMessagesVisibilityRestrictionsService", {
    enumerable: true,
    get: function() {
        return ApplyMessagesVisibilityRestrictionsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _lodashgroupby = /*#__PURE__*/ _interop_require_default(require("lodash.groupby"));
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _graphqlerrorsutil = require("../../../../../engine/core-modules/graphql/utils/graphql-errors.util");
const _userworkspaceentity = require("../../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
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
let ApplyMessagesVisibilityRestrictionsService = class ApplyMessagesVisibilityRestrictionsService {
    async applyMessagesVisibilityRestrictions(messages, workspaceId, userId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
            const messageChannelMessagesAssociations = await messageChannelMessageAssociationRepository.find({
                where: {
                    messageId: (0, _typeorm1.In)(messages.map((message)=>message.id))
                }
            });
            const messageChannelIds = [
                ...new Set(messageChannelMessagesAssociations.map((a)=>a.messageChannelId))
            ];
            const messageChannelsFromCore = messageChannelIds.length > 0 ? await this.messageChannelRepository.find({
                where: {
                    id: (0, _typeorm1.In)(messageChannelIds),
                    workspaceId
                }
            }) : [];
            const messageChannelMap = new Map(messageChannelsFromCore.map((ch)=>[
                    ch.id,
                    ch
                ]));
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            for(let i = messages.length - 1; i >= 0; i--){
                const associations = messageChannelMessagesAssociations.filter((association)=>association.messageId === messages[i].id);
                const messageChannels = associations.map((association)=>messageChannelMap.get(association.messageChannelId)).filter(_utils.isDefined);
                if (messageChannels.length === 0) {
                    throw new _graphqlerrorsutil.NotFoundError('Associated message channels not found');
                }
                const messageChannelsGroupByVisibility = (0, _lodashgroupby.default)(messageChannels, (channel)=>channel.visibility);
                if (messageChannelsGroupByVisibility[_types.MessageChannelVisibility.SHARE_EVERYTHING]) {
                    continue;
                }
                if ((0, _utils.isDefined)(userId)) {
                    const workspaceMember = await workspaceMemberRepository.findOneByOrFail({
                        userId
                    });
                    const userWorkspace = await this.userWorkspaceRepository.findOne({
                        where: {
                            userId: workspaceMember.userId,
                            workspaceId
                        }
                    });
                    if (userWorkspace) {
                        const connectedAccounts = await this.connectedAccountRepository.find({
                            where: {
                                userWorkspaceId: userWorkspace.id,
                                workspaceId,
                                messageChannels: {
                                    id: (0, _typeorm1.In)(messageChannels.map((channel)=>channel.id))
                                }
                            },
                            relations: {
                                messageChannels: true
                            }
                        });
                        if (connectedAccounts.length > 0) {
                            continue;
                        }
                    }
                }
                if (messageChannelsGroupByVisibility[_types.MessageChannelVisibility.SUBJECT]) {
                    messages[i].text = _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED;
                    continue;
                }
                if (messageChannelsGroupByVisibility[_types.MessageChannelVisibility.METADATA]) {
                    messages[i].subject = _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED;
                    messages[i].text = _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED;
                    continue;
                }
                messages.splice(i, 1);
            }
            return messages;
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, connectedAccountRepository, userWorkspaceRepository, messageChannelRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.messageChannelRepository = messageChannelRepository;
    }
};
ApplyMessagesVisibilityRestrictionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ApplyMessagesVisibilityRestrictionsService);

//# sourceMappingURL=apply-messages-visibility-restrictions.service.js.map