"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemService", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _addflatnavigationmenuitemtomapsandupdateindexutil = require("../flat-navigation-menu-item/utils/add-flat-navigation-menu-item-to-maps-and-update-index.util");
const _fromcreatenavigationmenuiteminputtoflatnavigationmenuitemtocreateutil = require("../flat-navigation-menu-item/utils/from-create-navigation-menu-item-input-to-flat-navigation-menu-item-to-create.util");
const _fromdeletenavigationmenuiteminputtoflatnavigationmenuitemorthrowutil = require("../flat-navigation-menu-item/utils/from-delete-navigation-menu-item-input-to-flat-navigation-menu-item-or-throw.util");
const _fromflatnavigationmenuitemtonavigationmenuitemdtoutil = require("../flat-navigation-menu-item/utils/from-flat-navigation-menu-item-to-navigation-menu-item-dto.util");
const _fromupdatenavigationmenuiteminputtoflatnavigationmenuitemtoupdateorthrowutil = require("../flat-navigation-menu-item/utils/from-update-navigation-menu-item-input-to-flat-navigation-menu-item-to-update-or-throw.util");
const _navigationmenuitemtypeenum = require("./enums/navigation-menu-item-type.enum");
const _navigationmenuitemexception = require("./navigation-menu-item.exception");
const _navigationmenuitemaccessservice = require("./services/navigation-menu-item-access.service");
const _navigationmenuitemrecordidentifierservice = require("./services/navigation-menu-item-record-identifier.service");
const _permissionsexception = require("../permissions/permissions.exception");
const _workspacemigrationbuilderexception = require("../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NavigationMenuItemService = class NavigationMenuItemService {
    async findAll({ workspaceId, userWorkspaceId, scope = 'all', folderId, type, limit }) {
        const { flatNavigationMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatNavigationMenuItemMaps'
            ]
        });
        const filtered = Object.values(flatNavigationMenuItemMaps.byUniversalIdentifier).filter((item)=>{
            if (!(0, _utils.isDefined)(item)) return false;
            const itemIsUserScoped = (0, _utils.isDefined)(item.userWorkspaceId);
            // Default scope returns workspace items + the caller's own user items.
            if (scope === 'all') {
                return !itemIsUserScoped || item.userWorkspaceId === userWorkspaceId;
            }
            if (scope === 'workspace') {
                return !itemIsUserScoped;
            }
            // scope === 'user'
            return itemIsUserScoped && item.userWorkspaceId === userWorkspaceId;
        }).filter((item)=>!(0, _utils.isDefined)(folderId) || item.folderId === folderId).filter((item)=>!(0, _utils.isDefined)(type) || item.type === type).sort((a, b)=>a.position - b.position);
        const bounded = (0, _utils.isDefined)(limit) ? filtered.slice(0, limit) : filtered;
        return bounded.map(_fromflatnavigationmenuitemtonavigationmenuitemdtoutil.fromFlatNavigationMenuItemToNavigationMenuItemDto);
    }
    async findById({ id, workspaceId }) {
        const { flatNavigationMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatNavigationMenuItemMaps'
            ]
        });
        const flatNavigationMenuItem = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatNavigationMenuItemMaps
        });
        if (!(0, _utils.isDefined)(flatNavigationMenuItem)) {
            return null;
        }
        return (0, _fromflatnavigationmenuitemtonavigationmenuitemdtoutil.fromFlatNavigationMenuItemToNavigationMenuItemDto)(flatNavigationMenuItem);
    }
    async findByIdOrThrow({ id, workspaceId }) {
        const navigationMenuItem = await this.findById({
            id,
            workspaceId
        });
        if (!(0, _utils.isDefined)(navigationMenuItem)) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('Navigation menu item not found', _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND);
        }
        return navigationMenuItem;
    }
    async create({ input, workspaceId, authUserWorkspaceId, authApiKeyId, authApplicationId }) {
        const createdItems = await this.createMany({
            inputs: [
                input
            ],
            workspaceId,
            authUserWorkspaceId,
            authApiKeyId,
            authApplicationId
        });
        const created = createdItems[0];
        if (!(0, _utils.isDefined)(created)) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('Failed to create navigation menu item', _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT);
        }
        return created;
    }
    async createMany({ inputs, workspaceId, authUserWorkspaceId, authApiKeyId, authApplicationId }) {
        if (inputs.length === 0) {
            return [];
        }
        for (const input of inputs){
            await this.navigationMenuItemAccessService.canUserCreateNavigationMenuItem({
                userWorkspaceId: authUserWorkspaceId,
                workspaceId,
                apiKeyId: authApiKeyId,
                applicationId: authApplicationId,
                inputUserWorkspaceId: input.userWorkspaceId
            });
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatNavigationMenuItemMaps: existingFlatNavigationMenuItemMaps, flatObjectMetadataMaps, flatViewMaps, flatPageLayoutMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatNavigationMenuItemMaps',
                'flatObjectMetadataMaps',
                'flatViewMaps',
                'flatPageLayoutMaps'
            ]
        });
        const optimisticFlatNavigationMenuItemMaps = structuredClone(existingFlatNavigationMenuItemMaps);
        const foldersFirst = [
            ...inputs
        ].sort((a, b)=>{
            const aIsFolder = a.type === _navigationmenuitemtypeenum.NavigationMenuItemType.FOLDER ? 0 : 1;
            const bIsFolder = b.type === _navigationmenuitemtypeenum.NavigationMenuItemType.FOLDER ? 0 : 1;
            return aIsFolder - bIsFolder;
        });
        const flatEntityByInput = new Map();
        const flatNavigationMenuItemsToCreate = foldersFirst.map((input)=>{
            const normalizedInput = {
                ...input,
                userWorkspaceId: (0, _utils.isDefined)(input.userWorkspaceId) && (0, _utils.isDefined)(authUserWorkspaceId) ? authUserWorkspaceId : input.userWorkspaceId
            };
            const flatNavigationMenuItemToCreate = (0, _fromcreatenavigationmenuiteminputtoflatnavigationmenuitemtocreateutil.fromCreateNavigationMenuItemInputToFlatNavigationMenuItemToCreate)({
                createNavigationMenuItemInput: normalizedInput,
                workspaceId,
                flatApplication: workspaceCustomFlatApplication,
                flatNavigationMenuItemMaps: optimisticFlatNavigationMenuItemMaps,
                flatObjectMetadataMaps,
                flatViewMaps,
                flatPageLayoutMaps
            });
            (0, _addflatnavigationmenuitemtomapsandupdateindexutil.addFlatNavigationMenuItemToMapsAndUpdateIndex)({
                flatNavigationMenuItem: flatNavigationMenuItemToCreate,
                flatNavigationMenuItemMaps: optimisticFlatNavigationMenuItemMaps
            });
            flatEntityByInput.set(input, flatNavigationMenuItemToCreate);
            return flatNavigationMenuItemToCreate;
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                navigationMenuItem: {
                    flatEntityToCreate: flatNavigationMenuItemsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating navigation menu items');
        }
        const { flatNavigationMenuItemMaps: recomputedFlatNavigationMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatNavigationMenuItemMaps'
            ]
        });
        return inputs.map((input)=>(0, _fromflatnavigationmenuitemtonavigationmenuitemdtoutil.fromFlatNavigationMenuItemToNavigationMenuItemDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: flatEntityByInput.get(input).id,
                flatEntityMaps: recomputedFlatNavigationMenuItemMaps
            })));
    }
    async update({ input, workspaceId, authUserWorkspaceId, authApiKeyId, authApplicationId }) {
        const { id, ...update } = input;
        const updatedItems = await this.updateMany({
            inputs: [
                {
                    id,
                    update
                }
            ],
            workspaceId,
            authUserWorkspaceId,
            authApiKeyId,
            authApplicationId
        });
        const updated = updatedItems[0];
        if (!(0, _utils.isDefined)(updated)) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('Failed to update navigation menu item', _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT);
        }
        return updated;
    }
    async updateMany({ inputs, workspaceId, authUserWorkspaceId, authApiKeyId, authApplicationId }) {
        if (inputs.length === 0) {
            return [];
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatNavigationMenuItemMaps: existingFlatNavigationMenuItemMaps, flatPageLayoutMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatNavigationMenuItemMaps',
                'flatPageLayoutMaps'
            ]
        });
        const flatNavigationMenuItemsToUpdate = [];
        for (const { id, update } of inputs){
            const updateInput = {
                ...update,
                id
            };
            const existingNavigationMenuItem = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: id,
                flatEntityMaps: existingFlatNavigationMenuItemMaps
            });
            if ((0, _utils.isDefined)(existingNavigationMenuItem)) {
                await this.navigationMenuItemAccessService.canUserUpdateNavigationMenuItem({
                    userWorkspaceId: authUserWorkspaceId,
                    workspaceId,
                    apiKeyId: authApiKeyId,
                    applicationId: authApplicationId,
                    existingUserWorkspaceId: existingNavigationMenuItem.userWorkspaceId
                });
            }
            flatNavigationMenuItemsToUpdate.push((0, _fromupdatenavigationmenuiteminputtoflatnavigationmenuitemtoupdateorthrowutil.fromUpdateNavigationMenuItemInputToFlatNavigationMenuItemToUpdateOrThrow)({
                flatNavigationMenuItemMaps: existingFlatNavigationMenuItemMaps,
                flatPageLayoutMaps,
                updateNavigationMenuItemInput: updateInput
            }));
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                navigationMenuItem: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: flatNavigationMenuItemsToUpdate
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating navigation menu items');
        }
        const { flatNavigationMenuItemMaps: recomputedFlatNavigationMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatNavigationMenuItemMaps'
            ]
        });
        return inputs.map(({ id })=>(0, _fromflatnavigationmenuitemtonavigationmenuitemdtoutil.fromFlatNavigationMenuItemToNavigationMenuItemDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: id,
                flatEntityMaps: recomputedFlatNavigationMenuItemMaps
            })));
    }
    async delete({ id, workspaceId, authUserWorkspaceId, authApiKeyId, authApplicationId }) {
        const deletedItems = await this.deleteMany({
            ids: [
                id
            ],
            workspaceId,
            authUserWorkspaceId,
            authApiKeyId,
            authApplicationId
        });
        const deleted = deletedItems[0];
        if (!(0, _utils.isDefined)(deleted)) {
            throw new _navigationmenuitemexception.NavigationMenuItemException('Failed to delete navigation menu item', _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND);
        }
        return deleted;
    }
    async deleteMany({ ids, workspaceId, authUserWorkspaceId, authApiKeyId, authApplicationId }) {
        if (ids.length === 0) {
            return [];
        }
        const uniqueOrderedIds = [];
        const seenId = new Set();
        for (const id of ids){
            if (!seenId.has(id)) {
                seenId.add(id);
                uniqueOrderedIds.push(id);
            }
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatNavigationMenuItemMaps: existingFlatNavigationMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatNavigationMenuItemMaps'
            ]
        });
        const flatEntitiesToDeleteOrdered = [];
        const seenDeleteId = new Set();
        const deletedNavigationMenuItemDtoByRequestedId = new Map();
        for (const requestedId of uniqueOrderedIds){
            const flatNavigationMenuItemRoot = (0, _fromdeletenavigationmenuiteminputtoflatnavigationmenuitemorthrowutil.fromDeleteNavigationMenuItemInputToFlatNavigationMenuItemOrThrow)({
                flatNavigationMenuItemMaps: existingFlatNavigationMenuItemMaps,
                navigationMenuItemId: requestedId
            });
            await this.navigationMenuItemAccessService.canUserDeleteNavigationMenuItem({
                userWorkspaceId: authUserWorkspaceId,
                workspaceId,
                apiKeyId: authApiKeyId,
                applicationId: authApplicationId,
                existingUserWorkspaceId: flatNavigationMenuItemRoot.userWorkspaceId
            });
            deletedNavigationMenuItemDtoByRequestedId.set(requestedId, (0, _fromflatnavigationmenuitemtonavigationmenuitemdtoutil.fromFlatNavigationMenuItemToNavigationMenuItemDto)(flatNavigationMenuItemRoot));
            const flatEntitiesForRoot = [
                flatNavigationMenuItemRoot
            ];
            if (flatNavigationMenuItemRoot.type === _navigationmenuitemtypeenum.NavigationMenuItemType.FOLDER) {
                const userWorkspaceIdKey = flatNavigationMenuItemRoot.userWorkspaceId ?? 'null';
                const folderChildren = existingFlatNavigationMenuItemMaps.byUserWorkspaceIdAndFolderId[userWorkspaceIdKey]?.[requestedId] ?? [];
                flatEntitiesForRoot.unshift(...folderChildren);
            }
            for (const flatEntity of flatEntitiesForRoot){
                if (!seenDeleteId.has(flatEntity.id)) {
                    seenDeleteId.add(flatEntity.id);
                    flatEntitiesToDeleteOrdered.push(flatEntity);
                }
            }
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                navigationMenuItem: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatEntitiesToDeleteOrdered,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting navigation menu items');
        }
        return uniqueOrderedIds.map((requestedId)=>{
            const dto = deletedNavigationMenuItemDtoByRequestedId.get(requestedId);
            if (!(0, _utils.isDefined)(dto)) {
                throw new _navigationmenuitemexception.NavigationMenuItemException('Failed to resolve deleted navigation menu item in batch', _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND);
            }
            return dto;
        });
    }
    async findTargetRecord({ targetRecordId, targetObjectMetadataId, workspaceId, authContext }) {
        try {
            return await this.navigationMenuItemRecordIdentifierService.resolveRecordIdentifier({
                targetRecordId,
                targetObjectMetadataId,
                workspaceId,
                authContext
            });
        } catch (error) {
            if (error instanceof _permissionsexception.PermissionsException) {
                return null;
            }
            throw error;
        }
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, navigationMenuItemAccessService, navigationMenuItemRecordIdentifierService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.navigationMenuItemAccessService = navigationMenuItemAccessService;
        this.navigationMenuItemRecordIdentifierService = navigationMenuItemRecordIdentifierService;
    }
};
NavigationMenuItemService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _navigationmenuitemaccessservice.NavigationMenuItemAccessService === "undefined" ? Object : _navigationmenuitemaccessservice.NavigationMenuItemAccessService,
        typeof _navigationmenuitemrecordidentifierservice.NavigationMenuItemRecordIdentifierService === "undefined" ? Object : _navigationmenuitemrecordidentifierservice.NavigationMenuItemRecordIdentifierService
    ])
], NavigationMenuItemService);

//# sourceMappingURL=navigation-menu-item.service.js.map