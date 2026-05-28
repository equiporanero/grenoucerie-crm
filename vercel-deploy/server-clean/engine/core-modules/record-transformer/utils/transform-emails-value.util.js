"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformEmailsValue", {
    enumerable: true,
    get: function() {
        return transformEmailsValue;
    }
});
const _guards = require("@sniptt/guards");
const _classvalidator = require("class-validator");
const transformEmailsValue = (// oxlint-disable-next-line @typescripttypescript/no-explicit-any
value)=>{
    if (!(0, _classvalidator.isDefined)(value)) {
        return value;
    }
    let additionalEmails = value?.additionalEmails;
    const primaryEmail = (0, _guards.isNonEmptyString)(value?.primaryEmail) ? value.primaryEmail.toLowerCase() : null;
    if (additionalEmails) {
        try {
            const emailArray = (0, _guards.isNonEmptyString)(additionalEmails) ? JSON.parse(additionalEmails) : additionalEmails;
            additionalEmails = (0, _guards.isNonEmptyArray)(emailArray) ? JSON.stringify(emailArray.map((email)=>email.toLowerCase())) : null;
        } catch  {
        /* empty */ }
    }
    return {
        primaryEmail,
        additionalEmails
    };
};

//# sourceMappingURL=transform-emails-value.util.js.map