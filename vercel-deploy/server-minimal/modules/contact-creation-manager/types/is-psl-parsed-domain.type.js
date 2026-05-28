"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isParsedDomain", {
    enumerable: true,
    get: function() {
        return isParsedDomain;
    }
});
const _utils = require("twenty-shared/utils");
const isParsedDomain = (result)=>!(0, _utils.isDefined)(result.error) && Object.prototype.hasOwnProperty.call(result, 'sld');

//# sourceMappingURL=is-psl-parsed-domain.type.js.map