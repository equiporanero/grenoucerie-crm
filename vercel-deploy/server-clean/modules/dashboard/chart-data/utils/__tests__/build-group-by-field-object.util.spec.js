"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _buildgroupbyfieldobjectutil = require("../build-group-by-field-object.util");
const createMockFieldMetadata = (overrides)=>({
        id: 'test-id',
        name: 'testField',
        type: _types.FieldMetadataType.TEXT,
        universalIdentifier: 'test-universal-id',
        description: null,
        ...overrides
    });
const userTimezone = 'Europe/Paris';
describe('buildGroupByFieldObject', ()=>{
    describe('relation fields', ()=>{
        it('should return field with Id suffix for relation fields without subFieldName', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata
            });
            expect(result).toEqual({
                companyId: true
            });
        });
        it('should return nested object for relation field with subFieldName', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'name'
            });
            expect(result).toEqual({
                company: {
                    name: true
                }
            });
        });
        it('should return deeply nested object for relation with composite subfield', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'address.addressCity'
            });
            expect(result).toEqual({
                company: {
                    address: {
                        addressCity: true
                    }
                }
            });
        });
        it('should return date granularity for relation date field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'createdAt',
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.MONTH,
                isNestedDateField: true,
                timeZone: userTimezone
            });
            expect(result).toEqual({
                company: {
                    createdAt: {
                        granularity: _types.ObjectRecordGroupByDateGranularity.MONTH,
                        timeZone: 'Europe/Paris'
                    }
                }
            });
        });
        it('should throw error for nested date field without time zone when required', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            expect(()=>(0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                    fieldMetadata,
                    subFieldName: 'createdAt',
                    dateGranularity: _types.ObjectRecordGroupByDateGranularity.DAY,
                    isNestedDateField: true
                })).toThrow('Date group by should have a time zone.');
        });
        it('should include weekStartDay for nested date field with WEEK granularity and MONDAY', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'createdAt',
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY,
                isNestedDateField: true,
                timeZone: userTimezone
            });
            expect(result).toEqual({
                company: {
                    createdAt: {
                        granularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                        weekStartDay: 'MONDAY',
                        timeZone: userTimezone
                    }
                }
            });
        });
        it('should include weekStartDay for nested date field with WEEK granularity and SUNDAY', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'createdAt',
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY,
                isNestedDateField: true,
                timeZone: userTimezone
            });
            expect(result).toEqual({
                company: {
                    createdAt: {
                        granularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                        weekStartDay: 'SUNDAY',
                        timeZone: userTimezone
                    }
                }
            });
        });
        it('should not include weekStartDay for nested date field with WEEK granularity and SYSTEM', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'createdAt',
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                firstDayOfTheWeek: _constants.CalendarStartDay.SYSTEM,
                isNestedDateField: true,
                timeZone: userTimezone
            });
            expect(result).toEqual({
                company: {
                    createdAt: {
                        granularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                        timeZone: userTimezone
                    }
                }
            });
        });
        it('should not include weekStartDay for nested date field with non-WEEK granularity', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                relationTargetObjectMetadataId: 'target-object-id'
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'createdAt',
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.MONTH,
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY,
                isNestedDateField: true,
                timeZone: userTimezone
            });
            expect(result).toEqual({
                company: {
                    createdAt: {
                        granularity: _types.ObjectRecordGroupByDateGranularity.MONTH,
                        timeZone: userTimezone
                    }
                }
            });
        });
    });
    describe('composite fields', ()=>{
        it('should return nested object for composite fields with subfield', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'name',
                type: _types.FieldMetadataType.FULL_NAME
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'firstName'
            });
            expect(result).toEqual({
                name: {
                    firstName: true
                }
            });
        });
        it('should throw error for composite field without subfield', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'name',
                type: _types.FieldMetadataType.FULL_NAME
            });
            expect(()=>(0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                    fieldMetadata
                })).toThrow('Composite field name requires a subfield to be specified');
        });
        it('should handle ADDRESS composite field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'address',
                type: _types.FieldMetadataType.ADDRESS
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                subFieldName: 'addressCity'
            });
            expect(result).toEqual({
                address: {
                    addressCity: true
                }
            });
        });
    });
    describe('date fields', ()=>{
        it('should return field with default granularity for DATE field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                timeZone: 'Europe/Paris'
            });
            expect(result).toEqual({
                createdAt: {
                    granularity: _types.ObjectRecordGroupByDateGranularity.DAY,
                    timeZone: 'Europe/Paris'
                }
            });
        });
        it('should return field with default granularity for DATE_TIME field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'updatedAt',
                type: _types.FieldMetadataType.DATE_TIME
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                timeZone: 'Europe/Paris'
            });
            expect(result).toEqual({
                updatedAt: {
                    granularity: _types.ObjectRecordGroupByDateGranularity.DAY,
                    timeZone: 'Europe/Paris'
                }
            });
        });
        it('should return field with custom granularity for date field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.MONTH,
                timeZone: 'Europe/Paris'
            });
            expect(result).toEqual({
                createdAt: {
                    granularity: _types.ObjectRecordGroupByDateGranularity.MONTH,
                    timeZone: 'Europe/Paris'
                }
            });
        });
        it('should throw error for date field without time zone when required', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            expect(()=>(0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                    fieldMetadata,
                    dateGranularity: _types.ObjectRecordGroupByDateGranularity.DAY
                })).toThrow('Date group by should have a time zone.');
        });
        it('should include weekStartDay for WEEK granularity with MONDAY', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY,
                timeZone: 'Europe/Paris'
            });
            expect(result).toEqual({
                createdAt: {
                    granularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                    weekStartDay: 'MONDAY',
                    timeZone: 'Europe/Paris'
                }
            });
        });
        it('should include weekStartDay for WEEK granularity with SUNDAY', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                firstDayOfTheWeek: _constants.CalendarStartDay.SUNDAY,
                timeZone: userTimezone
            });
            expect(result).toEqual({
                createdAt: {
                    granularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                    weekStartDay: 'SUNDAY',
                    timeZone: userTimezone
                }
            });
        });
        it('should not include weekStartDay for WEEK granularity with SYSTEM', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                firstDayOfTheWeek: _constants.CalendarStartDay.SYSTEM,
                timeZone: userTimezone
            });
            expect(result).toEqual({
                createdAt: {
                    granularity: _types.ObjectRecordGroupByDateGranularity.WEEK,
                    timeZone: userTimezone
                }
            });
        });
        it('should not include weekStartDay for non-WEEK granularity', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'createdAt',
                type: _types.FieldMetadataType.DATE
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata,
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.MONTH,
                firstDayOfTheWeek: _constants.CalendarStartDay.MONDAY,
                timeZone: userTimezone
            });
            expect(result).toEqual({
                createdAt: {
                    granularity: _types.ObjectRecordGroupByDateGranularity.MONTH,
                    timeZone: userTimezone
                }
            });
        });
    });
    describe('regular fields', ()=>{
        it('should return simple field object for TEXT field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'status',
                type: _types.FieldMetadataType.TEXT
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata
            });
            expect(result).toEqual({
                status: true
            });
        });
        it('should return simple field object for SELECT field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'priority',
                type: _types.FieldMetadataType.SELECT
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata
            });
            expect(result).toEqual({
                priority: true
            });
        });
        it('should return simple field object for NUMBER field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'quantity',
                type: _types.FieldMetadataType.NUMBER
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata
            });
            expect(result).toEqual({
                quantity: true
            });
        });
        it('should return simple field object for BOOLEAN field', ()=>{
            const fieldMetadata = createMockFieldMetadata({
                name: 'isActive',
                type: _types.FieldMetadataType.BOOLEAN
            });
            const result = (0, _buildgroupbyfieldobjectutil.buildGroupByFieldObject)({
                fieldMetadata
            });
            expect(result).toEqual({
                isActive: true
            });
        });
    });
});

//# sourceMappingURL=build-group-by-field-object.util.spec.js.map