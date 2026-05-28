"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouteTriggerService", {
    enumerable: true,
    get: function() {
        return RouteTriggerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _pathtoregexp = require("path-to-regexp");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _accesstokenservice = require("../../../../auth/token/services/access-token.service");
const _workspacedomainsservice = require("../../../../domain/workspace-domains/services/workspace-domains.service");
const _routetriggerexception = require("./exceptions/route-trigger.exception");
const _buildlogicfunctioneventutil = require("./utils/build-logic-function-event.util");
const _logicfunctionexception = require("../../../../../metadata-modules/logic-function/logic-function.exception");
const _logicfunctionentity = require("../../../../../metadata-modules/logic-function/logic-function.entity");
const _logicfunctionexecutorservice = require("../../../logic-function-executor/logic-function-executor.service");
const _customexception = require("../../../../../../utils/custom-exception");
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
let RouteTriggerService = class RouteTriggerService {
    async getLogicFunctionWithPathParamsOrFail({ request, httpMethod }) {
        const host = `${request.protocol}://${request.get('host')}`;
        const { workspace, publicDomain } = await this.workspaceDomainsService.resolveWorkspaceAndPublicDomain(host);
        (0, _utils.assertIsDefinedOrThrow)(workspace, new _routetriggerexception.RouteTriggerException('Workspace not found', _routetriggerexception.RouteTriggerExceptionCode.WORKSPACE_NOT_FOUND));
        // App-scoped public domain → restrict matches to that app's logic functions.
        const applicationId = publicDomain?.applicationId ?? null;
        const logicFunctionsWithHttpRouteTrigger = await this.logicFunctionRepository.find({
            where: {
                workspaceId: workspace.id,
                httpRouteTriggerSettings: (0, _typeorm1.Not)((0, _typeorm1.IsNull)()),
                ...(0, _utils.isDefined)(applicationId) ? {
                    applicationId
                } : {}
            }
        });
        const requestPath = request.path.replace(/^\/s\//, '/');
        for (const logicFunction of logicFunctionsWithHttpRouteTrigger){
            const httpRouteSettings = logicFunction.httpRouteTriggerSettings;
            if (!(0, _utils.isDefined)(httpRouteSettings) || httpRouteSettings.httpMethod !== httpMethod) {
                continue;
            }
            const routeMatcher = (0, _pathtoregexp.match)(httpRouteSettings.path, {
                decode: decodeURIComponent
            });
            const routeMatched = routeMatcher(requestPath);
            if (routeMatched) {
                return {
                    logicFunction,
                    pathParams: routeMatched.params
                };
            }
        }
        throw new _routetriggerexception.RouteTriggerException('No Route trigger found', _routetriggerexception.RouteTriggerExceptionCode.TRIGGER_NOT_FOUND);
    }
    async validateWorkspaceFromRequest({ request, workspaceId }) {
        const authContext = await this.accessTokenService.validateTokenByRequest(request);
        if (!(0, _utils.isDefined)(authContext.workspace)) {
            throw new _routetriggerexception.RouteTriggerException('Workspace not found', _routetriggerexception.RouteTriggerExceptionCode.WORKSPACE_NOT_FOUND);
        }
        if (authContext.workspace.id !== workspaceId) {
            throw new _routetriggerexception.RouteTriggerException('You are not authorized', _routetriggerexception.RouteTriggerExceptionCode.FORBIDDEN_EXCEPTION);
        }
        return authContext;
    }
    mapErrorToRouteTriggerCode(error) {
        if (error instanceof _logicfunctionexecutorservice.LogicFunctionExecutionException) {
            switch(error.code){
                case _logicfunctionexecutorservice.LogicFunctionExecutionExceptionCode.LOGIC_FUNCTION_NOT_FOUND:
                    return _routetriggerexception.RouteTriggerExceptionCode.LOGIC_FUNCTION_NOT_FOUND;
                case _logicfunctionexecutorservice.LogicFunctionExecutionExceptionCode.RATE_LIMIT_EXCEEDED:
                    return _routetriggerexception.RouteTriggerExceptionCode.RATE_LIMIT_EXCEEDED;
            }
        }
        if (error instanceof _logicfunctionexception.LogicFunctionException && error.code === _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_NOT_FOUND) {
            return _routetriggerexception.RouteTriggerExceptionCode.LOGIC_FUNCTION_NOT_FOUND;
        }
        return _routetriggerexception.RouteTriggerExceptionCode.LOGIC_FUNCTION_EXECUTION_ERROR;
    }
    async handle({ request, httpMethod }) {
        const { logicFunction, pathParams } = await this.getLogicFunctionWithPathParamsOrFail({
            request,
            httpMethod
        });
        const httpRouteSettings = logicFunction.httpRouteTriggerSettings;
        let userWorkspaceId = null;
        let userId = null;
        if (httpRouteSettings?.isAuthRequired) {
            const authContext = await this.validateWorkspaceFromRequest({
                request,
                workspaceId: logicFunction.workspaceId
            });
            userWorkspaceId = authContext.userWorkspaceId ?? null;
            userId = authContext.user?.id ?? null;
        }
        const event = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: pathParams,
            forwardedRequestHeaders: httpRouteSettings?.forwardedRequestHeaders ?? [],
            userWorkspaceId
        });
        let result;
        try {
            result = await this.logicFunctionExecutorService.execute({
                logicFunctionId: logicFunction.id,
                workspaceId: logicFunction.workspaceId,
                payload: event,
                ...userId ? {
                    userId
                } : {},
                ...userWorkspaceId ? {
                    userWorkspaceId
                } : {}
            });
        } catch (error) {
            if (error instanceof _routetriggerexception.RouteTriggerException) {
                throw error;
            }
            this.logger.error(`Unexpected error executing logic function ${logicFunction.id}: ${error instanceof Error ? error.message : String(error)}`, error instanceof Error ? error.stack : undefined);
            const code = this.mapErrorToRouteTriggerCode(error);
            throw new _routetriggerexception.RouteTriggerException(`Logic function execution failed for ${logicFunction.id}`, code, {
                userFriendlyMessage: error instanceof _customexception.CustomException ? error.userFriendlyMessage : undefined
            });
        }
        if (!(0, _utils.isDefined)(result)) {
            return result;
        }
        if (result.error) {
            throw new _routetriggerexception.RouteTriggerException(result.error.errorMessage, _routetriggerexception.RouteTriggerExceptionCode.LOGIC_FUNCTION_EXECUTION_ERROR);
        }
        return result.data;
    }
    constructor(accessTokenService, logicFunctionExecutorService, workspaceDomainsService, logicFunctionRepository){
        this.accessTokenService = accessTokenService;
        this.logicFunctionExecutorService = logicFunctionExecutorService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.logicFunctionRepository = logicFunctionRepository;
        this.logger = new _common.Logger(RouteTriggerService.name);
    }
};
RouteTriggerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_logicfunctionentity.LogicFunctionEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _accesstokenservice.AccessTokenService === "undefined" ? Object : _accesstokenservice.AccessTokenService,
        typeof _logicfunctionexecutorservice.LogicFunctionExecutorService === "undefined" ? Object : _logicfunctionexecutorservice.LogicFunctionExecutorService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], RouteTriggerService);

//# sourceMappingURL=route-trigger.service.js.map