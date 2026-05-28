"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createListNavigationMenuItemsTool", {
    enumerable: true,
    get: function() {
        return createListNavigationMenuItemsTool;
    }
});
const _zod = require("zod");
const _utils = require("twenty-shared/utils");
const _navigationmenuitemtypeschema = require("./schemas/navigation-menu-item-type.schema");
const listNavigationMenuItemsSchema = _zod.z.object({
    scope: _zod.z.enum([
        'workspace',
        'user',
        'all'
    ]).optional().default('all').describe("'workspace' = shared navigation, 'user' = current user's favorites, 'all' = both merged (default)."),
    folderId: _zod.z.string().uuid().optional().describe('Only return items inside this folder.'),
    type: _navigationmenuitemtypeschema.navigationMenuItemTypeSchema.optional().describe('Filter by item type (FOLDER, LINK, OBJECT, VIEW, RECORD, PAGE_LAYOUT).'),
    limit: _zod.z.number().int().min(1).max(200).optional().default(100).describe('Max number of items to return.')
});
const createListNavigationMenuItemsTool = (deps, context)=>({
        name: 'list_navigation_menu_items',
        description: `List navigation menu items (shared workspace navigation and/or the current user's personal favorites). Returns items sorted by position.`,
        inputSchema: listNavigationMenuItemsSchema,
        execute: async (parameters)=>{
            try {
                const items = await deps.navigationMenuItemService.findAll({
                    workspaceId: context.workspaceId,
                    userWorkspaceId: context.userWorkspaceId,
                    scope: parameters.scope,
                    folderId: parameters.folderId,
                    type: parameters.type,
                    limit: parameters.limit
                });
                return {
                    success: true,
                    message: `Found ${items.length} navigation menu item(s)`,
                    result: {
                        items: items.map((item)=>({
                                id: item.id,
                                type: item.type,
                                name: item.name,
                                scope: (0, _utils.isDefined)(item.userWorkspaceId) ? 'user' : 'workspace',
                                folderId: item.folderId,
                                position: item.position,
                                icon: item.icon,
                                color: item.color,
                                link: item.link,
                                targetObjectMetadataId: item.targetObjectMetadataId,
                                targetRecordId: item.targetRecordId,
                                viewId: item.viewId,
                                pageLayoutId: item.pageLayoutId
                            })),
                        count: items.length
                    }
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to list navigation menu items: ${message}`,
                    error: message
                };
            }
        }
    });

//# sourceMappingURL=list-navigation-menu-items.tool.js.map