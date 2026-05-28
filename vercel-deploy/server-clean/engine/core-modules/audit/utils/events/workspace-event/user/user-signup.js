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
    get USER_SIGNUP_EVENT () {
        return USER_SIGNUP_EVENT;
    },
    get userSignupSchema () {
        return userSignupSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const USER_SIGNUP_EVENT = 'User Signup';
const userSignupSchema = _zod.z.strictObject({
    event: _zod.z.literal(USER_SIGNUP_EVENT),
    properties: _zod.z.strictObject({})
});
(0, _track.registerEvent)(USER_SIGNUP_EVENT, userSignupSchema);

//# sourceMappingURL=user-signup.js.map