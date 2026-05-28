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
    get AuthenticationError () {
        return AuthenticationError;
    },
    get BaseGraphQLError () {
        return BaseGraphQLError;
    },
    get ConflictError () {
        return ConflictError;
    },
    get ErrorCode () {
        return ErrorCode;
    },
    get ForbiddenError () {
        return ForbiddenError;
    },
    get InternalServerError () {
        return InternalServerError;
    },
    get MethodNotAllowedError () {
        return MethodNotAllowedError;
    },
    get NotFoundError () {
        return NotFoundError;
    },
    get SyntaxError () {
        return SyntaxError;
    },
    get TimeoutError () {
        return TimeoutError;
    },
    get UserInputError () {
        return UserInputError;
    },
    get ValidationError () {
        return ValidationError;
    },
    get convertGraphQLErrorToBaseGraphQLError () {
        return convertGraphQLErrorToBaseGraphQLError;
    }
});
const _graphql = require("graphql");
const _customexception = require("../../../../utils/custom-exception");
var ErrorCode = /*#__PURE__*/ function(ErrorCode) {
    ErrorCode["GRAPHQL_PARSE_FAILED"] = "GRAPHQL_PARSE_FAILED";
    ErrorCode["GRAPHQL_VALIDATION_FAILED"] = "GRAPHQL_VALIDATION_FAILED";
    ErrorCode["UNAUTHENTICATED"] = "UNAUTHENTICATED";
    ErrorCode["FORBIDDEN"] = "FORBIDDEN";
    ErrorCode["PERSISTED_QUERY_NOT_FOUND"] = "PERSISTED_QUERY_NOT_FOUND";
    ErrorCode["PERSISTED_QUERY_NOT_SUPPORTED"] = "PERSISTED_QUERY_NOT_SUPPORTED";
    ErrorCode["BAD_USER_INPUT"] = "BAD_USER_INPUT";
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["METHOD_NOT_ALLOWED"] = "METHOD_NOT_ALLOWED";
    ErrorCode["CONFLICT"] = "CONFLICT";
    ErrorCode["TIMEOUT"] = "TIMEOUT";
    ErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorCode["METADATA_VALIDATION_FAILED"] = "METADATA_VALIDATION_FAILED";
    ErrorCode["APPLICATION_INSTALLATION_FAILED"] = "APPLICATION_INSTALLATION_FAILED";
    return ErrorCode;
}({});
let BaseGraphQLError = class BaseGraphQLError extends _graphql.GraphQLError {
    toJSON() {
        return toGraphQLError(this).toJSON();
    }
    toString() {
        return toGraphQLError(this).toString();
    }
    get [Symbol.toStringTag]() {
        return this.name;
    }
    constructor(exceptionOrMessage, code, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    extensions){
        if (exceptionOrMessage instanceof _customexception.CustomException) {
            const exception = exceptionOrMessage;
            super(exception.message);
            this.extensions = {
                subCode: exception.code,
                userFriendlyMessage: exception.userFriendlyMessage,
                code
            };
        } else {
            const message = exceptionOrMessage;
            super(message);
            if (extensions?.extensions) {
                throw new Error('Pass extensions directly as the third argument of the ApolloError constructor: `new ' + 'ApolloError(message, code, {myExt: value})`, not `new ApolloError(message, code, ' + '{extensions: {myExt: value}})`');
            }
            this.extensions = {
                ...extensions,
                code
            };
        }
        // if no name provided, use the default. defineProperty ensures that it stays non-enumerable
        if (!this.name) {
            Object.defineProperty(this, 'name', {
                value: 'GraphQLError'
            });
        }
    }
};
function toGraphQLError(error) {
    return new _graphql.GraphQLError(error.message, {
        nodes: error.nodes,
        source: error.source,
        positions: error.positions,
        path: error.path,
        originalError: error.originalError,
        extensions: error.extensions
    });
}
let SyntaxError = class SyntaxError extends BaseGraphQLError {
    constructor(message){
        super(message, "GRAPHQL_PARSE_FAILED");
        Object.defineProperty(this, 'name', {
            value: 'SyntaxError'
        });
    }
};
let ValidationError = class ValidationError extends BaseGraphQLError {
    constructor(message, extensions){
        super(message, "GRAPHQL_VALIDATION_FAILED", extensions);
        Object.defineProperty(this, 'name', {
            value: 'ValidationError'
        });
    }
};
let NotFoundError = class NotFoundError extends BaseGraphQLError {
    constructor(messageOrException, extensions){
        super(messageOrException, "NOT_FOUND", extensions);
        Object.defineProperty(this, 'name', {
            value: 'NotFoundError'
        });
    }
};
let AuthenticationError = class AuthenticationError extends BaseGraphQLError {
    constructor(messageOrException, extensions){
        super(messageOrException, "UNAUTHENTICATED", extensions);
        Object.defineProperty(this, 'name', {
            value: 'AuthenticationError'
        });
    }
};
let ForbiddenError = class ForbiddenError extends BaseGraphQLError {
    constructor(messageOrException, extensions){
        super(messageOrException, "FORBIDDEN", extensions);
        Object.defineProperty(this, 'name', {
            value: 'ForbiddenError'
        });
    }
};
let UserInputError = class UserInputError extends BaseGraphQLError {
    constructor(messageOrException, extensions){
        super(messageOrException, "BAD_USER_INPUT", extensions);
        Object.defineProperty(this, 'name', {
            value: 'UserInputError'
        });
    }
};
let MethodNotAllowedError = class MethodNotAllowedError extends BaseGraphQLError {
    constructor(messageOrException, extensions){
        super(messageOrException, "METHOD_NOT_ALLOWED", extensions);
        Object.defineProperty(this, 'name', {
            value: 'MethodNotAllowedError'
        });
    }
};
let ConflictError = class ConflictError extends BaseGraphQLError {
    constructor(messageOrException, extensions){
        super(messageOrException, "CONFLICT", extensions);
        Object.defineProperty(this, 'name', {
            value: 'ConflictError'
        });
    }
};
let TimeoutError = class TimeoutError extends BaseGraphQLError {
    constructor(messageOrException, extensions){
        super(messageOrException, "TIMEOUT", extensions);
        Object.defineProperty(this, 'name', {
            value: 'TimeoutError'
        });
    }
};
let InternalServerError = class InternalServerError extends BaseGraphQLError {
    constructor(messageOrException, extensions){
        super(messageOrException, "INTERNAL_SERVER_ERROR", extensions);
        Object.defineProperty(this, 'name', {
            value: 'InternalServerError'
        });
    }
};
const convertGraphQLErrorToBaseGraphQLError = (error)=>{
    const httpStatus = error.extensions?.http?.status;
    let errorCode = "INTERNAL_SERVER_ERROR";
    if (httpStatus && typeof httpStatus === 'number') {
        switch(httpStatus){
            case 400:
                errorCode = "BAD_USER_INPUT";
                break;
            case 401:
                errorCode = "UNAUTHENTICATED";
                break;
            case 403:
                errorCode = "FORBIDDEN";
                break;
            case 404:
                errorCode = "NOT_FOUND";
                break;
            case 405:
                errorCode = "METHOD_NOT_ALLOWED";
                break;
            case 408:
            case 504:
                errorCode = "TIMEOUT";
                break;
            case 409:
                errorCode = "CONFLICT";
                break;
            default:
                if (httpStatus >= 400 && httpStatus < 500) {
                    // Other 4xx errors
                    errorCode = "BAD_USER_INPUT";
                } else {
                    // 5xx errors default to internal server error
                    errorCode = "INTERNAL_SERVER_ERROR";
                }
        }
    }
    return new BaseGraphQLError(error.message, errorCode, error.extensions);
};

//# sourceMappingURL=graphql-errors.util.js.map