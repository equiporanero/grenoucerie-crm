// oxlint-disable-next-line @typescripttypescript/no-explicit-any
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "stringifyWithoutKeyQuote", {
    enumerable: true,
    get: function() {
        return stringifyWithoutKeyQuote;
    }
});
const stringifyWithoutKeyQuote = (obj)=>{
    const jsonString = JSON.stringify(obj);
    const jsonWithoutQuotes = jsonString?.replace(/"(\w+)"\s*:/g, '$1:');
    return jsonWithoutQuotes;
};

//# sourceMappingURL=stringify-without-key-quote.util.js.map