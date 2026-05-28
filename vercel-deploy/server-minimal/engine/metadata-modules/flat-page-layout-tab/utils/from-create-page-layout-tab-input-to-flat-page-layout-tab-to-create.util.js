"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreatePageLayoutTabInputToFlatPageLayoutTabToCreate", {
    enumerable: true,
    get: function() {
        return fromCreatePageLayoutTabInputToFlatPageLayoutTabToCreate;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreatePageLayoutTabInputToFlatPageLayoutTabToCreate = ({ createPageLayoutTabInput: rawCreatePageLayoutTabInput, workspaceId, flatApplication, flatPageLayoutMaps })=>{
    const createPageLayoutTabInput = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreatePageLayoutTabInput, [
        'title'
    ]);
    const createdAt = new Date().toISOString();
    const pageLayoutTabId = (0, _uuid.v4)();
    const { pageLayoutUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        flatEntityMaps: {
            flatPageLayoutMaps
        },
        foreignKeyValues: {
            pageLayoutId: createPageLayoutTabInput.pageLayoutId
        },
        metadataName: 'pageLayoutTab'
    });
    return {
        id: pageLayoutTabId,
        title: createPageLayoutTabInput.title,
        position: createPageLayoutTabInput.position ?? 0,
        isActive: true,
        pageLayoutId: createPageLayoutTabInput.pageLayoutId,
        pageLayoutUniversalIdentifier,
        workspaceId,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: pageLayoutTabId,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        widgetIds: [],
        widgetUniversalIdentifiers: [],
        icon: null,
        layoutMode: createPageLayoutTabInput.layoutMode ?? _types.PageLayoutTabLayoutMode.GRID,
        overrides: null
    };
};

//# sourceMappingURL=from-create-page-layout-tab-input-to-flat-page-layout-tab-to-create.util.js.map