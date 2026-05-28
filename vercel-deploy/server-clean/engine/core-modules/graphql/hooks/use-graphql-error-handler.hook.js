"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useGraphQLErrorHandlerHook", {
    enumerable: true,
    get: function() {
        return useGraphQLErrorHandlerHook;
    }
});
const _core = require("@envelop/core");
const _graphql = require("graphql");
const _semver = /*#__PURE__*/ _interop_require_default(require("semver"));
const _translations = require("twenty-shared/translations");
const _utils = require("twenty-shared/utils");
const _generategraphqlerrorfromerrorutil = require("../utils/generate-graphql-error-from-error.util");
const _graphqlerrorsutil = require("../utils/graphql-errors.util");
const _metricskeystype = require("../../metrics/types/metrics-keys.type");
const _globalexceptionhandlerutil = require("../../../utils/global-exception-handler.util");
const _translateuserfriendlymessagedescriptorsutil = require("../../i18n/utils/translate-user-friendly-message-descriptors.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const DEFAULT_EVENT_ID_KEY = 'exceptionEventId';
const SCHEMA_VERSION_HEADER = 'x-schema-version';
const SCHEMA_MISMATCH_ERROR = 'Schema version mismatch.';
const APP_VERSION_HEADER = 'x-app-version';
const APP_VERSION_MISMATCH_ERROR = 'App version mismatch.';
const APP_VERSION_MISMATCH_CODE = 'APP_VERSION_MISMATCH';
const useGraphQLErrorHandlerHook = (options)=>{
    const eventIdKey = options.eventIdKey === null ? null : DEFAULT_EVENT_ID_KEY;
    function extractWorkspaceInfo(req) {
        if (!req.workspace) {
            return null;
        }
        return {
            id: req.workspace.id,
            displayName: req.workspace.displayName,
            createdAt: req.workspace.createdAt ?? null,
            activationStatus: req.workspace.activationStatus
        };
    }
    return {
        // TODO: define onSubscribe here to handle subscription errors too
        async onExecute ({ args }) {
            const exceptionHandlerService = options.exceptionHandlerService;
            const rootOperation = args.document.definitions.find(// @ts-expect-error legacy noImplicitAny
            (o)=>o.kind === _graphql.Kind.OPERATION_DEFINITION);
            if (!rootOperation) {
                return;
            }
            const operationType = rootOperation.operation;
            const rawUser = args.contextValue.req.user;
            const user = rawUser ? {
                id: rawUser.id,
                email: rawUser.email,
                firstName: rawUser.firstName,
                lastName: rawUser.lastName
            } : undefined;
            const document = (0, _core.getDocumentString)(args.document, _graphql.print);
            const opName = args.operationName || rootOperation.name?.value || 'Anonymous Operation';
            const workspaceInfo = extractWorkspaceInfo(args.contextValue.req);
            return {
                onExecuteDone (payload) {
                    const handleResult = ({ result, setResult })=>{
                        if (!result.errors || result.errors.length === 0) {
                            void options.metricsService.incrementCounterForEvent({
                                key: _metricskeystype.MetricsKeys.GraphqlOperation200
                            });
                            return;
                        }
                        // Step 1: Process errors - extract original errors and convert to BaseGraphQLError
                        const processedErrors = result.errors.map((error)=>{
                            const originalError = error.originalError || error;
                            if (error.extensions && originalError !== error) {
                                originalError.extensions = {
                                    ...error.extensions,
                                    ...originalError.extensions || {}
                                };
                            }
                            if (originalError instanceof _graphql.GraphQLError && !(originalError instanceof _graphqlerrorsutil.BaseGraphQLError)) {
                                return (0, _graphqlerrorsutil.convertGraphQLErrorToBaseGraphQLError)(originalError);
                            }
                            return originalError;
                        });
                        // Error metrics
                        const codeToMetricKey = {
                            [_graphqlerrorsutil.ErrorCode.UNAUTHENTICATED]: _metricskeystype.MetricsKeys.GraphqlOperation401,
                            [_graphqlerrorsutil.ErrorCode.FORBIDDEN]: _metricskeystype.MetricsKeys.GraphqlOperation403,
                            [_graphqlerrorsutil.ErrorCode.NOT_FOUND]: _metricskeystype.MetricsKeys.GraphqlOperation404,
                            [_graphqlerrorsutil.ErrorCode.INTERNAL_SERVER_ERROR]: _metricskeystype.MetricsKeys.GraphqlOperation500
                        };
                        const statusToMetricKey = {
                            400: _metricskeystype.MetricsKeys.GraphqlOperation400,
                            401: _metricskeystype.MetricsKeys.GraphqlOperation401,
                            403: _metricskeystype.MetricsKeys.GraphqlOperation403,
                            404: _metricskeystype.MetricsKeys.GraphqlOperation404,
                            500: _metricskeystype.MetricsKeys.GraphqlOperation500
                        };
                        processedErrors.forEach((error)=>{
                            let metricKey;
                            if (error instanceof _graphqlerrorsutil.BaseGraphQLError) {
                                const code = error.extensions?.code;
                                metricKey = codeToMetricKey[code];
                                if (!metricKey && _globalexceptionhandlerutil.graphQLErrorCodesToFilter.includes(code)) {
                                    metricKey = _metricskeystype.MetricsKeys.GraphqlOperation400;
                                }
                            } else if (error instanceof _graphql.GraphQLError) {
                                const status = error.extensions?.http?.status;
                                metricKey = statusToMetricKey[status];
                            }
                            if (metricKey) {
                                void options.metricsService.incrementCounterForEvent({
                                    key: metricKey
                                });
                            } else {
                                void options.metricsService.incrementCounterForEvent({
                                    key: _metricskeystype.MetricsKeys.GraphqlOperationUnknown
                                });
                            }
                        });
                        // Step 2: Send errors to monitoring service (with stack traces)
                        const errorsToCapture = processedErrors.filter(_globalexceptionhandlerutil.shouldCaptureException);
                        if (errorsToCapture.length > 0) {
                            const eventIds = exceptionHandlerService.captureExceptions(errorsToCapture, {
                                operation: {
                                    name: opName,
                                    type: operationType
                                },
                                document,
                                user,
                                workspace: workspaceInfo
                            });
                            errorsToCapture.forEach((_, i)=>{
                                if (eventIds?.[i] && eventIdKey !== null) {
                                    processedErrors[processedErrors.indexOf(errorsToCapture[i])].eventId = eventIds[i];
                                }
                            });
                        }
                        // Step 3: Transform errors for GraphQL response (clean GraphQL errors)
                        const userLocale = args.contextValue.req.locale ?? _translations.SOURCE_LOCALE;
                        const i18n = options.i18nService.getI18nInstance(userLocale);
                        const defaultErrorMessage = /*i18n*/ {
                            id: "XyOToQ",
                            message: "An error occurred."
                        };
                        const transformedErrors = processedErrors.map((error)=>{
                            const graphqlError = error instanceof _graphqlerrorsutil.BaseGraphQLError ? {
                                ...error,
                                extensions: (0, _translateuserfriendlymessagedescriptorsutil.translateUserFriendlyMessageDescriptors)({
                                    ...error.extensions,
                                    userFriendlyMessage: error.extensions.userFriendlyMessage ?? defaultErrorMessage
                                }, i18n)
                            } : (0, _generategraphqlerrorfromerrorutil.generateGraphQLErrorFromError)(error, i18n);
                            if (error.eventId && eventIdKey) {
                                graphqlError.extensions = {
                                    ...graphqlError.extensions,
                                    [eventIdKey]: error.eventId
                                };
                            }
                            return graphqlError;
                        });
                        setResult({
                            ...result,
                            errors: transformedErrors
                        });
                    };
                    return (0, _core.handleStreamOrSingleExecutionResult)(payload, handleResult);
                }
            };
        },
        onValidate: ({ context, validateFn, params: { documentAST, schema } })=>{
            const errors = validateFn(schema, documentAST);
            const userLocale = context.req.locale ?? _translations.SOURCE_LOCALE;
            const i18n = options.i18nService.getI18nInstance(userLocale);
            if (Array.isArray(errors) && errors.length > 0) {
                const headers = context.req.headers;
                const currentMetadataVersion = context.req.workspaceMetadataVersion;
                const requestMetadataVersion = headers[SCHEMA_VERSION_HEADER];
                const backendAppVersion = options.twentyConfigService.get('APP_VERSION');
                const appVersionHeaderValue = headers[APP_VERSION_HEADER];
                const frontEndAppVersion = appVersionHeaderValue && Array.isArray(appVersionHeaderValue) ? appVersionHeaderValue[0] : appVersionHeaderValue;
                if (requestMetadataVersion && (0, _utils.isDefined)(currentMetadataVersion) && requestMetadataVersion !== `${currentMetadataVersion}`) {
                    void options.metricsService.incrementCounterForEvent({
                        key: _metricskeystype.MetricsKeys.SchemaVersionMismatch
                    });
                    throw new _graphql.GraphQLError(SCHEMA_MISMATCH_ERROR, {
                        extensions: {
                            userFriendlyMessage: i18n._(/*i18n*/ {
                                id: "ej/tZF",
                                message: "Your workspace has been updated with a new data model. Please refresh the page."
                            })
                        }
                    });
                }
                if (!(0, _utils.isDefined)(frontEndAppVersion) || !(0, _utils.isDefined)(backendAppVersion) || !_semver.default.valid(frontEndAppVersion) || !_semver.default.valid(backendAppVersion)) {
                    return;
                }
                const frontEndMajor = _semver.default.parse(frontEndAppVersion)?.major;
                const backendMajor = _semver.default.parse(backendAppVersion)?.major;
                if ((0, _utils.isDefined)(frontEndMajor) && (0, _utils.isDefined)(backendMajor) && frontEndMajor < backendMajor) {
                    void options.metricsService.incrementCounterForEvent({
                        key: _metricskeystype.MetricsKeys.AppVersionMismatch
                    });
                    throw new _graphql.GraphQLError(APP_VERSION_MISMATCH_ERROR, {
                        extensions: {
                            code: APP_VERSION_MISMATCH_CODE,
                            userFriendlyMessage: i18n._(/*i18n*/ {
                                id: "8pqpv/",
                                message: "Your app version is out of date. Please refresh the page to continue."
                            })
                        }
                    });
                }
            }
        }
    };
};

//# sourceMappingURL=use-graphql-error-handler.hook.js.map