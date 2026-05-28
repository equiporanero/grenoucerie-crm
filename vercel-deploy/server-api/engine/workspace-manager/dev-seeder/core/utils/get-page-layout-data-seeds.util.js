"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPageLayoutFlatEntitySeeds", {
    enumerable: true,
    get: function() {
        return getPageLayoutFlatEntitySeeds;
    }
});
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _pagelayoutseedsconstant = require("../constants/page-layout-seeds.constant");
const _generateseedidutil = require("./generate-seed-id.util");
const getPageLayoutFlatEntitySeeds = ({ workspaceId, flatApplication })=>{
    const now = new Date().toISOString();
    return [
        {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.SALES_DASHBOARD),
            universalIdentifier: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.SALES_DASHBOARD),
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            name: 'Sales Dashboard Layout',
            type: _pagelayouttypeenum.PageLayoutType.DASHBOARD,
            objectMetadataId: null,
            objectMetadataUniversalIdentifier: null,
            tabIds: [],
            tabUniversalIdentifiers: [],
            defaultTabToFocusOnMobileAndSidePanelId: null,
            defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        },
        {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.CUSTOMER_DASHBOARD),
            universalIdentifier: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.CUSTOMER_DASHBOARD),
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            name: 'Customer Dashboard Layout',
            type: _pagelayouttypeenum.PageLayoutType.DASHBOARD,
            objectMetadataId: null,
            objectMetadataUniversalIdentifier: null,
            tabIds: [],
            tabUniversalIdentifiers: [],
            defaultTabToFocusOnMobileAndSidePanelId: null,
            defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        },
        {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.TEAM_DASHBOARD),
            universalIdentifier: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.TEAM_DASHBOARD),
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            name: 'Team Dashboard Layout',
            type: _pagelayouttypeenum.PageLayoutType.DASHBOARD,
            objectMetadataId: null,
            objectMetadataUniversalIdentifier: null,
            tabIds: [],
            tabUniversalIdentifiers: [],
            defaultTabToFocusOnMobileAndSidePanelId: null,
            defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        },
        {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.DOCUMENTATION_STANDALONE_PAGE),
            universalIdentifier: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.DOCUMENTATION_STANDALONE_PAGE),
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            name: 'Documentation',
            type: _pagelayouttypeenum.PageLayoutType.STANDALONE_PAGE,
            objectMetadataId: null,
            objectMetadataUniversalIdentifier: null,
            tabIds: [],
            tabUniversalIdentifiers: [],
            defaultTabToFocusOnMobileAndSidePanelId: null,
            defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        }
    ];
};

//# sourceMappingURL=get-page-layout-data-seeds.util.js.map