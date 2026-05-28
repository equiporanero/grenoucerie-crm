"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _formataddressobjectasparticipantsutil = require("../format-address-object-as-participants.util");
describe('formatAddressObjectAsParticipants', ()=>{
    it('should format address object as participants', ()=>{
        const addresses = [
            {
                name: 'John Doe',
                address: 'john.doe @example.com'
            },
            {
                name: 'Jane Smith',
                address: 'jane.smith@example.com '
            }
        ];
        const result = (0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)(addresses, _types.MessageParticipantRole.FROM);
        expect(result).toEqual([
            {
                role: _types.MessageParticipantRole.FROM,
                handle: 'john.doe@example.com',
                displayName: 'John Doe'
            },
            {
                role: _types.MessageParticipantRole.FROM,
                handle: 'jane.smith@example.com',
                displayName: 'Jane Smith'
            }
        ]);
    });
    it('should return an empty array if address object handle has no @', ()=>{
        const addressObject = {
            name: 'John Doe',
            address: 'john.doe'
        };
        const result = (0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)([
            addressObject
        ], _types.MessageParticipantRole.TO);
        expect(result).toEqual([]);
    });
    it('should return an empty array if address object handle is empty', ()=>{
        const addressObject = {
            name: 'John Doe',
            address: ''
        };
        const result = (0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)([
            addressObject
        ], _types.MessageParticipantRole.TO);
        expect(result).toEqual([]);
    });
    it('should return a lowewrcase handle if the handle is not lowercase', ()=>{
        const addressObject = {
            name: 'John Doe',
            address: 'John.Doe@example.com'
        };
        const result = (0, _formataddressobjectasparticipantsutil.formatAddressObjectAsParticipants)([
            addressObject
        ], _types.MessageParticipantRole.TO);
        expect(result).toEqual([
            {
                role: _types.MessageParticipantRole.TO,
                handle: 'john.doe@example.com',
                displayName: 'John Doe'
            }
        ]);
    });
});

//# sourceMappingURL=format-address-object-as-participants.util.spec.js.map