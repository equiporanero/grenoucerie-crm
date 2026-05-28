// oxlint-disable-next-line @typescripttypescript/no-explicit-any
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isValidDate", {
    enumerable: true,
    get: function() {
        return isValidDate;
    }
});
const isValidDate = (date)=>{
    return date instanceof Date && !isNaN(date.getTime());
};

//# sourceMappingURL=isValidDate.js.map