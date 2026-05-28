"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isGroupEmail", {
    enumerable: true,
    get: function() {
        return isGroupEmail;
    }
});
const isGroupEmail = (email)=>{
    const isGroupPattern = /noreply|no-reply|do_not_reply|no\.reply|^(info@|contact@|hello@|support@|feedback@|service@|help@|invites@|invite@|welcome@|alerts@|team@|notifications@|notification@|news@)/;
    return isGroupPattern.test(email);
};

//# sourceMappingURL=is-group-email.js.map