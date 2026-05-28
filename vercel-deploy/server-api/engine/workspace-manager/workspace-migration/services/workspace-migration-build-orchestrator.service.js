"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationBuildOrchestratorService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationBuildOrchestratorService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _createemptyallflatentitymapsconstant = require("../../../metadata-modules/flat-entity/constant/create-empty-all-flat-entity-maps.constant");
const _emptyorchestratoractionsreportconstant = require("../constant/empty-orchestrator-actions-report.constant");
const _emptyorchestratorfailurereportconstant = require("../constant/empty-orchestrator-failure-report.constant");
const _aggregateorchestratoractionsreportutil = require("../utils/aggregate-orchestrator-actions-report.util");
const _crossentitytransversalvalidationutil = require("../utils/cross-entity-transversal-validation.util");
const _mergeorchestratorfailurereportsutil = require("../utils/merge-orchestrator-failure-reports.util");
const _workspacemigrationagentactionsbuilderservice = require("../workspace-migration-builder/builders/agent/workspace-migration-agent-actions-builder.service");
const _workspacemigrationcommandmenuitemactionsbuilderservice = require("../workspace-migration-builder/builders/command-menu-item/workspace-migration-command-menu-item-actions-builder.service");
const _workspacemigrationconnectionprovideractionsbuilderservice = require("../workspace-migration-builder/builders/connection-provider/workspace-migration-connection-provider-actions-builder.service");
const _workspacemigrationfieldpermissionactionsbuilderservice = require("../workspace-migration-builder/builders/field-permission/workspace-migration-field-permission-actions-builder.service");
const _workspacemigrationfieldactionsbuilderservice = require("../workspace-migration-builder/builders/field/workspace-migration-field-actions-builder.service");
const _workspacemigrationfrontcomponentactionsbuilderservice = require("../workspace-migration-builder/builders/front-component/workspace-migration-front-component-actions-builder.service");
const _workspacemigrationindexactionsbuilderservice = require("../workspace-migration-builder/builders/index/workspace-migration-index-actions-builder.service");
const _workspacemigrationlogicfunctionactionsbuilderservice = require("../workspace-migration-builder/builders/logic-function/workspace-migration-logic-function-actions-builder.service");
const _workspacemigrationnavigationmenuitemactionsbuilderservice = require("../workspace-migration-builder/builders/navigation-menu-item/workspace-migration-navigation-menu-item-actions-builder.service");
const _workspacemigrationobjectpermissionactionsbuilderservice = require("../workspace-migration-builder/builders/object-permission/workspace-migration-object-permission-actions-builder.service");
const _workspacemigrationobjectactionsbuilderservice = require("../workspace-migration-builder/builders/object/workspace-migration-object-actions-builder.service");
const _workspacemigrationpagelayouttabactionsbuilderservice = require("../workspace-migration-builder/builders/page-layout-tab/workspace-migration-page-layout-tab-actions-builder.service");
const _workspacemigrationpagelayoutwidgetactionsbuilderservice = require("../workspace-migration-builder/builders/page-layout-widget/workspace-migration-page-layout-widget-actions-builder.service");
const _workspacemigrationpagelayoutactionsbuilderservice = require("../workspace-migration-builder/builders/page-layout/workspace-migration-page-layout-actions-builder.service");
const _workspacemigrationpermissionflagactionsbuilderservice = require("../workspace-migration-builder/builders/permission-flag/workspace-migration-permission-flag-actions-builder.service");
const _workspacemigrationrolepermissionflagactionsbuilderservice = require("../workspace-migration-builder/builders/role-permission-flag/workspace-migration-role-permission-flag-actions-builder.service");
const _workspacemigrationroletargetactionsbuilderservice = require("../workspace-migration-builder/builders/role-target/workspace-migration-role-target-actions-builder.service");
const _workspacemigrationroleactionsbuilderservice = require("../workspace-migration-builder/builders/role/workspace-migration-role-actions-builder.service");
const _workspacemigrationrowlevelpermissionpredicategroupactionsbuilderservice = require("../workspace-migration-builder/builders/row-level-permission-predicate-group/workspace-migration-row-level-permission-predicate-group-actions-builder.service");
const _workspacemigrationrowlevelpermissionpredicateactionsbuilderservice = require("../workspace-migration-builder/builders/row-level-permission-predicate/workspace-migration-row-level-permission-predicate-actions-builder.service");
const _workspacemigrationskillactionsbuilderservice = require("../workspace-migration-builder/builders/skill/workspace-migration-skill-actions-builder.service");
const _workspacemigrationviewfieldgroupactionsbuilderservice = require("../workspace-migration-builder/builders/view-field-group/workspace-migration-view-field-group-actions-builder.service");
const _workspacemigrationviewfieldactionsbuilderservice = require("../workspace-migration-builder/builders/view-field/workspace-migration-view-field-actions-builder.service");
const _workspacemigrationviewfiltergroupactionsbuilderservice = require("../workspace-migration-builder/builders/view-filter-group/workspace-migration-view-filter-group-actions-builder.service");
const _workspacemigrationviewfilteractionsbuilderservice = require("../workspace-migration-builder/builders/view-filter/workspace-migration-view-filter-actions-builder.service");
const _workspacemigrationviewgroupactionsbuilderservice = require("../workspace-migration-builder/builders/view-group/workspace-migration-view-group-actions-builder.service");
const _workspacemigrationviewsortactionsbuilderservice = require("../workspace-migration-builder/builders/view-sort/workspace-migration-view-sort-actions.builder.service");
const _workspacemigrationviewactionsbuilderservice = require("../workspace-migration-builder/builders/view/workspace-migration-view-actions-builder.service");
const _workspacemigrationapplicationvariableactionsbuilderservice = require("../workspace-migration-builder/builders/application-variable/workspace-migration-application-variable-actions-builder.service");
const _workspacemigrationwebhookactionsbuilderservice = require("../workspace-migration-builder/builders/webhook/workspace-migration-webhook-actions-builder.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationBuildOrchestratorService = class WorkspaceMigrationBuildOrchestratorService {
    setupOptimisticCache({ fromToAllFlatEntityMaps, dependencyAllFlatEntityMaps }) {
        if ((0, _utils.isDefined)(dependencyAllFlatEntityMaps)) {
            return {
                ...(0, _createemptyallflatentitymapsconstant.createEmptyAllFlatEntityMaps)(),
                ...dependencyAllFlatEntityMaps
            };
        }
        const allFromToFlatEntityMapsKeys = Object.keys(fromToAllFlatEntityMaps);
        return allFromToFlatEntityMapsKeys.reduce((allFlatEntityMaps, currFlatMaps)=>{
            const fromToOccurence = fromToAllFlatEntityMaps[currFlatMaps];
            if (!(0, _utils.isDefined)(fromToOccurence)) {
                return allFlatEntityMaps;
            }
            return {
                ...allFlatEntityMaps,
                [currFlatMaps]: fromToOccurence.from
            };
        }, {
            ...(0, _createemptyallflatentitymapsconstant.createEmptyAllFlatEntityMaps)()
        });
    }
    async buildWorkspaceMigration({ workspaceId, buildOptions, fromToAllFlatEntityMaps, dependencyAllFlatEntityMaps, additionalCacheDataMaps }) {
        const orchestratorActionsReport = structuredClone({
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)()
        });
        const orchestratorFailureReport = structuredClone((0, _emptyorchestratorfailurereportconstant.EMPTY_ORCHESTRATOR_FAILURE_REPORT)());
        const optimisticAllFlatEntityMaps = this.setupOptimisticCache({
            fromToAllFlatEntityMaps,
            dependencyAllFlatEntityMaps
        });
        const preDeletionFlatViewFieldMaps = structuredClone(optimisticAllFlatEntityMaps.flatViewFieldMaps);
        const { flatObjectMetadataMaps, flatViewFieldMaps, flatViewMaps, flatIndexMaps, flatLogicFunctionMaps, flatFieldMetadataMaps, flatViewFilterMaps, flatViewFilterGroupMaps, flatViewGroupMaps, flatViewFieldGroupMaps, flatViewSortMaps, flatRowLevelPermissionPredicateMaps, flatRowLevelPermissionPredicateGroupMaps, flatRoleMaps, flatObjectPermissionMaps, flatFieldPermissionMaps, flatRolePermissionFlagMaps, flatPermissionFlagMaps, flatRoleTargetMaps, flatAgentMaps, flatSkillMaps, flatCommandMenuItemMaps, flatNavigationMenuItemMaps, flatPageLayoutMaps, flatPageLayoutWidgetMaps, flatPageLayoutTabMaps, flatFrontComponentMaps, flatWebhookMaps, flatApplicationVariableMaps, flatConnectionProviderMaps } = fromToAllFlatEntityMaps;
        if ((0, _utils.isDefined)(flatObjectMetadataMaps)) {
            const { from: fromFlatObjectMetadataMaps, to: toFlatObjectMetadataMaps } = flatObjectMetadataMaps;
            const objectResult = await this.workspaceMigrationObjectActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                from: fromFlatObjectMetadataMaps,
                to: toFlatObjectMetadataMaps,
                workspaceId
            });
            if (objectResult.status === 'fail') {
                orchestratorFailureReport.objectMetadata.push(...objectResult.errors);
            } else {
                orchestratorActionsReport.objectMetadata = objectResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatFieldMetadataMaps)) {
            const { from: fromFlatFieldMetadataMaps, to: toFlatFieldMetadataMaps } = flatFieldMetadataMaps;
            const fieldResult = await this.workspaceMigrationFieldActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatFieldMetadataMaps,
                to: toFlatFieldMetadataMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (fieldResult.status === 'fail') {
                orchestratorFailureReport.fieldMetadata.push(...fieldResult.errors);
            } else {
                orchestratorActionsReport.fieldMetadata = fieldResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatIndexMaps)) {
            const { from: fromFlatIndexMaps, to: toFlatIndexMaps } = flatIndexMaps;
            const indexResult = await this.workspaceMigrationIndexActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatIndexMaps,
                to: toFlatIndexMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (indexResult.status === 'fail') {
                orchestratorFailureReport.index.push(...indexResult.errors);
            } else {
                orchestratorActionsReport.index = indexResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatViewMaps)) {
            const { from: fromFlatViewMaps, to: toFlatViewMaps } = flatViewMaps;
            const viewResult = await this.workspaceMigrationViewActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                from: fromFlatViewMaps,
                to: toFlatViewMaps,
                buildOptions,
                workspaceId
            });
            if (viewResult.status === 'fail') {
                orchestratorFailureReport.view.push(...viewResult.errors);
            } else {
                orchestratorActionsReport.view = viewResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatViewFieldGroupMaps)) {
            const { from: fromFlatViewFieldGroupMaps, to: toFlatViewFieldGroupMaps } = flatViewFieldGroupMaps;
            const viewFieldGroupResult = await this.workspaceMigrationViewFieldGroupActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatViewFieldGroupMaps,
                to: toFlatViewFieldGroupMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (viewFieldGroupResult.status === 'fail') {
                orchestratorFailureReport.viewFieldGroup.push(...viewFieldGroupResult.errors);
            } else {
                orchestratorActionsReport.viewFieldGroup = viewFieldGroupResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatViewFieldMaps)) {
            const { from: fromFlatViewFieldMaps, to: toFlatViewFieldMaps } = flatViewFieldMaps;
            const viewFieldResult = await this.workspaceMigrationViewFieldActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatViewFieldMaps,
                to: toFlatViewFieldMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (viewFieldResult.status === 'fail') {
                orchestratorFailureReport.viewField.push(...viewFieldResult.errors);
            } else {
                orchestratorActionsReport.viewField = viewFieldResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatViewFilterGroupMaps)) {
            const { from: fromFlatViewFilterGroupMaps, to: toFlatViewFilterGroupMaps } = flatViewFilterGroupMaps;
            const viewFilterGroupResult = await this.workspaceMigrationViewFilterGroupActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatViewFilterGroupMaps,
                to: toFlatViewFilterGroupMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (viewFilterGroupResult.status === 'fail') {
                orchestratorFailureReport.viewFilterGroup.push(...viewFilterGroupResult.errors);
            } else {
                orchestratorActionsReport.viewFilterGroup = viewFilterGroupResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatViewFilterMaps)) {
            const { from: fromFlatViewFilterMaps, to: toFlatViewFilterMaps } = flatViewFilterMaps;
            const viewFilterResult = await this.workspaceMigrationViewFilterActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatViewFilterMaps,
                to: toFlatViewFilterMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (viewFilterResult.status === 'fail') {
                orchestratorFailureReport.viewFilter.push(...viewFilterResult.errors);
            } else {
                orchestratorActionsReport.viewFilter = viewFilterResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatViewGroupMaps)) {
            const { from: fromFlatViewGroupMaps, to: toFlatViewGroupMaps } = flatViewGroupMaps;
            const viewGroupResult = await this.workspaceMigrationViewGroupActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatViewGroupMaps,
                to: toFlatViewGroupMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (viewGroupResult.status === 'fail') {
                orchestratorFailureReport.viewGroup.push(...viewGroupResult.errors);
            } else {
                orchestratorActionsReport.viewGroup = viewGroupResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatViewSortMaps)) {
            const { from: fromFlatViewSortMaps, to: toFlatViewSortMaps } = flatViewSortMaps;
            const viewSortResult = await this.workspaceMigrationViewSortActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatViewSortMaps,
                to: toFlatViewSortMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (viewSortResult.status === 'fail') {
                orchestratorFailureReport.viewSort.push(...viewSortResult.errors);
            } else {
                orchestratorActionsReport.viewSort = viewSortResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatRowLevelPermissionPredicateGroupMaps)) {
            const { from: fromFlatRowLevelPermissionPredicateGroupMaps, to: toFlatRowLevelPermissionPredicateGroupMaps } = flatRowLevelPermissionPredicateGroupMaps;
            const rowLevelPermissionPredicateGroupResult = await this.workspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatRowLevelPermissionPredicateGroupMaps,
                to: toFlatRowLevelPermissionPredicateGroupMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (rowLevelPermissionPredicateGroupResult.status === 'fail') {
                orchestratorFailureReport.rowLevelPermissionPredicateGroup.push(...rowLevelPermissionPredicateGroupResult.errors);
            } else {
                orchestratorActionsReport.rowLevelPermissionPredicateGroup = rowLevelPermissionPredicateGroupResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatRowLevelPermissionPredicateMaps)) {
            const { from: fromFlatRowLevelPermissionPredicateMaps, to: toFlatRowLevelPermissionPredicateMaps } = flatRowLevelPermissionPredicateMaps;
            const rowLevelPermissionPredicateResult = await this.workspaceMigrationRowLevelPermissionPredicateActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatRowLevelPermissionPredicateMaps,
                to: toFlatRowLevelPermissionPredicateMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (rowLevelPermissionPredicateResult.status === 'fail') {
                orchestratorFailureReport.rowLevelPermissionPredicate.push(...rowLevelPermissionPredicateResult.errors);
            } else {
                orchestratorActionsReport.rowLevelPermissionPredicate = rowLevelPermissionPredicateResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatLogicFunctionMaps)) {
            const { from: fromFlatLogicFunctionMaps, to: toFlatLogicFunctionMaps } = flatLogicFunctionMaps;
            const logicFunctionResult = await this.workspaceMigrationLogicFunctionActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatLogicFunctionMaps,
                to: toFlatLogicFunctionMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (logicFunctionResult.status === 'fail') {
                orchestratorFailureReport.logicFunction.push(...logicFunctionResult.errors);
            } else {
                orchestratorActionsReport.logicFunction = logicFunctionResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatRoleMaps)) {
            const { from: fromFlatRoleMaps, to: toFlatRoleMaps } = flatRoleMaps;
            const roleResult = await this.workspaceMigrationRoleActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatRoleMaps,
                to: toFlatRoleMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (roleResult.status === 'fail') {
                orchestratorFailureReport.role.push(...roleResult.errors);
            } else {
                orchestratorActionsReport.role = roleResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatObjectPermissionMaps)) {
            const { from: fromFlatObjectPermissionMaps, to: toFlatObjectPermissionMaps } = flatObjectPermissionMaps;
            const objectPermissionResult = await this.workspaceMigrationObjectPermissionActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatObjectPermissionMaps,
                to: toFlatObjectPermissionMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (objectPermissionResult.status === 'fail') {
                orchestratorFailureReport.objectPermission.push(...objectPermissionResult.errors);
            } else {
                orchestratorActionsReport.objectPermission = objectPermissionResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatFieldPermissionMaps)) {
            const { from: fromFlatFieldPermissionMaps, to: toFlatFieldPermissionMaps } = flatFieldPermissionMaps;
            const fieldPermissionResult = await this.workspaceMigrationFieldPermissionActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatFieldPermissionMaps,
                to: toFlatFieldPermissionMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (fieldPermissionResult.status === 'fail') {
                orchestratorFailureReport.fieldPermission.push(...fieldPermissionResult.errors);
            } else {
                orchestratorActionsReport.fieldPermission = fieldPermissionResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatRolePermissionFlagMaps)) {
            const { from: fromFlatRolePermissionFlagMaps, to: toFlatRolePermissionFlagMaps } = flatRolePermissionFlagMaps;
            const rolePermissionFlagResult = await this.workspaceMigrationRolePermissionFlagActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatRolePermissionFlagMaps,
                to: toFlatRolePermissionFlagMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (rolePermissionFlagResult.status === 'fail') {
                orchestratorFailureReport.rolePermissionFlag.push(...rolePermissionFlagResult.errors);
            } else {
                orchestratorActionsReport.rolePermissionFlag = rolePermissionFlagResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatPermissionFlagMaps)) {
            const { from: fromFlatPermissionFlagMaps, to: toFlatPermissionFlagMaps } = flatPermissionFlagMaps;
            const permissionFlagResult = await this.workspaceMigrationPermissionFlagActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatPermissionFlagMaps,
                to: toFlatPermissionFlagMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (permissionFlagResult.status === 'fail') {
                orchestratorFailureReport.permissionFlag.push(...permissionFlagResult.errors);
            } else {
                orchestratorActionsReport.permissionFlag = permissionFlagResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatRoleTargetMaps)) {
            const { from: fromFlatRoleTargetMaps, to: toFlatRoleTargetMaps } = flatRoleTargetMaps;
            const roleTargetResult = await this.workspaceMigrationRoleTargetActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatRoleTargetMaps,
                to: toFlatRoleTargetMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (roleTargetResult.status === 'fail') {
                orchestratorFailureReport.roleTarget.push(...roleTargetResult.errors);
            } else {
                orchestratorActionsReport.roleTarget = roleTargetResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatAgentMaps)) {
            const { from: fromFlatAgentMaps, to: toFlatAgentMaps } = flatAgentMaps;
            const agentResult = await this.workspaceMigrationAgentActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatAgentMaps,
                to: toFlatAgentMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (agentResult.status === 'fail') {
                orchestratorFailureReport.agent.push(...agentResult.errors);
            } else {
                orchestratorActionsReport.agent = agentResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatSkillMaps)) {
            const { from: fromFlatSkillMaps, to: toFlatSkillMaps } = flatSkillMaps;
            const skillResult = await this.workspaceMigrationSkillActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatSkillMaps,
                to: toFlatSkillMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (skillResult.status === 'fail') {
                orchestratorFailureReport.skill.push(...skillResult.errors);
            } else {
                orchestratorActionsReport.skill = skillResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatFrontComponentMaps)) {
            const { from: fromFlatFrontComponentMaps, to: toFlatFrontComponentMaps } = flatFrontComponentMaps;
            const frontComponentResult = await this.workspaceMigrationFrontComponentActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatFrontComponentMaps,
                to: toFlatFrontComponentMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (frontComponentResult.status === 'fail') {
                orchestratorFailureReport.frontComponent.push(...frontComponentResult.errors);
            } else {
                orchestratorActionsReport.frontComponent = frontComponentResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatCommandMenuItemMaps)) {
            const { from: fromFlatCommandMenuItemMaps, to: toFlatCommandMenuItemMaps } = flatCommandMenuItemMaps;
            const commandMenuItemResult = await this.workspaceMigrationCommandMenuItemActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatCommandMenuItemMaps,
                to: toFlatCommandMenuItemMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (commandMenuItemResult.status === 'fail') {
                orchestratorFailureReport.commandMenuItem.push(...commandMenuItemResult.errors);
            } else {
                orchestratorActionsReport.commandMenuItem = commandMenuItemResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatNavigationMenuItemMaps)) {
            const { from: fromFlatNavigationMenuItemMaps, to: toFlatNavigationMenuItemMaps } = flatNavigationMenuItemMaps;
            const navigationMenuItemResult = await this.workspaceMigrationNavigationMenuItemActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatNavigationMenuItemMaps,
                to: toFlatNavigationMenuItemMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (navigationMenuItemResult.status === 'fail') {
                orchestratorFailureReport.navigationMenuItem.push(...navigationMenuItemResult.errors);
            } else {
                orchestratorActionsReport.navigationMenuItem = navigationMenuItemResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatPageLayoutMaps)) {
            const { from: fromFlatPageLayoutMaps, to: toFlatPageLayoutMaps } = flatPageLayoutMaps;
            const pageLayoutResult = await this.workspaceMigrationPageLayoutActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatPageLayoutMaps,
                to: toFlatPageLayoutMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (pageLayoutResult.status === 'fail') {
                orchestratorFailureReport.pageLayout.push(...pageLayoutResult.errors);
            } else {
                orchestratorActionsReport.pageLayout = pageLayoutResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatPageLayoutTabMaps)) {
            const { from: fromFlatPageLayoutTabMaps, to: toFlatPageLayoutTabMaps } = flatPageLayoutTabMaps;
            const pageLayoutTabResult = await this.workspaceMigrationPageLayoutTabActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatPageLayoutTabMaps,
                to: toFlatPageLayoutTabMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (pageLayoutTabResult.status === 'fail') {
                orchestratorFailureReport.pageLayoutTab.push(...pageLayoutTabResult.errors);
            } else {
                orchestratorActionsReport.pageLayoutTab = pageLayoutTabResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatPageLayoutWidgetMaps)) {
            const { from: fromFlatPageLayoutWidgetMaps, to: toFlatPageLayoutWidgetMaps } = flatPageLayoutWidgetMaps;
            const pageLayoutWidgetResult = await this.workspaceMigrationPageLayoutWidgetActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatPageLayoutWidgetMaps,
                to: toFlatPageLayoutWidgetMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (pageLayoutWidgetResult.status === 'fail') {
                orchestratorFailureReport.pageLayoutWidget.push(...pageLayoutWidgetResult.errors);
            } else {
                orchestratorActionsReport.pageLayoutWidget = pageLayoutWidgetResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatWebhookMaps)) {
            const { from: fromFlatWebhookMaps, to: toFlatWebhookMaps } = flatWebhookMaps;
            const webhookResult = await this.workspaceMigrationWebhookActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatWebhookMaps,
                to: toFlatWebhookMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (webhookResult.status === 'fail') {
                orchestratorFailureReport.webhook.push(...webhookResult.errors);
            } else {
                orchestratorActionsReport.webhook = webhookResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatApplicationVariableMaps)) {
            const { from: fromFlatApplicationVariableMaps, to: toFlatApplicationVariableMaps } = flatApplicationVariableMaps;
            const applicationVariableResult = await this.workspaceMigrationApplicationVariableActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatApplicationVariableMaps,
                to: toFlatApplicationVariableMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (applicationVariableResult.status === 'fail') {
                orchestratorFailureReport.applicationVariable.push(...applicationVariableResult.errors);
            } else {
                orchestratorActionsReport.applicationVariable = applicationVariableResult.actions;
            }
        }
        if ((0, _utils.isDefined)(flatConnectionProviderMaps)) {
            const { from: fromFlatConnectionProviderMaps, to: toFlatConnectionProviderMaps } = flatConnectionProviderMaps;
            const connectionProviderResult = await this.workspaceMigrationConnectionProviderActionsBuilderService.validateAndBuild({
                additionalCacheDataMaps,
                from: fromFlatConnectionProviderMaps,
                to: toFlatConnectionProviderMaps,
                buildOptions,
                dependencyOptimisticFlatEntityMaps: optimisticAllFlatEntityMaps,
                workspaceId
            });
            if (connectionProviderResult.status === 'fail') {
                orchestratorFailureReport.connectionProvider.push(...connectionProviderResult.errors);
            } else {
                orchestratorActionsReport.connectionProvider = connectionProviderResult.actions;
            }
        }
        const crossEntityFailureReport = (0, _crossentitytransversalvalidationutil.crossEntityTransversalValidation)({
            optimisticUniversalFlatMaps: optimisticAllFlatEntityMaps,
            orchestratorActionsReport,
            preDeletionFlatViewFieldMaps
        });
        (0, _mergeorchestratorfailurereportsutil.mergeOrchestratorFailureReports)({
            target: orchestratorFailureReport,
            source: crossEntityFailureReport
        });
        const allErrors = Object.values(orchestratorFailureReport);
        if (allErrors.some((report)=>report.length > 0)) {
            return {
                status: 'fail',
                report: orchestratorFailureReport
            };
        }
        const { aggregatedOrchestratorActionsReport } = (0, _aggregateorchestratoractionsreportutil.aggregateOrchestratorActionsReport)({
            orchestratorActionsReport,
            flatFieldMetadataMaps: optimisticAllFlatEntityMaps.flatFieldMetadataMaps
        });
        return {
            status: 'success',
            workspaceMigration: {
                applicationUniversalIdentifier: buildOptions.applicationUniversalIdentifier,
                actions: [
                    // Object and fields and indexes
                    ...aggregatedOrchestratorActionsReport.index.delete,
                    ...aggregatedOrchestratorActionsReport.fieldMetadata.delete,
                    ...aggregatedOrchestratorActionsReport.objectMetadata.delete,
                    ...aggregatedOrchestratorActionsReport.objectMetadata.create,
                    ...aggregatedOrchestratorActionsReport.objectMetadata.update,
                    ...aggregatedOrchestratorActionsReport.fieldMetadata.create,
                    ...aggregatedOrchestratorActionsReport.fieldMetadata.update,
                    ...aggregatedOrchestratorActionsReport.index.create,
                    ...aggregatedOrchestratorActionsReport.index.update.flat(),
                    ///
                    // Views
                    ...aggregatedOrchestratorActionsReport.view.delete,
                    ...aggregatedOrchestratorActionsReport.view.create,
                    ...aggregatedOrchestratorActionsReport.view.update,
                    ...aggregatedOrchestratorActionsReport.viewField.delete,
                    ...aggregatedOrchestratorActionsReport.viewFieldGroup.delete,
                    ...aggregatedOrchestratorActionsReport.viewFieldGroup.create,
                    ...aggregatedOrchestratorActionsReport.viewFieldGroup.update,
                    ...aggregatedOrchestratorActionsReport.viewField.create,
                    ...aggregatedOrchestratorActionsReport.viewField.update,
                    ...aggregatedOrchestratorActionsReport.viewFilterGroup.delete,
                    ...aggregatedOrchestratorActionsReport.viewFilterGroup.create,
                    ...aggregatedOrchestratorActionsReport.viewFilterGroup.update,
                    ...aggregatedOrchestratorActionsReport.viewFilter.delete,
                    ...aggregatedOrchestratorActionsReport.viewFilter.create,
                    ...aggregatedOrchestratorActionsReport.viewFilter.update,
                    ...aggregatedOrchestratorActionsReport.viewGroup.delete,
                    ...aggregatedOrchestratorActionsReport.viewGroup.create,
                    ...aggregatedOrchestratorActionsReport.viewGroup.update,
                    ...aggregatedOrchestratorActionsReport.viewSort.create,
                    ...aggregatedOrchestratorActionsReport.viewSort.update,
                    ...aggregatedOrchestratorActionsReport.viewSort.delete,
                    ///
                    // Logic functions
                    ...aggregatedOrchestratorActionsReport.logicFunction.delete,
                    ...aggregatedOrchestratorActionsReport.logicFunction.create,
                    ...aggregatedOrchestratorActionsReport.logicFunction.update,
                    ///
                    // Roles
                    ...aggregatedOrchestratorActionsReport.role.delete,
                    ...aggregatedOrchestratorActionsReport.role.create,
                    ...aggregatedOrchestratorActionsReport.role.update,
                    ///
                    // Role targets
                    ...aggregatedOrchestratorActionsReport.roleTarget.delete,
                    ...aggregatedOrchestratorActionsReport.roleTarget.create,
                    ...aggregatedOrchestratorActionsReport.roleTarget.update,
                    ///
                    // Object permissions
                    ...aggregatedOrchestratorActionsReport.objectPermission.delete,
                    ...aggregatedOrchestratorActionsReport.objectPermission.create,
                    ...aggregatedOrchestratorActionsReport.objectPermission.update,
                    ///
                    // Field permissions
                    ...aggregatedOrchestratorActionsReport.fieldPermission.delete,
                    ...aggregatedOrchestratorActionsReport.fieldPermission.create,
                    ...aggregatedOrchestratorActionsReport.fieldPermission.update,
                    ///
                    // Permission flags
                    ...aggregatedOrchestratorActionsReport.rolePermissionFlag.delete,
                    ...aggregatedOrchestratorActionsReport.rolePermissionFlag.create,
                    ...aggregatedOrchestratorActionsReport.rolePermissionFlag.update,
                    ///
                    // Permission flag definitions
                    ...aggregatedOrchestratorActionsReport.permissionFlag.delete,
                    ...aggregatedOrchestratorActionsReport.permissionFlag.create,
                    ...aggregatedOrchestratorActionsReport.permissionFlag.update,
                    ///
                    // Agents
                    ...aggregatedOrchestratorActionsReport.agent.delete,
                    ...aggregatedOrchestratorActionsReport.agent.create,
                    ...aggregatedOrchestratorActionsReport.agent.update,
                    ///
                    // Skills
                    ...aggregatedOrchestratorActionsReport.skill.delete,
                    ...aggregatedOrchestratorActionsReport.skill.create,
                    ...aggregatedOrchestratorActionsReport.skill.update,
                    ///
                    // Front components
                    ...aggregatedOrchestratorActionsReport.frontComponent.delete,
                    ...aggregatedOrchestratorActionsReport.frontComponent.create,
                    ...aggregatedOrchestratorActionsReport.frontComponent.update,
                    ///
                    // Command Menu Items
                    ...aggregatedOrchestratorActionsReport.commandMenuItem.delete,
                    ...aggregatedOrchestratorActionsReport.commandMenuItem.create,
                    ...aggregatedOrchestratorActionsReport.commandMenuItem.update,
                    ///
                    // Page layouts
                    ...aggregatedOrchestratorActionsReport.pageLayout.delete,
                    ...aggregatedOrchestratorActionsReport.pageLayout.create,
                    ...aggregatedOrchestratorActionsReport.pageLayout.update,
                    ///
                    // Page layout tabs
                    ...aggregatedOrchestratorActionsReport.pageLayoutTab.delete,
                    ...aggregatedOrchestratorActionsReport.pageLayoutTab.create,
                    ...aggregatedOrchestratorActionsReport.pageLayoutTab.update,
                    ///
                    // Page layout widgets
                    ...aggregatedOrchestratorActionsReport.pageLayoutWidget.delete,
                    ...aggregatedOrchestratorActionsReport.pageLayoutWidget.create,
                    ...aggregatedOrchestratorActionsReport.pageLayoutWidget.update,
                    ///
                    // Navigation Menu Items
                    ...aggregatedOrchestratorActionsReport.navigationMenuItem.delete,
                    ...aggregatedOrchestratorActionsReport.navigationMenuItem.create,
                    ...aggregatedOrchestratorActionsReport.navigationMenuItem.update,
                    ///
                    // Row level permission predicate groups
                    ...aggregatedOrchestratorActionsReport.rowLevelPermissionPredicateGroup.delete,
                    ...aggregatedOrchestratorActionsReport.rowLevelPermissionPredicateGroup.create,
                    ...aggregatedOrchestratorActionsReport.rowLevelPermissionPredicateGroup.update,
                    ///
                    // Row level permission predicates
                    ...aggregatedOrchestratorActionsReport.rowLevelPermissionPredicate.delete,
                    ...aggregatedOrchestratorActionsReport.rowLevelPermissionPredicate.create,
                    ...aggregatedOrchestratorActionsReport.rowLevelPermissionPredicate.update,
                    ///
                    // Webhooks
                    ...aggregatedOrchestratorActionsReport.webhook.delete,
                    ...aggregatedOrchestratorActionsReport.webhook.create,
                    ...aggregatedOrchestratorActionsReport.webhook.update,
                    ///
                    // Application Variables
                    ...aggregatedOrchestratorActionsReport.applicationVariable.delete,
                    ...aggregatedOrchestratorActionsReport.applicationVariable.create,
                    ...aggregatedOrchestratorActionsReport.applicationVariable.update,
                    // Connection providers
                    ...aggregatedOrchestratorActionsReport.connectionProvider.delete,
                    ...aggregatedOrchestratorActionsReport.connectionProvider.create,
                    ...aggregatedOrchestratorActionsReport.connectionProvider.update
                ]
            }
        };
    }
    constructor(workspaceMigrationObjectActionsBuilderService, workspaceMigrationIndexActionsBuilderService, workspaceMigrationViewActionsBuilderService, workspaceMigrationViewFieldActionsBuilderService, workspaceMigrationViewFilterActionsBuilderService, workspaceMigrationViewFilterGroupActionsBuilderService, workspaceMigrationViewGroupActionsBuilderService, workspaceMigrationViewFieldGroupActionsBuilderService, workspaceMigrationViewSortActionsBuilderService, workspaceMigrationFieldPermissionActionsBuilderService, workspaceMigrationObjectPermissionActionsBuilderService, workspaceMigrationRolePermissionFlagActionsBuilderService, workspaceMigrationPermissionFlagActionsBuilderService, workspaceMigrationLogicFunctionActionsBuilderService, workspaceMigrationRoleTargetActionsBuilderService, workspaceMigrationFieldActionsBuilderService, workspaceMigrationRoleActionsBuilderService, workspaceMigrationAgentActionsBuilderService, workspaceMigrationSkillActionsBuilderService, workspaceMigrationCommandMenuItemActionsBuilderService, workspaceMigrationNavigationMenuItemActionsBuilderService, workspaceMigrationPageLayoutActionsBuilderService, workspaceMigrationPageLayoutWidgetActionsBuilderService, workspaceMigrationPageLayoutTabActionsBuilderService, workspaceMigrationRowLevelPermissionPredicateActionsBuilderService, workspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService, workspaceMigrationFrontComponentActionsBuilderService, workspaceMigrationWebhookActionsBuilderService, workspaceMigrationApplicationVariableActionsBuilderService, workspaceMigrationConnectionProviderActionsBuilderService){
        this.workspaceMigrationObjectActionsBuilderService = workspaceMigrationObjectActionsBuilderService;
        this.workspaceMigrationIndexActionsBuilderService = workspaceMigrationIndexActionsBuilderService;
        this.workspaceMigrationViewActionsBuilderService = workspaceMigrationViewActionsBuilderService;
        this.workspaceMigrationViewFieldActionsBuilderService = workspaceMigrationViewFieldActionsBuilderService;
        this.workspaceMigrationViewFilterActionsBuilderService = workspaceMigrationViewFilterActionsBuilderService;
        this.workspaceMigrationViewFilterGroupActionsBuilderService = workspaceMigrationViewFilterGroupActionsBuilderService;
        this.workspaceMigrationViewGroupActionsBuilderService = workspaceMigrationViewGroupActionsBuilderService;
        this.workspaceMigrationViewFieldGroupActionsBuilderService = workspaceMigrationViewFieldGroupActionsBuilderService;
        this.workspaceMigrationViewSortActionsBuilderService = workspaceMigrationViewSortActionsBuilderService;
        this.workspaceMigrationFieldPermissionActionsBuilderService = workspaceMigrationFieldPermissionActionsBuilderService;
        this.workspaceMigrationObjectPermissionActionsBuilderService = workspaceMigrationObjectPermissionActionsBuilderService;
        this.workspaceMigrationRolePermissionFlagActionsBuilderService = workspaceMigrationRolePermissionFlagActionsBuilderService;
        this.workspaceMigrationPermissionFlagActionsBuilderService = workspaceMigrationPermissionFlagActionsBuilderService;
        this.workspaceMigrationLogicFunctionActionsBuilderService = workspaceMigrationLogicFunctionActionsBuilderService;
        this.workspaceMigrationRoleTargetActionsBuilderService = workspaceMigrationRoleTargetActionsBuilderService;
        this.workspaceMigrationFieldActionsBuilderService = workspaceMigrationFieldActionsBuilderService;
        this.workspaceMigrationRoleActionsBuilderService = workspaceMigrationRoleActionsBuilderService;
        this.workspaceMigrationAgentActionsBuilderService = workspaceMigrationAgentActionsBuilderService;
        this.workspaceMigrationSkillActionsBuilderService = workspaceMigrationSkillActionsBuilderService;
        this.workspaceMigrationCommandMenuItemActionsBuilderService = workspaceMigrationCommandMenuItemActionsBuilderService;
        this.workspaceMigrationNavigationMenuItemActionsBuilderService = workspaceMigrationNavigationMenuItemActionsBuilderService;
        this.workspaceMigrationPageLayoutActionsBuilderService = workspaceMigrationPageLayoutActionsBuilderService;
        this.workspaceMigrationPageLayoutWidgetActionsBuilderService = workspaceMigrationPageLayoutWidgetActionsBuilderService;
        this.workspaceMigrationPageLayoutTabActionsBuilderService = workspaceMigrationPageLayoutTabActionsBuilderService;
        this.workspaceMigrationRowLevelPermissionPredicateActionsBuilderService = workspaceMigrationRowLevelPermissionPredicateActionsBuilderService;
        this.workspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService = workspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService;
        this.workspaceMigrationFrontComponentActionsBuilderService = workspaceMigrationFrontComponentActionsBuilderService;
        this.workspaceMigrationWebhookActionsBuilderService = workspaceMigrationWebhookActionsBuilderService;
        this.workspaceMigrationApplicationVariableActionsBuilderService = workspaceMigrationApplicationVariableActionsBuilderService;
        this.workspaceMigrationConnectionProviderActionsBuilderService = workspaceMigrationConnectionProviderActionsBuilderService;
    }
};
WorkspaceMigrationBuildOrchestratorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationobjectactionsbuilderservice.WorkspaceMigrationObjectActionsBuilderService === "undefined" ? Object : _workspacemigrationobjectactionsbuilderservice.WorkspaceMigrationObjectActionsBuilderService,
        typeof _workspacemigrationindexactionsbuilderservice.WorkspaceMigrationIndexActionsBuilderService === "undefined" ? Object : _workspacemigrationindexactionsbuilderservice.WorkspaceMigrationIndexActionsBuilderService,
        typeof _workspacemigrationviewactionsbuilderservice.WorkspaceMigrationViewActionsBuilderService === "undefined" ? Object : _workspacemigrationviewactionsbuilderservice.WorkspaceMigrationViewActionsBuilderService,
        typeof _workspacemigrationviewfieldactionsbuilderservice.WorkspaceMigrationViewFieldActionsBuilderService === "undefined" ? Object : _workspacemigrationviewfieldactionsbuilderservice.WorkspaceMigrationViewFieldActionsBuilderService,
        typeof _workspacemigrationviewfilteractionsbuilderservice.WorkspaceMigrationViewFilterActionsBuilderService === "undefined" ? Object : _workspacemigrationviewfilteractionsbuilderservice.WorkspaceMigrationViewFilterActionsBuilderService,
        typeof _workspacemigrationviewfiltergroupactionsbuilderservice.WorkspaceMigrationViewFilterGroupActionsBuilderService === "undefined" ? Object : _workspacemigrationviewfiltergroupactionsbuilderservice.WorkspaceMigrationViewFilterGroupActionsBuilderService,
        typeof _workspacemigrationviewgroupactionsbuilderservice.WorkspaceMigrationViewGroupActionsBuilderService === "undefined" ? Object : _workspacemigrationviewgroupactionsbuilderservice.WorkspaceMigrationViewGroupActionsBuilderService,
        typeof _workspacemigrationviewfieldgroupactionsbuilderservice.WorkspaceMigrationViewFieldGroupActionsBuilderService === "undefined" ? Object : _workspacemigrationviewfieldgroupactionsbuilderservice.WorkspaceMigrationViewFieldGroupActionsBuilderService,
        typeof _workspacemigrationviewsortactionsbuilderservice.WorkspaceMigrationViewSortActionsBuilderService === "undefined" ? Object : _workspacemigrationviewsortactionsbuilderservice.WorkspaceMigrationViewSortActionsBuilderService,
        typeof _workspacemigrationfieldpermissionactionsbuilderservice.WorkspaceMigrationFieldPermissionActionsBuilderService === "undefined" ? Object : _workspacemigrationfieldpermissionactionsbuilderservice.WorkspaceMigrationFieldPermissionActionsBuilderService,
        typeof _workspacemigrationobjectpermissionactionsbuilderservice.WorkspaceMigrationObjectPermissionActionsBuilderService === "undefined" ? Object : _workspacemigrationobjectpermissionactionsbuilderservice.WorkspaceMigrationObjectPermissionActionsBuilderService,
        typeof _workspacemigrationrolepermissionflagactionsbuilderservice.WorkspaceMigrationRolePermissionFlagActionsBuilderService === "undefined" ? Object : _workspacemigrationrolepermissionflagactionsbuilderservice.WorkspaceMigrationRolePermissionFlagActionsBuilderService,
        typeof _workspacemigrationpermissionflagactionsbuilderservice.WorkspaceMigrationPermissionFlagActionsBuilderService === "undefined" ? Object : _workspacemigrationpermissionflagactionsbuilderservice.WorkspaceMigrationPermissionFlagActionsBuilderService,
        typeof _workspacemigrationlogicfunctionactionsbuilderservice.WorkspaceMigrationLogicFunctionActionsBuilderService === "undefined" ? Object : _workspacemigrationlogicfunctionactionsbuilderservice.WorkspaceMigrationLogicFunctionActionsBuilderService,
        typeof _workspacemigrationroletargetactionsbuilderservice.WorkspaceMigrationRoleTargetActionsBuilderService === "undefined" ? Object : _workspacemigrationroletargetactionsbuilderservice.WorkspaceMigrationRoleTargetActionsBuilderService,
        typeof _workspacemigrationfieldactionsbuilderservice.WorkspaceMigrationFieldActionsBuilderService === "undefined" ? Object : _workspacemigrationfieldactionsbuilderservice.WorkspaceMigrationFieldActionsBuilderService,
        typeof _workspacemigrationroleactionsbuilderservice.WorkspaceMigrationRoleActionsBuilderService === "undefined" ? Object : _workspacemigrationroleactionsbuilderservice.WorkspaceMigrationRoleActionsBuilderService,
        typeof _workspacemigrationagentactionsbuilderservice.WorkspaceMigrationAgentActionsBuilderService === "undefined" ? Object : _workspacemigrationagentactionsbuilderservice.WorkspaceMigrationAgentActionsBuilderService,
        typeof _workspacemigrationskillactionsbuilderservice.WorkspaceMigrationSkillActionsBuilderService === "undefined" ? Object : _workspacemigrationskillactionsbuilderservice.WorkspaceMigrationSkillActionsBuilderService,
        typeof _workspacemigrationcommandmenuitemactionsbuilderservice.WorkspaceMigrationCommandMenuItemActionsBuilderService === "undefined" ? Object : _workspacemigrationcommandmenuitemactionsbuilderservice.WorkspaceMigrationCommandMenuItemActionsBuilderService,
        typeof _workspacemigrationnavigationmenuitemactionsbuilderservice.WorkspaceMigrationNavigationMenuItemActionsBuilderService === "undefined" ? Object : _workspacemigrationnavigationmenuitemactionsbuilderservice.WorkspaceMigrationNavigationMenuItemActionsBuilderService,
        typeof _workspacemigrationpagelayoutactionsbuilderservice.WorkspaceMigrationPageLayoutActionsBuilderService === "undefined" ? Object : _workspacemigrationpagelayoutactionsbuilderservice.WorkspaceMigrationPageLayoutActionsBuilderService,
        typeof _workspacemigrationpagelayoutwidgetactionsbuilderservice.WorkspaceMigrationPageLayoutWidgetActionsBuilderService === "undefined" ? Object : _workspacemigrationpagelayoutwidgetactionsbuilderservice.WorkspaceMigrationPageLayoutWidgetActionsBuilderService,
        typeof _workspacemigrationpagelayouttabactionsbuilderservice.WorkspaceMigrationPageLayoutTabActionsBuilderService === "undefined" ? Object : _workspacemigrationpagelayouttabactionsbuilderservice.WorkspaceMigrationPageLayoutTabActionsBuilderService,
        typeof _workspacemigrationrowlevelpermissionpredicateactionsbuilderservice.WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService === "undefined" ? Object : _workspacemigrationrowlevelpermissionpredicateactionsbuilderservice.WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService,
        typeof _workspacemigrationrowlevelpermissionpredicategroupactionsbuilderservice.WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService === "undefined" ? Object : _workspacemigrationrowlevelpermissionpredicategroupactionsbuilderservice.WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService,
        typeof _workspacemigrationfrontcomponentactionsbuilderservice.WorkspaceMigrationFrontComponentActionsBuilderService === "undefined" ? Object : _workspacemigrationfrontcomponentactionsbuilderservice.WorkspaceMigrationFrontComponentActionsBuilderService,
        typeof _workspacemigrationwebhookactionsbuilderservice.WorkspaceMigrationWebhookActionsBuilderService === "undefined" ? Object : _workspacemigrationwebhookactionsbuilderservice.WorkspaceMigrationWebhookActionsBuilderService,
        typeof _workspacemigrationapplicationvariableactionsbuilderservice.WorkspaceMigrationApplicationVariableActionsBuilderService === "undefined" ? Object : _workspacemigrationapplicationvariableactionsbuilderservice.WorkspaceMigrationApplicationVariableActionsBuilderService,
        typeof _workspacemigrationconnectionprovideractionsbuilderservice.WorkspaceMigrationConnectionProviderActionsBuilderService === "undefined" ? Object : _workspacemigrationconnectionprovideractionsbuilderservice.WorkspaceMigrationConnectionProviderActionsBuilderService
    ])
], WorkspaceMigrationBuildOrchestratorService);

//# sourceMappingURL=workspace-migration-build-orchestrator.service.js.map