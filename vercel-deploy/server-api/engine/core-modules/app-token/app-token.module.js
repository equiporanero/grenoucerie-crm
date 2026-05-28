"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppTokenModule", {
    enumerable: true,
    get: function() {
        return AppTokenModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _apptokenentity = require("./app-token.entity");
const _apptokenautoresolveropts = require("./app-token.auto-resolver-opts");
const _apptokenservice = require("./services/app-token.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppTokenModule = class AppTokenModule {
};
AppTokenModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _nestjsquerygraphql.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                        _apptokenentity.AppTokenEntity
                    ])
                ],
                services: [
                    _apptokenservice.AppTokenService
                ],
                resolvers: _apptokenautoresolveropts.appTokenAutoResolverOpts
            })
        ]
    })
], AppTokenModule);

//# sourceMappingURL=app-token.module.js.map