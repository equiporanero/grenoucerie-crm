"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemToolProvider", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemToolProvider;
    }
});
const _common = require("@nestjs/common");
const _ai = require("twenty-shared/ai");
const _executetoolfromtoolsetutil = require("../utils/execute-tool-from-tool-set.util");
const _toolsettodescriptorsutil = require("../utils/tool-set-to-descriptors.util");
const _navigationmenuitemtoolworkspaceservice = require("../../../metadata-modules/navigation-menu-item/tools/services/navigation-menu-item-tool.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NavigationMenuItemToolProvider = class NavigationMenuItemToolProvider {
    async isAvailable(_context) {
        return true;
    }
    async generateDescriptors(context, options) {
        return (0, _toolsettodescriptorsutil.toolSetToDescriptors)(this.buildToolSet(context), _ai.ToolCategory.NAVIGATION_MENU_ITEM, {
            includeSchemas: options?.includeSchemas ?? true
        });
    }
    async executeStaticTool(toolName, args, context) {
        return (0, _executetoolfromtoolsetutil.executeToolFromToolSet)(this.buildToolSet(context), toolName, args, _ai.ToolCategory.NAVIGATION_MENU_ITEM);
    }
    buildToolSet(context) {
        return this.navigationMenuItemToolService.generateNavigationMenuItemTools(context.workspaceId, context.userWorkspaceId);
    }
    constructor(navigationMenuItemToolService){
        this.navigationMenuItemToolService = navigationMenuItemToolService;
        this.category = _ai.ToolCategory.NAVIGATION_MENU_ITEM;
    }
};
NavigationMenuItemToolProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _navigationmenuitemtoolworkspaceservice.NavigationMenuItemToolWorkspaceService === "undefined" ? Object : _navigationmenuitemtoolworkspaceservice.NavigationMenuItemToolWorkspaceService
    ])
], NavigationMenuItemToolProvider);

//# sourceMappingURL=navigation-menu-item-tool.provider.js.map