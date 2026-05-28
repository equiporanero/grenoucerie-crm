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
    get getCacheProviderOptions () {
        return getCacheProviderOptions;
    },
    get getCallLevelCacheProviderOptions () {
        return getCallLevelCacheProviderOptions;
    },
    get injectCacheBreakpoint () {
        return injectCacheBreakpoint;
    }
});
const _aisdkpackageconst = require("../../ai-models/constants/ai-sdk-package.const");
const getCallLevelCacheProviderOptions = (sdkPackage)=>{
    if (sdkPackage === _aisdkpackageconst.AI_SDK_ANTHROPIC) {
        return {
            anthropic: {
                cacheControl: {
                    type: 'ephemeral'
                }
            }
        };
    }
    return undefined;
};
const getCacheProviderOptions = (sdkPackage)=>{
    if (sdkPackage === _aisdkpackageconst.AI_SDK_BEDROCK) {
        return {
            bedrock: {
                cachePoint: {
                    type: 'default'
                }
            }
        };
    }
    return undefined;
};
const injectCacheBreakpoint = (messages, sdkPackage)=>{
    if (messages.length === 0) return messages;
    const cacheOptions = getCacheProviderOptions(sdkPackage);
    if (!cacheOptions) return messages;
    const lastIdx = messages.length - 1;
    return messages.map((message, index)=>{
        if (index !== lastIdx) return message;
        return {
            ...message,
            providerOptions: {
                ...message.providerOptions ?? {},
                ...cacheOptions
            }
        };
    });
};

//# sourceMappingURL=inject-cache-breakpoint.util.js.map