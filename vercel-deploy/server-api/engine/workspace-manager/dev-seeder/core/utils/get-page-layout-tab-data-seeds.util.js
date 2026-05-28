"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPageLayoutTabFlatEntitySeeds", {
    enumerable: true,
    get: function() {
        return getPageLayoutTabFlatEntitySeeds;
    }
});
const _types = require("twenty-shared/types");
const _pagelayoutseedsconstant = require("../constants/page-layout-seeds.constant");
const _pagelayouttabseedsconstant = require("../constants/page-layout-tab-seeds.constant");
const _generateseedidutil = require("./generate-seed-id.util");
const getPageLayoutTabFlatEntitySeeds = ({ workspaceId, flatApplication })=>{
    const now = new Date().toISOString();
    const buildTab = (tabSeed, title, position, pageLayoutSeed)=>({
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, tabSeed),
            universalIdentifier: (0, _generateseedidutil.generateSeedId)(workspaceId, tabSeed),
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            title,
            position,
            pageLayoutId: (0, _generateseedidutil.generateSeedId)(workspaceId, pageLayoutSeed),
            pageLayoutUniversalIdentifier: (0, _generateseedidutil.generateSeedId)(workspaceId, pageLayoutSeed),
            widgetIds: [],
            widgetUniversalIdentifiers: [],
            isActive: true,
            icon: null,
            layoutMode: _types.PageLayoutTabLayoutMode.GRID,
            overrides: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        });
    return [
        buildTab(_pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_OVERVIEW, 'Overview', 0, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.SALES_DASHBOARD),
        buildTab(_pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.SALES_DETAILS, 'Details', 1, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.SALES_DASHBOARD),
        buildTab(_pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_OVERVIEW, 'Overview', 0, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.CUSTOMER_DASHBOARD),
        buildTab(_pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.CUSTOMER_ANALYTICS, 'Analytics', 1, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.CUSTOMER_DASHBOARD),
        buildTab(_pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.TEAM_OVERVIEW, 'Team & People', 0, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.TEAM_DASHBOARD),
        buildTab(_pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.TEAM_METRICS, 'Tasks & Activity', 1, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.TEAM_DASHBOARD),
        buildTab(_pagelayouttabseedsconstant.PAGE_LAYOUT_TAB_SEEDS.DOCUMENTATION, 'Documentation', 0, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.DOCUMENTATION_STANDALONE_PAGE)
    ];
};

//# sourceMappingURL=get-page-layout-tab-data-seeds.util.js.map