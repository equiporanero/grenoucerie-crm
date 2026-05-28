"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _buildcursorcompositefieldwhereconditionutils = require("../build-cursor-composite-field-where-condition.utils");
describe('buildCompositeFieldWhereCondition', ()=>{
    describe('eq operator cases', ()=>{
        it('should handle eq operator', ()=>{
            const result = (0, _buildcursorcompositefieldwhereconditionutils.buildCursorCompositeFieldWhereCondition)({
                fieldType: _types.FieldMetadataType.FULL_NAME,
                fieldKey: 'name',
                orderBy: [
                    {
                        name: {
                            firstName: _types.OrderByDirection.AscNullsLast,
                            lastName: _types.OrderByDirection.AscNullsLast
                        }
                    }
                ],
                cursorValue: {
                    firstName: 'John',
                    lastName: 'Doe'
                },
                isForwardPagination: true,
                isEqualityCondition: true
            });
            expect(result).toEqual({
                name: {
                    firstName: {
                        eq: 'John'
                    },
                    lastName: {
                        eq: 'Doe'
                    }
                }
            });
        });
    });
    describe('single property cases', ()=>{
        const singlePropertyTestCases = [
            {
                title: 'ascending order with forward pagination',
                context: {
                    description: 'ascending order with forward pagination',
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'person',
                    orderBy: [
                        {
                            person: {
                                firstName: _types.OrderByDirection.AscNullsLast
                            }
                        }
                    ],
                    value: {
                        firstName: 'John'
                    },
                    isForwardPagination: true,
                    operator: undefined,
                    expectedOperator: 'gt'
                }
            },
            {
                title: 'ascending order with backward pagination',
                context: {
                    description: 'ascending order with backward pagination',
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'person',
                    orderBy: [
                        {
                            person: {
                                firstName: _types.OrderByDirection.AscNullsLast
                            }
                        }
                    ],
                    value: {
                        firstName: 'John'
                    },
                    isForwardPagination: false,
                    operator: undefined,
                    expectedOperator: 'lt'
                }
            },
            {
                title: 'descending order with forward pagination',
                context: {
                    description: 'descending order with forward pagination',
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'person',
                    orderBy: [
                        {
                            person: {
                                firstName: _types.OrderByDirection.DescNullsLast
                            }
                        }
                    ],
                    value: {
                        firstName: 'John'
                    },
                    isForwardPagination: true,
                    operator: undefined,
                    expectedOperator: 'lt'
                }
            },
            {
                title: 'descending order with backward pagination',
                context: {
                    description: 'descending order with backward pagination',
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'person',
                    orderBy: [
                        {
                            person: {
                                firstName: _types.OrderByDirection.DescNullsLast
                            }
                        }
                    ],
                    value: {
                        firstName: 'John'
                    },
                    isForwardPagination: false,
                    operator: undefined,
                    expectedOperator: 'gt'
                }
            }
        ];
        test.each(singlePropertyTestCases)('should handle $description', ({ context })=>{
            const { fieldType, fieldKey, orderBy, value, isForwardPagination, expectedOperator } = context;
            const result = (0, _buildcursorcompositefieldwhereconditionutils.buildCursorCompositeFieldWhereCondition)({
                fieldType,
                fieldKey,
                orderBy,
                cursorValue: value,
                isForwardPagination
            });
            expect(result).toEqual({
                [fieldKey]: {
                    firstName: {
                        [expectedOperator]: value.firstName
                    }
                }
            });
        });
        test.each(singlePropertyTestCases)('should match snapshot for $title', ({ context })=>{
            const { fieldType, fieldKey, orderBy, value, isForwardPagination, description } = context;
            const result = (0, _buildcursorcompositefieldwhereconditionutils.buildCursorCompositeFieldWhereCondition)({
                fieldType,
                fieldKey,
                orderBy,
                cursorValue: value,
                isForwardPagination
            });
            expect(result).toMatchSnapshot(`single property - ${description}`);
        });
    });
    describe('multiple properties cases', ()=>{
        const multiplePropertiesTestCases = [
            {
                title: 'two properties - both ascending, forward pagination',
                context: {
                    description: 'two properties - both ascending, forward pagination',
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'name',
                    orderBy: [
                        {
                            name: {
                                firstName: _types.OrderByDirection.AscNullsLast,
                                lastName: _types.OrderByDirection.AscNullsLast
                            }
                        }
                    ],
                    value: {
                        firstName: 'John',
                        lastName: 'Doe'
                    },
                    isForwardPagination: true
                }
            },
            {
                title: 'two properties - both ascending, backward pagination',
                context: {
                    description: 'two properties - both ascending, backward pagination',
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'name',
                    orderBy: [
                        {
                            name: {
                                firstName: _types.OrderByDirection.AscNullsLast,
                                lastName: _types.OrderByDirection.AscNullsLast
                            }
                        }
                    ],
                    value: {
                        firstName: 'John',
                        lastName: 'Doe'
                    },
                    isForwardPagination: false
                }
            },
            {
                title: 'two properties - mixed ordering, forward pagination',
                context: {
                    description: 'two properties - mixed ordering, forward pagination',
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'name',
                    orderBy: [
                        {
                            name: {
                                firstName: _types.OrderByDirection.AscNullsLast,
                                lastName: _types.OrderByDirection.DescNullsLast
                            }
                        }
                    ],
                    value: {
                        firstName: 'John',
                        lastName: 'Doe'
                    },
                    isForwardPagination: true
                }
            },
            {
                title: 'two properties - both descending, forward pagination',
                context: {
                    description: 'two properties - both descending, forward pagination',
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'name',
                    orderBy: [
                        {
                            name: {
                                firstName: _types.OrderByDirection.DescNullsLast,
                                lastName: _types.OrderByDirection.DescNullsLast
                            }
                        }
                    ],
                    value: {
                        firstName: 'John',
                        lastName: 'Doe'
                    },
                    isForwardPagination: true
                }
            },
            {
                title: 'address composite field - both ascending, forward pagination',
                context: {
                    description: 'address composite field - both ascending, forward pagination',
                    fieldType: _types.FieldMetadataType.ADDRESS,
                    fieldKey: 'address',
                    orderBy: [
                        {
                            address: {
                                addressStreet1: _types.OrderByDirection.AscNullsLast,
                                addressStreet2: _types.OrderByDirection.AscNullsLast,
                                addressCity: _types.OrderByDirection.AscNullsLast,
                                addressState: _types.OrderByDirection.AscNullsLast,
                                addressCountry: _types.OrderByDirection.AscNullsLast,
                                addressPostcode: _types.OrderByDirection.AscNullsLast
                            }
                        }
                    ],
                    value: {
                        addressStreet1: '123 Main St',
                        addressStreet2: 'Apt 4B',
                        addressCity: 'New York',
                        addressState: 'NY',
                        addressCountry: 'USA',
                        addressPostcode: '10001'
                    },
                    isForwardPagination: true
                }
            }
        ];
        test.each(multiplePropertiesTestCases)('should handle $title', ({ context })=>{
            const { fieldType, fieldKey, orderBy, value, isForwardPagination } = context;
            const result = (0, _buildcursorcompositefieldwhereconditionutils.buildCursorCompositeFieldWhereCondition)({
                fieldType,
                fieldKey,
                orderBy,
                cursorValue: value,
                isForwardPagination
            });
            expect(result).toHaveProperty('or');
            const orConditions = result.or;
            expect(Array.isArray(orConditions)).toBe(true);
            const propertiesWithValues = Object.keys(value).length;
            expect(orConditions).toHaveLength(propertiesWithValues);
            expect(orConditions[0]).toHaveProperty(fieldKey);
            for (const [index, orCondition] of orConditions.slice(1).entries()){
                expect(orCondition).toHaveProperty('and');
                expect(Array.isArray(orCondition.and)).toBe(true);
                expect(orCondition.and).toHaveLength(index + 2);
            }
        });
        test.each(multiplePropertiesTestCases)('should match snapshots for $title', ({ context })=>{
            const { fieldType, fieldKey, orderBy, value, isForwardPagination, description } = context;
            const result = (0, _buildcursorcompositefieldwhereconditionutils.buildCursorCompositeFieldWhereCondition)({
                fieldType,
                fieldKey,
                orderBy,
                cursorValue: value,
                isForwardPagination
            });
            expect(result).toMatchSnapshot(`multiple properties - ${description}`);
        });
    });
    describe('error cases', ()=>{
        it('should throw error for invalid composite type', ()=>{
            expect(()=>(0, _buildcursorcompositefieldwhereconditionutils.buildCursorCompositeFieldWhereCondition)({
                    fieldType: _types.FieldMetadataType.TEXT,
                    fieldKey: 'person',
                    orderBy: [
                        {
                            person: {
                                firstName: _types.OrderByDirection.AscNullsLast
                            }
                        }
                    ],
                    cursorValue: {
                        firstName: 'John'
                    },
                    isForwardPagination: true
                })).toThrow('Composite type definition not found for type: TEXT');
        });
        it('should throw error for invalid cursor with missing order by', ()=>{
            expect(()=>(0, _buildcursorcompositefieldwhereconditionutils.buildCursorCompositeFieldWhereCondition)({
                    fieldType: _types.FieldMetadataType.FULL_NAME,
                    fieldKey: 'person',
                    orderBy: [],
                    cursorValue: {
                        firstName: 'John'
                    },
                    isForwardPagination: true
                })).toThrow('Invalid cursor');
        });
    });
});

//# sourceMappingURL=build-cursor-composite-field-where-condition.utils.spec.js.map