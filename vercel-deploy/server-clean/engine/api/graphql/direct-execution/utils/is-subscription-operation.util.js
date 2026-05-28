"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isSubscriptionOperation", {
    enumerable: true,
    get: function() {
        return isSubscriptionOperation;
    }
});
const _findoperationdefinitionutil = require("./find-operation-definition.util");
const isSubscriptionOperation = (document, operationName)=>{
    const operation = (0, _findoperationdefinitionutil.findOperationDefinition)(document, operationName);
    return operation?.operation === 'subscription';
};

//# sourceMappingURL=is-subscription-operation.util.js.map