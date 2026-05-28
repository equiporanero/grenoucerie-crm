"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findPersonByPrimaryOrAdditionalEmail", {
    enumerable: true,
    get: function() {
        return findPersonByPrimaryOrAdditionalEmail;
    }
});
const findPersonByPrimaryOrAdditionalEmail = ({ people, email })=>{
    const lowercaseEmail = email.toLowerCase();
    const personWithPrimaryEmail = people.find((person)=>person.emails?.primaryEmail?.toLowerCase() === lowercaseEmail);
    if (personWithPrimaryEmail) {
        return personWithPrimaryEmail;
    }
    const personWithAdditionalEmail = people.find((person)=>{
        const additionalEmails = person.emails?.additionalEmails;
        if (!Array.isArray(additionalEmails)) {
            return false;
        }
        return additionalEmails.some((additionalEmail)=>additionalEmail.toLowerCase() === lowercaseEmail);
    });
    return personWithAdditionalEmail;
};

//# sourceMappingURL=find-person-by-primary-or-additional-email.js.map