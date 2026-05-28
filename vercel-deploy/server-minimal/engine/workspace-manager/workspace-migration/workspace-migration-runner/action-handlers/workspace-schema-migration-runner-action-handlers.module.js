"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSchemaMigrationRunnerActionHandlersModule", {
    enumerable: true,
    get: function() {
        return WorkspaceSchemaMigrationRunnerActionHandlersModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../../../core-modules/application/application.entity");
const _secretencryptionmodule = require("../../../../core-modules/secret-encryption/secret-encryption.module");
const _workspaceschemamanagermodule = require("../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.module");
const _createagentactionhandlerservice = require("./agent/services/create-agent-action-handler.service");
const _deleteagentactionhandlerservice = require("./agent/services/delete-agent-action-handler.service");
const _updateagentactionhandlerservice = require("./agent/services/update-agent-action-handler.service");
const _createcommandmenuitemactionhandlerservice = require("./command-menu-item/services/create-command-menu-item-action-handler.service");
const _deletecommandmenuitemactionhandlerservice = require("./command-menu-item/services/delete-command-menu-item-action-handler.service");
const _updatecommandmenuitemactionhandlerservice = require("./command-menu-item/services/update-command-menu-item-action-handler.service");
const _createfieldpermissionactionhandlerservice = require("./field-permission/services/create-field-permission-action-handler.service");
const _deletefieldpermissionactionhandlerservice = require("./field-permission/services/delete-field-permission-action-handler.service");
const _updatefieldpermissionactionhandlerservice = require("./field-permission/services/update-field-permission-action-handler.service");
const _createfieldactionhandlerservice = require("./field/services/create-field-action-handler.service");
const _deletefieldactionhandlerservice = require("./field/services/delete-field-action-handler.service");
const _updatefieldactionhandlerservice = require("./field/services/update-field-action-handler.service");
const _createfrontcomponentactionhandlerservice = require("./front-component/services/create-front-component-action-handler.service");
const _deletefrontcomponentactionhandlerservice = require("./front-component/services/delete-front-component-action-handler.service");
const _updatefrontcomponentactionhandlerservice = require("./front-component/services/update-front-component-action-handler.service");
const _createindexactionhandlerservice = require("./index/services/create-index-action-handler.service");
const _deleteindexactionhandlerservice = require("./index/services/delete-index-action-handler.service");
const _updateindexactionhandlerservice = require("./index/services/update-index-action-handler.service");
const _createlogicfunctionactionhandlerservice = require("./logic-function/services/create-logic-function-action-handler.service");
const _deletelogicfunctionactionhandlerservice = require("./logic-function/services/delete-logic-function-action-handler.service");
const _updatelogicfunctionactionhandlerservice = require("./logic-function/services/update-logic-function-action-handler.service");
const _createnavigationmenuitemactionhandlerservice = require("./navigation-menu-item/services/create-navigation-menu-item-action-handler.service");
const _deletenavigationmenuitemactionhandlerservice = require("./navigation-menu-item/services/delete-navigation-menu-item-action-handler.service");
const _updatenavigationmenuitemactionhandlerservice = require("./navigation-menu-item/services/update-navigation-menu-item-action-handler.service");
const _createobjectpermissionactionhandlerservice = require("./object-permission/services/create-object-permission-action-handler.service");
const _deleteobjectpermissionactionhandlerservice = require("./object-permission/services/delete-object-permission-action-handler.service");
const _updateobjectpermissionactionhandlerservice = require("./object-permission/services/update-object-permission-action-handler.service");
const _createobjectactionhandlerservice = require("./object/services/create-object-action-handler.service");
const _deleteobjectactionhandlerservice = require("./object/services/delete-object-action-handler.service");
const _updateobjectactionhandlerservice = require("./object/services/update-object-action-handler.service");
const _createpagelayouttabactionhandlerservice = require("./page-layout-tab/services/create-page-layout-tab-action-handler.service");
const _deletepagelayouttabactionhandlerservice = require("./page-layout-tab/services/delete-page-layout-tab-action-handler.service");
const _updatepagelayouttabactionhandlerservice = require("./page-layout-tab/services/update-page-layout-tab-action-handler.service");
const _createpagelayoutwidgetactionhandlerservice = require("./page-layout-widget/services/create-page-layout-widget-action-handler.service");
const _deletepagelayoutwidgetactionhandlerservice = require("./page-layout-widget/services/delete-page-layout-widget-action-handler.service");
const _updatepagelayoutwidgetactionhandlerservice = require("./page-layout-widget/services/update-page-layout-widget-action-handler.service");
const _createpagelayoutactionhandlerservice = require("./page-layout/services/create-page-layout-action-handler.service");
const _deletepagelayoutactionhandlerservice = require("./page-layout/services/delete-page-layout-action-handler.service");
const _updatepagelayoutactionhandlerservice = require("./page-layout/services/update-page-layout-action-handler.service");
const _createpermissionflagactionhandlerservice = require("./permission-flag/services/create-permission-flag-action-handler.service");
const _deletepermissionflagactionhandlerservice = require("./permission-flag/services/delete-permission-flag-action-handler.service");
const _updatepermissionflagactionhandlerservice = require("./permission-flag/services/update-permission-flag-action-handler.service");
const _createrolepermissionflagactionhandlerservice = require("./role-permission-flag/services/create-role-permission-flag-action-handler.service");
const _deleterolepermissionflagactionhandlerservice = require("./role-permission-flag/services/delete-role-permission-flag-action-handler.service");
const _updaterolepermissionflagactionhandlerservice = require("./role-permission-flag/services/update-role-permission-flag-action-handler.service");
const _createroletargetactionhandlerservice = require("./role-target/services/create-role-target-action-handler.service");
const _deleteroletargetactionhandlerservice = require("./role-target/services/delete-role-target-action-handler.service");
const _updateroletargetactionhandlerservice = require("./role-target/services/update-role-target-action-handler.service");
const _createroleactionhandlerservice = require("./role/services/create-role-action-handler.service");
const _deleteroleactionhandlerservice = require("./role/services/delete-role-action-handler.service");
const _updateroleactionhandlerservice = require("./role/services/update-role-action-handler.service");
const _createrowlevelpermissionpredicategroupactionhandlerservice = require("./row-level-permission-predicate-group/services/create-row-level-permission-predicate-group-action-handler.service");
const _deleterowlevelpermissionpredicategroupactionhandlerservice = require("./row-level-permission-predicate-group/services/delete-row-level-permission-predicate-group-action-handler.service");
const _updaterowlevelpermissionpredicategroupactionhandlerservice = require("./row-level-permission-predicate-group/services/update-row-level-permission-predicate-group-action-handler.service");
const _createrowlevelpermissionpredicateactionhandlerservice = require("./row-level-permission-predicate/services/create-row-level-permission-predicate-action-handler.service");
const _deleterowlevelpermissionpredicateactionhandlerservice = require("./row-level-permission-predicate/services/delete-row-level-permission-predicate-action-handler.service");
const _updaterowlevelpermissionpredicateactionhandlerservice = require("./row-level-permission-predicate/services/update-row-level-permission-predicate-action-handler.service");
const _createskillactionhandlerservice = require("./skill/services/create-skill-action-handler.service");
const _deleteskillactionhandlerservice = require("./skill/services/delete-skill-action-handler.service");
const _updateskillactionhandlerservice = require("./skill/services/update-skill-action-handler.service");
const _createviewfieldgroupactionhandlerservice = require("./view-field-group/services/create-view-field-group-action-handler.service");
const _deleteviewfieldgroupactionhandlerservice = require("./view-field-group/services/delete-view-field-group-action-handler.service");
const _updateviewfieldgroupactionhandlerservice = require("./view-field-group/services/update-view-field-group-action-handler.service");
const _createviewfieldactionhandlerservice = require("./view-field/services/create-view-field-action-handler.service");
const _deleteviewfieldactionhandlerservice = require("./view-field/services/delete-view-field-action-handler.service");
const _updateviewfieldactionhandlerservice = require("./view-field/services/update-view-field-action-handler.service");
const _createviewfiltergroupactionhandlerservice = require("./view-filter-group/services/create-view-filter-group-action-handler.service");
const _deleteviewfiltergroupactionhandlerservice = require("./view-filter-group/services/delete-view-filter-group-action-handler.service");
const _updateviewfiltergroupactionhandlerservice = require("./view-filter-group/services/update-view-filter-group-action-handler.service");
const _createviewfilteractionhandlerservice = require("./view-filter/services/create-view-filter-action-handler.service");
const _deleteviewfilteractionhandlerservice = require("./view-filter/services/delete-view-filter-action-handler.service");
const _updateviewfilteractionhandlerservice = require("./view-filter/services/update-view-filter-action-handler.service");
const _createviewgroupactionhandlerservice = require("./view-group/services/create-view-group-action-handler.service");
const _deleteviewgroupactionhandlerservice = require("./view-group/services/delete-view-group-action-handler.service");
const _updateviewgroupactionhandlerservice = require("./view-group/services/update-view-group-action-handler.service");
const _createviewsortactionhandlerservice = require("./view-sort/services/create-view-sort-action-handler.service");
const _deleteviewsortactionhandlerservice = require("./view-sort/services/delete-view-sort-action-handler.service");
const _updateviewsortactionhandlerservice = require("./view-sort/services/update-view-sort-action-handler.service");
const _createviewactionhandlerservice = require("./view/services/create-view-action-handler.service");
const _deleteviewactionhandlerservice = require("./view/services/delete-view-action-handler.service");
const _updateviewactionhandlerservice = require("./view/services/update-view-action-handler.service");
const _createapplicationvariableactionhandlerservice = require("./application-variable/services/create-application-variable-action-handler.service");
const _deleteapplicationvariableactionhandlerservice = require("./application-variable/services/delete-application-variable-action-handler.service");
const _updateapplicationvariableactionhandlerservice = require("./application-variable/services/update-application-variable-action-handler.service");
const _createwebhookactionhandlerservice = require("./webhook/services/create-webhook-action-handler.service");
const _deletewebhookactionhandlerservice = require("./webhook/services/delete-webhook-action-handler.service");
const _updatewebhookactionhandlerservice = require("./webhook/services/update-webhook-action-handler.service");
const _createconnectionprovideractionhandlerservice = require("./connection-provider/services/create-connection-provider-action-handler.service");
const _deleteconnectionprovideractionhandlerservice = require("./connection-provider/services/delete-connection-provider-action-handler.service");
const _updateconnectionprovideractionhandlerservice = require("./connection-provider/services/update-connection-provider-action-handler.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceSchemaMigrationRunnerActionHandlersModule = class WorkspaceSchemaMigrationRunnerActionHandlersModule {
};
WorkspaceSchemaMigrationRunnerActionHandlersModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity
            ]),
            _workspaceschemamanagermodule.WorkspaceSchemaManagerModule,
            _secretencryptionmodule.SecretEncryptionModule
        ],
        providers: [
            _createfieldactionhandlerservice.CreateFieldActionHandlerService,
            _updatefieldactionhandlerservice.UpdateFieldActionHandlerService,
            _deletefieldactionhandlerservice.DeleteFieldActionHandlerService,
            _createobjectactionhandlerservice.CreateObjectActionHandlerService,
            _updateobjectactionhandlerservice.UpdateObjectActionHandlerService,
            _deleteobjectactionhandlerservice.DeleteObjectActionHandlerService,
            _createindexactionhandlerservice.CreateIndexActionHandlerService,
            _updateindexactionhandlerservice.UpdateIndexActionHandlerService,
            _deleteindexactionhandlerservice.DeleteIndexActionHandlerService,
            _createviewactionhandlerservice.CreateViewActionHandlerService,
            _updateviewactionhandlerservice.UpdateViewActionHandlerService,
            _deleteviewactionhandlerservice.DeleteViewActionHandlerService,
            _createviewfieldactionhandlerservice.CreateViewFieldActionHandlerService,
            _updateviewfieldactionhandlerservice.UpdateViewFieldActionHandlerService,
            _deleteviewfieldactionhandlerservice.DeleteViewFieldActionHandlerService,
            _createviewfilteractionhandlerservice.CreateViewFilterActionHandlerService,
            _updateviewfilteractionhandlerservice.UpdateViewFilterActionHandlerService,
            _deleteviewfilteractionhandlerservice.DeleteViewFilterActionHandlerService,
            _createviewfiltergroupactionhandlerservice.CreateViewFilterGroupActionHandlerService,
            _updateviewfiltergroupactionhandlerservice.UpdateViewFilterGroupActionHandlerService,
            _deleteviewfiltergroupactionhandlerservice.DeleteViewFilterGroupActionHandlerService,
            _createviewsortactionhandlerservice.CreateViewSortActionHandlerService,
            _updateviewsortactionhandlerservice.UpdateViewSortActionHandlerService,
            _deleteviewsortactionhandlerservice.DeleteViewSortActionHandlerService,
            _createviewgroupactionhandlerservice.CreateViewGroupActionHandlerService,
            _updateviewgroupactionhandlerservice.UpdateViewGroupActionHandlerService,
            _deleteviewgroupactionhandlerservice.DeleteViewGroupActionHandlerService,
            _createviewfieldgroupactionhandlerservice.CreateViewFieldGroupActionHandlerService,
            _updateviewfieldgroupactionhandlerservice.UpdateViewFieldGroupActionHandlerService,
            _deleteviewfieldgroupactionhandlerservice.DeleteViewFieldGroupActionHandlerService,
            _createlogicfunctionactionhandlerservice.CreateLogicFunctionActionHandlerService,
            _deletelogicfunctionactionhandlerservice.DeleteLogicFunctionActionHandlerService,
            _updatelogicfunctionactionhandlerservice.UpdateLogicFunctionActionHandlerService,
            _createroleactionhandlerservice.CreateRoleActionHandlerService,
            _updateroleactionhandlerservice.UpdateRoleActionHandlerService,
            _deleteroleactionhandlerservice.DeleteRoleActionHandlerService,
            _createroletargetactionhandlerservice.CreateRoleTargetActionHandlerService,
            _deleteroletargetactionhandlerservice.DeleteRoleTargetActionHandlerService,
            _updateroletargetactionhandlerservice.UpdateRoleTargetActionHandlerService,
            _createrolepermissionflagactionhandlerservice.CreateRolePermissionFlagActionHandlerService,
            _updaterolepermissionflagactionhandlerservice.UpdateRolePermissionFlagActionHandlerService,
            _deleterolepermissionflagactionhandlerservice.DeleteRolePermissionFlagActionHandlerService,
            _createpermissionflagactionhandlerservice.CreatePermissionFlagActionHandlerService,
            _updatepermissionflagactionhandlerservice.UpdatePermissionFlagActionHandlerService,
            _deletepermissionflagactionhandlerservice.DeletePermissionFlagActionHandlerService,
            _createfieldpermissionactionhandlerservice.CreateFieldPermissionActionHandlerService,
            _updatefieldpermissionactionhandlerservice.UpdateFieldPermissionActionHandlerService,
            _deletefieldpermissionactionhandlerservice.DeleteFieldPermissionActionHandlerService,
            _createobjectpermissionactionhandlerservice.CreateObjectPermissionActionHandlerService,
            _updateobjectpermissionactionhandlerservice.UpdateObjectPermissionActionHandlerService,
            _deleteobjectpermissionactionhandlerservice.DeleteObjectPermissionActionHandlerService,
            _createagentactionhandlerservice.CreateAgentActionHandlerService,
            _updateagentactionhandlerservice.UpdateAgentActionHandlerService,
            _deleteagentactionhandlerservice.DeleteAgentActionHandlerService,
            _createskillactionhandlerservice.CreateSkillActionHandlerService,
            _updateskillactionhandlerservice.UpdateSkillActionHandlerService,
            _deleteskillactionhandlerservice.DeleteSkillActionHandlerService,
            _createcommandmenuitemactionhandlerservice.CreateCommandMenuItemActionHandlerService,
            _updatecommandmenuitemactionhandlerservice.UpdateCommandMenuItemActionHandlerService,
            _deletecommandmenuitemactionhandlerservice.DeleteCommandMenuItemActionHandlerService,
            _createnavigationmenuitemactionhandlerservice.CreateNavigationMenuItemActionHandlerService,
            _updatenavigationmenuitemactionhandlerservice.UpdateNavigationMenuItemActionHandlerService,
            _deletenavigationmenuitemactionhandlerservice.DeleteNavigationMenuItemActionHandlerService,
            _createpagelayoutactionhandlerservice.CreatePageLayoutActionHandlerService,
            _updatepagelayoutactionhandlerservice.UpdatePageLayoutActionHandlerService,
            _deletepagelayoutactionhandlerservice.DeletePageLayoutActionHandlerService,
            _createpagelayoutwidgetactionhandlerservice.CreatePageLayoutWidgetActionHandlerService,
            _updatepagelayoutwidgetactionhandlerservice.UpdatePageLayoutWidgetActionHandlerService,
            _deletepagelayoutwidgetactionhandlerservice.DeletePageLayoutWidgetActionHandlerService,
            _createpagelayouttabactionhandlerservice.CreatePageLayoutTabActionHandlerService,
            _updatepagelayouttabactionhandlerservice.UpdatePageLayoutTabActionHandlerService,
            _deletepagelayouttabactionhandlerservice.DeletePageLayoutTabActionHandlerService,
            _createrowlevelpermissionpredicateactionhandlerservice.CreateRowLevelPermissionPredicateActionHandlerService,
            _updaterowlevelpermissionpredicateactionhandlerservice.UpdateRowLevelPermissionPredicateActionHandlerService,
            _deleterowlevelpermissionpredicateactionhandlerservice.DeleteRowLevelPermissionPredicateActionHandlerService,
            _createrowlevelpermissionpredicategroupactionhandlerservice.CreateRowLevelPermissionPredicateGroupActionHandlerService,
            _updaterowlevelpermissionpredicategroupactionhandlerservice.UpdateRowLevelPermissionPredicateGroupActionHandlerService,
            _deleterowlevelpermissionpredicategroupactionhandlerservice.DeleteRowLevelPermissionPredicateGroupActionHandlerService,
            _createfrontcomponentactionhandlerservice.CreateFrontComponentActionHandlerService,
            _updatefrontcomponentactionhandlerservice.UpdateFrontComponentActionHandlerService,
            _deletefrontcomponentactionhandlerservice.DeleteFrontComponentActionHandlerService,
            _createwebhookactionhandlerservice.CreateWebhookActionHandlerService,
            _updatewebhookactionhandlerservice.UpdateWebhookActionHandlerService,
            _deletewebhookactionhandlerservice.DeleteWebhookActionHandlerService,
            _createapplicationvariableactionhandlerservice.CreateApplicationVariableActionHandlerService,
            _updateapplicationvariableactionhandlerservice.UpdateApplicationVariableActionHandlerService,
            _deleteapplicationvariableactionhandlerservice.DeleteApplicationVariableActionHandlerService,
            _createconnectionprovideractionhandlerservice.CreateConnectionProviderActionHandlerService,
            _updateconnectionprovideractionhandlerservice.UpdateConnectionProviderActionHandlerService,
            _deleteconnectionprovideractionhandlerservice.DeleteConnectionProviderActionHandlerService
        ]
    })
], WorkspaceSchemaMigrationRunnerActionHandlersModule);

//# sourceMappingURL=workspace-schema-migration-runner-action-handlers.module.js.map