"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatedByCreateManyPreQueryHook", {
    enumerable: true,
    get: function() {
        return CreatedByCreateManyPreQueryHook;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../api/common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../../../api/graphql/graphql-query-runner/errors/graphql-query-runner.exception");
const _workspacequeryhookdecorator = require("../../../api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _actorfromauthcontextservice = require("../services/actor-from-auth-context.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreatedByCreateManyPreQueryHook = class CreatedByCreateManyPreQueryHook {
    async execute(authContext, objectName, payload) {
        if (!(0, _utils.isDefined)(payload.data)) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException('Payload data is required', _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        return {
            ...payload,
            data: await this.actorFromAuthContextService.injectActorFieldsOnCreate({
                records: payload.data,
                objectMetadataNameSingular: objectName,
                authContext
            })
        };
    }
    constructor(actorFromAuthContextService){
        this.actorFromAuthContextService = actorFromAuthContextService;
    }
};
CreatedByCreateManyPreQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)(`*.createMany`),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _actorfromauthcontextservice.ActorFromAuthContextService === "undefined" ? Object : _actorfromauthcontextservice.ActorFromAuthContextService
    ])
], CreatedByCreateManyPreQueryHook);

//# sourceMappingURL=created-by.create-many.pre-query-hook.js.map