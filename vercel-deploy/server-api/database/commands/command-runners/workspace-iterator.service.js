"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceIteratorService", {
    enumerable: true,
    get: function() {
        return WorkspaceIteratorService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _chalk = /*#__PURE__*/ _interop_require_default(require("chalk"));
const _guards = require("@sniptt/guards");
const _workspace = require("twenty-shared/workspace");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workspacemigrationrunnerexception = require("../../../engine/workspace-manager/workspace-migration/workspace-migration-runner/exceptions/workspace-migration-runner.exception");
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
const DEFAULT_ACTIVATION_STATUSES = [
    _workspace.WorkspaceActivationStatus.ACTIVE,
    _workspace.WorkspaceActivationStatus.SUSPENDED
];
let WorkspaceIteratorService = class WorkspaceIteratorService {
    async iterate(args) {
        const { callback, ...options } = args;
        const report = {
            fail: [],
            success: []
        };
        const workspaceIdsToProcess = options.workspaceIds && options.workspaceIds.length > 0 ? options.workspaceIds : await this.fetchWorkspaceIds(options);
        if (options.dryRun) {
            this.logger.log(_chalk.default.yellow('Dry run mode: No changes will be applied'));
        }
        for (const [index, workspaceId] of workspaceIdsToProcess.entries()){
            this.logger.log(`Running on workspace ${workspaceId} ${index + 1}/${workspaceIdsToProcess.length}`);
            try {
                const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
                await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                    const workspace = await this.workspaceRepository.findOne({
                        select: [
                            'databaseSchema'
                        ],
                        where: {
                            id: workspaceId
                        }
                    });
                    const dataSource = (0, _guards.isNonEmptyString)(workspace?.databaseSchema) ? await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource() : undefined;
                    await callback({
                        workspaceId,
                        dataSource,
                        index,
                        total: workspaceIdsToProcess.length
                    });
                }, authContext);
                report.success.push({
                    workspaceId
                });
            } catch (error) {
                report.fail.push({
                    error: error,
                    workspaceId
                });
            }
        }
        report.fail.forEach(({ error, workspaceId })=>{
            this.logger.error(`Error in workspace ${workspaceId}: ${error.message}`, error.stack);
            if (error instanceof _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException && error.errors) {
                for (const [label, innerError] of Object.entries(error.errors)){
                    if (!(0, _utils.isDefined)(innerError)) continue;
                    if (innerError instanceof Error) {
                        this.logger.error(`Caused by ${label} in workspace ${workspaceId}: ${innerError.message}`, innerError.stack);
                    } else {
                        this.logger.error(`Caused by ${label} in workspace ${workspaceId}: ${String(innerError)}`);
                    }
                }
            }
        });
        return report;
    }
    async fetchWorkspaceIds(options) {
        const activationStatuses = options.activationStatuses ?? DEFAULT_ACTIVATION_STATUSES;
        const workspaces = await this.workspaceRepository.find({
            select: [
                'id'
            ],
            where: {
                activationStatus: (0, _typeorm1.In)(activationStatuses),
                ...options.startFromWorkspaceId ? {
                    id: (0, _typeorm1.MoreThanOrEqual)(options.startFromWorkspaceId)
                } : {}
            },
            order: {
                id: 'ASC'
            },
            take: options.workspaceCountLimit
        });
        return workspaces.map((workspace)=>workspace.id);
    }
    constructor(workspaceRepository, globalWorkspaceOrmManager){
        this.workspaceRepository = workspaceRepository;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(WorkspaceIteratorService.name);
    }
};
WorkspaceIteratorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], WorkspaceIteratorService);

//# sourceMappingURL=workspace-iterator.service.js.map