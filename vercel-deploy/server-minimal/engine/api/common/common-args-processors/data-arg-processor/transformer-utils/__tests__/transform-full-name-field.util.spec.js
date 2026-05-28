"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformfullnamefieldutil = require("../transform-full-name-field.util");
describe('transformFullNameField', ()=>{
    it('should return null when value is null', ()=>{
        const result = (0, _transformfullnamefieldutil.transformFullNameField)(null);
        expect(result).toBeNull();
    });
    it('should return full name object with both fields', ()=>{
        const value = {
            firstName: 'John',
            lastName: 'Doe'
        };
        const result = (0, _transformfullnamefieldutil.transformFullNameField)(value);
        expect(result).toEqual({
            firstName: 'John',
            lastName: 'Doe'
        });
    });
    it('should return full name object with only lastName', ()=>{
        const value = {
            lastName: ''
        };
        const result = (0, _transformfullnamefieldutil.transformFullNameField)(value);
        expect(result).toEqual({
            lastName: null
        });
    });
});

//# sourceMappingURL=transform-full-name-field.util.spec.js.map