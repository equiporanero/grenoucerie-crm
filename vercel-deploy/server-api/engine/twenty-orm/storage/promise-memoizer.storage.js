"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PromiseMemoizer", {
    enumerable: true,
    get: function() {
        return PromiseMemoizer;
    }
});
const _utils = require("twenty-shared/utils");
const ONE_HOUR_IN_MS = 3600_000;
let PromiseMemoizer = class PromiseMemoizer {
    async memoizePromiseAndExecute(cacheKey, factory, onDelete) {
        await this.clearExpiredKeys(onDelete);
        const cachedEntry = this.cache.get(cacheKey);
        if (cachedEntry) {
            cachedEntry.lastUsed = Date.now();
            return cachedEntry.value;
        }
        const existingPromise = this.pending.get(cacheKey);
        if (existingPromise) {
            return existingPromise;
        }
        const newPromise = (async ()=>{
            try {
                const value = await factory();
                if (value) {
                    this.cache.set(cacheKey, {
                        value,
                        lastUsed: Date.now()
                    });
                }
                return value;
            } finally{
                this.pending.delete(cacheKey);
            }
        })();
        this.pending.set(cacheKey, newPromise);
        return newPromise;
    }
    async clearExpiredKeys(onDelete) {
        const now = Date.now();
        for (const [cacheKey, cachedEntry] of this.cache.entries()){
            if (cachedEntry.lastUsed < now - this.ttlMs) {
                await this.clearKey(cacheKey, onDelete);
            }
        }
    }
    async clearKey(cacheKey, onDelete) {
        const cachedValue = this.cache.get(cacheKey);
        if ((0, _utils.isDefined)(cachedValue)) {
            await onDelete?.(cachedValue.value);
        }
        this.cache.delete(cacheKey);
    }
    async clearKeys(cacheKeyPrefix, onDelete) {
        for (const cacheKey of [
            ...this.cache.keys()
        ]){
            if (cacheKey.startsWith(cacheKeyPrefix)) {
                await this.clearKey(cacheKey, onDelete);
            }
        }
        for (const cacheKey of [
            ...this.pending.keys()
        ]){
            if (cacheKey.startsWith(cacheKeyPrefix)) {
                this.pending.delete(cacheKey);
            }
        }
    }
    async clearAll(onDelete) {
        for (const [, entry] of this.cache.entries()){
            await onDelete?.(entry.value);
        }
        this.cache.clear();
    }
    constructor(ttlMs = ONE_HOUR_IN_MS){
        this.cache = new Map();
        this.pending = new Map();
        this.ttlMs = ttlMs;
    }
};

//# sourceMappingURL=promise-memoizer.storage.js.map