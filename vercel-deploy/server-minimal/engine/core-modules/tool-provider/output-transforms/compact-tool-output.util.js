"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "compactToolOutput", {
    enumerable: true,
    get: function() {
        return compactToolOutput;
    }
});
const _stripemptyvaluesutil = require("./strip-empty-values.util");
const compactToolOutput = (output)=>{
    if (!output || typeof output !== 'object') {
        return output;
    }
    return (0, _stripemptyvaluesutil.stripEmptyValues)(output);
};

//# sourceMappingURL=compact-tool-output.util.js.map