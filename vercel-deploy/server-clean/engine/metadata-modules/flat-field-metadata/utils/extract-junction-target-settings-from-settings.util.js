"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractJunctionTargetSettingsFromSettings", {
    enumerable: true,
    get: function() {
        return extractJunctionTargetSettingsFromSettings;
    }
});
const _utils = require("twenty-shared/utils");
const extractJunctionTargetSettingsFromSettings = (settings)=>{
    if (!(0, _utils.isDefined)(settings)) {
        return {};
    }
    if (typeof settings !== 'object' || settings === null) {
        return {};
    }
    const result = {};
    if ('junctionTargetFieldId' in settings && typeof settings.junctionTargetFieldId === 'string') {
        result.junctionTargetFieldId = settings.junctionTargetFieldId;
    }
    return result;
};

//# sourceMappingURL=extract-junction-target-settings-from-settings.util.js.map