"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hasPrimaryEmailChanged", {
    enumerable: true,
    get: function() {
        return hasPrimaryEmailChanged;
    }
});
const hasPrimaryEmailChanged = (diff)=>{
    const before = diff.emails?.before?.primaryEmail?.toLowerCase();
    const after = diff.emails?.after?.primaryEmail?.toLowerCase();
    return before !== after;
};

//# sourceMappingURL=has-primary-email-changed.js.map