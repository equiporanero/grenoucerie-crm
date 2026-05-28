"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemRecordIdentifierService", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemRecordIdentifierService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _fileurlservice = require("../../../core-modules/file/file-url/file-url.service");
const _getrecorddisplaynameutil = require("../../../core-modules/record-crud/utils/get-record-display-name.util");
const _getrecordimageidentifierutil = require("../../../core-modules/record-crud/utils/get-record-image-identifier.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _getminimalselectforrecordidentifierutil = require("../utils/get-minimal-select-for-record-identifier.util");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _ormworkspacecontextstorage = require("../../../twenty-orm/storage/orm-workspace-context.storage");
const _formatresultutil = require("../../../twenty-orm/utils/format-result.util");
const _resolverolepermissionconfigutil = require("../../../twenty-orm/utils/resolve-role-permission-config.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NavigationMenuItemRecordIdentifierService = class NavigationMenuItemRecordIdentifierService {
    async resolveRecordIdentifier({ targetRecordId, targetObjectMetadataId, workspaceId, authContext }) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const objectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: targetObjectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(objectMetadata)) {
            return null;
        }
        const minimalSelectColumns = (0, _getminimalselectforrecordidentifierutil.getMinimalSelectForRecordIdentifier)({
            flatObjectMetadata: objectMetadata,
            flatFieldMetadataMaps
        });
        const resolvedAuthContext = authContext ?? {
            type: 'system',
            workspace: {
                id: workspaceId
            }
        };
        const record = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const context = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
            const rolePermissionConfig = (0, _resolverolepermissionconfigutil.resolveRolePermissionConfig)({
                authContext: context.authContext,
                userWorkspaceRoleMap: context.userWorkspaceRoleMap,
                apiKeyRoleMap: context.apiKeyRoleMap
            });
            if (!rolePermissionConfig) {
                return null;
            }
            const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectMetadata.nameSingular, rolePermissionConfig);
            const alias = objectMetadata.nameSingular;
            const queryBuilder = repository.createQueryBuilder(alias);
            queryBuilder.select([]);
            for (const column of minimalSelectColumns){
                queryBuilder.addSelect(`"${alias}"."${column}"`, column);
            }
            const rawResult = await queryBuilder.where(`${alias}.id = :id`, {
                id: targetRecordId
            }).getRawOne();
            if (!(0, _utils.isDefined)(rawResult)) {
                return null;
            }
            return (0, _formatresultutil.formatResult)(rawResult, objectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps);
        }, resolvedAuthContext);
        if (!(0, _utils.isDefined)(record)) {
            return null;
        }
        const labelIdentifier = (0, _getrecorddisplaynameutil.getRecordDisplayName)(record, objectMetadata, flatFieldMetadataMaps);
        const imageIdentifier = await (0, _getrecordimageidentifierutil.getRecordImageIdentifier)({
            record,
            flatObjectMetadata: objectMetadata,
            flatFieldMetadataMaps,
            signUrl: (fileId, fileFolder)=>this.fileUrlService.signFileByIdUrl({
                    fileId,
                    workspaceId,
                    fileFolder
                })
        });
        return {
            id: record.id,
            labelIdentifier,
            imageIdentifier
        };
    }
    constructor(workspaceManyOrAllFlatEntityMapsCacheService, globalWorkspaceOrmManager, fileUrlService){
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.fileUrlService = fileUrlService;
    }
};
NavigationMenuItemRecordIdentifierService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService
    ])
], NavigationMenuItemRecordIdentifierService);

//# sourceMappingURL=navigation-menu-item-record-identifier.service.js.map