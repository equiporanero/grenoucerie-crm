"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeChangedAdditionalEmails", {
    enumerable: true,
    get: function() {
        return computeChangedAdditionalEmails;
    }
});
const computeChangedAdditionalEmails = (diff)=>{
    const before = diff.emails?.before?.additionalEmails;
    const after = diff.emails?.after?.additionalEmails;
    if (!Array.isArray(before) || !Array.isArray(after)) {
        return {
            addedAdditionalEmails: [],
            removedAdditionalEmails: []
        };
    }
    const lowerCaseBefore = before.map((email)=>email.toLowerCase());
    const lowerCaseAfter = after.map((email)=>email.toLowerCase());
    const addedAdditionalEmails = lowerCaseAfter.filter((email)=>!lowerCaseBefore.includes(email));
    const removedAdditionalEmails = lowerCaseBefore.filter((email)=>!lowerCaseAfter.includes(email));
    return {
        addedAdditionalEmails,
        removedAdditionalEmails
    };
};

//# sourceMappingURL=compute-changed-additional-emails.js.map