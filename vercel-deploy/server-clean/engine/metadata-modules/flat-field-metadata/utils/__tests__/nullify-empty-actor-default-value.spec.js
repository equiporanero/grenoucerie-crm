"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nullifyemptyactordefaultvalueutil = require("../nullify-empty-actor-default-value.util");
describe('nullifyEmptyActorDefaultValue', ()=>{
    it('returns null when all sub-fields are null or empty-string equivalents', ()=>{
        expect((0, _nullifyemptyactordefaultvalueutil.nullifyEmptyActorDefaultValue)({
            source: null,
            workspaceMemberId: null,
            name: "''",
            context: null
        })).toBeNull();
    });
    it('returns normalized object when source has a value', ()=>{
        expect((0, _nullifyemptyactordefaultvalueutil.nullifyEmptyActorDefaultValue)({
            source: 'MANUAL',
            workspaceMemberId: null,
            name: "''",
            context: null
        })).toEqual({
            source: 'MANUAL',
            workspaceMemberId: null,
            name: null,
            context: null
        });
    });
});

//# sourceMappingURL=nullify-empty-actor-default-value.spec.js.map