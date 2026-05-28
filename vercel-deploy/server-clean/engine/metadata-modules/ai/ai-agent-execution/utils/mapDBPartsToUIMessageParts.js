"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mapDBPartsToUIMessageParts", {
    enumerable: true,
    get: function() {
        return mapDBPartsToUIMessageParts;
    }
});
const _mapDBPartToUIMessagePart = require("./mapDBPartToUIMessagePart");
const mapDBPartsToUIMessageParts = (parts)=>{
    return parts.sort((a, b)=>a.orderIndex - b.orderIndex).map(_mapDBPartToUIMessagePart.mapDBPartToUIMessagePart).filter((part)=>part !== null);
};

//# sourceMappingURL=mapDBPartsToUIMessageParts.js.map