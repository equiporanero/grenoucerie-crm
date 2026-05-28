"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedAccountListener", {
    enumerable: true,
    get: function() {
        return ConnectedAccountListener;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _ondatabasebatcheventdecorator = require("../../../engine/api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workspaceeventbatchtype = require("../../../engine/workspace-event-emitter/types/workspace-event-batch.type");
const _accountstoreconnectservice = require("../services/accounts-to-reconnect.service");
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
let ConnectedAccountListener = class ConnectedAccountListener {
    async handleDestroyedEvent(payload) {
        const workspaceId = payload.workspaceId;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            for (const eventPayload of payload.events){
                const userWorkspaceId = eventPayload.properties.before.userWorkspaceId;
                const userWorkspace = await this.userWorkspaceRepository.findOne({
                    where: {
                        id: userWorkspaceId
                    }
                });
                if (!userWorkspace) {
                    continue;
                }
                const userId = userWorkspace.userId;
                const connectedAccountId = eventPayload.properties.before.id;
                await this.accountsToReconnectService.removeAccountToReconnect(userId, workspaceId, connectedAccountId);
            }
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, accountsToReconnectService, userWorkspaceRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.accountsToReconnectService = accountsToReconnectService;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('connectedAccount', _databaseeventaction.DatabaseEventAction.DESTROYED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], ConnectedAccountListener.prototype, "handleDestroyedEvent", null);
ConnectedAccountListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _accountstoreconnectservice.AccountsToReconnectService === "undefined" ? Object : _accountstoreconnectservice.AccountsToReconnectService,
        typeof Repository === "undefined" ? Object : Repository
    ])
], ConnectedAccountListener);

//# sourceMappingURL=connected-account.listener.js.map