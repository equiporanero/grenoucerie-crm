"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeSchemaTags", {
    enumerable: true,
    get: function() {
        return computeSchemaTags;
    }
});
const _utils = require("twenty-shared/utils");
const computeSchemaTags = (items)=>{
    const results = [
        {
            name: 'General',
            description: 'General requests'
        }
    ];
    items.forEach((item)=>{
        results.push({
            name: item.namePlural,
            description: `Object \`${(0, _utils.capitalize)(item.namePlural)}\``
        });
    });
    return results;
};

//# sourceMappingURL=compute-schema-tags.utils.js.map