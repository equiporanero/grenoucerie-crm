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
    get CUSTOM_DOMAIN_DEACTIVATED_EVENT () {
        return CUSTOM_DOMAIN_DEACTIVATED_EVENT;
    },
    get customDomainDeactivatedSchema () {
        return customDomainDeactivatedSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const CUSTOM_DOMAIN_DEACTIVATED_EVENT = 'Custom Domain Deactivated';
const customDomainDeactivatedSchema = _zod.z.strictObject({
    event: _zod.z.literal(CUSTOM_DOMAIN_DEACTIVATED_EVENT),
    properties: _zod.z.strictObject({})
});
(0, _track.registerEvent)(CUSTOM_DOMAIN_DEACTIVATED_EVENT, customDomainDeactivatedSchema);

//# sourceMappingURL=custom-domain-deactivated.js.map