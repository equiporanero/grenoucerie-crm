"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphQLHydrateRequestFromTokenMiddleware", {
    enumerable: true,
    get: function() {
        return GraphQLHydrateRequestFromTokenMiddleware;
    }
});
const _common = require("@nestjs/common");
const _middlewareservice = require("./middleware.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GraphQLHydrateRequestFromTokenMiddleware = class GraphQLHydrateRequestFromTokenMiddleware {
    async use(req, res, next) {
        try {
            await this.middlewareService.hydrateGraphqlRequest(req);
        } catch (error) {
            this.middlewareService.writeGraphqlResponseOnExceptionCaught(res, error);
            return;
        }
        next();
    }
    constructor(middlewareService){
        this.middlewareService = middlewareService;
    }
};
GraphQLHydrateRequestFromTokenMiddleware = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _middlewareservice.MiddlewareService === "undefined" ? Object : _middlewareservice.MiddlewareService
    ])
], GraphQLHydrateRequestFromTokenMiddleware);

//# sourceMappingURL=graphql-hydrate-request-from-token.middleware.js.map