"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TWENTY_ALL_VERSIONS", {
    enumerable: true,
    get: function() {
        return TWENTY_ALL_VERSIONS;
    }
});
const _twentycurrentversionconstant = require("./twenty-current-version.constant");
const _twentynextversionsconstant = require("./twenty-next-versions.constant");
const _twentypreviousversionsconstant = require("./twenty-previous-versions.constant");
const TWENTY_ALL_VERSIONS = [
    ..._twentypreviousversionsconstant.TWENTY_PREVIOUS_VERSIONS,
    _twentycurrentversionconstant.TWENTY_CURRENT_VERSION,
    ..._twentynextversionsconstant.TWENTY_NEXT_VERSIONS
];

//# sourceMappingURL=twenty-all-versions.constant.js.map