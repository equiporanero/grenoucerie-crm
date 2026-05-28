"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterOutContactsThatBelongToSelfOrWorkspaceMembers", {
    enumerable: true,
    get: function() {
        return filterOutContactsThatBelongToSelfOrWorkspaceMembers;
    }
});
const _utils = require("twenty-shared/utils");
const _getdomainnamefromhandleutil = require("./get-domain-name-from-handle.util");
const _isworkemail = require("../../../utils/is-work-email");
function filterOutContactsThatBelongToSelfOrWorkspaceMembers(contacts, connectedAccount, workspaceMembers, isInternalMessagesImportEnabled = false) {
    if (!(0, _utils.isDefined)(connectedAccount.handle)) {
        throw new Error('Connected account handle is missing');
    }
    const selfDomainName = (0, _getdomainnamefromhandleutil.getDomainNameFromHandle)(connectedAccount.handle).toLowerCase();
    const allHandles = [
        connectedAccount.handle.toLowerCase(),
        ...(connectedAccount.handleAliases || []).map((handle)=>handle.toLowerCase())
    ];
    const workspaceMembersMap = workspaceMembers.reduce((map, workspaceMember)=>{
        // @ts-expect-error legacy noImplicitAny
        map[workspaceMember.userEmail.toLowerCase()] = true;
        return map;
    }, new Map());
    const isDifferentDomain = (contact, selfDomainName)=>(0, _getdomainnamefromhandleutil.getDomainNameFromHandle)(contact.handle).toLowerCase() !== selfDomainName;
    return contacts.filter((contact)=>(isDifferentDomain(contact, selfDomainName) || !(0, _isworkemail.isWorkDomain)(selfDomainName) || isInternalMessagesImportEnabled) && // @ts-expect-error legacy noImplicitAny
        !workspaceMembersMap[contact.handle.toLowerCase()] && !allHandles.includes(contact.handle.toLowerCase()));
}

//# sourceMappingURL=filter-out-contacts-that-belong-to-self-or-workspace-members.util.js.map