"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sortBySelectOptionPosition", {
    enumerable: true,
    get: function() {
        return sortBySelectOptionPosition;
    }
});
const _utils = require("twenty-shared/utils");
const sortBySelectOptionPosition = ({ items, options, formattedToRawLookup, getFormattedValue, direction })=>{
    const optionValueToPosition = new Map();
    for (const option of options){
        optionValueToPosition.set(option.value, option.position);
    }
    return [
        ...items
    ].sort((a, b)=>{
        const formattedA = getFormattedValue(a);
        const formattedB = getFormattedValue(b);
        const rawA = formattedToRawLookup.get(formattedA);
        const rawB = formattedToRawLookup.get(formattedB);
        const positionA = (0, _utils.isDefined)(rawA) ? optionValueToPosition.get(String(rawA)) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
        const positionB = (0, _utils.isDefined)(rawB) ? optionValueToPosition.get(String(rawB)) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
        return direction === 'ASC' ? positionA - positionB : positionB - positionA;
    });
};

//# sourceMappingURL=sort-by-select-option-position.util.js.map