"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "compareTwoFlatFieldMetadataEnumOptions", {
    enumerable: true,
    get: function() {
        return compareTwoFlatFieldMetadataEnumOptions;
    }
});
const _utils = require("twenty-shared/utils");
const compareTwoFlatFieldMetadataEnumOptions = ({ compareLabel = false, fromOptions, toOptions })=>{
    const differences = {
        created: [],
        updated: [],
        deleted: []
    };
    const fromOptionsMap = new Map(fromOptions.map((opt)=>[
            opt.id,
            opt
        ]));
    for (const newOption of toOptions){
        const oldOption = fromOptionsMap.get(newOption.id);
        if (!(0, _utils.isDefined)(oldOption)) {
            differences.created.push(newOption);
            continue;
        }
        if (oldOption.value !== newOption.value || compareLabel && oldOption.label !== newOption.label) {
            differences.updated.push({
                from: oldOption,
                to: newOption
            });
            continue;
        }
    }
    const toOptionsMap = new Map(toOptions.map((opt)=>[
            opt.id,
            opt
        ]));
    for (const oldOption of fromOptions){
        if (!toOptionsMap.has(oldOption.id)) {
            differences.deleted.push(oldOption);
        }
    }
    return differences;
};

//# sourceMappingURL=compare-two-flat-field-metadata-enum-options.util.js.map