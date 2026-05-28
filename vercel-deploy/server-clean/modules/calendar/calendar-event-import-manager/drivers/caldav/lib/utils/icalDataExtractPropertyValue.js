"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "icalDataExtractPropertyValue", {
    enumerable: true,
    get: function() {
        return icalDataExtractPropertyValue;
    }
});
const _guards = require("@sniptt/guards");
const _classvalidator = require("class-validator");
const icalDataExtractPropertyValue = (property, defaultValue = '')=>{
    if (!(0, _classvalidator.isDefined)(property)) {
        return defaultValue;
    }
    if ((0, _guards.isNonEmptyString)(property)) {
        return property;
    }
    if ((0, _classvalidator.isDefined)(property) && typeof property === 'object') {
        if ('val' in property && (0, _classvalidator.isDefined)(property.val)) {
            return (0, _guards.isString)(property.val) ? property.val : String(property.val);
        }
        if (Array.isArray(property)) {
            const values = property.map((item)=>{
                if ((0, _guards.isNonEmptyString)(item)) return item;
                if ((0, _classvalidator.isDefined)(item) && typeof item === 'object' && item?.val) return String(item.val);
                return '';
            }).filter(Boolean);
            return values.length > 0 ? values.join(', ') : defaultValue;
        }
    }
    return defaultValue;
};

//# sourceMappingURL=icalDataExtractPropertyValue.js.map