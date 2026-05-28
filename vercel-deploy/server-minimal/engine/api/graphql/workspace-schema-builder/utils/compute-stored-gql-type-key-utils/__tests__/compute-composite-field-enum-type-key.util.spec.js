"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _computecompositefieldenumtypekeyutil = require("../compute-composite-field-enum-type-key.util");
describe('computeCompositeFieldEnumTypeKey', ()=>{
    it('should compute the correct key', ()=>{
        expect((0, _computecompositefieldenumtypekeyutil.computeCompositeFieldEnumTypeKey)('Actor', 'source')).toBe('ActorSourceEnum');
    });
});

//# sourceMappingURL=compute-composite-field-enum-type-key.util.spec.js.map