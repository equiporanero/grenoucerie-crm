"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterOutInternals", {
    enumerable: true,
    get: function() {
        return filterOutInternals;
    }
});
const _utils = require("twenty-shared/utils");
const _getdomainnamebyemail = require("../../../../utils/get-domain-name-by-email");
const filterOutInternals = (primaryHandle, messages)=>{
    return messages.filter((message)=>{
        if (!message.participants) {
            return true;
        }
        const primaryHandleDomain = (0, _getdomainnamebyemail.getDomainNameByEmail)(primaryHandle);
        try {
            const isAllHandlesFromSameDomain = message.participants.filter((participant)=>(0, _utils.isDefined)(participant.handle)).every((participant)=>(0, _utils.isDefined)(participant.handle) && (0, _getdomainnamebyemail.getDomainNameByEmail)(participant.handle) === primaryHandleDomain);
            if (isAllHandlesFromSameDomain) {
                return false;
            }
        } catch  {
            return true;
        }
        return true;
    });
};

//# sourceMappingURL=filter-out-internals.util.js.map