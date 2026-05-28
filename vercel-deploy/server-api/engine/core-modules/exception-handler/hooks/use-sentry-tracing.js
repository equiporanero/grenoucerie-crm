"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useSentryTracing", {
    enumerable: true,
    get: function() {
        return useSentryTracing;
    }
});
const _node = /*#__PURE__*/ _interop_require_wildcard(require("@sentry/node"));
const _core = require("@envelop/core");
const _graphql = require("graphql");
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
const useSentryTracing = ()=>{
    return {
        onExecute ({ args }) {
            const transactionName = args.operationName || 'Anonymous Operation';
            const rootOperation = args.document.definitions.find(// @ts-expect-error legacy noImplicitAny
            (o)=>o.kind === _graphql.Kind.OPERATION_DEFINITION);
            const operationType = rootOperation.operation;
            const user = args.contextValue.user;
            const workspace = args.contextValue.workspace;
            const document = (0, _core.getDocumentString)(args.document, _graphql.print);
            _node.setTags({
                operationName: transactionName,
                operation: operationType
            });
            const scope = _node.getCurrentScope();
            scope.setTransactionName(transactionName);
            if (user) {
                scope.setUser({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    workspaceId: workspace?.id,
                    workspaceDisplayName: workspace?.displayName
                });
            }
            if (document) {
                scope.setExtra('document', document);
            }
            return {
                onExecuteDone (payload) {
                    return (0, _core.handleStreamOrSingleExecutionResult)(payload, ()=>{});
                }
            };
        }
    };
};

//# sourceMappingURL=use-sentry-tracing.js.map