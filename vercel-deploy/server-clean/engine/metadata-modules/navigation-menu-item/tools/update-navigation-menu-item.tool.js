"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpdateNavigationMenuItemTool", {
    enumerable: true,
    get: function() {
        return createUpdateNavigationMenuItemTool;
    }
});
const _zod = require("zod");
const updateNavigationMenuItemSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('Id of the navigation menu item to update'),
    name: _zod.z.string().trim().min(1).optional().describe("New display name. For OBJECT/VIEW/RECORD items the sidebar normally shows the target entity's own name — only set this if the user wants a custom label."),
    icon: _zod.z.string().optional().describe('New icon identifier'),
    color: _zod.z.string().optional().describe('New hex colour'),
    position: _zod.z.number().optional().describe('New position among siblings'),
    folderId: _zod.z.string().uuid().nullable().optional().describe('Move into a different folder. Pass null to move to the top level.'),
    link: _zod.z.string().url().optional().describe('New URL (only meaningful for LINK items)'),
    pageLayoutId: _zod.z.string().uuid().optional().describe('New page layout id (only meaningful for PAGE_LAYOUT items)')
});
const createUpdateNavigationMenuItemTool = (deps, context)=>({
        name: 'update_navigation_menu_item',
        description: `Update a navigation menu item (rename, recolor, move between folders, reorder). Type and target ids are immutable — delete and recreate to convert one variant into another.`,
        inputSchema: updateNavigationMenuItemSchema,
        execute: async (parameters)=>{
            try {
                const update = {};
                if (parameters.name !== undefined) update.name = parameters.name;
                if (parameters.icon !== undefined) update.icon = parameters.icon;
                if (parameters.color !== undefined) update.color = parameters.color;
                if (parameters.position !== undefined) update.position = parameters.position;
                if (parameters.folderId !== undefined) update.folderId = parameters.folderId;
                if (parameters.link !== undefined) update.link = parameters.link;
                if (parameters.pageLayoutId !== undefined) update.pageLayoutId = parameters.pageLayoutId;
                const updated = await deps.navigationMenuItemService.update({
                    input: {
                        id: parameters.id,
                        ...update
                    },
                    workspaceId: context.workspaceId,
                    authUserWorkspaceId: context.userWorkspaceId
                });
                return {
                    success: true,
                    message: `Navigation menu item ${updated.id} updated`,
                    result: {
                        id: updated.id,
                        type: updated.type,
                        name: updated.name,
                        folderId: updated.folderId,
                        position: updated.position
                    }
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to update navigation menu item: ${message}`,
                    error: message
                };
            }
        }
    });

//# sourceMappingURL=update-navigation-menu-item.tool.js.map