"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GlobalWorkspaceDataSourceService", {
    enumerable: true,
    get: function() {
        return GlobalWorkspaceDataSourceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _twentyconfigservice = require("../../core-modules/twenty-config/twenty-config.service");
const _globalworkspacedatasource = require("./global-workspace-datasource");
const _workspaceeventemitter = require("../../workspace-event-emitter/workspace-event-emitter");
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
let GlobalWorkspaceDataSourceService = class GlobalWorkspaceDataSourceService {
    async onModuleInit() {
        this.globalWorkspaceDataSource = new _globalworkspacedatasource.GlobalWorkspaceDataSource({
            url: this.twentyConfigService.get('PG_DATABASE_URL'),
            type: 'postgres',
            logging: this.twentyConfigService.getLoggingConfig(),
            entities: [],
            ssl: this.twentyConfigService.get('PG_SSL_ALLOW_SELF_SIGNED') ? {
                rejectUnauthorized: false
            } : undefined,
            poolSize: this.twentyConfigService.get('PG_POOL_MAX_CONNECTIONS'),
            extra: {
                query_timeout: this.twentyConfigService.get('PG_DATABASE_PRIMARY_TIMEOUT_MS'),
                idleTimeoutMillis: this.twentyConfigService.get('PG_POOL_IDLE_TIMEOUT_MS'),
                allowExitOnIdle: this.twentyConfigService.get('PG_POOL_ALLOW_EXIT_ON_IDLE')
            }
        }, this.workspaceEventEmitter, this.coreDataSource);
        await this.globalWorkspaceDataSource.initialize();
        const shouldInitializeReplicaDataSource = (0, _utils.isDefined)(this.twentyConfigService.get('PG_DATABASE_REPLICA_URL'));
        if (shouldInitializeReplicaDataSource) {
            this.globalWorkspaceDataSourceReplica = new _globalworkspacedatasource.GlobalWorkspaceDataSource({
                url: this.twentyConfigService.get('PG_DATABASE_REPLICA_URL'),
                type: 'postgres',
                logging: this.twentyConfigService.getLoggingConfig(),
                entities: [],
                ssl: this.twentyConfigService.get('PG_SSL_ALLOW_SELF_SIGNED') ? {
                    rejectUnauthorized: false
                } : undefined,
                poolSize: this.twentyConfigService.get('PG_POOL_MAX_CONNECTIONS'),
                extra: {
                    query_timeout: this.twentyConfigService.get('PG_DATABASE_REPLICA_TIMEOUT_MS'),
                    idleTimeoutMillis: this.twentyConfigService.get('PG_POOL_IDLE_TIMEOUT_MS'),
                    allowExitOnIdle: this.twentyConfigService.get('PG_POOL_ALLOW_EXIT_ON_IDLE')
                }
            }, this.workspaceEventEmitter, this.coreDataSource);
            await this.globalWorkspaceDataSourceReplica.initialize();
        }
    }
    getGlobalWorkspaceDataSource() {
        if (!(0, _utils.isDefined)(this.globalWorkspaceDataSource)) {
            throw new Error('GlobalWorkspaceDataSource has not been initialized. Make sure the module has been initialized.');
        }
        return this.globalWorkspaceDataSource;
    }
    getGlobalWorkspaceDataSourceReplica() {
        if (!(0, _utils.isDefined)(this.globalWorkspaceDataSourceReplica)) {
            return this.getGlobalWorkspaceDataSource();
        }
        return this.globalWorkspaceDataSourceReplica;
    }
    async onApplicationShutdown() {
        if (this.globalWorkspaceDataSource) {
            await this.globalWorkspaceDataSource.destroy();
            this.globalWorkspaceDataSource = null;
        }
        if (this.globalWorkspaceDataSourceReplica) {
            await this.globalWorkspaceDataSourceReplica.destroy();
            this.globalWorkspaceDataSourceReplica = null;
        }
    }
    constructor(twentyConfigService, workspaceEventEmitter, coreDataSource){
        this.twentyConfigService = twentyConfigService;
        this.workspaceEventEmitter = workspaceEventEmitter;
        this.coreDataSource = coreDataSource;
        this.globalWorkspaceDataSource = null;
        this.globalWorkspaceDataSourceReplica = null;
    }
};
GlobalWorkspaceDataSourceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _workspaceeventemitter.WorkspaceEventEmitter === "undefined" ? Object : _workspaceeventemitter.WorkspaceEventEmitter,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource
    ])
], GlobalWorkspaceDataSourceService);

//# sourceMappingURL=global-workspace-datasource.service.js.map