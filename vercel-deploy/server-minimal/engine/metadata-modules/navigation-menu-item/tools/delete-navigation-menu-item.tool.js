"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDeleteNavigationMenuItemTool", {
    enumerable: true,
    get: function() {
        return createDeleteNavigationMenuItemTool;
    }
});
const _zod = require("zod");
const deleteNavigationMenuItemSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('Id of the navigation menu item to delete')
});
const createDeleteNavigationMenuItemTool = (deps, context)=>({
        name: 'delete_navigation_menu_item',
        description: `Delete a navigation menu item. Deleting a folder also deletes everything inside it.`,
        inputSchema: deleteNavigationMenuItemSchema,
        execute: async (parameters)=>{
            try {
                const deleted = await deps.navigationMenuItemService.delete({
                    id: parameters.id,
                    workspaceId: context.workspaceId,
                    authUserWorkspaceId: context.userWorkspaceId
                });
                return {
                    success: true,
                    message: `Navigation menu item ${deleted.id} deleted`,
                    result: {
                        deletedId: deleted.id,
                        type: deleted.type,
                        name: deleted.name
                    }
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to delete navigation menu item: ${message}`,
                    error: message
                };
            }
        }
    });

//# sourceMappingURL=delete-navigation-menu-item.tool.js.map