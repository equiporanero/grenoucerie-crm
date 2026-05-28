"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationBuilderValidatorsModule", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationBuilderValidatorsModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../../../../core-modules/feature-flag/feature-flag.module");
const _flatfieldmetadatatypevalidatorservice = require("../../../../metadata-modules/flat-field-metadata/services/flat-field-metadata-type-validator.service");
const _flatpagelayoutwidgettypevalidatorservice = require("../../../../metadata-modules/flat-page-layout-widget/services/flat-page-layout-widget-type-validator.service");
const _flatagentvalidatorservice = require("./services/flat-agent-validator.service");
const _flatcommandmenuitemvalidatorservice = require("./services/flat-command-menu-item-validator.service");
const _flatfieldmetadatavalidatorservice = require("./services/flat-field-metadata-validator.service");
const _flatfieldpermissionvalidatorservice = require("./services/flat-field-permission-validator.service");
const _flatfrontcomponentvalidatorservice = require("./services/flat-front-component-validator.service");
const _flatindexmetadatavalidatorservice = require("./services/flat-index-metadata-validator.service");
const _flatlogicfunctionvalidatorservice = require("./services/flat-logic-function-validator.service");
const _flatnavigationmenuitemvalidatorservice = require("./services/flat-navigation-menu-item-validator.service");
const _flatobjectmetadatavalidatorservice = require("./services/flat-object-metadata-validator.service");
const _flatobjectpermissionvalidatorservice = require("./services/flat-object-permission-validator.service");
const _flatpagelayouttabvalidatorservice = require("./services/flat-page-layout-tab-validator.service");
const _flatpagelayoutvalidatorservice = require("./services/flat-page-layout-validator.service");
const _flatpagelayoutwidgetvalidatorservice = require("./services/flat-page-layout-widget-validator.service");
const _flatpermissionflagvalidatorservice = require("./services/flat-permission-flag-validator.service");
const _flatrolepermissionflagvalidatorservice = require("./services/flat-role-permission-flag-validator.service");
const _flatroletargetvalidatorservice = require("./services/flat-role-target-validator.service");
const _flatrolevalidatorservice = require("./services/flat-role-validator.service");
const _flatrowlevelpermissionpredicategroupvalidatorservice = require("./services/flat-row-level-permission-predicate-group-validator.service");
const _flatrowlevelpermissionpredicatevalidatorservice = require("./services/flat-row-level-permission-predicate-validator.service");
const _flatskillvalidatorservice = require("./services/flat-skill-validator.service");
const _flatviewfieldgroupvalidatorservice = require("./services/flat-view-field-group-validator.service");
const _flatviewfieldvalidatorservice = require("./services/flat-view-field-validator.service");
const _flatviewfiltergroupvalidatorservice = require("./services/flat-view-filter-group-validator.service");
const _flatviewfiltervalidatorservice = require("./services/flat-view-filter-validator.service");
const _flatviewgroupvalidatorservice = require("./services/flat-view-group-validator.service");
const _flatviewsortvalidatorservice = require("./services/flat-view-sort-validator.service");
const _flatviewvalidatorservice = require("./services/flat-view-validator.service");
const _flatapplicationvariablevalidatorservice = require("./services/flat-application-variable-validator.service");
const _flatwebhookvalidatorservice = require("./services/flat-webhook-validator.service");
const _flatconnectionprovidervalidatorservice = require("./services/flat-connection-provider-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceMigrationBuilderValidatorsModule = class WorkspaceMigrationBuilderValidatorsModule {
};
WorkspaceMigrationBuilderValidatorsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _featureflagmodule.FeatureFlagModule
        ],
        providers: [
            _flatviewvalidatorservice.FlatViewValidatorService,
            _flatviewfieldvalidatorservice.FlatViewFieldValidatorService,
            _flatviewfiltervalidatorservice.FlatViewFilterValidatorService,
            _flatviewfiltergroupvalidatorservice.FlatViewFilterGroupValidatorService,
            _flatviewgroupvalidatorservice.FlatViewGroupValidatorService,
            _flatviewfieldgroupvalidatorservice.FlatViewFieldGroupValidatorService,
            _flatviewsortvalidatorservice.FlatViewSortValidatorService,
            _flatfieldpermissionvalidatorservice.FlatFieldPermissionValidatorService,
            _flatobjectpermissionvalidatorservice.FlatObjectPermissionValidatorService,
            _flatrolepermissionflagvalidatorservice.FlatRolePermissionFlagValidatorService,
            _flatpermissionflagvalidatorservice.FlatPermissionFlagValidatorService,
            _flatindexmetadatavalidatorservice.FlatIndexValidatorService,
            _flatfieldmetadatavalidatorservice.FlatFieldMetadataValidatorService,
            _flatobjectmetadatavalidatorservice.FlatObjectMetadataValidatorService,
            _flatlogicfunctionvalidatorservice.FlatLogicFunctionValidatorService,
            _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService,
            _flatpagelayoutwidgettypevalidatorservice.FlatPageLayoutWidgetTypeValidatorService,
            _flatrolevalidatorservice.FlatRoleValidatorService,
            _flatroletargetvalidatorservice.FlatRoleTargetValidatorService,
            _flatagentvalidatorservice.FlatAgentValidatorService,
            _flatskillvalidatorservice.FlatSkillValidatorService,
            _flatcommandmenuitemvalidatorservice.FlatCommandMenuItemValidatorService,
            _flatnavigationmenuitemvalidatorservice.FlatNavigationMenuItemValidatorService,
            _flatpagelayoutvalidatorservice.FlatPageLayoutValidatorService,
            _flatpagelayoutwidgetvalidatorservice.FlatPageLayoutWidgetValidatorService,
            _flatpagelayouttabvalidatorservice.FlatPageLayoutTabValidatorService,
            _flatrowlevelpermissionpredicatevalidatorservice.FlatRowLevelPermissionPredicateValidatorService,
            _flatrowlevelpermissionpredicategroupvalidatorservice.FlatRowLevelPermissionPredicateGroupValidatorService,
            _flatfrontcomponentvalidatorservice.FlatFrontComponentValidatorService,
            _flatwebhookvalidatorservice.FlatWebhookValidatorService,
            _flatapplicationvariablevalidatorservice.FlatApplicationVariableValidatorService,
            _flatconnectionprovidervalidatorservice.FlatConnectionProviderValidatorService
        ],
        exports: [
            _flatviewvalidatorservice.FlatViewValidatorService,
            _flatviewfieldvalidatorservice.FlatViewFieldValidatorService,
            _flatviewfiltervalidatorservice.FlatViewFilterValidatorService,
            _flatviewfiltergroupvalidatorservice.FlatViewFilterGroupValidatorService,
            _flatviewgroupvalidatorservice.FlatViewGroupValidatorService,
            _flatviewfieldgroupvalidatorservice.FlatViewFieldGroupValidatorService,
            _flatviewsortvalidatorservice.FlatViewSortValidatorService,
            _flatfieldpermissionvalidatorservice.FlatFieldPermissionValidatorService,
            _flatobjectpermissionvalidatorservice.FlatObjectPermissionValidatorService,
            _flatrolepermissionflagvalidatorservice.FlatRolePermissionFlagValidatorService,
            _flatpermissionflagvalidatorservice.FlatPermissionFlagValidatorService,
            _flatindexmetadatavalidatorservice.FlatIndexValidatorService,
            _flatfieldmetadatavalidatorservice.FlatFieldMetadataValidatorService,
            _flatobjectmetadatavalidatorservice.FlatObjectMetadataValidatorService,
            _flatlogicfunctionvalidatorservice.FlatLogicFunctionValidatorService,
            _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService,
            _flatrolevalidatorservice.FlatRoleValidatorService,
            _flatroletargetvalidatorservice.FlatRoleTargetValidatorService,
            _flatagentvalidatorservice.FlatAgentValidatorService,
            _flatskillvalidatorservice.FlatSkillValidatorService,
            _flatcommandmenuitemvalidatorservice.FlatCommandMenuItemValidatorService,
            _flatnavigationmenuitemvalidatorservice.FlatNavigationMenuItemValidatorService,
            _flatpagelayoutvalidatorservice.FlatPageLayoutValidatorService,
            _flatpagelayoutwidgetvalidatorservice.FlatPageLayoutWidgetValidatorService,
            _flatpagelayouttabvalidatorservice.FlatPageLayoutTabValidatorService,
            _flatrowlevelpermissionpredicatevalidatorservice.FlatRowLevelPermissionPredicateValidatorService,
            _flatrowlevelpermissionpredicategroupvalidatorservice.FlatRowLevelPermissionPredicateGroupValidatorService,
            _flatfrontcomponentvalidatorservice.FlatFrontComponentValidatorService,
            _flatwebhookvalidatorservice.FlatWebhookValidatorService,
            _flatapplicationvariablevalidatorservice.FlatApplicationVariableValidatorService,
            _flatconnectionprovidervalidatorservice.FlatConnectionProviderValidatorService
        ]
    })
], WorkspaceMigrationBuilderValidatorsModule);

//# sourceMappingURL=workspace-migration-builder-validators.module.js.map