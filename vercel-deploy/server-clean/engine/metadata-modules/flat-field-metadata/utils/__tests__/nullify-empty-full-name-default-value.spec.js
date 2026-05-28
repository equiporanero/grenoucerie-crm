"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nullifyemptyfullnamedefaultvalueutil = require("../nullify-empty-full-name-default-value.util");
describe('nullifyEmptyFullNameDefaultValue', ()=>{
    it('returns null when both sub-fields are empty-string equivalents', ()=>{
        expect((0, _nullifyemptyfullnamedefaultvalueutil.nullifyEmptyFullNameDefaultValue)({
            firstName: "''",
            lastName: ''
        })).toBeNull();
    });
    it('returns normalized object when lastName has a value', ()=>{
        expect((0, _nullifyemptyfullnamedefaultvalueutil.nullifyEmptyFullNameDefaultValue)({
            firstName: "''",
            lastName: 'Doe'
        })).toEqual({
            firstName: null,
            lastName: 'Doe'
        });
    });
});

//# sourceMappingURL=nullify-empty-full-name-default-value.spec.js.map