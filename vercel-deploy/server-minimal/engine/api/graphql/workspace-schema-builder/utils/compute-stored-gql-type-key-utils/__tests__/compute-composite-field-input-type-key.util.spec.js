"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _computecompositefieldinputtypekeyutil = require("../compute-composite-field-input-type-key.util");
describe('computeCompositeFieldInputTypeKey', ()=>{
    it('should compute the correct key for FULL_NAME field', ()=>{
        expect((0, _computecompositefieldinputtypekeyutil.computeCompositeFieldInputTypeKey)(_types.FieldMetadataType.FULL_NAME, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Create)).toBe('FullNameCreateInput');
    });
});

//# sourceMappingURL=compute-composite-field-input-type-key.util.spec.js.map