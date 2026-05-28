"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _computeobjectmetadatainputtypeutil = require("../compute-object-metadata-input-type.util");
describe('computeObjectMetadataInputTypeKey', ()=>{
    it('should compute the correct key for user object with Create kind', ()=>{
        expect((0, _computeobjectmetadatainputtypeutil.computeObjectMetadataInputTypeKey)('user', _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Create)).toBe('UserCreateInput');
    });
});

//# sourceMappingURL=compute-object-metadata-input-type.util.spec.js.map