"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "wrapAsyncIteratorWithLifecycle", {
    enumerable: true,
    get: function() {
        return wrapAsyncIteratorWithLifecycle;
    }
});
const _utils = require("twenty-shared/utils");
function wrapAsyncIteratorWithLifecycle(iterator, options) {
    const { initialValue, onHeartbeat, heartbeatIntervalMs, onCleanup } = options;
    let heartbeatInterval = null;
    let hasYieldedInitialValue = false;
    const startHeartbeat = ()=>{
        if (onHeartbeat && heartbeatIntervalMs) {
            heartbeatInterval = setInterval(()=>{
                try {
                    void onHeartbeat().catch(()=>{});
                } catch  {
                // Heartbeat failure shouldn't crash the stream
                }
            }, heartbeatIntervalMs);
        }
    };
    const cleanup = async ()=>{
        if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = null;
        }
        if (onCleanup) {
            await onCleanup();
        }
    };
    return {
        next: async ()=>{
            if (!(0, _utils.isDefined)(heartbeatInterval)) {
                startHeartbeat();
            }
            if ((0, _utils.isDefined)(initialValue) && !hasYieldedInitialValue) {
                hasYieldedInitialValue = true;
                return {
                    done: false,
                    value: initialValue
                };
            }
            let result;
            try {
                result = await iterator.next();
            } catch (error) {
                await cleanup();
                throw error;
            }
            if (result.done) {
                await cleanup();
            }
            return result;
        },
        return: async ()=>{
            let result;
            try {
                await cleanup();
            } finally{
                result = await iterator.return?.() ?? {
                    done: true,
                    value: undefined
                };
            }
            return result;
        },
        throw: async (error)=>{
            await cleanup();
            if (iterator.throw) {
                return iterator.throw(error);
            }
            throw error;
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    };
}

//# sourceMappingURL=wrap-async-iterator-with-lifecycle.js.map