"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get beneathDatabaseIdentifierMinimumLength () {
        return beneathDatabaseIdentifierMinimumLength;
    },
    get exceedsDatabaseIdentifierMaximumLength () {
        return exceedsDatabaseIdentifierMaximumLength;
    }
});
const _metadata = require("twenty-shared/metadata");
const _identifiermincharlengthconstants = require("./constants/identifier-min-char-length.constants");
const exceedsDatabaseIdentifierMaximumLength = (string)=>string.length > _metadata.IDENTIFIER_MAX_CHAR_LENGTH;
const beneathDatabaseIdentifierMinimumLength = (string)=>string.length < _identifiermincharlengthconstants.IDENTIFIER_MIN_CHAR_LENGTH;

//# sourceMappingURL=validate-database-identifier-length.utils.js.map