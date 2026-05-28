"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _graphorderbyenum = require("../../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _maporderbytodirectionutil = require("../map-order-by-to-direction.util");
describe('mapOrderByToDirection', ()=>{
    describe('FIELD_ASC', ()=>{
        it('should return AscNullsLast', ()=>{
            const result = (0, _maporderbytodirectionutil.mapOrderByToDirection)(_graphorderbyenum.GraphOrderBy.FIELD_ASC);
            expect(result).toBe(_types.OrderByDirection.AscNullsLast);
        });
    });
    describe('FIELD_DESC', ()=>{
        it('should return DescNullsLast', ()=>{
            const result = (0, _maporderbytodirectionutil.mapOrderByToDirection)(_graphorderbyenum.GraphOrderBy.FIELD_DESC);
            expect(result).toBe(_types.OrderByDirection.DescNullsLast);
        });
    });
    describe('VALUE_ASC', ()=>{
        it('should return AscNullsLast', ()=>{
            const result = (0, _maporderbytodirectionutil.mapOrderByToDirection)(_graphorderbyenum.GraphOrderBy.VALUE_ASC);
            expect(result).toBe(_types.OrderByDirection.AscNullsLast);
        });
    });
    describe('VALUE_DESC', ()=>{
        it('should return DescNullsLast', ()=>{
            const result = (0, _maporderbytodirectionutil.mapOrderByToDirection)(_graphorderbyenum.GraphOrderBy.VALUE_DESC);
            expect(result).toBe(_types.OrderByDirection.DescNullsLast);
        });
    });
    describe('consistency', ()=>{
        it('should map all ASC orders to AscNullsLast', ()=>{
            expect((0, _maporderbytodirectionutil.mapOrderByToDirection)(_graphorderbyenum.GraphOrderBy.FIELD_ASC)).toBe(_types.OrderByDirection.AscNullsLast);
            expect((0, _maporderbytodirectionutil.mapOrderByToDirection)(_graphorderbyenum.GraphOrderBy.VALUE_ASC)).toBe(_types.OrderByDirection.AscNullsLast);
        });
        it('should map all DESC orders to DescNullsLast', ()=>{
            expect((0, _maporderbytodirectionutil.mapOrderByToDirection)(_graphorderbyenum.GraphOrderBy.FIELD_DESC)).toBe(_types.OrderByDirection.DescNullsLast);
            expect((0, _maporderbytodirectionutil.mapOrderByToDirection)(_graphorderbyenum.GraphOrderBy.VALUE_DESC)).toBe(_types.OrderByDirection.DescNullsLast);
        });
    });
});

//# sourceMappingURL=map-order-by-to-direction.util.spec.js.map