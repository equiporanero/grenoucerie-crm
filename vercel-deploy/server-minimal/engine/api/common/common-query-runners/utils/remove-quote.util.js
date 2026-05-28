"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatColumnNameAsAlias", {
    enumerable: true,
    get: function() {
        return formatColumnNameAsAlias;
    }
});
const removeQuotes = (string)=>{
    return string.replace(/["']/g, '');
};
const formatColumnNameAsAlias = (columnNameWithQuotes)=>{
    return removeQuotes(columnNameWithQuotes).replace(/\./g, '_');
};

//# sourceMappingURL=remove-quote.util.js.map