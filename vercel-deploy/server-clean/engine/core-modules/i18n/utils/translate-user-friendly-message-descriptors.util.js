"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "translateUserFriendlyMessageDescriptors", {
    enumerable: true,
    get: function() {
        return translateUserFriendlyMessageDescriptors;
    }
});
const _guards = require("@sniptt/guards");
const USER_FRIENDLY_MESSAGE_KEY = 'userFriendlyMessage';
const isMessageDescriptor = (value)=>(0, _guards.isObject)(value) && 'id' in value && (0, _guards.isString)(value.id);
const translateValueRecursively = (value, i18n, parentKey)=>{
    if (parentKey === USER_FRIENDLY_MESSAGE_KEY && isMessageDescriptor(value)) {
        return i18n._(value);
    }
    if ((0, _guards.isArray)(value)) {
        return value.map((item)=>translateValueRecursively(item, i18n, parentKey));
    }
    if ((0, _guards.isObject)(value)) {
        return Object.fromEntries(Object.entries(value).map(([key, nestedValue])=>[
                key,
                translateValueRecursively(nestedValue, i18n, key)
            ]));
    }
    return value;
};
const translateUserFriendlyMessageDescriptors = (payload, i18n)=>translateValueRecursively(payload, i18n);

//# sourceMappingURL=translate-user-friendly-message-descriptors.util.js.map