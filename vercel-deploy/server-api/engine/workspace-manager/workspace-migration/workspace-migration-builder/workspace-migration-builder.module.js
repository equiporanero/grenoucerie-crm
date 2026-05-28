"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationBuilderModule", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationBuilderModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../../../core-modules/feature-flag/feature-flag.module");
const _flatfieldmetadatatypevalidatorservice = require("../../../metadata-modules/flat-field-metadata/services/flat-field-metadata-type-validator.service");
const _workspacemigrationagentactionsbuilderservice = require("./builders/agent/workspace-migration-agent-actions-builder.service");
const _workspacemigrationcommandmenuitemactionsbuilderservice = require("./builders/command-menu-item/workspace-migration-command-menu-item-actions-builder.service");
const _workspacemigrationfieldpermissionactionsbuilderservice = require("./builders/field-permission/workspace-migration-field-permission-actions-builder.service");
const _workspacemigrationfieldactionsbuilderservice = require("./builders/field/workspace-migration-field-actions-builder.service");
const _workspacemigrationfrontcomponentactionsbuilderservice = require("./builders/front-component/workspace-migration-front-component-actions-builder.service");
const _workspacemigrationindexactionsbuilderservice = require("./builders/index/workspace-migration-index-actions-builder.service");
const _workspacemigrationlogicfunctionactionsbuilderservice = require("./builders/logic-function/workspace-migration-logic-function-actions-builder.service");
const _workspacemigrationnavigationmenuitemactionsbuilderservice = require("./builders/navigation-menu-item/workspace-migration-navigation-menu-item-actions-builder.service");
const _workspacemigrationobjectpermissionactionsbuilderservice = require("./builders/object-permission/workspace-migration-object-permission-actions-builder.service");
const _workspacemigrationobjectactionsbuilderservice = require("./builders/object/workspace-migration-object-actions-builder.service");
const _workspacemigrationpagelayouttabactionsbuilderservice = require("./builders/page-layout-tab/workspace-migration-page-layout-tab-actions-builder.service");
const _workspacemigrationpagelayoutwidgetactionsbuilderservice = require("./builders/page-layout-widget/workspace-migration-page-layout-widget-actions-builder.service");
const _workspacemigrationpagelayoutactionsbuilderservice = require("./builders/page-layout/workspace-migration-page-layout-actions-builder.service");
const _workspacemigrationpermissionflagactionsbuilderservice = require("./builders/permission-flag/workspace-migration-permission-flag-actions-builder.service");
const _workspacemigrationrolepermissionflagactionsbuilderservice = require("./builders/role-permission-flag/workspace-migration-role-permission-flag-actions-builder.service");
const _workspacemigrationroletargetactionsbuilderservice = require("./builders/role-target/workspace-migration-role-target-actions-builder.service");
const _workspacemigrationroleactionsbuilderservice = require("./builders/role/workspace-migration-role-actions-builder.service");
const _workspacemigrationrowlevelpermissionpredicategroupactionsbuilderservice = require("./builders/row-level-permission-predicate-group/workspace-migration-row-level-permission-predicate-group-actions-builder.service");
const _workspacemigrationrowlevelpermissionpredicateactionsbuilderservice = require("./builders/row-level-permission-predicate/workspace-migration-row-level-permission-predicate-actions-builder.service");
const _workspacemigrationskillactionsbuilderservice = require("./builders/skill/workspace-migration-skill-actions-builder.service");
const _workspacemigrationviewfieldgroupactionsbuilderservice = require("./builders/view-field-group/workspace-migration-view-field-group-actions-builder.service");
const _workspacemigrationviewfieldactionsbuilderservice = require("./builders/view-field/workspace-migration-view-field-actions-builder.service");
const _workspacemigrationviewfiltergroupactionsbuilderservice = require("./builders/view-filter-group/workspace-migration-view-filter-group-actions-builder.service");
const _workspacemigrationviewfilteractionsbuilderservice = require("./builders/view-filter/workspace-migration-view-filter-actions-builder.service");
const _workspacemigrationviewgroupactionsbuilderservice = require("./builders/view-group/workspace-migration-view-group-actions-builder.service");
const _workspacemigrationviewsortactionsbuilderservice = require("./builders/view-sort/workspace-migration-view-sort-actions.builder.service");
const _workspacemigrationviewactionsbuilderservice = require("./builders/view/workspace-migration-view-actions-builder.service");
const _workspacemigrationapplicationvariableactionsbuilderservice = require("./builders/application-variable/workspace-migration-application-variable-actions-builder.service");
const _workspacemigrationwebhookactionsbuilderservice = require("./builders/webhook/workspace-migration-webhook-actions-builder.service");
const _workspacemigrationconnectionprovideractionsbuilderservice = require("./builders/connection-provider/workspace-migration-connection-provider-actions-builder.service");
const _workspacemigrationbuildervalidatorsmodule = require("./validators/workspace-migration-builder-validators.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceMigrationBuilderModule = class WorkspaceMigrationBuilderModule {
};
WorkspaceMigrationBuilderModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _featureflagmodule.FeatureFlagModule,
            _workspacemigrationbuildervalidatorsmodule.WorkspaceMigrationBuilderValidatorsModule
        ],
        providers: [
            _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService,
            _workspacemigrationobjectactionsbuilderservice.WorkspaceMigrationObjectActionsBuilderService,
            _workspacemigrationviewactionsbuilderservice.WorkspaceMigrationViewActionsBuilderService,
            _workspacemigrationviewfieldactionsbuilderservice.WorkspaceMigrationViewFieldActionsBuilderService,
            _workspacemigrationviewfilteractionsbuilderservice.WorkspaceMigrationViewFilterActionsBuilderService,
            _workspacemigrationviewfiltergroupactionsbuilderservice.WorkspaceMigrationViewFilterGroupActionsBuilderService,
            _workspacemigrationviewgroupactionsbuilderservice.WorkspaceMigrationViewGroupActionsBuilderService,
            _workspacemigrationviewfieldgroupactionsbuilderservice.WorkspaceMigrationViewFieldGroupActionsBuilderService,
            _workspacemigrationviewsortactionsbuilderservice.WorkspaceMigrationViewSortActionsBuilderService,
            _workspacemigrationfieldpermissionactionsbuilderservice.WorkspaceMigrationFieldPermissionActionsBuilderService,
            _workspacemigrationobjectpermissionactionsbuilderservice.WorkspaceMigrationObjectPermissionActionsBuilderService,
            _workspacemigrationrolepermissionflagactionsbuilderservice.WorkspaceMigrationRolePermissionFlagActionsBuilderService,
            _workspacemigrationpermissionflagactionsbuilderservice.WorkspaceMigrationPermissionFlagActionsBuilderService,
            _workspacemigrationindexactionsbuilderservice.WorkspaceMigrationIndexActionsBuilderService,
            _workspacemigrationlogicfunctionactionsbuilderservice.WorkspaceMigrationLogicFunctionActionsBuilderService,
            _workspacemigrationfieldactionsbuilderservice.WorkspaceMigrationFieldActionsBuilderService,
            _workspacemigrationroleactionsbuilderservice.WorkspaceMigrationRoleActionsBuilderService,
            _workspacemigrationroletargetactionsbuilderservice.WorkspaceMigrationRoleTargetActionsBuilderService,
            _workspacemigrationagentactionsbuilderservice.WorkspaceMigrationAgentActionsBuilderService,
            _workspacemigrationskillactionsbuilderservice.WorkspaceMigrationSkillActionsBuilderService,
            _workspacemigrationcommandmenuitemactionsbuilderservice.WorkspaceMigrationCommandMenuItemActionsBuilderService,
            _workspacemigrationnavigationmenuitemactionsbuilderservice.WorkspaceMigrationNavigationMenuItemActionsBuilderService,
            _workspacemigrationpagelayoutactionsbuilderservice.WorkspaceMigrationPageLayoutActionsBuilderService,
            _workspacemigrationpagelayoutwidgetactionsbuilderservice.WorkspaceMigrationPageLayoutWidgetActionsBuilderService,
            _workspacemigrationpagelayouttabactionsbuilderservice.WorkspaceMigrationPageLayoutTabActionsBuilderService,
            _workspacemigrationrowlevelpermissionpredicateactionsbuilderservice.WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService,
            _workspacemigrationrowlevelpermissionpredicategroupactionsbuilderservice.WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService,
            _workspacemigrationfrontcomponentactionsbuilderservice.WorkspaceMigrationFrontComponentActionsBuilderService,
            _workspacemigrationwebhookactionsbuilderservice.WorkspaceMigrationWebhookActionsBuilderService,
            _workspacemigrationapplicationvariableactionsbuilderservice.WorkspaceMigrationApplicationVariableActionsBuilderService,
            _workspacemigrationconnectionprovideractionsbuilderservice.WorkspaceMigrationConnectionProviderActionsBuilderService
        ],
        exports: [
            _workspacemigrationviewactionsbuilderservice.WorkspaceMigrationViewActionsBuilderService,
            _workspacemigrationindexactionsbuilderservice.WorkspaceMigrationIndexActionsBuilderService,
            _workspacemigrationobjectactionsbuilderservice.WorkspaceMigrationObjectActionsBuilderService,
            _workspacemigrationviewfieldactionsbuilderservice.WorkspaceMigrationViewFieldActionsBuilderService,
            _workspacemigrationviewfilteractionsbuilderservice.WorkspaceMigrationViewFilterActionsBuilderService,
            _workspacemigrationviewfiltergroupactionsbuilderservice.WorkspaceMigrationViewFilterGroupActionsBuilderService,
            _workspacemigrationviewgroupactionsbuilderservice.WorkspaceMigrationViewGroupActionsBuilderService,
            _workspacemigrationviewfieldgroupactionsbuilderservice.WorkspaceMigrationViewFieldGroupActionsBuilderService,
            _workspacemigrationviewsortactionsbuilderservice.WorkspaceMigrationViewSortActionsBuilderService,
            _workspacemigrationfieldpermissionactionsbuilderservice.WorkspaceMigrationFieldPermissionActionsBuilderService,
            _workspacemigrationobjectpermissionactionsbuilderservice.WorkspaceMigrationObjectPermissionActionsBuilderService,
            _workspacemigrationrolepermissionflagactionsbuilderservice.WorkspaceMigrationRolePermissionFlagActionsBuilderService,
            _workspacemigrationpermissionflagactionsbuilderservice.WorkspaceMigrationPermissionFlagActionsBuilderService,
            _workspacemigrationfieldactionsbuilderservice.WorkspaceMigrationFieldActionsBuilderService,
            _workspacemigrationlogicfunctionactionsbuilderservice.WorkspaceMigrationLogicFunctionActionsBuilderService,
            _workspacemigrationroleactionsbuilderservice.WorkspaceMigrationRoleActionsBuilderService,
            _workspacemigrationroletargetactionsbuilderservice.WorkspaceMigrationRoleTargetActionsBuilderService,
            _workspacemigrationagentactionsbuilderservice.WorkspaceMigrationAgentActionsBuilderService,
            _workspacemigrationskillactionsbuilderservice.WorkspaceMigrationSkillActionsBuilderService,
            _workspacemigrationcommandmenuitemactionsbuilderservice.WorkspaceMigrationCommandMenuItemActionsBuilderService,
            _workspacemigrationnavigationmenuitemactionsbuilderservice.WorkspaceMigrationNavigationMenuItemActionsBuilderService,
            _workspacemigrationpagelayoutactionsbuilderservice.WorkspaceMigrationPageLayoutActionsBuilderService,
            _workspacemigrationpagelayoutwidgetactionsbuilderservice.WorkspaceMigrationPageLayoutWidgetActionsBuilderService,
            _workspacemigrationpagelayouttabactionsbuilderservice.WorkspaceMigrationPageLayoutTabActionsBuilderService,
            _workspacemigrationrowlevelpermissionpredicateactionsbuilderservice.WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService,
            _workspacemigrationrowlevelpermissionpredicategroupactionsbuilderservice.WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService,
            _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService,
            _workspacemigrationfrontcomponentactionsbuilderservice.WorkspaceMigrationFrontComponentActionsBuilderService,
            _workspacemigrationwebhookactionsbuilderservice.WorkspaceMigrationWebhookActionsBuilderService,
            _workspacemigrationapplicationvariableactionsbuilderservice.WorkspaceMigrationApplicationVariableActionsBuilderService,
            _workspacemigrationconnectionprovideractionsbuilderservice.WorkspaceMigrationConnectionProviderActionsBuilderService
        ]
    })
], WorkspaceMigrationBuilderModule);

//# sourceMappingURL=workspace-migration-builder.module.js.map