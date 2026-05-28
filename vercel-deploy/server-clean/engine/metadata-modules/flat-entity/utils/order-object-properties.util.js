"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "orderObjectProperties", {
    enumerable: true,
    get: function() {
        return orderObjectProperties;
    }
});
function orderObjectProperties(data) {
    if (Array.isArray(data)) {
        return data.map(orderObjectProperties);
    }
    if (data !== null && typeof data === 'object') {
        return Object.fromEntries(Object.entries(data).sort().map(([key, value])=>[
                key,
                orderObjectProperties(value)
            ]));
    }
    return data;
}

//# sourceMappingURL=order-object-properties.util.js.map