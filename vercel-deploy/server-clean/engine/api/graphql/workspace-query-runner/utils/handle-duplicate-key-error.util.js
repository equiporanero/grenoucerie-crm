"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleDuplicateKeyError", {
    enumerable: true,
    get: function() {
        return handleDuplicateKeyError;
    }
});
const _twentyormexception = require("../../../../twenty-orm/exceptions/twenty-orm.exception");
const _findconflictingrecordutil = require("./find-conflicting-record.util");
const _parsepostgresconstrainterrorutil = require("./parse-postgres-constraint-error.util");
const handleDuplicateKeyError = async (error, objectMetadata, internalContext, entityManager)=>{
    const parsedError = (0, _parsepostgresconstrainterrorutil.parsePostgresConstraintError)(error);
    if (!parsedError) {
        return new _twentyormexception.TwentyORMException(`A duplicate entry was detected`, _twentyormexception.TwentyORMExceptionCode.DUPLICATE_ENTRY_DETECTED, {
            userFriendlyMessage: /*i18n*/ {
                id: "TjUnO1",
                message: "This record already exists. Please check your data and try again."
            }
        });
    }
    const conflictingRecord = await (0, _findconflictingrecordutil.findConflictingRecord)(parsedError.columnName, parsedError.conflictingValue, objectMetadata, internalContext, entityManager);
    const fieldLabel = conflictingRecord?.fieldLabel;
    const userFriendlyMessage = fieldLabel ? /*i18n*/ {
        id: "Iy9pZw",
        message: "This {fieldLabel} value is already in use. Please check your data and try again.",
        values: {
            fieldLabel: fieldLabel
        }
    } : /*i18n*/ {
        id: "TjUnO1",
        message: "This record already exists. Please check your data and try again."
    };
    const exception = new _twentyormexception.TwentyORMException(`A duplicate entry was detected`, _twentyormexception.TwentyORMExceptionCode.DUPLICATE_ENTRY_DETECTED, {
        userFriendlyMessage
    });
    if (conflictingRecord) {
        exception.conflictingRecordId = conflictingRecord.conflictingRecordId;
        exception.conflictingObjectNameSingular = objectMetadata.nameSingular;
    }
    return exception;
};

//# sourceMappingURL=handle-duplicate-key-error.util.js.map