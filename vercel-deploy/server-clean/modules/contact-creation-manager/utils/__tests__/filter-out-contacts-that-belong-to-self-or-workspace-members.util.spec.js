"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _filteroutcontactsthatbelongtoselforworkspacemembersutil = require("../filter-out-contacts-that-belong-to-self-or-workspace-members.util");
const account = (handle, handleAliases = [])=>({
        handle,
        handleAliases
    });
const contact = (handle)=>({
        handle,
        displayName: handle
    });
describe('filterOutContactsThatBelongToSelfOrWorkspaceMembers', ()=>{
    it('drops same-domain contacts by default for work domains', ()=>{
        const contacts = [
            contact('alice@acme.com'),
            contact('bob@other.com')
        ];
        const result = (0, _filteroutcontactsthatbelongtoselforworkspacemembersutil.filterOutContactsThatBelongToSelfOrWorkspaceMembers)(contacts, account('me@acme.com'), []);
        expect(result).toEqual([
            contact('bob@other.com')
        ]);
    });
    it('keeps same-domain contacts when isInternalMessagesImportEnabled is true', ()=>{
        const contacts = [
            contact('alice@acme.com'),
            contact('bob@other.com')
        ];
        const result = (0, _filteroutcontactsthatbelongtoselforworkspacemembersutil.filterOutContactsThatBelongToSelfOrWorkspaceMembers)(contacts, account('me@acme.com'), [], true);
        expect(result).toEqual(contacts);
    });
    it('still drops workspace members and self even when flag is true', ()=>{
        const contacts = [
            contact('alice@acme.com'),
            contact('me@acme.com'),
            contact('member@acme.com')
        ];
        const workspaceMembers = [
            {
                userEmail: 'member@acme.com'
            }
        ];
        const result = (0, _filteroutcontactsthatbelongtoselforworkspacemembersutil.filterOutContactsThatBelongToSelfOrWorkspaceMembers)(contacts, account('me@acme.com'), workspaceMembers, true);
        expect(result).toEqual([
            contact('alice@acme.com')
        ]);
    });
});

//# sourceMappingURL=filter-out-contacts-that-belong-to-self-or-workspace-members.util.spec.js.map