"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRequest", {
    enumerable: true,
    get: function() {
        return getRequest;
    }
});
const _graphql = require("@nestjs/graphql");
const getRequest = (context)=>{
    let request;
    // if context is an http request
    if (context.getType() === 'http') {
        request = context.switchToHttp().getRequest();
    } else if (context.getType() === 'graphql') {
        // if context is a graphql request
        const graphQLContext = _graphql.GqlExecutionContext.create(context);
        const { req, connection } = graphQLContext.getContext();
        request = connection && connection.context && connection.context.headers ? connection.context : req;
    } else if (context.getType() === 'rpc') {
        // if context is a rpc request
        throw new Error('Not implemented');
    }
    return request;
};

//# sourceMappingURL=extract-request.js.map