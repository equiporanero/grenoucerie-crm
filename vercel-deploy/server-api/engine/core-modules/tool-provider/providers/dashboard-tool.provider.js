"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardToolProvider", {
    enumerable: true,
    get: function() {
        return DashboardToolProvider;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _dashboardtoolservicetoken = require("../constants/dashboard-tool-service.token");
const _ai = require("twenty-shared/ai");
const _types = require("twenty-shared/types");
const _executetoolfromtoolsetutil = require("../utils/execute-tool-from-tool-set.util");
const _resolveobjecticonutil = require("../utils/resolve-object-icon.util");
const _toolsettodescriptorsutil = require("../utils/tool-set-to-descriptors.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
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
let DashboardToolProvider = class DashboardToolProvider {
    async isAvailable(context) {
        if (!this.dashboardToolService) {
            return false;
        }
        return this.permissionsService.checkRolesPermissions(context.rolePermissionConfig, context.workspaceId, _constants.PermissionFlagType.LAYOUTS);
    }
    async generateDescriptors(context, options) {
        const toolSet = await this.buildToolSet(context);
        if (!toolSet) {
            return [];
        }
        const icon = await (0, _resolveobjecticonutil.resolveObjectIcon)(this.flatEntityMapsCacheService, context.workspaceId, _types.CoreObjectNameSingular.Dashboard);
        return (0, _toolsettodescriptorsutil.toolSetToDescriptors)(toolSet, _ai.ToolCategory.DASHBOARD, {
            includeSchemas: options?.includeSchemas ?? true,
            icon
        });
    }
    async executeStaticTool(toolName, args, context) {
        const toolSet = await this.buildToolSet(context);
        if (!toolSet) {
            throw new Error(`Dashboard tool service is not available (tool: ${toolName})`);
        }
        return (0, _executetoolfromtoolsetutil.executeToolFromToolSet)(toolSet, toolName, args, _ai.ToolCategory.DASHBOARD);
    }
    async buildToolSet(context) {
        if (!this.dashboardToolService) {
            return null;
        }
        return this.dashboardToolService.generateDashboardTools(context.workspaceId, context.rolePermissionConfig);
    }
    constructor(dashboardToolService, permissionsService, flatEntityMapsCacheService){
        this.dashboardToolService = dashboardToolService;
        this.permissionsService = permissionsService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.category = _ai.ToolCategory.DASHBOARD;
    }
};
DashboardToolProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Optional)()),
    _ts_param(0, (0, _common.Inject)(_dashboardtoolservicetoken.DASHBOARD_TOOL_SERVICE_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], DashboardToolProvider);

//# sourceMappingURL=dashboard-tool.provider.js.map