"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _generatenullable = require("../generate-nullable");
describe('generateNullable', ()=>{
    it('should should return true if no input is given', ()=>{
        expect((0, _generatenullable.generateNullable)()).toEqual(true);
    });
    it('should should return the input value if the input value is given', ()=>{
        expect((0, _generatenullable.generateNullable)(true)).toEqual(true);
        expect((0, _generatenullable.generateNullable)(false)).toEqual(false);
    });
});

//# sourceMappingURL=generate-nullable.spec.js.map