"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _graphqlqueryrunnerexception = require("../../graphql/graphql-query-runner/errors/graphql-query-runner.exception");
const _computecursorargfilterutils = require("../compute-cursor-arg-filter.utils");
describe('computeCursorArgFilter', ()=>{
    const workspaceId = 'workspace-id';
    const objectMetadataId = 'object-id';
    const createMockField = (overrides)=>({
            workspaceId,
            objectMetadataId,
            isNullable: true,
            isLabelSyncedWithName: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            universalIdentifier: overrides.id,
            viewFieldIds: [],
            viewFilterIds: [],
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            applicationId: null,
            label: overrides.name,
            ...overrides
        });
    const nameField = createMockField({
        id: 'name-id',
        type: _types.FieldMetadataType.TEXT,
        name: 'name',
        label: 'Name'
    });
    const ageField = createMockField({
        id: 'age-id',
        type: _types.FieldMetadataType.NUMBER,
        name: 'age',
        label: 'Age'
    });
    const fullNameField = createMockField({
        id: 'fullname-id',
        type: _types.FieldMetadataType.FULL_NAME,
        name: 'fullName',
        label: 'Full Name'
    });
    const buildFlatFieldMetadataMaps = (fields)=>({
            byUniversalIdentifier: fields.reduce((acc, field)=>{
                acc[field.universalIdentifier] = field;
                return acc;
            }, {}),
            universalIdentifierById: fields.reduce((acc, field)=>{
                acc[field.id] = field.universalIdentifier;
                return acc;
            }, {}),
            universalIdentifiersByApplicationId: {}
        });
    const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
        nameField,
        ageField,
        fullNameField
    ]);
    const flatObjectMetadata = {
        id: objectMetadataId,
        workspaceId,
        nameSingular: 'person',
        namePlural: 'people',
        labelSingular: 'Person',
        labelPlural: 'People',
        targetTableName: 'person',
        isCustom: false,
        isRemote: false,
        isActive: true,
        isSystem: false,
        isAuditLogged: false,
        isSearchable: false,
        icon: 'Icon123',
        createdAt: new Date(),
        updatedAt: new Date(),
        universalIdentifier: objectMetadataId,
        fieldIds: [
            'name-id',
            'age-id',
            'fullname-id'
        ],
        indexMetadataIds: [],
        viewIds: [],
        applicationId: null
    };
    describe('basic cursor filtering', ()=>{
        it('should return empty array when cursor is empty', ()=>{
            const result = (0, _computecursorargfilterutils.computeCursorArgFilter)({}, [], flatObjectMetadata, flatFieldMetadataMaps, true);
            expect(result).toEqual([]);
        });
        it('should compute forward pagination filter for single field', ()=>{
            const cursor = {
                name: 'John'
            };
            const orderBy = [
                {
                    name: _types.OrderByDirection.AscNullsLast
                }
            ];
            const result = (0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, true);
            expect(result).toEqual([
                {
                    name: {
                        gt: 'John'
                    }
                }
            ]);
        });
        it('should compute backward pagination filter for single field', ()=>{
            const cursor = {
                name: 'John'
            };
            const orderBy = [
                {
                    name: _types.OrderByDirection.AscNullsLast
                }
            ];
            const result = (0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, false);
            expect(result).toEqual([
                {
                    name: {
                        lt: 'John'
                    }
                }
            ]);
        });
    });
    describe('multiple fields cursor filtering', ()=>{
        it('should handle multiple cursor fields with forward pagination', ()=>{
            const cursor = {
                name: 'John',
                age: 30
            };
            const orderBy = [
                {
                    name: _types.OrderByDirection.AscNullsLast
                },
                {
                    age: _types.OrderByDirection.DescNullsLast
                }
            ];
            const result = (0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, true);
            expect(result).toEqual([
                {
                    name: {
                        gt: 'John'
                    }
                },
                {
                    and: [
                        {
                            name: {
                                eq: 'John'
                            }
                        },
                        {
                            age: {
                                lt: 30
                            }
                        }
                    ]
                }
            ]);
        });
    });
    describe('composite field handling', ()=>{
        it('should handle fullName composite field with proper ordering', ()=>{
            const cursor = {
                fullName: {
                    firstName: 'John',
                    lastName: 'Doe'
                }
            };
            const orderBy = [
                {
                    fullName: {
                        firstName: _types.OrderByDirection.AscNullsLast,
                        lastName: _types.OrderByDirection.AscNullsLast
                    }
                }
            ];
            const result = (0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, true);
            expect(result).toEqual([
                {
                    or: [
                        {
                            fullName: {
                                firstName: {
                                    gt: 'John'
                                }
                            }
                        },
                        {
                            and: [
                                {
                                    fullName: {
                                        firstName: {
                                            eq: 'John'
                                        }
                                    }
                                },
                                {
                                    fullName: {
                                        lastName: {
                                            gt: 'Doe'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]);
        });
        it('should handle single property composite field', ()=>{
            const cursor = {
                fullName: {
                    firstName: 'John'
                }
            };
            const orderBy = [
                {
                    fullName: {
                        firstName: _types.OrderByDirection.AscNullsLast
                    }
                }
            ];
            const result = (0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, true);
            expect(result).toEqual([
                {
                    fullName: {
                        firstName: {
                            gt: 'John'
                        }
                    }
                }
            ]);
        });
        it('should handle composite field with backward pagination', ()=>{
            const cursor = {
                fullName: {
                    firstName: 'John',
                    lastName: 'Doe'
                }
            };
            const orderBy = [
                {
                    fullName: {
                        firstName: _types.OrderByDirection.AscNullsLast,
                        lastName: _types.OrderByDirection.AscNullsLast
                    }
                }
            ];
            const result = (0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, false);
            expect(result).toEqual([
                {
                    or: [
                        {
                            fullName: {
                                firstName: {
                                    lt: 'John'
                                }
                            }
                        },
                        {
                            and: [
                                {
                                    fullName: {
                                        firstName: {
                                            eq: 'John'
                                        }
                                    }
                                },
                                {
                                    fullName: {
                                        lastName: {
                                            lt: 'Doe'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]);
        });
    });
    describe('error handling', ()=>{
        it('should throw error for invalid field metadata', ()=>{
            const cursor = {
                invalidField: 'value'
            };
            const orderBy = [
                {
                    invalidField: _types.OrderByDirection.AscNullsLast
                }
            ];
            expect(()=>(0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, true)).toThrow(_graphqlqueryrunnerexception.GraphqlQueryRunnerException);
        });
        it('should throw error for missing orderBy entry', ()=>{
            const cursor = {
                name: 'John'
            };
            const orderBy = [
                {
                    age: _types.OrderByDirection.AscNullsLast
                }
            ];
            expect(()=>(0, _computecursorargfilterutils.computeCursorArgFilter)(cursor, orderBy, flatObjectMetadata, flatFieldMetadataMaps, true)).toThrow(_graphqlqueryrunnerexception.GraphqlQueryRunnerException);
        });
    });
});

//# sourceMappingURL=compute-cursor-arg-filter.utils.spec.js.map