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
    get MY_FIRST_DASHBOARD_ID () {
        return MY_FIRST_DASHBOARD_ID;
    },
    get prefillDashboards () {
        return prefillDashboards;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _standardpagelayoutconstant = require("../../twenty-standard-application/constants/standard-page-layout.constant");
const MY_FIRST_DASHBOARD_ID = 'f31ecf3b-87d3-4e8a-a84b-b6f0f3f8c7e2';
const prefillDashboards = async (entityManager, schemaName, flatPageLayoutMaps)=>{
    const myFirstDashboardPageLayout = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        flatEntityMaps: flatPageLayoutMaps,
        universalIdentifier: _standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS.myFirstDashboard.universalIdentifier
    });
    if (!(0, _utils.isDefined)(myFirstDashboardPageLayout)) {
        throw new Error(`Page layout with universalIdentifier '${_standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS.myFirstDashboard.universalIdentifier}' not found`);
    }
    await entityManager.createQueryBuilder().insert().into(`${schemaName}.dashboard`, [
        'id',
        'title',
        'pageLayoutId',
        'position',
        'createdBySource',
        'createdByWorkspaceMemberId',
        'createdByName',
        'createdByContext',
        'updatedBySource',
        'updatedByWorkspaceMemberId',
        'updatedByName',
        'updatedByContext'
    ]).orIgnore().values([
        {
            id: MY_FIRST_DASHBOARD_ID,
            title: 'My First Dashboard',
            pageLayoutId: myFirstDashboardPageLayout.id,
            position: 0,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            createdByContext: {},
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System',
            updatedByContext: {}
        }
    ]).returning('*').execute();
};

//# sourceMappingURL=prefill-dashboards.util.js.map