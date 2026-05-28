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
    get PAYMENT_RECEIVED_EVENT () {
        return PAYMENT_RECEIVED_EVENT;
    },
    get paymentReceivedSchema () {
        return paymentReceivedSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const PAYMENT_RECEIVED_EVENT = 'Payment Received';
const paymentReceivedSchema = _zod.z.strictObject({
    event: _zod.z.literal(PAYMENT_RECEIVED_EVENT),
    properties: _zod.z.strictObject({
        amountPaid: _zod.z.number()
    })
});
(0, _track.registerEvent)(PAYMENT_RECEIVED_EVENT, paymentReceivedSchema);

//# sourceMappingURL=payment-received.js.map