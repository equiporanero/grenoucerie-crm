"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get DASHBOARD_DATA_SEED_COLUMNS () {
        return DASHBOARD_DATA_SEED_COLUMNS;
    },
    get DASHBOARD_DATA_SEED_IDS () {
        return DASHBOARD_DATA_SEED_IDS;
    },
    get getDashboardDataSeeds () {
        return getDashboardDataSeeds;
    }
});
const _pagelayoutseedsconstant = require("../../core/constants/page-layout-seeds.constant");
const _generateseedidutil = require("../../core/utils/generate-seed-id.util");
const _workspacememberdataseedsconstant = require("./workspace-member-data-seeds.constant");
const DASHBOARD_DATA_SEED_COLUMNS = [
    'id',
    'title',
    'pageLayoutId',
    'createdBySource',
    'createdByWorkspaceMemberId',
    'createdByName',
    'updatedBySource',
    'updatedByWorkspaceMemberId',
    'updatedByName',
    'position'
];
const DASHBOARD_DATA_SEED_IDS = {
    SALES_OVERVIEW: '20202020-9e82-4342-91ef-c9e70f16a675',
    CUSTOMER_INSIGHTS: '20202020-d64e-4588-98cc-c56ba821247b',
    TEAM_PERFORMANCE: '20202020-b888-4c58-8975-76b4c2035d3a'
};
const getDashboardDataSeeds = (workspaceId)=>[
        {
            id: DASHBOARD_DATA_SEED_IDS.SALES_OVERVIEW,
            title: 'Sales Overview',
            pageLayoutId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.SALES_DASHBOARD),
            createdBySource: 'MANUAL',
            createdByWorkspaceMemberId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
            createdByName: 'Tim Apple',
            updatedBySource: 'MANUAL',
            updatedByWorkspaceMemberId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
            updatedByName: 'Tim Apple',
            position: 0
        },
        {
            id: DASHBOARD_DATA_SEED_IDS.CUSTOMER_INSIGHTS,
            title: 'Customer Insights',
            pageLayoutId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.CUSTOMER_DASHBOARD),
            createdBySource: 'MANUAL',
            createdByWorkspaceMemberId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.JONY,
            createdByName: 'Jony Ive',
            updatedBySource: 'MANUAL',
            updatedByWorkspaceMemberId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.JONY,
            updatedByName: 'Jony Ive',
            position: 1
        },
        {
            id: DASHBOARD_DATA_SEED_IDS.TEAM_PERFORMANCE,
            title: 'Team & Activity',
            pageLayoutId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.TEAM_DASHBOARD),
            createdBySource: 'MANUAL',
            createdByWorkspaceMemberId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.PHIL,
            createdByName: 'Phil Schiller',
            updatedBySource: 'MANUAL',
            updatedByWorkspaceMemberId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.PHIL,
            updatedByName: 'Phil Schiller',
            position: 2
        }
    ];

//# sourceMappingURL=dashboard-data-seeds.constant.js.map