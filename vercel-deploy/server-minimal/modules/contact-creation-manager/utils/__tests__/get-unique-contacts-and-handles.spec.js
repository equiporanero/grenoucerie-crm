"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getuniquecontactsandhandlesutil = require("../get-unique-contacts-and-handles.util");
describe('getUniqueContactsAndHandles', ()=>{
    it('should return empty arrays when contacts is empty', ()=>{
        const contacts = [];
        const result = (0, _getuniquecontactsandhandlesutil.getUniqueContactsAndHandles)(contacts);
        expect(result.uniqueContacts).toEqual([]);
        expect(result.uniqueHandles).toEqual([]);
    });
    it('should return unique contacts and handles', ()=>{
        const contacts = [
            {
                handle: 'john@twenty.com',
                displayName: 'John Doe'
            },
            {
                handle: 'john@twenty.com',
                displayName: 'John Doe'
            },
            {
                handle: 'jane@twenty.com',
                displayName: 'Jane Smith'
            },
            {
                handle: 'jane@twenty.com',
                displayName: 'Jane Smith'
            },
            {
                handle: 'jane@twenty.com',
                displayName: 'Jane Smith'
            }
        ];
        const result = (0, _getuniquecontactsandhandlesutil.getUniqueContactsAndHandles)(contacts);
        expect(result.uniqueContacts).toEqual([
            {
                handle: 'john@twenty.com',
                displayName: 'John Doe'
            },
            {
                handle: 'jane@twenty.com',
                displayName: 'Jane Smith'
            }
        ]);
        expect(result.uniqueHandles).toEqual([
            'john@twenty.com',
            'jane@twenty.com'
        ]);
    });
    it('should deduplicate handles when they are in different cases', ()=>{
        const contacts = [
            {
                handle: 'john@twenty.com',
                displayName: 'John Doe'
            },
            {
                handle: 'John@twenty.com',
                displayName: 'John Doe'
            }
        ];
        const result = (0, _getuniquecontactsandhandlesutil.getUniqueContactsAndHandles)(contacts);
        expect(result.uniqueContacts).toEqual([
            {
                handle: 'john@twenty.com',
                displayName: 'John Doe'
            }
        ]);
        expect(result.uniqueHandles).toEqual([
            'john@twenty.com'
        ]);
    });
});

//# sourceMappingURL=get-unique-contacts-and-handles.spec.js.map