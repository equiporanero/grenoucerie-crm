"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExceptionHandlerSentryDriver", {
    enumerable: true,
    get: function() {
        return ExceptionHandlerSentryDriver;
    }
});
const _node = /*#__PURE__*/ _interop_require_wildcard(require("@sentry/node"));
const _utils = require("twenty-shared/utils");
const _postgresexception = require("../../../api/graphql/workspace-query-runner/utils/postgres-exception");
const _messageimportdriverexception = require("../../../../modules/messaging/message-import-manager/drivers/exceptions/message-import-driver.exception");
const _customexception = require("../../../../utils/custom-exception");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
let ExceptionHandlerSentryDriver = class ExceptionHandlerSentryDriver {
    captureExceptions(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    exceptions, options) {
        const eventIds = [];
        _node.withScope((scope)=>{
            if (options?.operation) {
                scope.setExtra('operation', options.operation.name);
                scope.setExtra('operationType', options.operation.type);
            }
            if (options?.document) {
                scope.setExtra('document', options.document);
            }
            if (options?.workspace) {
                scope.setExtra('workspace', options.workspace);
            }
            if (options?.additionalData) {
                scope.setExtra('additionalData', options.additionalData);
            }
            if (options?.user) {
                scope.setUser({
                    id: options.user.id,
                    email: options.user.email,
                    firstName: options.user.firstName,
                    lastName: options.user.lastName
                });
            }
            for (const exception of exceptions){
                const errorPath = (exception.path ?? []).map((v)=>typeof v === 'number' ? '$index' : v).join(' > ');
                if (errorPath) {
                    scope.addBreadcrumb({
                        category: 'execution-path',
                        message: errorPath,
                        level: 'debug'
                    });
                }
                if ('context' in exception && exception.context) {
                    Object.entries(exception.context).forEach(([key, value])=>{
                        scope.setExtra(key, value);
                    });
                }
                if ('cause' in exception && exception.cause) {
                    scope.setContext('cause', {
                        name: exception.cause.name,
                        message: exception.cause.message,
                        stack: exception.cause.stack
                    });
                }
                if (exception instanceof _customexception.CustomException && exception.code !== 'UNKNOWN') {
                    scope.setTag('customExceptionCode', exception.code);
                    scope.setFingerprint([
                        exception.code
                    ]);
                    exception.name = (0, _utils.getHumanReadableNameFromCode)(exception.code);
                }
                if (exception instanceof _postgresexception.PostgresException) {
                    scope.setTag('postgresSqlErrorCode', exception.code);
                    const fingerPrint = [
                        exception.code
                    ];
                    const genericOperationName = (0, _utils.getGenericOperationName)(options?.operation?.name);
                    if ((0, _utils.isDefined)(genericOperationName)) {
                        fingerPrint.push(genericOperationName);
                    }
                    scope.setFingerprint(fingerPrint);
                    exception.name = exception.message;
                }
                if (exception instanceof _messageimportdriverexception.MessageImportDriverException) {
                    scope.setTag('messageImportDriverCode', exception.code);
                    scope.setFingerprint([
                        exception.code
                    ]);
                }
                const eventId = _node.captureException(exception, {
                    contexts: {
                        GraphQL: {
                            operationName: options?.operation?.name,
                            operationType: options?.operation?.type
                        }
                    }
                });
                eventIds.push(eventId);
            }
        });
        return eventIds;
    }
};

//# sourceMappingURL=sentry.driver.js.map