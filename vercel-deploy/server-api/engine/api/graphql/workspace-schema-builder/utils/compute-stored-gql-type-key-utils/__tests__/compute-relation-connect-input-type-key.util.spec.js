"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _computerelationconnectinputtypekeyutil = require("../compute-relation-connect-input-type-key.util");
describe('computeRelationConnectInputTypeKey', ()=>{
    it('should return the correct relation connect input type key', ()=>{
        const objectMetadataNameId = '20202020-f401-4d8a-a731-64d007c27bad';
        const result = (0, _computerelationconnectinputtypekeyutil.computeRelationConnectInputTypeKey)(objectMetadataNameId);
        expect(result).toBe('20202020-f401-4d8a-a731-64d007c27bad-ConnectInput');
    });
});

//# sourceMappingURL=compute-relation-connect-input-type-key.util.spec.js.map