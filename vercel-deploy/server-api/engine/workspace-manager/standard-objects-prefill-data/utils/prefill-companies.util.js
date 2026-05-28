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
    get AIRBNB_ID () {
        return AIRBNB_ID;
    },
    get ANTHROPIC_ID () {
        return ANTHROPIC_ID;
    },
    get FIGMA_ID () {
        return FIGMA_ID;
    },
    get NOTION_ID () {
        return NOTION_ID;
    },
    get STRIPE_ID () {
        return STRIPE_ID;
    },
    get prefillCompanies () {
        return prefillCompanies;
    }
});
const _types = require("twenty-shared/types");
const AIRBNB_ID = 'c776ee49-f608-4a77-8cc8-6fe96ae1e43f';
const ANTHROPIC_ID = 'f45ee421-8a3e-4aa5-a1cf-7207cc6754e1';
const STRIPE_ID = '1f70157c-4ea5-4d81-bc49-e1401abfbb94';
const FIGMA_ID = '9d5bcf43-7d38-4e88-82cb-d6d4ce638bf0';
const NOTION_ID = '06290608-8bf0-4806-99ae-a715a6a93fad';
const prefillCompanies = async (entityManager, schemaName)=>{
    await entityManager.createQueryBuilder().insert().into(`${schemaName}.company`, [
        'id',
        'name',
        'domainNamePrimaryLinkUrl',
        'addressAddressStreet1',
        'addressAddressStreet2',
        'addressAddressCity',
        'addressAddressState',
        'addressAddressPostcode',
        'addressAddressCountry',
        'employees',
        'position',
        'createdBySource',
        'createdByWorkspaceMemberId',
        'createdByName',
        'updatedBySource',
        'updatedByWorkspaceMemberId',
        'updatedByName'
    ]).orIgnore().values([
        {
            id: AIRBNB_ID,
            name: 'Airbnb',
            domainNamePrimaryLinkUrl: 'https://airbnb.com',
            addressAddressStreet1: '888 Brannan St',
            addressAddressStreet2: null,
            addressAddressCity: 'San Francisco',
            addressAddressState: 'CA',
            addressAddressPostcode: '94103',
            addressAddressCountry: 'United States',
            employees: 5000,
            position: 1,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: ANTHROPIC_ID,
            name: 'Anthropic',
            domainNamePrimaryLinkUrl: 'https://anthropic.com',
            addressAddressStreet1: '548 Market Street',
            addressAddressStreet2: null,
            addressAddressCity: 'San Francisco',
            addressAddressState: 'CA',
            addressAddressPostcode: '94104',
            addressAddressCountry: 'United States',
            employees: 1100,
            position: 2,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: STRIPE_ID,
            name: 'Stripe',
            domainNamePrimaryLinkUrl: 'https://stripe.com',
            addressAddressStreet1: 'Eutaw Street',
            addressAddressStreet2: null,
            addressAddressCity: 'Dublin',
            addressAddressState: null,
            addressAddressPostcode: null,
            addressAddressCountry: 'Ireland',
            employees: 8000,
            position: 3,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: FIGMA_ID,
            name: 'Figma',
            domainNamePrimaryLinkUrl: 'https://figma.com',
            addressAddressStreet1: '760 Market St',
            addressAddressStreet2: 'Floor 10',
            addressAddressCity: 'San Francisco',
            addressAddressState: null,
            addressAddressPostcode: '94102',
            addressAddressCountry: 'United States',
            employees: 800,
            position: 4,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        },
        {
            id: NOTION_ID,
            name: 'Notion',
            domainNamePrimaryLinkUrl: 'https://notion.com',
            addressAddressStreet1: '2300 Harrison St',
            addressAddressStreet2: null,
            addressAddressCity: 'San Francisco',
            addressAddressState: 'CA',
            addressAddressPostcode: '94110',
            addressAddressCountry: 'United States',
            employees: 400,
            position: 5,
            createdBySource: _types.FieldActorSource.SYSTEM,
            createdByWorkspaceMemberId: null,
            createdByName: 'System',
            updatedBySource: _types.FieldActorSource.SYSTEM,
            updatedByWorkspaceMemberId: null,
            updatedByName: 'System'
        }
    ]).returning('*').execute();
};

//# sourceMappingURL=prefill-companies.util.js.map