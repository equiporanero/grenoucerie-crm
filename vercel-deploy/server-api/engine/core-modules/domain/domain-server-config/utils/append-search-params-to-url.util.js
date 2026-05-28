"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "appendSearchParamsToUrl", {
    enumerable: true,
    get: function() {
        return appendSearchParamsToUrl;
    }
});
const appendSearchParamsToUrl = (url, searchParams)=>{
    Object.entries(searchParams).forEach(([key, value])=>{
        url.searchParams.set(key, value.toString());
    });
};

//# sourceMappingURL=append-search-params-to-url.util.js.map