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
    get convertExceptionToGraphQLError () {
        return convertExceptionToGraphQLError;
    },
    get convertExceptionToGraphql () {
        return convertExceptionToGraphql;
    },
    get graphQLErrorCodesToFilter () {
        return graphQLErrorCodesToFilter;
    },
    get handleException () {
        return handleException;
    },
    get handleExceptionAndConvertToGraphQLError () {
        return handleExceptionAndConvertToGraphQLError;
    },
    get shouldCaptureException () {
        return shouldCaptureException;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _nodeenvironmentinterface = require("../core-modules/twenty-config/interfaces/node-environment.interface");
const _graphqlerrorsutil = require("../core-modules/graphql/utils/graphql-errors.util");
const graphQLPredefinedExceptions = {
    400: _graphqlerrorsutil.ValidationError,
    401: _graphqlerrorsutil.AuthenticationError,
    403: _graphqlerrorsutil.ForbiddenError,
    404: _graphqlerrorsutil.NotFoundError,
    405: _graphqlerrorsutil.MethodNotAllowedError,
    408: _graphqlerrorsutil.TimeoutError,
    409: _graphqlerrorsutil.ConflictError
};
const graphQLErrorCodesToFilter = [
    _graphqlerrorsutil.ErrorCode.GRAPHQL_VALIDATION_FAILED,
    _graphqlerrorsutil.ErrorCode.UNAUTHENTICATED,
    _graphqlerrorsutil.ErrorCode.FORBIDDEN,
    _graphqlerrorsutil.ErrorCode.NOT_FOUND,
    _graphqlerrorsutil.ErrorCode.METHOD_NOT_ALLOWED,
    _graphqlerrorsutil.ErrorCode.TIMEOUT,
    _graphqlerrorsutil.ErrorCode.CONFLICT,
    _graphqlerrorsutil.ErrorCode.BAD_USER_INPUT,
    _graphqlerrorsutil.ErrorCode.METADATA_VALIDATION_FAILED
];
const handleExceptionAndConvertToGraphQLError = (exception, exceptionHandlerService, user, workspace)=>{
    handleException({
        exception,
        exceptionHandlerService,
        user,
        workspace
    });
    return convertExceptionToGraphQLError(exception);
};
const shouldCaptureException = (exception, statusCode)=>{
    if (exception instanceof _graphql.GraphQLError && (exception?.extensions?.http?.status ?? 500) < 500) {
        return false;
    }
    if (exception instanceof _graphqlerrorsutil.BaseGraphQLError && graphQLErrorCodesToFilter.includes(exception?.extensions?.code)) {
        return false;
    }
    if (exception instanceof _common.HttpException && exception.getStatus() < 500) {
        return false;
    }
    if (statusCode && statusCode < 500) {
        return false;
    }
    return true;
};
const handleException = ({ exception, exceptionHandlerService, user, workspace, statusCode })=>{
    if (shouldCaptureException(exception, statusCode)) {
        exceptionHandlerService.captureExceptions([
            exception
        ], {
            user,
            workspace
        });
    }
    return exception;
};
const convertExceptionToGraphQLError = (exception)=>{
    if (exception instanceof _common.HttpException) {
        return convertHttpExceptionToGraphql(exception);
    }
    if (exception instanceof _graphqlerrorsutil.BaseGraphQLError) {
        return exception;
    }
    return convertExceptionToGraphql(exception);
};
const convertHttpExceptionToGraphql = (exception)=>{
    const status = exception.getStatus();
    let error;
    if (status in graphQLPredefinedExceptions) {
        // @ts-expect-error legacy noImplicitAny
        const message = exception.getResponse()['message'] ?? exception.message;
        // @ts-expect-error legacy noImplicitAny
        error = new graphQLPredefinedExceptions[exception.getStatus()](message);
    } else {
        error = new _graphqlerrorsutil.BaseGraphQLError('Internal Server Error', exception.getStatus().toString());
    }
    // Only show the stack trace in development mode
    if (process.env.NODE_ENV === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT) {
        error.stack = exception.stack;
        error.extensions['response'] = exception.getResponse();
    }
    return error;
};
const convertExceptionToGraphql = (exception)=>{
    const error = new _graphqlerrorsutil.BaseGraphQLError('Internal Server Error', _graphqlerrorsutil.ErrorCode.INTERNAL_SERVER_ERROR);
    if (process.env.NODE_ENV === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT) {
        error.stack = exception.stack;
        error.extensions['response'] = exception.message;
    }
    return error;
};

//# sourceMappingURL=global-exception-handler.util.js.map