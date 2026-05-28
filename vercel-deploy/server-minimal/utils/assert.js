"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get assert () {
        return assert;
    },
    get assertNever () {
        return assertNever;
    }
});
const assert = (condition, message, ErrorType)=>{
    if (!condition) {
        if (ErrorType) {
            if (message) {
                throw new ErrorType(message);
            }
            throw new ErrorType();
        }
        throw new Error(message);
    }
};
const assertNever = (_value, message)=>{
    throw new Error(message ?? "Didn't expect to get here.");
};

//# sourceMappingURL=assert.js.map