"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppHealthIndicator", {
    enumerable: true,
    get: function() {
        return AppHealthIndicator;
    }
});
const _common = require("@nestjs/common");
const _terminus = require("@nestjs/terminus");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _healthstatemanagerutil = require("../utils/health-state-manager.util");
const _workspaceentity = require("../../workspace/workspace.entity");
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
let AppHealthIndicator = class AppHealthIndicator {
    // TODO refactor, a workspace health should be based on its app versioning
    async isHealthy() {
        const indicator = this.healthIndicatorService.check('app');
        try {
            const totalWorkspaceCount = await this.workspaceRepository.count();
            const details = {
                system: {
                    nodeVersion: process.version,
                    timestamp: new Date().toISOString()
                },
                overview: {
                    totalWorkspacesCount: totalWorkspaceCount,
                    erroredWorkspaceCount: 0
                },
                erroredWorkspace: 0
            };
            this.stateManager.updateState(details);
            return indicator.up({
                details
            });
        } catch (error) {
            const stateWithAge = this.stateManager.getStateWithAge();
            return indicator.down({
                message: error.message,
                details: {
                    system: {
                        nodeVersion: process.version,
                        timestamp: new Date().toISOString()
                    },
                    stateHistory: stateWithAge
                }
            });
        }
    }
    constructor(healthIndicatorService, workspaceRepository){
        this.healthIndicatorService = healthIndicatorService;
        this.workspaceRepository = workspaceRepository;
        this.stateManager = new _healthstatemanagerutil.HealthStateManager();
    }
};
AppHealthIndicator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _terminus.HealthIndicatorService === "undefined" ? Object : _terminus.HealthIndicatorService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], AppHealthIndicator);

//# sourceMappingURL=app.health.js.map