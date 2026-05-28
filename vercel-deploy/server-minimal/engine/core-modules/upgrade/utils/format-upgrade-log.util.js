"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatUpgradeLog", {
    enumerable: true,
    get: function() {
        return formatUpgradeLog;
    }
});
const _utils = require("twenty-shared/utils");
const UPGRADE_LOG_PREFIX = '[upgrade]';
const NEEDS_QUOTING = /[\s"=]/;
const CONTROL_CHARACTERS = /[\n\r\t]/;
const escapeLogValue = (value)=>{
    const raw = String(value);
    if (!NEEDS_QUOTING.test(raw) && !CONTROL_CHARACTERS.test(raw)) {
        return raw;
    }
    const escaped = raw.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
    return `"${escaped}"`;
};
const formatUpgradeLog = ({ humanMessage, event, logFields = {} })=>{
    const tailParts = [
        `event=${escapeLogValue(event)}`
    ];
    for (const [key, value] of Object.entries(logFields)){
        tailParts.push(`${key}=${(0, _utils.isDefined)(value) ? escapeLogValue(value) : String(value)}`);
    }
    return `${humanMessage}\n${UPGRADE_LOG_PREFIX} ${tailParts.join(' ')}`;
};

//# sourceMappingURL=format-upgrade-log.util.js.map