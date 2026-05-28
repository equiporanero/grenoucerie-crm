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
    get CUSTOM_DOMAIN_ACTIVATED_EVENT () {
        return CUSTOM_DOMAIN_ACTIVATED_EVENT;
    },
    get customDomainActivatedSchema () {
        return customDomainActivatedSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const CUSTOM_DOMAIN_ACTIVATED_EVENT = 'Custom Domain Activated';
const customDomainActivatedSchema = _zod.z.strictObject({
    event: _zod.z.literal(CUSTOM_DOMAIN_ACTIVATED_EVENT),
    properties: _zod.z.strictObject({})
});
(0, _track.registerEvent)(CUSTOM_DOMAIN_ACTIVATED_EVENT, customDomainActivatedSchema);

//# sourceMappingURL=custom-domain-activated.js.map