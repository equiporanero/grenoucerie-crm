"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _computecompositefieldobjecttypekeyutil = require("../compute-composite-field-object-type-key.util");
describe('computeCompositeFieldObjectTypeKey', ()=>{
    it('should return the correct composite field object type key', ()=>{
        const fieldMetadataType = _types.FieldMetadataType.LINKS;
        const result = (0, _computecompositefieldobjecttypekeyutil.computeCompositeFieldObjectTypeKey)(fieldMetadataType);
        expect(result).toBe('Links');
    });
});

//# sourceMappingURL=compute-composite-field-object-type-key.util.spec.js.map