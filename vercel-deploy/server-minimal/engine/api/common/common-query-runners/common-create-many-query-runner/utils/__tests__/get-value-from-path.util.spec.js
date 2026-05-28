"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getvaluefrompathutil = require("../get-value-from-path.util");
describe('getValueFromPath', ()=>{
    const baseRecord = {
        id: 'recordId',
        name: 'John Doe',
        parent: {
            child: 'nested-value',
            empty: ''
        },
        emailsField: {
            primaryEmail: 'john@example.com'
        }
    };
    it('returns direct field value for single-level path', ()=>{
        const value = (0, _getvaluefrompathutil.getValueFromPath)(baseRecord, 'name');
        expect(value).toBe('John Doe');
    });
    it('returns nested value for two-level path', ()=>{
        const value = (0, _getvaluefrompathutil.getValueFromPath)(baseRecord, 'parent.child');
        expect(value).toBe('nested-value');
    });
    it('returns undefined when parent field does not exist', ()=>{
        const value = (0, _getvaluefrompathutil.getValueFromPath)(baseRecord, 'missing.child');
        expect(value).toBeUndefined();
    });
    it('returns undefined when child field does not exist on existing parent', ()=>{
        const value = (0, _getvaluefrompathutil.getValueFromPath)(baseRecord, 'parent.missing');
        expect(value).toBeUndefined();
    });
});

//# sourceMappingURL=get-value-from-path.util.spec.js.map