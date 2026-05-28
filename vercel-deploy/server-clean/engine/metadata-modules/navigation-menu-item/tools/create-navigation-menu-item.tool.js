"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCreateNavigationMenuItemTool", {
    enumerable: true,
    get: function() {
        return createCreateNavigationMenuItemTool;
    }
});
const _zod = require("zod");
const _types = require("twenty-shared/types");
const _navigationmenuitemscopeschema = require("./schemas/navigation-menu-item-scope.schema");
const commonOptionalFields = {
    icon: _zod.z.string().optional().describe('Icon identifier (e.g. "IconStar", "IconFolder")'),
    color: _zod.z.string().optional().describe('Optional hex colour'),
    position: _zod.z.number().optional().describe('Position among siblings; defaults to the end.'),
    folderId: _zod.z.string().uuid().optional().describe('Parent folder id, if the item should live inside a folder.')
};
const requiredNameField = _zod.z.string().trim().min(1).describe('Label shown in the sidebar.');
const derivedNameField = _zod.z.string().trim().min(1).optional().describe("Optional custom label. If omitted, the sidebar shows the target's own name (object's plural label / view name / record identifier). Only pass this if the user explicitly wants a different label.");
const createNavigationMenuItemSchema = _zod.z.discriminatedUnion('type', [
    _zod.z.object({
        type: _zod.z.literal(_types.NavigationMenuItemType.FOLDER),
        scope: _navigationmenuitemscopeschema.navigationMenuItemScopeSchema,
        name: requiredNameField,
        ...commonOptionalFields
    }),
    _zod.z.object({
        type: _zod.z.literal(_types.NavigationMenuItemType.LINK),
        scope: _navigationmenuitemscopeschema.navigationMenuItemScopeSchema,
        name: requiredNameField,
        link: _zod.z.string().url().describe('Target URL'),
        ...commonOptionalFields
    }),
    _zod.z.object({
        type: _zod.z.literal(_types.NavigationMenuItemType.OBJECT),
        scope: _navigationmenuitemscopeschema.navigationMenuItemScopeSchema,
        targetObjectMetadataId: _zod.z.string().uuid().describe('Id of the object to pin'),
        name: derivedNameField,
        ...commonOptionalFields
    }),
    _zod.z.object({
        type: _zod.z.literal(_types.NavigationMenuItemType.VIEW),
        scope: _navigationmenuitemscopeschema.navigationMenuItemScopeSchema,
        viewId: _zod.z.string().uuid().describe('Id of the view to pin'),
        name: derivedNameField,
        ...commonOptionalFields
    }),
    _zod.z.object({
        type: _zod.z.literal(_types.NavigationMenuItemType.RECORD),
        scope: _navigationmenuitemscopeschema.navigationMenuItemScopeSchema,
        targetRecordId: _zod.z.string().uuid().describe('Id of the record to pin'),
        targetObjectMetadataId: _zod.z.string().uuid().describe("Id of the record's object metadata"),
        name: derivedNameField,
        ...commonOptionalFields
    }),
    _zod.z.object({
        type: _zod.z.literal(_types.NavigationMenuItemType.PAGE_LAYOUT),
        scope: _navigationmenuitemscopeschema.navigationMenuItemScopeSchema,
        pageLayoutId: _zod.z.string().uuid().describe('Id of the page layout to pin'),
        name: requiredNameField,
        ...commonOptionalFields
    })
]);
const toServiceInput = (params, userWorkspaceId)=>{
    const resolvedUserWorkspaceId = params.scope === 'user' ? userWorkspaceId : undefined;
    const base = {
        type: params.type,
        userWorkspaceId: resolvedUserWorkspaceId,
        icon: params.icon,
        color: params.color,
        position: params.position,
        folderId: params.folderId
    };
    switch(params.type){
        case _types.NavigationMenuItemType.FOLDER:
            return {
                ...base,
                name: params.name
            };
        case _types.NavigationMenuItemType.LINK:
            return {
                ...base,
                name: params.name,
                link: params.link
            };
        case _types.NavigationMenuItemType.OBJECT:
            return {
                ...base,
                name: params.name,
                targetObjectMetadataId: params.targetObjectMetadataId
            };
        case _types.NavigationMenuItemType.VIEW:
            return {
                ...base,
                name: params.name,
                viewId: params.viewId
            };
        case _types.NavigationMenuItemType.RECORD:
            return {
                ...base,
                name: params.name,
                targetRecordId: params.targetRecordId,
                targetObjectMetadataId: params.targetObjectMetadataId
            };
        case _types.NavigationMenuItemType.PAGE_LAYOUT:
            return {
                ...base,
                name: params.name,
                pageLayoutId: params.pageLayoutId
            };
    }
};
const createCreateNavigationMenuItemTool = (deps, context)=>({
        name: 'create_navigation_menu_item',
        description: `Create a navigation menu item. With scope='user' it becomes a personal favorite for the current user; with scope='workspace' it is shared with everyone (requires LAYOUTS permission).

Type chooses the variant:
- FOLDER: a group to nest other items into (name required).
- LINK: an external URL pinned in the sidebar (name + link required).
- OBJECT: pins an object's standard view (label auto-derived from the object's plural name; only pass 'name' if the user wants a custom label).
- VIEW: pins a saved view (label auto-derived from the view's name; only pass 'name' for a custom label).
- RECORD: pins a single record (label auto-derived from the record's identifier; only pass 'name' for a custom label).
- PAGE_LAYOUT: pins a page layout, e.g. a dashboard (name required — no auto-derivation).

Note: creating a new custom object via create_object_metadata already auto-creates an OBJECT navigation menu item — do not double-create.`,
        inputSchema: createNavigationMenuItemSchema,
        execute: async (parameters)=>{
            try {
                if (parameters.scope === 'user' && !context.userWorkspaceId) {
                    return {
                        success: false,
                        message: 'Cannot create a user-scoped favorite without an authenticated user context.',
                        error: 'missing_user_workspace_id'
                    };
                }
                const created = await deps.navigationMenuItemService.create({
                    input: toServiceInput(parameters, context.userWorkspaceId),
                    workspaceId: context.workspaceId,
                    authUserWorkspaceId: context.userWorkspaceId
                });
                return {
                    success: true,
                    message: `Navigation menu item ${created.id} (${created.type}) created`,
                    result: {
                        id: created.id,
                        type: created.type,
                        name: created.name,
                        scope: created.userWorkspaceId ? 'user' : 'workspace',
                        folderId: created.folderId,
                        position: created.position
                    }
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to create navigation menu item: ${message}`,
                    error: message
                };
            }
        }
    });

//# sourceMappingURL=create-navigation-menu-item.tool.js.map