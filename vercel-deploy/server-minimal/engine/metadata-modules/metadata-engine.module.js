"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataEngineModule", {
    enumerable: true,
    get: function() {
        return MetadataEngineModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _aiagentmonitormodule = require("./ai/ai-agent-monitor/ai-agent-monitor.module");
const _aiagentmodule = require("./ai/ai-agent/ai-agent.module");
const _aichatmodule = require("./ai/ai-chat/ai-chat.module");
const _aigeneratetextmodule = require("./ai/ai-generate-text/ai-generate-text.module");
const _calendarchannelmetadatamodule = require("./calendar-channel/calendar-channel-metadata.module");
const _connectedaccountmetadatamodule = require("./connected-account/connected-account-metadata.module");
const _commandmenuitemmodule = require("./command-menu-item/command-menu-item.module");
const _fieldmetadatamodule = require("./field-metadata/field-metadata.module");
const _flatentitymapsgraphqlapiexceptionfilter = require("./flat-entity/filters/flat-entity-maps-graphql-api-exception.filter");
const _frontcomponentmodule = require("./front-component/front-component.module");
const _logicfunctionlayermodule = require("./logic-function-layer/logic-function-layer.module");
const _logicfunctionmodule = require("./logic-function/logic-function.module");
const _messagechannelmetadatamodule = require("./message-channel/message-channel-metadata.module");
const _messagefoldermetadatamodule = require("./message-folder/message-folder-metadata.module");
const _navigationmenuitemmodule = require("./navigation-menu-item/navigation-menu-item.module");
const _objectmetadatamodule = require("./object-metadata/object-metadata.module");
const _permissionflagmodule = require("./permission-flag/permission-flag.module");
const _permissionsmodule = require("./permissions/permissions.module");
const _minimalmetadatamodule = require("./minimal-metadata/minimal-metadata.module");
const _rolemodule = require("./role/role.module");
const _routetriggermodule = require("./route-trigger/route-trigger.module");
const _searchfieldmetadatamodule = require("./search-field-metadata/search-field-metadata.module");
const _skillmodule = require("./skill/skill.module");
const _viewmodule = require("./view/view.module");
const _webhookmodule = require("./webhook/webhook.module");
const _workspacemetadataversionmodule = require("./workspace-metadata-version/workspace-metadata-version.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MetadataEngineModule = class MetadataEngineModule {
};
MetadataEngineModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _fieldmetadatamodule.FieldMetadataModule,
            _frontcomponentmodule.FrontComponentModule,
            _objectmetadatamodule.ObjectMetadataModule,
            _searchfieldmetadatamodule.SearchFieldMetadataModule,
            _logicfunctionmodule.LogicFunctionModule,
            _logicfunctionlayermodule.LogicFunctionLayerModule,
            _skillmodule.SkillModule,
            _commandmenuitemmodule.CommandMenuItemModule,
            _navigationmenuitemmodule.NavigationMenuItemModule,
            _aiagentmodule.AiAgentModule,
            _aiagentmonitormodule.AiAgentMonitorModule,
            _aichatmodule.AiChatModule,
            _aigeneratetextmodule.AiGenerateTextModule,
            _minimalmetadatamodule.MinimalMetadataModule,
            _viewmodule.ViewModule,
            _workspacemetadataversionmodule.WorkspaceMetadataVersionModule,
            _rolemodule.RoleModule,
            _permissionsmodule.PermissionsModule,
            _permissionflagmodule.PermissionFlagModule,
            _routetriggermodule.RouteTriggerModule,
            _webhookmodule.WebhookModule,
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule,
            _messagechannelmetadatamodule.MessageChannelMetadataModule,
            _calendarchannelmetadatamodule.CalendarChannelMetadataModule,
            _messagefoldermetadatamodule.MessageFolderMetadataModule
        ],
        providers: [
            {
                provide: _core.APP_FILTER,
                useClass: _flatentitymapsgraphqlapiexceptionfilter.FlatEntityMapsGraphqlApiExceptionFilter
            }
        ],
        exports: [
            _fieldmetadatamodule.FieldMetadataModule,
            _frontcomponentmodule.FrontComponentModule,
            _objectmetadatamodule.ObjectMetadataModule,
            _searchfieldmetadatamodule.SearchFieldMetadataModule,
            _logicfunctionmodule.LogicFunctionModule,
            _skillmodule.SkillModule,
            _commandmenuitemmodule.CommandMenuItemModule,
            _navigationmenuitemmodule.NavigationMenuItemModule,
            _aiagentmodule.AiAgentModule,
            _aichatmodule.AiChatModule,
            _minimalmetadatamodule.MinimalMetadataModule,
            _viewmodule.ViewModule,
            _rolemodule.RoleModule,
            _permissionsmodule.PermissionsModule,
            _permissionflagmodule.PermissionFlagModule,
            _webhookmodule.WebhookModule,
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule,
            _messagechannelmetadatamodule.MessageChannelMetadataModule,
            _calendarchannelmetadatamodule.CalendarChannelMetadataModule,
            _messagefoldermetadatamodule.MessageFolderMetadataModule
        ]
    })
], MetadataEngineModule);

//# sourceMappingURL=metadata-engine.module.js.map