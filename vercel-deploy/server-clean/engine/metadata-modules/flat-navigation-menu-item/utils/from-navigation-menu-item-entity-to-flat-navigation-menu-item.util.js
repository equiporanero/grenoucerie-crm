"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromNavigationMenuItemEntityToFlatNavigationMenuItem", {
    enumerable: true,
    get: function() {
        return fromNavigationMenuItemEntityToFlatNavigationMenuItem;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromNavigationMenuItemEntityToFlatNavigationMenuItem = ({ entity: navigationMenuItemEntity, applicationIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, navigationMenuItemIdToUniversalIdentifierMap, viewIdToUniversalIdentifierMap, pageLayoutIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(navigationMenuItemEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${navigationMenuItemEntity.applicationId} not found for navigationMenuItem ${navigationMenuItemEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let targetObjectMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(navigationMenuItemEntity.targetObjectMetadataId)) {
        targetObjectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(navigationMenuItemEntity.targetObjectMetadataId) ?? null;
        if (!(0, _utils.isDefined)(targetObjectMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${navigationMenuItemEntity.targetObjectMetadataId} not found for navigationMenuItem ${navigationMenuItemEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    let folderUniversalIdentifier = null;
    if ((0, _utils.isDefined)(navigationMenuItemEntity.folderId)) {
        folderUniversalIdentifier = navigationMenuItemIdToUniversalIdentifierMap.get(navigationMenuItemEntity.folderId) ?? null;
        if (!(0, _utils.isDefined)(folderUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`NavigationMenuItem (folder) with id ${navigationMenuItemEntity.folderId} not found for navigationMenuItem ${navigationMenuItemEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    let viewUniversalIdentifier = null;
    if ((0, _utils.isDefined)(navigationMenuItemEntity.viewId)) {
        viewUniversalIdentifier = viewIdToUniversalIdentifierMap.get(navigationMenuItemEntity.viewId) ?? null;
        if (!(0, _utils.isDefined)(viewUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`View with id ${navigationMenuItemEntity.viewId} not found for navigationMenuItem ${navigationMenuItemEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    let pageLayoutUniversalIdentifier = null;
    if ((0, _utils.isDefined)(navigationMenuItemEntity.pageLayoutId)) {
        pageLayoutUniversalIdentifier = pageLayoutIdToUniversalIdentifierMap.get(navigationMenuItemEntity.pageLayoutId) ?? null;
        if (!(0, _utils.isDefined)(pageLayoutUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`PageLayout with id ${navigationMenuItemEntity.pageLayoutId} not found for navigationMenuItem ${navigationMenuItemEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    return {
        id: navigationMenuItemEntity.id,
        type: navigationMenuItemEntity.type,
        userWorkspaceId: navigationMenuItemEntity.userWorkspaceId,
        targetRecordId: navigationMenuItemEntity.targetRecordId,
        targetObjectMetadataId: navigationMenuItemEntity.targetObjectMetadataId,
        viewId: navigationMenuItemEntity.viewId,
        folderId: navigationMenuItemEntity.folderId,
        name: navigationMenuItemEntity.name,
        link: navigationMenuItemEntity.link,
        icon: navigationMenuItemEntity.icon,
        color: navigationMenuItemEntity.color,
        pageLayoutId: navigationMenuItemEntity.pageLayoutId,
        position: navigationMenuItemEntity.position,
        workspaceId: navigationMenuItemEntity.workspaceId,
        universalIdentifier: navigationMenuItemEntity.universalIdentifier,
        applicationId: navigationMenuItemEntity.applicationId,
        createdAt: navigationMenuItemEntity.createdAt.toISOString(),
        updatedAt: navigationMenuItemEntity.updatedAt.toISOString(),
        applicationUniversalIdentifier,
        targetObjectMetadataUniversalIdentifier,
        folderUniversalIdentifier,
        viewUniversalIdentifier,
        pageLayoutUniversalIdentifier
    };
};

//# sourceMappingURL=from-navigation-menu-item-entity-to-flat-navigation-menu-item.util.js.map