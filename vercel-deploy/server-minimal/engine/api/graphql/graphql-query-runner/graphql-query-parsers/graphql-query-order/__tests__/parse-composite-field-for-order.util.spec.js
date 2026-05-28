"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _parsecompositefieldfororderutil = require("../utils/parse-composite-field-for-order.util");
describe('parseCompositeFieldForOrder', ()=>{
    describe('case-insensitive sorting for composite subfields', ()=>{
        it('should set useLower: true for TEXT subfields in FULL_NAME composite', ()=>{
            const fieldMetadata = {
                type: _types.FieldMetadataType.FULL_NAME,
                name: 'name'
            };
            const result = (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, {
                firstName: 'AscNullsFirst'
            }, 'person', true);
            expect(result).toEqual({
                'person.nameFirstName': {
                    order: 'ASC',
                    nulls: 'NULLS FIRST',
                    useLower: true,
                    castToText: false
                }
            });
        });
        it('should set useLower: true for TEXT subfields in LINKS composite', ()=>{
            const fieldMetadata = {
                type: _types.FieldMetadataType.LINKS,
                name: 'linkedinLink'
            };
            const result = (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, {
                primaryLinkLabel: 'DescNullsLast'
            }, 'company', true);
            expect(result).toEqual({
                'company.linkedinLinkPrimaryLinkLabel': {
                    order: 'DESC',
                    nulls: 'NULLS LAST',
                    useLower: true,
                    castToText: false
                }
            });
        });
        it('should set useLower: true for TEXT subfields in ADDRESS composite', ()=>{
            const fieldMetadata = {
                type: _types.FieldMetadataType.ADDRESS,
                name: 'address'
            };
            const result = (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, {
                addressCity: 'AscNullsLast'
            }, 'company', true);
            expect(result).toEqual({
                'company.addressAddressCity': {
                    order: 'ASC',
                    nulls: 'NULLS LAST',
                    useLower: true,
                    castToText: false
                }
            });
        });
    });
    describe('case-sensitive sorting for non-text composite subfields', ()=>{
        it('should set useLower: false for non-TEXT subfields in CURRENCY composite', ()=>{
            const fieldMetadata = {
                type: _types.FieldMetadataType.CURRENCY,
                name: 'annualRevenue'
            };
            const result = (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, {
                amountMicros: 'DescNullsFirst'
            }, 'company', true);
            expect(result).toEqual({
                'company.annualRevenueAmountMicros': {
                    order: 'DESC',
                    nulls: 'NULLS FIRST',
                    useLower: false,
                    castToText: false
                }
            });
        });
        it('should set useLower: false for non-TEXT subfields in ADDRESS lat/lng', ()=>{
            const fieldMetadata = {
                type: _types.FieldMetadataType.ADDRESS,
                name: 'address'
            };
            const result = (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, {
                addressLat: 'AscNullsFirst'
            }, 'company', true);
            expect(result).toEqual({
                'company.addressAddressLat': {
                    order: 'ASC',
                    nulls: 'NULLS FIRST',
                    useLower: false,
                    castToText: false
                }
            });
        });
    });
    describe('pagination direction handling', ()=>{
        it('should reverse order direction for backward pagination', ()=>{
            const fieldMetadata = {
                type: _types.FieldMetadataType.FULL_NAME,
                name: 'name'
            };
            const result = (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, {
                firstName: 'AscNullsFirst'
            }, 'person', false);
            expect(result).toEqual({
                'person.nameFirstName': {
                    order: 'DESC',
                    nulls: 'NULLS FIRST',
                    useLower: true,
                    castToText: false
                }
            });
        });
    });
    describe('error handling', ()=>{
        it('should throw error for invalid subfield name', ()=>{
            const fieldMetadata = {
                type: _types.FieldMetadataType.FULL_NAME,
                name: 'name'
            };
            expect(()=>(0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, {
                    invalidSubField: 'AscNullsFirst'
                }, 'person', true)).toThrow('Sub field metadata not found');
        });
        it('should throw error for invalid order direction', ()=>{
            const fieldMetadata = {
                type: _types.FieldMetadataType.FULL_NAME,
                name: 'name'
            };
            expect(()=>(0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, {
                    firstName: 'InvalidDirection'
                }, 'person', true)).toThrow('Sub field order by value must be of type OrderByDirection');
        });
    });
});

//# sourceMappingURL=parse-composite-field-for-order.util.spec.js.map