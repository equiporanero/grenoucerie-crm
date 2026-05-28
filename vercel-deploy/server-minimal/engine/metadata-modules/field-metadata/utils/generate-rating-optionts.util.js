"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateRatingOptions", {
    enumerable: true,
    get: function() {
        return generateRatingOptions;
    }
});
const _uuid = require("uuid");
const range = {
    start: 1,
    end: 5
};
function generateRatingOptions() {
    const options = [];
    for(let i = range.start; i <= range.end; i++){
        options.push({
            id: (0, _uuid.v4)(),
            label: i.toString(),
            value: `RATING_${i}`,
            position: i - 1
        });
    }
    return options;
}

//# sourceMappingURL=generate-rating-optionts.util.js.map