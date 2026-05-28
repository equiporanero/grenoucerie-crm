"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "reduceFlatViewGroupsByViewUniversalIdentifier", {
    enumerable: true,
    get: function() {
        return reduceFlatViewGroupsByViewUniversalIdentifier;
    }
});
const _utils = require("twenty-shared/utils");
const reduceFlatViewGroupsByViewUniversalIdentifier = ({ flatViewGroups })=>{
    const initialAccumulator = {
        flatViewGroupRecordByViewUniversalIdentifier: {},
        highestViewGroupPositionByViewUniversalIdentifier: {}
    };
    return flatViewGroups.reduce((accumulator, flatViewGroup)=>{
        const accumulatorHighestPosition = accumulator.highestViewGroupPositionByViewUniversalIdentifier[flatViewGroup.viewUniversalIdentifier];
        return {
            flatViewGroupRecordByViewUniversalIdentifier: {
                ...accumulator.flatViewGroupRecordByViewUniversalIdentifier,
                [flatViewGroup.viewUniversalIdentifier]: {
                    ...accumulator.flatViewGroupRecordByViewUniversalIdentifier[flatViewGroup.viewUniversalIdentifier],
                    [flatViewGroup.id]: flatViewGroup
                }
            },
            highestViewGroupPositionByViewUniversalIdentifier: {
                ...accumulator.highestViewGroupPositionByViewUniversalIdentifier,
                [flatViewGroup.viewUniversalIdentifier]: (0, _utils.isDefined)(accumulatorHighestPosition) ? Math.max(accumulatorHighestPosition, flatViewGroup.position) : flatViewGroup.position
            }
        };
    }, initialAccumulator);
};

//# sourceMappingURL=reduce-flat-view-groups-by-view-universal-identifier.util.js.map