"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SentryCronMonitor", {
    enumerable: true,
    get: function() {
        return SentryCronMonitor;
    }
});
const _node = /*#__PURE__*/ _interop_require_wildcard(require("@sentry/node"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function SentryCronMonitor(monitorSlug, schedule) {
    return function(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    _target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        descriptor.value = async function(...args) {
            if (!_node.isInitialized()) {
                return await originalMethod.apply(this, args);
            }
            let checkInId;
            try {
                checkInId = _node.captureCheckIn({
                    monitorSlug,
                    status: 'in_progress'
                }, {
                    schedule: {
                        type: 'crontab',
                        value: schedule
                    },
                    checkinMargin: 1,
                    maxRuntime: 5,
                    timezone: 'UTC'
                });
                const result = await originalMethod.apply(this, args);
                _node.captureCheckIn({
                    checkInId,
                    monitorSlug,
                    status: 'ok'
                });
                return result;
            } catch (error) {
                _node.captureCheckIn({
                    checkInId,
                    monitorSlug,
                    status: 'error'
                });
                throw error;
            }
        };
        return descriptor;
    };
}

//# sourceMappingURL=sentry-cron-monitor.decorator.js.map