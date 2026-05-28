"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDryRunLogHeader", {
    enumerable: true,
    get: function() {
        return getDryRunLogHeader;
    }
});
const getDryRunLogHeader = (isDryRun)=>{
    return isDryRun ? 'Dry-run mode: ' : '';
};

//# sourceMappingURL=get-dry-run-log-header.js.map