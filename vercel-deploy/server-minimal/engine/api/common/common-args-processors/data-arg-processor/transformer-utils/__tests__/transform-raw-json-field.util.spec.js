"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformrawjsonfieldutil = require("../transform-raw-json-field.util");
describe('transformRawJsonField', ()=>{
    it('should return null when value is null', ()=>{
        const result = (0, _transformrawjsonfieldutil.transformRawJsonField)(null);
        expect(result).toBeNull();
    });
    it('should return null when value is empty object', ()=>{
        const result = (0, _transformrawjsonfieldutil.transformRawJsonField)({});
        expect(result).toBeNull();
    });
    it('should return the string when value is empty array', ()=>{
        const result = (0, _transformrawjsonfieldutil.transformRawJsonField)([]);
        expect(result).toBeNull();
    });
});

//# sourceMappingURL=transform-raw-json-field.util.spec.js.map