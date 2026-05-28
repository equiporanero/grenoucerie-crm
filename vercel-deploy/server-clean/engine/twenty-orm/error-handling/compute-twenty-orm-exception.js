"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeTwentyORMException", {
    enumerable: true,
    get: function() {
        return computeTwentyORMException;
    }
});
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _postgreserrorcodesconstants = require("../../api/graphql/workspace-query-runner/constants/postgres-error-codes.constants");
const _handleduplicatekeyerrorutil = require("../../api/graphql/workspace-query-runner/utils/handle-duplicate-key-error.util");
const _postgresexception = require("../../api/graphql/workspace-query-runner/utils/postgres-exception");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const computeTwentyORMException = async (error, objectMetadata, entityManager, internalContext)=>{
    if (error instanceof _typeorm.QueryFailedError) {
        if (error.message.includes('Query read timeout')) {
            return new _twentyormexception.TwentyORMException('Query read timeout', _twentyormexception.TwentyORMExceptionCode.QUERY_READ_TIMEOUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "xvV2NJ",
                    message: "We are experiencing a temporary issue with our database. Please try again later."
                }
            });
        }
        const errorCode = error.code;
        if (errorCode === _postgreserrorcodesconstants.POSTGRESQL_ERROR_CODES.UNIQUE_VIOLATION && (0, _utils.isDefined)(objectMetadata) && (0, _utils.isDefined)(entityManager) && (0, _utils.isDefined)(internalContext)) {
            return await (0, _handleduplicatekeyerrorutil.handleDuplicateKeyError)(error, objectMetadata, internalContext, entityManager);
        }
        if (errorCode === _postgreserrorcodesconstants.POSTGRESQL_ERROR_CODES.INVALID_TEXT_REPRESENTATION) {
            return new _twentyormexception.TwentyORMException(error.message, _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT);
        }
        if ((0, _utils.isDefined)(errorCode) && Object.values(_postgreserrorcodesconstants.POSTGRESQL_ERROR_CODES).includes(errorCode)) {
            throw new _postgresexception.PostgresException('Data validation error.', errorCode);
        }
        throw error;
    }
    return error;
};

//# sourceMappingURL=compute-twenty-orm-exception.js.map