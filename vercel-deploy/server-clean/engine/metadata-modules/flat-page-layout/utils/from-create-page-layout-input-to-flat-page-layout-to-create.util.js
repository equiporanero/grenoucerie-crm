"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreatePageLayoutInputToFlatPageLayoutToCreate", {
    enumerable: true,
    get: function() {
        return fromCreatePageLayoutInputToFlatPageLayoutToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _pagelayouttypeenum = require("../../page-layout/enums/page-layout-type.enum");
const fromCreatePageLayoutInputToFlatPageLayoutToCreate = ({ createPageLayoutInput: rawCreatePageLayoutInput, workspaceId, flatApplication, flatObjectMetadataMaps })=>{
    const createPageLayoutInput = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreatePageLayoutInput, [
        'name'
    ]);
    const createdAt = new Date().toISOString();
    const pageLayoutId = (0, _uuid.v4)();
    const { objectMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'pageLayout',
        foreignKeyValues: {
            objectMetadataId: createPageLayoutInput.objectMetadataId
        },
        flatEntityMaps: {
            flatObjectMetadataMaps
        }
    });
    return {
        id: pageLayoutId,
        name: createPageLayoutInput.name,
        type: createPageLayoutInput.type ?? _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
        objectMetadataId: createPageLayoutInput.objectMetadataId ?? null,
        objectMetadataUniversalIdentifier,
        workspaceId,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: pageLayoutId,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        tabIds: [],
        tabUniversalIdentifiers: [],
        defaultTabToFocusOnMobileAndSidePanelId: null,
        defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier: null
    };
};

//# sourceMappingURL=from-create-page-layout-input-to-flat-page-layout-to-create.util.js.map