"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _objecttypedefinitionkindenum = require("../../../enums/object-type-definition-kind.enum");
const _computeobjectmetadataobjecttypekeyutil = require("../compute-object-metadata-object-type-key.util");
describe('computeObjectMetadataObjectTypeKey', ()=>{
    it('should compute the correct key for user object with Plain kind', ()=>{
        expect((0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)('user', _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain)).toBe('User');
    });
});

//# sourceMappingURL=compute-object-metadata-object-type-key.util.spec.js.map