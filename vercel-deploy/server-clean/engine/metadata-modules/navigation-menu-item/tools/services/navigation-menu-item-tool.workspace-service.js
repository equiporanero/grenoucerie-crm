"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemToolWorkspaceService", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemToolWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _navigationmenuitemservice = require("../../navigation-menu-item.service");
const _createnavigationmenuitemtool = require("../create-navigation-menu-item.tool");
const _deletenavigationmenuitemtool = require("../delete-navigation-menu-item.tool");
const _listnavigationmenuitemstool = require("../list-navigation-menu-items.tool");
const _updatenavigationmenuitemtool = require("../update-navigation-menu-item.tool");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NavigationMenuItemToolWorkspaceService = class NavigationMenuItemToolWorkspaceService {
    generateNavigationMenuItemTools(workspaceId, userWorkspaceId) {
        const context = {
            workspaceId,
            userWorkspaceId
        };
        const listNavigationMenuItems = (0, _listnavigationmenuitemstool.createListNavigationMenuItemsTool)(this.deps, context);
        const createNavigationMenuItem = (0, _createnavigationmenuitemtool.createCreateNavigationMenuItemTool)(this.deps, context);
        const updateNavigationMenuItem = (0, _updatenavigationmenuitemtool.createUpdateNavigationMenuItemTool)(this.deps, context);
        const deleteNavigationMenuItem = (0, _deletenavigationmenuitemtool.createDeleteNavigationMenuItemTool)(this.deps, context);
        return {
            [listNavigationMenuItems.name]: listNavigationMenuItems,
            [createNavigationMenuItem.name]: createNavigationMenuItem,
            [updateNavigationMenuItem.name]: updateNavigationMenuItem,
            [deleteNavigationMenuItem.name]: deleteNavigationMenuItem
        };
    }
    constructor(navigationMenuItemService){
        this.deps = {
            navigationMenuItemService
        };
    }
};
NavigationMenuItemToolWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _navigationmenuitemservice.NavigationMenuItemService === "undefined" ? Object : _navigationmenuitemservice.NavigationMenuItemService
    ])
], NavigationMenuItemToolWorkspaceService);

//# sourceMappingURL=navigation-menu-item-tool.workspace-service.js.map