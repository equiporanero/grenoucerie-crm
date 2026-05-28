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
    get OPPORTUNITY_AIRBNB_ENTERPRISE_ID () {
        return OPPORTUNITY_AIRBNB_ENTERPRISE_ID;
    },
    get OPPORTUNITY_ANTHROPIC_AI_MODEL_ID () {
        return OPPORTUNITY_ANTHROPIC_AI_MODEL_ID;
    },
    get OPPORTUNITY_FIGMA_DESIGN_ID () {
        return OPPORTUNITY_FIGMA_DESIGN_ID;
    },
    get OPPORTUNITY_NOTION_WORKSPACE_ID () {
        return OPPORTUNITY_NOTION_WORKSPACE_ID;
    },
    get OPPORTUNITY_STRIPE_API_INTEGRATION_ID () {
        return OPPORTUNITY_STRIPE_API_INTEGRATION_ID;
    },
    get OPPORTUNITY_STRIPE_PLATFORM_MIGRATION_ID () {
        return OPPORTUNITY_STRIPE_PLATFORM_MIGRATION_ID;
    },
    get prefillOpportunities () {
        return prefillOpportunities;
    }
});
const _types = require("twenty-shared/types");
const _prefillcompaniesutil = require("./prefill-companies.util");
const _prefillpeopleutil = require("./prefill-people.util");
const OPPORTUNITY_STRIPE_PLATFORM_MIGRATION_ID = '822639e5-9bf7-40f1-8882-a11140362339';
const OPPORTUNITY_ANTHROPIC_AI_MODEL_ID = 'fc747edc-cb00-4078-8d6b-1fab2611dae4';
const OPPORTUNITY_NOTION_WORKSPACE_ID = '75de302f-1044-4957-8da4-1f67ebefd52b';
const OPPORTUNITY_STRIPE_API_INTEGRATION_ID = '2beb07b0-340c-41d7-be33-5aa91757f329';
const OPPORTUNITY_AIRBNB_ENTERPRISE_ID = '9543adcf-ec03-44e2-9233-3c2d3ebae98a';
const OPPORTUNITY_FIGMA_DESIGN_ID = '9457f8e9-16ae-43b9-92ee-cbd21f3dded5';
const prefillOpportunities = async (entityManager, schemaName)=>{
    const workspaceMember = await entityManager.createQueryBuilder().select('id').from(`${schemaName}.workspaceMember`, 'workspaceMember').limit(1).getRawOne();
    const ownerId = workspaceMember?.id ?? null;
    await entityManager.createQueryBuilder().insert().into(`${schemaName}.opportunity`, [
        'id',
        'name',
        'amountAmountMicros',
        'amountCurrencyCode',
        'closeDate',
        'stage',
        'position',
        'companyId',
        'pointOfContactId',
        'ownerId',
        'createdBySource',
        'createdByWorkspaceMemberId',
        'createdByName',
        'updatedBySource',
        'updatedByWorkspaceMemberId',
        'updatedByName'
    ]).orIgnore().values([
        {
            id: OPPORTUNITY_STRIPE_PLATFORM_MIGRATION_ID,
            name: 'Platform Migration',
            amountAmountMicros: 60000000000,
            amountCurrencyCode: 'USD',
            closeDate: new Date('2026-01-31T16:25:00.000Z'),
            stage: 'PROPOSAL',
            position: 1,
            companyId: _prefillcompaniesutil.STRIPE_ID,
            pointOfContactId: _prefillpeopleutil.PATRICK_COLLISON_ID,
            ownerId,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: OPPORTUNITY_ANTHROPIC_AI_MODEL_ID,
            name: 'AI Model Training',
            amountAmountMicros: 100000000000,
            amountCurrencyCode: 'USD',
            closeDate: new Date('2026-02-15T16:25:00.000Z'),
            stage: 'CUSTOMER',
            position: 2,
            companyId: _prefillcompaniesutil.ANTHROPIC_ID,
            pointOfContactId: _prefillpeopleutil.DARIO_AMODEI_ID,
            ownerId,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: OPPORTUNITY_NOTION_WORKSPACE_ID,
            name: 'Workspace Expansion',
            amountAmountMicros: 45000000000,
            amountCurrencyCode: 'USD',
            closeDate: new Date('2026-01-20T16:26:00.000Z'),
            stage: 'MEETING',
            position: 3,
            companyId: _prefillcompaniesutil.NOTION_ID,
            pointOfContactId: _prefillpeopleutil.IVAN_ZHAO_ID,
            ownerId,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: OPPORTUNITY_STRIPE_API_INTEGRATION_ID,
            name: 'API Integration Deal',
            amountAmountMicros: 75000000000,
            amountCurrencyCode: 'USD',
            closeDate: new Date('2026-01-25T16:26:00.000Z'),
            stage: 'SCREENING',
            position: 4,
            companyId: _prefillcompaniesutil.STRIPE_ID,
            pointOfContactId: _prefillpeopleutil.PATRICK_COLLISON_ID,
            ownerId,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: OPPORTUNITY_AIRBNB_ENTERPRISE_ID,
            name: 'Enterprise Plan Upgrade',
            amountAmountMicros: 50000000000,
            amountCurrencyCode: 'USD',
            closeDate: new Date('2026-03-10T16:26:00.000Z'),
            stage: 'NEW',
            position: 5,
            companyId: _prefillcompaniesutil.AIRBNB_ID,
            pointOfContactId: _prefillpeopleutil.BRIAN_CHESKY_ID,
            ownerId,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: OPPORTUNITY_FIGMA_DESIGN_ID,
            name: 'Design Partnership',
            amountAmountMicros: 30000000000,
            amountCurrencyCode: 'USD',
            closeDate: new Date('2026-01-15T16:27:00.000Z'),
            stage: 'NEW',
            position: 6,
            companyId: _prefillcompaniesutil.FIGMA_ID,
            pointOfContactId: _prefillpeopleutil.DYLAN_FIELD_ID,
            ownerId,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        }
    ]).returning('*').execute();
};

//# sourceMappingURL=prefill-opportunities.util.js.map