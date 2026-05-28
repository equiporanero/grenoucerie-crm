"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergeUpdateInExistingRecord", {
    enumerable: true,
    get: function() {
        return mergeUpdateInExistingRecord;
    }
});
const mergeUpdateInExistingRecord = ({ existing, properties, update })=>properties.reduce((acc, property)=>{
        const isPropertyUpdated = update[property] !== undefined;
        return {
            ...acc,
            ...isPropertyUpdated ? {
                [property]: update[property]
            } : {}
        };
    }, existing);

//# sourceMappingURL=merge-update-in-existing-record.util.js.map