"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectRecordCountService", {
    enumerable: true,
    get: function() {
        return ObjectRecordCountService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _computetablenameutil = require("../../utils/compute-table-name.util");
const _getworkspaceschemanameutil = require("../../workspace-datasource/utils/get-workspace-schema-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectRecordCountService = class ObjectRecordCountService {
    async getRecordCounts(workspaceId) {
        const { flatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const flatObjectMetadatas = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        const dataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
        const rows = await dataSource.query(`SELECT relname, reltuples::bigint AS approximate_count
         FROM pg_class c
         JOIN pg_namespace n ON c.relnamespace = n.oid
         WHERE n.nspname = $1
         AND c.relkind = 'r'`, [
            schemaName
        ], undefined, {
            shouldBypassPermissionChecks: true
        });
        const countByTableName = new Map();
        for (const row of rows){
            countByTableName.set(row.relname, Math.max(0, Number(row.approximate_count)));
        }
        return flatObjectMetadatas.map((flatObjectMetadata)=>({
                objectNamePlural: flatObjectMetadata.namePlural,
                totalCount: countByTableName.get((0, _computetablenameutil.computeTableName)(flatObjectMetadata.nameSingular, flatObjectMetadata.isCustom)) ?? 0
            }));
    }
    constructor(globalWorkspaceOrmManager, workspaceManyOrAllFlatEntityMapsCacheService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
    }
};
ObjectRecordCountService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], ObjectRecordCountService);

//# sourceMappingURL=object-record-count.service.js.map