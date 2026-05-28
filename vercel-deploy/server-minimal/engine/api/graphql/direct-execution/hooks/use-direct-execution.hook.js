"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDirectExecution", {
    enumerable: true,
    get: function() {
        return useDirectExecution;
    }
});
const _node = /*#__PURE__*/ _interop_require_wildcard(require("@sentry/node"));
const _graphql = require("graphql");
const _guards = require("@sniptt/guards");
const _classifytoplevelfieldsutil = require("../utils/classify-top-level-fields.util");
const _findoperationdefinitionutil = require("../utils/find-operation-definition.util");
const _issubscriptionoperationutil = require("../utils/is-subscription-operation.util");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
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
function useDirectExecution(config) {
    return {
        onRequest: async ({ endResponse, serverContext })=>{
            const req = serverContext.req;
            if (!req.workspace?.id || !req.body?.query) {
                return;
            }
            const queryString = req.body.query;
            const operationName = req.body.operationName;
            let document;
            try {
                document = (0, _graphql.parse)(queryString);
            } catch  {
                return;
            }
            const operationDefinition = (0, _findoperationdefinitionutil.findOperationDefinition)(document, operationName);
            if (!operationDefinition || (0, _issubscriptionoperationutil.isSubscriptionOperation)(document, operationName)) {
                return;
            }
            const workspaceResolverNames = await config.directExecutionService.getWorkspaceResolverNames(req.workspace.id);
            if (!workspaceResolverNames) {
                return;
            }
            const { hasIntrospectionFields, hasWorkspaceFields, hasCoreFields } = (0, _classifytoplevelfieldsutil.classifyTopLevelFields)(document, operationName, workspaceResolverNames);
            if (hasCoreFields && hasWorkspaceFields) {
                const error = new _graphqlerrorsutil.UserInputError('This query cannot be executed as a single request. Please split it into separate queries.');
                return endResponse(Response.json({
                    errors: [
                        error.toJSON()
                    ]
                }));
            }
            if (hasCoreFields) {
                return;
            }
            if (_node.isInitialized()) {
                const transactionName = operationName || operationDefinition.name?.value || '';
                _node.setTags({
                    operationName: transactionName,
                    operation: operationDefinition.operation
                });
                _node.getCurrentScope().setTransactionName(transactionName);
            }
            const result = await config.directExecutionService.execute(req, document, hasIntrospectionFields, hasWorkspaceFields);
            if ((0, _guards.isNull)(result)) {
                return;
            }
            return endResponse(Response.json(result));
        }
    };
}

//# sourceMappingURL=use-direct-execution.hook.js.map