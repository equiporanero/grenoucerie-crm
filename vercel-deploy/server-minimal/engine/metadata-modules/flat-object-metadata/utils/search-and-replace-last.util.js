"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "searchAndReplaceLast", {
    enumerable: true,
    get: function() {
        return searchAndReplaceLast;
    }
});
const searchAndReplaceLast = ({ replace, search, source })=>{
    const lastIndex = source.lastIndexOf(search);
    if (lastIndex === -1) return source;
    return source.slice(0, lastIndex) + replace + source.slice(lastIndex + search.length);
};

//# sourceMappingURL=search-and-replace-last.util.js.map