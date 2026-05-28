"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getJobKey", {
    enumerable: true,
    get: function() {
        return getJobKey;
    }
});
const getJobKey = ({ jobName, jobId })=>{
    return `${jobName}${jobId ? `.${jobId}` : ''}`;
};

//# sourceMappingURL=get-job-key.util.js.map