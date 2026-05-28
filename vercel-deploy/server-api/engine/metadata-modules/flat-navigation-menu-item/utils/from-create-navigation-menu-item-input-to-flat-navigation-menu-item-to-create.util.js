"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateNavigationMenuItemInputToFlatNavigationMenuItemToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateNavigationMenuItemInputToFlatNavigationMenuItemToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateNavigationMenuItemInputToFlatNavigationMenuItemToCreate = ({ createNavigationMenuItemInput, workspaceId, flatApplication, flatNavigationMenuItemMaps, flatObjectMetadataMaps, flatViewMaps, flatPageLayoutMaps })=>{
    const id = createNavigationMenuItemInput.id ?? (0, _uuid.v4)();
    const now = new Date().toISOString();
    let position = createNavigationMenuItemInput.position;
    if (!(0, _utils.isDefined)(position)) {
        const userWorkspaceIdKey = createNavigationMenuItemInput.userWorkspaceId ?? 'null';
        const folderIdKey = createNavigationMenuItemInput.folderId ?? 'null';
        const existingItems = flatNavigationMenuItemMaps.byUserWorkspaceIdAndFolderId[userWorkspaceIdKey]?.[folderIdKey] ?? [];
        const maxPosition = existingItems.reduce((max, item)=>Math.max(max, item.position), 0);
        position = maxPosition + 1;
    }
    const { targetObjectMetadataUniversalIdentifier, viewUniversalIdentifier, folderUniversalIdentifier, pageLayoutUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'navigationMenuItem',
        foreignKeyValues: {
            targetObjectMetadataId: createNavigationMenuItemInput.targetObjectMetadataId,
            viewId: createNavigationMenuItemInput.viewId,
            folderId: createNavigationMenuItemInput.folderId,
            pageLayoutId: createNavigationMenuItemInput.pageLayoutId
        },
        flatEntityMaps: {
            flatObjectMetadataMaps,
            flatViewMaps,
            flatNavigationMenuItemMaps,
            flatPageLayoutMaps
        }
    });
    return {
        id,
        type: createNavigationMenuItemInput.type,
        universalIdentifier: id,
        userWorkspaceId: createNavigationMenuItemInput.userWorkspaceId ?? null,
        targetRecordId: createNavigationMenuItemInput.targetRecordId ?? null,
        targetObjectMetadataId: createNavigationMenuItemInput.targetObjectMetadataId ?? null,
        targetObjectMetadataUniversalIdentifier,
        viewId: createNavigationMenuItemInput.viewId ?? null,
        viewUniversalIdentifier,
        folderId: createNavigationMenuItemInput.folderId ?? null,
        folderUniversalIdentifier,
        pageLayoutId: createNavigationMenuItemInput.pageLayoutId ?? null,
        pageLayoutUniversalIdentifier,
        name: createNavigationMenuItemInput.name ?? null,
        link: createNavigationMenuItemInput.link ?? null,
        icon: createNavigationMenuItemInput.icon ?? null,
        color: createNavigationMenuItemInput.color ?? null,
        position,
        workspaceId,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-create-navigation-menu-item-input-to-flat-navigation-menu-item-to-create.util.js.map