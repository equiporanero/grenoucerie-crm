"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigateAppTool", {
    enumerable: true,
    get: function() {
        return NavigateAppTool;
    }
});
const _common = require("@nestjs/common");
const _core = require("cloudflare/core");
const _fuse = /*#__PURE__*/ _interop_require_default(require("fuse.js"));
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _navigateapptoolschema = require("./navigate-app-tool.schema");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _navigationmenuitemtypeenum = require("../../../../metadata-modules/navigation-menu-item/enums/navigation-menu-item-type.enum");
const _navigationmenuitemservice = require("../../../../metadata-modules/navigation-menu-item/navigation-menu-item.service");
const _viewservice = require("../../../../metadata-modules/view/services/view.service");
const _globalworkspaceormmanager = require("../../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../twenty-orm/utils/build-system-auth-context.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NavigateAppTool = class NavigateAppTool {
    async execute(parameters, context) {
        const parseResult = _navigateapptoolschema.NavigateAppInputZodSchema.safeParse(parameters);
        if (!parseResult.success) {
            return {
                success: false,
                message: 'Invalid navigation input',
                error: parseResult.error.message
            };
        }
        const input = parseResult.data;
        switch(input.type){
            case 'navigateToView':
                return this.navigateToView(input.viewName, context.workspaceId, context.userWorkspaceId);
            case 'navigateToObject':
                return this.navigateToObject(input.objectNameSingular, context.workspaceId);
            case 'navigateToRecord':
                return this.navigateToRecord(input.objectNameSingular, input.recordName, context.workspaceId);
            case 'wait':
                return this.wait(input.durationMs);
        }
    }
    async wait(durationMs) {
        await (0, _core.sleep)(durationMs);
        return {
            success: true,
            message: `Waited  for ${durationMs}ms`,
            result: {
                action: 'wait',
                durationMs
            }
        };
    }
    async navigateToView(viewName, workspaceId, userWorkspaceId) {
        const views = await this.viewService.findByWorkspaceId(workspaceId, userWorkspaceId);
        const fuse = new _fuse.default(views, {
            keys: [
                'name'
            ],
            threshold: 0.4
        });
        const results = fuse.search(viewName);
        const matchingView = results[0]?.item;
        if (!matchingView) {
            const availableViewNames = views.map((view)=>view.name).join(', ');
            return {
                success: false,
                message: `View "${viewName}" not found`,
                error: `No view matching "${viewName}" was found in this workspace. Available views: ${availableViewNames}`
            };
        }
        const { flatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const objectMetadataUniversalIdentifier = flatObjectMetadataMaps.universalIdentifierById[matchingView.objectMetadataId];
        const objectMetadata = (0, _utils.isDefined)(objectMetadataUniversalIdentifier) ? flatObjectMetadataMaps.byUniversalIdentifier[objectMetadataUniversalIdentifier] : undefined;
        if (!(0, _utils.isDefined)(objectMetadata)) {
            return {
                success: false,
                message: `Object metadata for view "${matchingView.name}" not found`,
                error: `Could not resolve the object associated with view "${matchingView.name}"`
            };
        }
        return {
            success: true,
            message: `Navigating to view "${matchingView.name}"`,
            result: {
                action: 'navigateToView',
                viewId: matchingView.id,
                viewName: matchingView.name,
                objectNameSingular: objectMetadata.nameSingular
            }
        };
    }
    async navigateToObject(objectNameSingular, workspaceId) {
        const navigationMenuItems = await this.navigationMenuItemService.findAll({
            workspaceId
        });
        const { flatObjectMetadataMaps, flatViewMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatViewMaps',
                'flatNavigationMenuItemMaps'
            ]
        });
        const navigatableObjects = navigationMenuItems.map((navigationMenuItem)=>{
            const objectMetadataId = navigationMenuItem.type === _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT ? navigationMenuItem.targetObjectMetadataId : navigationMenuItem.type === _navigationmenuitemtypeenum.NavigationMenuItemType.VIEW && (0, _utils.isDefined)(navigationMenuItem.viewId) ? flatViewMaps.byUniversalIdentifier[flatViewMaps.universalIdentifierById[navigationMenuItem.viewId] ?? '']?.objectMetadataId : undefined;
            if (!(0, _utils.isDefined)(objectMetadataId)) {
                return null;
            }
            const objectMetadataUniversalIdentifier = flatObjectMetadataMaps.universalIdentifierById[objectMetadataId];
            if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
                return null;
            }
            const objectMetadata = flatObjectMetadataMaps.byUniversalIdentifier[objectMetadataUniversalIdentifier];
            if (!(0, _utils.isDefined)(objectMetadata)) {
                return null;
            }
            return {
                nameSingular: objectMetadata.nameSingular,
                labelSingular: objectMetadata.labelSingular,
                labelPlural: objectMetadata.labelPlural
            };
        }).filter(_utils.isDefined);
        const fuse = new _fuse.default(navigatableObjects, {
            keys: [
                'nameSingular',
                'labelSingular',
                'labelPlural'
            ],
            threshold: 0.4
        });
        const results = fuse.search(objectNameSingular);
        const matchingObject = results[0]?.item;
        if (!(0, _utils.isDefined)(matchingObject)) {
            const availableLabels = navigatableObjects.map((object)=>object.labelPlural).join(', ');
            return {
                success: false,
                message: `Object "${objectNameSingular}" not found`,
                error: `No object matching "${objectNameSingular}" was found in this workspace. Available objects: ${availableLabels}`
            };
        }
        return {
            success: true,
            message: `Navigating to ${matchingObject.labelPlural} default view`,
            result: {
                action: 'navigateToObject',
                objectNameSingular: matchingObject.nameSingular
            }
        };
    }
    async navigateToRecord(objectNameSingular, recordName, workspaceId) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const flatObjectMetadata = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).find((metadata)=>(0, _utils.isDefined)(metadata) && metadata.nameSingular === objectNameSingular && metadata.isActive);
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            const availableObjectNames = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter((metadata)=>(0, _utils.isDefined)(metadata) && metadata.isActive).map((metadata)=>metadata.nameSingular).join(', ');
            return {
                success: false,
                message: `Object "${objectNameSingular}" not found`,
                error: `No object with singular name "${objectNameSingular}" was found. Available objects: ${availableObjectNames}`
            };
        }
        if (!(0, _utils.isDefined)(flatObjectMetadata.labelIdentifierFieldMetadataId)) {
            return {
                success: false,
                message: `Object "${objectNameSingular}" has no label identifier field`,
                error: `Cannot search records by name for object "${objectNameSingular}" because it has no label identifier field configured.`
            };
        }
        const labelIdentifierField = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: flatObjectMetadata.labelIdentifierFieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(labelIdentifierField)) {
            return {
                success: false,
                message: `Label identifier field not found for object "${objectNameSingular}"`,
                error: `The label identifier field metadata could not be resolved for object "${objectNameSingular}".`
            };
        }
        const isFullName = labelIdentifierField.type === _types.FieldMetadataType.FULL_NAME;
        const selectColumns = isFullName ? [
            'id',
            `${labelIdentifierField.name}FirstName`,
            `${labelIdentifierField.name}LastName`
        ] : [
            'id',
            labelIdentifierField.name
        ];
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const records = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectNameSingular, {
                shouldBypassPermissionChecks: true
            });
            return repository.find({
                select: selectColumns
            });
        }, authContext);
        const recordsWithDisplayName = records.map((record)=>{
            let displayName;
            if (isFullName) {
                const firstName = record[`${labelIdentifierField.name}FirstName`] ?? '';
                const lastName = record[`${labelIdentifierField.name}LastName`] ?? '';
                displayName = `${firstName} ${lastName}`.trim();
            } else {
                displayName = String(record[labelIdentifierField.name] ?? '');
            }
            return {
                id: record.id,
                displayName
            };
        });
        const fuse = new _fuse.default(recordsWithDisplayName, {
            keys: [
                'displayName'
            ],
            threshold: 0.4
        });
        const results = fuse.search(recordName);
        const matchingRecord = results[0]?.item;
        if (!(0, _utils.isDefined)(matchingRecord)) {
            return {
                success: false,
                message: `Record "${recordName}" not found in ${objectNameSingular}`,
                error: `No ${objectNameSingular} record matching "${recordName}" was found.`
            };
        }
        return {
            success: true,
            message: `Navigating to ${objectNameSingular} record "${matchingRecord.displayName}"`,
            result: {
                action: 'navigateToRecord',
                objectNameSingular,
                recordId: matchingRecord.id
            }
        };
    }
    constructor(navigationMenuItemService, viewService, workspaceManyOrAllFlatEntityMapsCacheService, globalWorkspaceOrmManager){
        this.navigationMenuItemService = navigationMenuItemService;
        this.viewService = viewService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.description = `Navigate the application.
    Use navigateToRecord when the user wants to go to a specific record by name.
    Default to navigateToObject for all other navigation requests.
    Only use navigateToView when the user explicitly mentions the word "view" in their request.
    If the user asks to wait, use the wait tool with the specified duration.`;
        this.inputSchema = _navigateapptoolschema.NavigateAppInputZodSchema;
    }
};
NavigateAppTool = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _navigationmenuitemservice.NavigationMenuItemService === "undefined" ? Object : _navigationmenuitemservice.NavigationMenuItemService,
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], NavigateAppTool);

//# sourceMappingURL=navigate-app-tool.js.map