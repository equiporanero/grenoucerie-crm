/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RowLevelPermissionPredicateService", {
    enumerable: true,
    get: function() {
        return RowLevelPermissionPredicateService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _applicationservice = require("../../../core-modules/application/application.service");
const _billingentitlementkeyenum = require("../../../core-modules/billing/enums/billing-entitlement-key.enum");
const _billingservice = require("../../../core-modules/billing/services/billing.service");
const _enterpriseplanservice = require("../../../core-modules/enterprise/services/enterprise-plan.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _addflatentitytoflatentitymapsorthrowutil = require("../../flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _fromcreaterowlevelpermissionpredicategroupinputtoflatrowlevelpermissionpredicategrouputil = require("../../flat-row-level-permission-predicate/utils/from-create-row-level-permission-predicate-group-input-to-flat-row-level-permission-predicate-group.util");
const _fromcreaterowlevelpermissionpredicateinputtoflatrowlevelpermissionpredicateutil = require("../../flat-row-level-permission-predicate/utils/from-create-row-level-permission-predicate-input-to-flat-row-level-permission-predicate.util");
const _fromflatrowlevelpermissionpredicategrouptodtoutil = require("../../flat-row-level-permission-predicate/utils/from-flat-row-level-permission-predicate-group-to-dto.util");
const _fromflatrowlevelpermissionpredicatetodtoutil = require("../../flat-row-level-permission-predicate/utils/from-flat-row-level-permission-predicate-to-dto.util");
const _fromupdaterowlevelpermissionpredicategroupinputtoflatrowlevelpermissionpredicategrouputil = require("../../flat-row-level-permission-predicate/utils/from-update-row-level-permission-predicate-group-input-to-flat-row-level-permission-predicate-group.util");
const _fromupdaterowlevelpermissionpredicateinputtoflatrowlevelpermissionpredicateutil = require("../../flat-row-level-permission-predicate/utils/from-update-row-level-permission-predicate-input-to-flat-row-level-permission-predicate.util");
const _rowlevelpermissionpredicateexception = require("../exceptions/row-level-permission-predicate.exception");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RowLevelPermissionPredicateService = class RowLevelPermissionPredicateService {
    async findByWorkspaceId(workspaceId) {
        const hasRowLevelPermissionFeature = await this.hasRowLevelPermissionFeature(workspaceId);
        if (!hasRowLevelPermissionFeature) {
            return [];
        }
        const { flatRowLevelPermissionPredicateMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRowLevelPermissionPredicateMaps'
            ]
        });
        return Object.values(flatRowLevelPermissionPredicateMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((predicate)=>predicate.deletedAt === null).sort((a, b)=>(a.positionInRowLevelPermissionPredicateGroup ?? 0) - (b.positionInRowLevelPermissionPredicateGroup ?? 0)).map(_fromflatrowlevelpermissionpredicatetodtoutil.fromFlatRowLevelPermissionPredicateToDto);
    }
    async findByRoleAndObject(workspaceId, roleId, objectMetadataId) {
        const hasRowLevelPermissionFeature = await this.hasRowLevelPermissionFeature(workspaceId);
        if (!hasRowLevelPermissionFeature) {
            return [];
        }
        const { flatRowLevelPermissionPredicateMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRowLevelPermissionPredicateMaps'
            ]
        });
        return Object.values(flatRowLevelPermissionPredicateMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((predicate)=>predicate.deletedAt === null && predicate.roleId === roleId && predicate.objectMetadataId === objectMetadataId).sort((a, b)=>(a.positionInRowLevelPermissionPredicateGroup ?? 0) - (b.positionInRowLevelPermissionPredicateGroup ?? 0)).map(_fromflatrowlevelpermissionpredicatetodtoutil.fromFlatRowLevelPermissionPredicateToDto);
    }
    async findById(id, workspaceId) {
        const hasRowLevelPermissionFeature = await this.hasRowLevelPermissionFeature(workspaceId);
        if (!hasRowLevelPermissionFeature) {
            return null;
        }
        const { flatRowLevelPermissionPredicateMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRowLevelPermissionPredicateMaps'
            ]
        });
        const flatPredicate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatRowLevelPermissionPredicateMaps
        });
        if (!(0, _utils.isDefined)(flatPredicate) || flatPredicate.deletedAt !== null) {
            return null;
        }
        return (0, _fromflatrowlevelpermissionpredicatetodtoutil.fromFlatRowLevelPermissionPredicateToDto)(flatPredicate);
    }
    async upsertRowLevelPermissionPredicates({ input, workspaceId }) {
        await this.hasRowLevelPermissionFeatureOrThrow(workspaceId);
        const { roleId, objectMetadataId, predicates, predicateGroups } = input;
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatRowLevelPermissionPredicateMaps, flatRowLevelPermissionPredicateGroupMaps, flatRoleMaps, flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRowLevelPermissionPredicateMaps',
                'flatRowLevelPermissionPredicateGroupMaps',
                'flatRoleMaps',
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const existingPredicates = Object.values(flatRowLevelPermissionPredicateMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((predicate)=>predicate.deletedAt === null && predicate.roleId === roleId && predicate.objectMetadataId === objectMetadataId);
        const existingGroups = Object.values(flatRowLevelPermissionPredicateGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.deletedAt === null && group.roleId === roleId && group.objectMetadataId === objectMetadataId);
        const { groupsToCreate, groupsToUpdate, groupsToDelete, flatRowLevelPermissionPredicateGroupMaps: flatRowLevelPermissionPredicateGroupMapsWithCreatedGroups } = this.computePredicateGroupOperations({
            existingGroups,
            inputGroups: predicateGroups,
            roleId,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatRowLevelPermissionPredicateGroupMaps,
            flatRoleMaps,
            flatObjectMetadataMaps
        });
        const { predicatesToCreate, predicatesToUpdate, predicatesToDelete } = this.computePredicateOperations({
            existingPredicates,
            inputPredicates: predicates,
            roleId,
            objectMetadataId,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatRowLevelPermissionPredicateMaps,
            flatRowLevelPermissionPredicateGroupMaps: flatRowLevelPermissionPredicateGroupMapsWithCreatedGroups,
            flatRoleMaps,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        await this.runUpsertMigration({
            workspaceId,
            predicatesToCreate,
            predicatesToUpdate,
            predicatesToDelete,
            groupsToCreate,
            groupsToUpdate,
            groupsToDelete
        });
        const { flatRowLevelPermissionPredicateMaps: updatedPredicateMaps, flatRowLevelPermissionPredicateGroupMaps: updatedGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRowLevelPermissionPredicateMaps',
                'flatRowLevelPermissionPredicateGroupMaps'
            ]
        });
        const resultPredicates = Object.values(updatedPredicateMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((predicate)=>predicate.deletedAt === null && predicate.roleId === roleId && predicate.objectMetadataId === objectMetadataId).map(_fromflatrowlevelpermissionpredicatetodtoutil.fromFlatRowLevelPermissionPredicateToDto);
        const resultGroups = Object.values(updatedGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.deletedAt === null && group.roleId === roleId && group.objectMetadataId === objectMetadataId).map(_fromflatrowlevelpermissionpredicategrouptodtoutil.fromFlatRowLevelPermissionPredicateGroupToDto);
        return {
            predicates: resultPredicates,
            predicateGroups: resultGroups
        };
    }
    computePredicateGroupOperations({ existingGroups, inputGroups, roleId, workspaceId, flatApplication, flatRowLevelPermissionPredicateGroupMaps, flatRoleMaps, flatObjectMetadataMaps }) {
        const groupsToCreate = [];
        const groupsToUpdate = [];
        const inputGroupIds = new Set();
        let currentGroupMaps = flatRowLevelPermissionPredicateGroupMaps;
        const { roleUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'rowLevelPermissionPredicateGroup',
            foreignKeyValues: {
                roleId
            },
            flatEntityMaps: {
                flatRoleMaps
            }
        });
        for (const inputGroup of inputGroups){
            const groupId = inputGroup.id ?? (0, _uuid.v4)();
            inputGroupIds.add(groupId);
            const existingGroup = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: groupId,
                flatEntityMaps: flatRowLevelPermissionPredicateGroupMaps
            });
            if ((0, _utils.isDefined)(existingGroup) && existingGroup.deletedAt === null) {
                groupsToUpdate.push((0, _fromupdaterowlevelpermissionpredicategroupinputtoflatrowlevelpermissionpredicategrouputil.fromUpdateRowLevelPermissionPredicateGroupInputToFlatRowLevelPermissionPredicateGroup)({
                    input: inputGroup,
                    existingGroup,
                    flatRowLevelPermissionPredicateGroupMaps: currentGroupMaps
                }));
            } else {
                const flatGroupToCreate = (0, _fromcreaterowlevelpermissionpredicategroupinputtoflatrowlevelpermissionpredicategrouputil.fromCreateRowLevelPermissionPredicateGroupInputToFlatRowLevelPermissionPredicateGroup)({
                    input: {
                        ...inputGroup,
                        id: groupId
                    },
                    roleId,
                    workspaceId,
                    roleUniversalIdentifier,
                    flatApplication,
                    flatObjectMetadataMaps,
                    flatRowLevelPermissionPredicateGroupMaps: currentGroupMaps
                });
                groupsToCreate.push(flatGroupToCreate);
                currentGroupMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                    flatEntity: flatGroupToCreate,
                    flatEntityMaps: currentGroupMaps
                });
            }
        }
        const groupsToDelete = existingGroups.filter((group)=>!inputGroupIds.has(group.id)).map((group)=>({
                ...group,
                deletedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }));
        return {
            groupsToCreate,
            groupsToUpdate,
            groupsToDelete,
            flatRowLevelPermissionPredicateGroupMaps: currentGroupMaps
        };
    }
    computePredicateOperations({ existingPredicates, inputPredicates, roleId, objectMetadataId, workspaceId, flatApplication, flatRowLevelPermissionPredicateMaps, flatRowLevelPermissionPredicateGroupMaps, flatRoleMaps, flatObjectMetadataMaps, flatFieldMetadataMaps }) {
        const predicatesToCreate = [];
        const predicatesToUpdate = [];
        const inputPredicateIds = new Set();
        const { roleUniversalIdentifier, objectMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'rowLevelPermissionPredicate',
            foreignKeyValues: {
                roleId,
                objectMetadataId
            },
            flatEntityMaps: {
                flatRoleMaps,
                flatObjectMetadataMaps
            }
        });
        for (const inputPredicate of inputPredicates){
            const predicateId = inputPredicate.id ?? (0, _uuid.v4)();
            inputPredicateIds.add(predicateId);
            const existingPredicate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: predicateId,
                flatEntityMaps: flatRowLevelPermissionPredicateMaps
            });
            if ((0, _utils.isDefined)(existingPredicate) && existingPredicate.deletedAt === null) {
                predicatesToUpdate.push((0, _fromupdaterowlevelpermissionpredicateinputtoflatrowlevelpermissionpredicateutil.fromUpdateRowLevelPermissionPredicateInputToFlatRowLevelPermissionPredicate)({
                    input: inputPredicate,
                    existingPredicate,
                    flatFieldMetadataMaps,
                    flatRowLevelPermissionPredicateGroupMaps
                }));
            } else {
                predicatesToCreate.push((0, _fromcreaterowlevelpermissionpredicateinputtoflatrowlevelpermissionpredicateutil.fromCreateRowLevelPermissionPredicateInputToFlatRowLevelPermissionPredicate)({
                    input: {
                        ...inputPredicate,
                        id: predicateId
                    },
                    roleId,
                    objectMetadataId,
                    workspaceId,
                    roleUniversalIdentifier,
                    objectMetadataUniversalIdentifier,
                    flatApplication,
                    flatFieldMetadataMaps,
                    flatRowLevelPermissionPredicateGroupMaps
                }));
            }
        }
        const predicatesToDelete = existingPredicates.filter((predicate)=>!inputPredicateIds.has(predicate.id)).map((predicate)=>({
                ...predicate,
                deletedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }));
        return {
            predicatesToCreate,
            predicatesToUpdate,
            predicatesToDelete
        };
    }
    async runUpsertMigration({ workspaceId, predicatesToCreate, predicatesToUpdate, predicatesToDelete, groupsToCreate, groupsToUpdate, groupsToDelete }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                rowLevelPermissionPredicateGroup: {
                    flatEntityToCreate: groupsToCreate,
                    flatEntityToUpdate: [
                        ...groupsToUpdate,
                        ...groupsToDelete
                    ],
                    flatEntityToDelete: []
                },
                rowLevelPermissionPredicate: {
                    flatEntityToCreate: predicatesToCreate,
                    flatEntityToUpdate: [
                        ...predicatesToUpdate,
                        ...predicatesToDelete
                    ],
                    flatEntityToDelete: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Validation errors occurred while upserting row level permission predicates');
        }
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
            'rolesPermissions'
        ]);
    }
    async hasRowLevelPermissionFeature(workspaceId) {
        const hasValidEnterprisePlan = this.enterprisePlanService.isValid();
        const isRowLevelPermissionEnabled = await this.billingService.hasEntitlement(workspaceId, _billingentitlementkeyenum.BillingEntitlementKey.RLS);
        return hasValidEnterprisePlan && isRowLevelPermissionEnabled;
    }
    async hasRowLevelPermissionFeatureOrThrow(workspaceId) {
        const hasRowLevelPermissionFeature = await this.hasRowLevelPermissionFeature(workspaceId);
        if (!hasRowLevelPermissionFeature) {
            throw new _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateException('Row level permission predicate feature is disabled', _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROW_LEVEL_PERMISSION_FEATURE_DISABLED);
        }
    }
    constructor(workspaceMigrationValidateBuildAndRunService, flatEntityMapsCacheService, workspaceCacheService, billingService, applicationService, enterprisePlanService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.workspaceCacheService = workspaceCacheService;
        this.billingService = billingService;
        this.applicationService = applicationService;
        this.enterprisePlanService = enterprisePlanService;
    }
};
RowLevelPermissionPredicateService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _enterpriseplanservice.EnterprisePlanService === "undefined" ? Object : _enterpriseplanservice.EnterprisePlanService
    ])
], RowLevelPermissionPredicateService);

//# sourceMappingURL=row-level-permission-predicate.service.js.map