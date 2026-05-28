"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS", {
    enumerable: true,
    get: function() {
        return TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS;
    }
});
const _twentycurrentversionconstant = require("./twenty-current-version.constant");
const _twentypreviousversionsconstant = require("./twenty-previous-versions.constant");
const TWENTY_CROSS_UPGRADE_SUPPORTED_VERSIONS = [
    ..._twentypreviousversionsconstant.TWENTY_PREVIOUS_VERSIONS,
    _twentycurrentversionconstant.TWENTY_CURRENT_VERSION
];

//# sourceMappingURL=twenty-cross-upgrade-supported-version.constant.js.map