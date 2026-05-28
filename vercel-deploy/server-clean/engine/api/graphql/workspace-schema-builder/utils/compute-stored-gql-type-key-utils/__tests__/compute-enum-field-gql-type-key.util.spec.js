"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _computeenumfieldgqltypekeyutil = require("../compute-enum-field-gql-type-key.util");
describe('computeEnumFieldGqlTypeKey', ()=>{
    it('should compute the correct key', ()=>{
        expect((0, _computeenumfieldgqltypekeyutil.computeEnumFieldGqlTypeKey)('User', 'role')).toBe('UserRoleEnum');
    });
});

//# sourceMappingURL=compute-enum-field-gql-type-key.util.spec.js.map