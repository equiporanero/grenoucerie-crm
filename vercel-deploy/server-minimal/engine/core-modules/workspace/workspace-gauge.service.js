"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceGaugeService", {
    enumerable: true,
    get: function() {
        return WorkspaceGaugeService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspace = require("twenty-shared/workspace");
const _metricsservice = require("../metrics/metrics.service");
const _workspaceentity = require("./workspace.entity");
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
let WorkspaceGaugeService = class WorkspaceGaugeService {
    onModuleInit() {
        for (const status of Object.values(_workspace.WorkspaceActivationStatus)){
            this.metricsService.createObservableGauge({
                metricName: `twenty_workspaces_by_status_${status.toLowerCase()}`,
                options: {
                    description: `Number of workspaces with activation status ${status}`
                },
                callback: async ()=>{
                    return this.getWorkspaceCountByStatus(status);
                },
                cacheValue: true
            });
        }
        this.metricsService.createObservableGauge({
            metricName: 'twenty_workspaces_deleted_total',
            options: {
                description: 'Total number of soft-deleted workspaces'
            },
            callback: async ()=>{
                return this.getDeletedWorkspacesCount();
            },
            cacheValue: true
        });
    }
    async getWorkspaceCountByStatus(status) {
        try {
            return this.workspaceRepository.count({
                where: {
                    activationStatus: status,
                    deletedAt: (0, _typeorm1.IsNull)()
                }
            });
        } catch (error) {
            this.logger.error(`Failed to count workspaces with status ${status}`, error);
            return 0;
        }
    }
    async getDeletedWorkspacesCount() {
        try {
            return this.workspaceRepository.count({
                where: {
                    deletedAt: (0, _typeorm1.Not)((0, _typeorm1.IsNull)())
                },
                withDeleted: true
            });
        } catch (error) {
            this.logger.error('Failed to count deleted workspaces', error);
            return 0;
        }
    }
    constructor(metricsService, workspaceRepository){
        this.metricsService = metricsService;
        this.workspaceRepository = workspaceRepository;
        this.logger = new _common.Logger(WorkspaceGaugeService.name);
    }
};
WorkspaceGaugeService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceGaugeService);

//# sourceMappingURL=workspace-gauge.service.js.map