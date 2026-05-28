"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewToolProvider", {
    enumerable: true,
    get: function() {
        return ViewToolProvider;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _ai = require("twenty-shared/ai");
const _executetoolfromtoolsetutil = require("../utils/execute-tool-from-tool-set.util");
const _toolsettodescriptorsutil = require("../utils/tool-set-to-descriptors.util");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
const _viewfieldtoolsfactory = require("../../../metadata-modules/view-field/tools/view-field-tools.factory");
const _viewfiltertoolsfactory = require("../../../metadata-modules/view-filter/tools/view-filter-tools.factory");
const _viewsorttoolsfactory = require("../../../metadata-modules/view-sort/tools/view-sort-tools.factory");
const _viewtoolsfactory = require("../../../metadata-modules/view/tools/view-tools.factory");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ViewToolProvider = class ViewToolProvider {
    async isAvailable(_context) {
        return true;
    }
    async generateDescriptors(context, options) {
        const toolSet = await this.buildToolSet(context);
        return (0, _toolsettodescriptorsutil.toolSetToDescriptors)(toolSet, _ai.ToolCategory.VIEW, {
            includeSchemas: options?.includeSchemas ?? true
        });
    }
    async executeStaticTool(toolName, args, context) {
        const toolSet = await this.buildToolSet(context);
        return (0, _executetoolfromtoolsetutil.executeToolFromToolSet)(toolSet, toolName, args, _ai.ToolCategory.VIEW);
    }
    async buildToolSet(context) {
        const workspaceMemberId = context.actorContext?.workspaceMemberId;
        const readTools = {
            ...this.viewToolsFactory.generateReadTools(context.workspaceId, workspaceMemberId ?? undefined, workspaceMemberId ?? undefined),
            ...this.viewFieldToolsFactory.generateReadTools(context.workspaceId),
            ...this.viewFilterToolsFactory.generateReadTools(context.workspaceId),
            ...this.viewSortToolsFactory.generateReadTools(context.workspaceId)
        };
        const hasViewPermission = await this.permissionsService.checkRolesPermissions(context.rolePermissionConfig, context.workspaceId, _constants.PermissionFlagType.VIEWS);
        if (!hasViewPermission) {
            return readTools;
        }
        const writeTools = {
            ...this.viewToolsFactory.generateWriteTools(context.workspaceId, workspaceMemberId ?? undefined),
            ...this.viewFieldToolsFactory.generateWriteTools(context.workspaceId),
            ...this.viewFilterToolsFactory.generateWriteTools(context.workspaceId),
            ...this.viewSortToolsFactory.generateWriteTools(context.workspaceId)
        };
        return {
            ...readTools,
            ...writeTools
        };
    }
    constructor(viewToolsFactory, viewFieldToolsFactory, viewFilterToolsFactory, viewSortToolsFactory, permissionsService){
        this.viewToolsFactory = viewToolsFactory;
        this.viewFieldToolsFactory = viewFieldToolsFactory;
        this.viewFilterToolsFactory = viewFilterToolsFactory;
        this.viewSortToolsFactory = viewSortToolsFactory;
        this.permissionsService = permissionsService;
        this.category = _ai.ToolCategory.VIEW;
    }
};
ViewToolProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewtoolsfactory.ViewToolsFactory === "undefined" ? Object : _viewtoolsfactory.ViewToolsFactory,
        typeof _viewfieldtoolsfactory.ViewFieldToolsFactory === "undefined" ? Object : _viewfieldtoolsfactory.ViewFieldToolsFactory,
        typeof _viewfiltertoolsfactory.ViewFilterToolsFactory === "undefined" ? Object : _viewfiltertoolsfactory.ViewFilterToolsFactory,
        typeof _viewsorttoolsfactory.ViewSortToolsFactory === "undefined" ? Object : _viewsorttoolsfactory.ViewSortToolsFactory,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], ViewToolProvider);

//# sourceMappingURL=view-tool.provider.js.map