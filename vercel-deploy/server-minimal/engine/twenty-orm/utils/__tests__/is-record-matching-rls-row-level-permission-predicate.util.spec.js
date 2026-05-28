"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _isrecordmatchingrlsrowlevelpermissionpredicateutil = require("../is-record-matching-rls-row-level-permission-predicate.util");
describe('isRecordMatchingRLSRowLevelPermissionPredicate', ()=>{
    const createMockFlatObjectMetadata = (fieldIds)=>({
            id: 'test-object-id',
            nameSingular: 'test',
            namePlural: 'tests',
            labelSingular: 'Test',
            labelPlural: 'Tests',
            icon: 'IconTest',
            color: null,
            targetTableName: 'test',
            isCustom: false,
            isRemote: false,
            isActive: true,
            isSystem: false,
            isAuditLogged: false,
            isSearchable: false,
            workspaceId: 'test-workspace-id',
            universalIdentifier: 'test-object-id',
            indexMetadataIds: [],
            objectPermissionIds: [],
            fieldPermissionIds: [],
            fieldIds,
            viewIds: [],
            applicationId: 'test-application-id',
            isLabelSyncedWithName: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            shortcut: null,
            description: null,
            standardOverrides: null,
            isUIReadOnly: false,
            labelIdentifierFieldMetadataId: null,
            imageIdentifierFieldMetadataId: null,
            duplicateCriteria: null,
            applicationUniversalIdentifier: 'test-application-id',
            fieldUniversalIdentifiers: fieldIds,
            objectPermissionUniversalIdentifiers: [],
            fieldPermissionUniversalIdentifiers: [],
            viewUniversalIdentifiers: [],
            indexMetadataUniversalIdentifiers: [],
            labelIdentifierFieldMetadataUniversalIdentifier: null,
            imageIdentifierFieldMetadataUniversalIdentifier: null
        });
    const createMockFlatFieldMetadata = (id, name, type, settings)=>({
            id,
            name,
            type,
            label: name,
            objectMetadataId: 'test-object-id',
            isLabelSyncedWithName: true,
            isNullable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            universalIdentifier: id,
            viewFieldIds: [],
            viewFilterIds: [],
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            mainGroupByFieldMetadataViewIds: [],
            applicationId: null,
            settings
        });
    const buildFlatFieldMetadataMaps = (fields)=>({
            byUniversalIdentifier: fields.reduce((accumulator, field)=>{
                accumulator[field.universalIdentifier] = field;
                return accumulator;
            }, {}),
            universalIdentifierById: fields.reduce((accumulator, field)=>{
                accumulator[field.id] = field.universalIdentifier;
                return accumulator;
            }, {}),
            universalIdentifiersByApplicationId: {}
        });
    const fieldMetadata = [
        createMockFlatFieldMetadata('job-title-id', 'jobTitle', _types.FieldMetadataType.TEXT),
        createMockFlatFieldMetadata('name-id', 'name', _types.FieldMetadataType.FULL_NAME),
        createMockFlatFieldMetadata('address-id', 'address', _types.FieldMetadataType.ADDRESS),
        createMockFlatFieldMetadata('company-id', 'company', _types.FieldMetadataType.RELATION, {
            joinColumnName: 'companyId'
        })
    ];
    const flatObjectMetadata = createMockFlatObjectMetadata(fieldMetadata.map((field)=>field.id));
    const flatFieldMetadataMaps = buildFlatFieldMetadataMaps(fieldMetadata);
    const baseRecord = {
        jobTitle: 'Engineer',
        name: {
            firstName: 'Jane',
            lastName: 'Doe'
        },
        address: {
            addressStreet1: 'Main Street',
            addressCity: 'Paris'
        },
        companyId: 'company-1',
        deletedAt: null,
        id: 'record-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    it('returns true for an empty filter on non-deleted record', ()=>{
        const result = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: baseRecord,
            filter: {},
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        expect(result).toBe(true);
    });
    it('returns false for deleted records without deletedAt filter', ()=>{
        const result = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: {
                ...baseRecord,
                deletedAt: new Date().toISOString()
            },
            filter: {
                jobTitle: {
                    eq: 'Engineer'
                }
            },
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        expect(result).toBe(false);
    });
    it('treats multiple filter keys as an implicit and', ()=>{
        const result = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: baseRecord,
            filter: {
                jobTitle: {
                    eq: 'Engineer'
                },
                name: {
                    firstName: {
                        eq: 'Jane'
                    }
                }
            },
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        expect(result).toBe(true);
    });
    it('treats "or" with object as an "and"', ()=>{
        const matchingResult = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: baseRecord,
            filter: {
                or: {
                    jobTitle: {
                        eq: 'Engineer'
                    },
                    name: {
                        lastName: {
                            eq: 'Doe'
                        }
                    }
                }
            },
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        const nonMatchingResult = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: {
                ...baseRecord,
                name: {
                    ...baseRecord.name,
                    lastName: 'Smith'
                }
            },
            filter: {
                or: {
                    jobTitle: {
                        eq: 'Engineer'
                    },
                    name: {
                        lastName: {
                            eq: 'Doe'
                        }
                    }
                }
            },
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        expect(matchingResult).toBe(true);
        expect(nonMatchingResult).toBe(false);
    });
    it('supports "not" filter negation', ()=>{
        const result = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: baseRecord,
            filter: {
                not: {
                    jobTitle: {
                        eq: 'Engineer'
                    }
                }
            },
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        expect(result).toBe(false);
    });
    it('matches composite address filters using at least one sub-field', ()=>{
        const result = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: baseRecord,
            filter: {
                address: {
                    addressStreet1: {
                        eq: 'Main Street'
                    },
                    addressCity: {
                        eq: 'London'
                    }
                }
            },
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        expect(result).toBe(true);
    });
    it('supports relation join column filters', ()=>{
        const result = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: baseRecord,
            filter: {
                companyId: {
                    eq: 'company-1'
                }
            },
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        expect(result).toBe(true);
    });
});

//# sourceMappingURL=is-record-matching-rls-row-level-permission-predicate.util.spec.js.map