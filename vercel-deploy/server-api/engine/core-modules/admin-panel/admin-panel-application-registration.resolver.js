"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelApplicationRegistrationResolver", {
    enumerable: true,
    get: function() {
        return AdminPanelApplicationRegistrationResolver;
    }
});
const _graphql = require("@nestjs/graphql");
const _adminresolverdecorator = require("../../api/graphql/graphql-config/decorators/admin-resolver.decorator");
const _applicationregistrationentity = require("../application/application-registration/application-registration.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AdminPanelApplicationRegistrationResolver = class AdminPanelApplicationRegistrationResolver {
    async isConfigured(registration, context) {
        return context.loaders.isConfiguredLoader.load({
            applicationRegistrationId: registration.id
        });
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationregistrationentity.ApplicationRegistrationEntity === "undefined" ? Object : _applicationregistrationentity.ApplicationRegistrationEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminPanelApplicationRegistrationResolver.prototype, "isConfigured", null);
AdminPanelApplicationRegistrationResolver = _ts_decorate([
    (0, _adminresolverdecorator.AdminResolver)(()=>_applicationregistrationentity.ApplicationRegistrationEntity)
], AdminPanelApplicationRegistrationResolver);

//# sourceMappingURL=admin-panel-application-registration.resolver.js.map