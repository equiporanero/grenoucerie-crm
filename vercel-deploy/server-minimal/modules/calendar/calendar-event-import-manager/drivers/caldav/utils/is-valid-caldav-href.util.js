"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isValidCalDavHref", {
    enumerable: true,
    get: function() {
        return isValidCalDavHref;
    }
});
const _nodepath = require("node:path");
const ALLOWED_EXTENSIONS = new Set([
    '',
    '.ics',
    '.eml'
]);
const isValidCalDavHref = (url)=>ALLOWED_EXTENSIONS.has((0, _nodepath.extname)(url).toLowerCase());

//# sourceMappingURL=is-valid-caldav-href.util.js.map