"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useCachedMetadata", {
    enumerable: true,
    get: function() {
        return useCachedMetadata;
    }
});
const _crypto = require("crypto");
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
function useCachedMetadata(config) {
    const computeCacheKey = ({ operationName, request })=>{
        const workspace = request.workspace;
        if (!(0, _utils.isDefined)(workspace)) {
            throw new _graphqlerrorsutil.InternalServerError('Workspace is not defined');
        }
        const workspaceMetadataVersion = workspace.metadataVersion ?? '0';
        const locale = request.locale;
        const queryHash = (0, _crypto.createHash)('sha256').update(request.body.query).digest('hex');
        if (operationName === 'FindAllViews') {
            return `graphql:operations:${operationName}:${workspace.id}:${workspaceMetadataVersion}:${request.userWorkspaceId}:${queryHash}`;
        }
        return `graphql:operations:${operationName}:${workspace.id}:${workspaceMetadataVersion}:${locale}:${queryHash}`;
    };
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    const getOperationName = (serverContext)=>serverContext?.req?.body?.operationName;
    return {
        onRequest: async ({ endResponse, serverContext })=>{
            // TODO: we should probably override the graphql-yoga request type to include the workspace and locale
            const request = serverContext.req;
            if (!request.workspace?.id) {
                return;
            }
            if (!config.operationsToCache.includes(getOperationName(serverContext))) {
                return;
            }
            const cacheKey = computeCacheKey({
                operationName: getOperationName(serverContext),
                request
            });
            const cachedResponse = await config.cacheGetter(cacheKey);
            if (cachedResponse) {
                const earlyResponse = Response.json(cachedResponse);
                return endResponse(earlyResponse);
            }
        },
        onResponse: async ({ response, serverContext })=>{
            const request = serverContext.req;
            if (!request.workspace?.id) {
                return;
            }
            if (!config.operationsToCache.includes(getOperationName(serverContext))) {
                return;
            }
            const cacheKey = computeCacheKey({
                operationName: getOperationName(serverContext),
                request
            });
            const cachedResponse = await config.cacheGetter(cacheKey);
            if (!cachedResponse) {
                const responseBody = await response.json();
                if (responseBody.errors) {
                    return;
                }
                config.cacheSetter(cacheKey, responseBody);
            }
        }
    };
}

//# sourceMappingURL=use-cached-metadata.js.map