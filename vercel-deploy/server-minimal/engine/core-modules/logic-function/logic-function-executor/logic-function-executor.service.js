"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get LogicFunctionExecutionException () {
        return LogicFunctionExecutionException;
    },
    get LogicFunctionExecutionExceptionCode () {
        return LogicFunctionExecutionExceptionCode;
    },
    get LogicFunctionExecutorService () {
        return LogicFunctionExecutorService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _application = require("twenty-shared/application");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _applicationlogsservice = require("../../application-logs/application-logs.service");
const _parseapplicationloglines = require("../../application-logs/utils/parse-application-log-lines");
const _applicationregistrationvariableentity = require("../../application/application-registration-variable/application-registration-variable.entity");
const _auditservice = require("../../audit/services/audit.service");
const _logicfunctionexecuted = require("../../audit/utils/events/workspace-event/logic-function/logic-function-executed");
const _applicationtokenservice = require("../../auth/token/services/application-token.service");
const _billingusageservice = require("../../billing/services/billing-usage.service");
const _billingservice = require("../../billing/services/billing.service");
const _logicfunctiondriverfactory = require("../logic-function-drivers/logic-function-driver.factory");
const _buildenvvar = require("./utils/build-env-var");
const _secretencryptionservice = require("../../secret-encryption/secret-encryption.service");
const _throttlerservice = require("../../throttler/throttler.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _usagerecordedconstant = require("../../usage/constants/usage-recorded.constant");
const _usageoperationtypeenum = require("../../usage/enums/usage-operation-type.enum");
const _usageresourcetypeenum = require("../../usage/enums/usage-resource-type.enum");
const _usageunitenum = require("../../usage/enums/usage-unit.enum");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _subscriptionchannelenum = require("../../../subscriptions/enums/subscription-channel.enum");
const _subscriptionservice = require("../../../subscriptions/subscription.service");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _workspaceeventemitter = require("../../../workspace-event-emitter/workspace-event-emitter");
const _cleanserverurl = require("../../../../utils/clean-server-url");
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
let LogicFunctionExecutionException = class LogicFunctionExecutionException extends Error {
    constructor(message, code){
        super(message), this.code = code;
        this.name = 'LogicFunctionExecutionException';
    }
};
var LogicFunctionExecutionExceptionCode = /*#__PURE__*/ function(LogicFunctionExecutionExceptionCode) {
    LogicFunctionExecutionExceptionCode["LOGIC_FUNCTION_NOT_FOUND"] = "LOGIC_FUNCTION_NOT_FOUND";
    LogicFunctionExecutionExceptionCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    return LogicFunctionExecutionExceptionCode;
}({});
let LogicFunctionExecutorService = class LogicFunctionExecutorService {
    async execute({ logicFunctionId, workspaceId, payload, userId, userWorkspaceId }) {
        await this.throttleExecution(workspaceId);
        const { flatApplication, flatLogicFunction, flatApplicationVariables } = await this.getFlatEntitiesOrThrow({
            workspaceId,
            logicFunctionId
        });
        const envVariables = await this.getExecutionEnvVariables({
            workspaceId,
            flatApplication,
            flatApplicationVariables,
            userId,
            userWorkspaceId
        });
        const driver = this.logicFunctionDriverFactory.getCurrentDriver();
        let resultLogicFunction;
        try {
            resultLogicFunction = await driver.execute({
                flatLogicFunction,
                flatApplication,
                applicationUniversalIdentifier: flatApplication.universalIdentifier,
                payload,
                env: envVariables,
                timeoutMs: flatLogicFunction.timeoutSeconds * 1_000
            });
        } catch (error) {
            this.logger.error(`Logic function execution failed: ` + `functionId=${logicFunctionId}, ` + `workspaceId=${workspaceId}, ` + `driver=${driver.constructor.name}: ` + `${error instanceof Error ? error.message : String(error)}`, error instanceof Error ? error.stack : undefined);
            throw error;
        }
        await this.handleExecutionResult({
            result: resultLogicFunction,
            flatApplication,
            flatLogicFunction,
            workspaceId
        });
        return resultLogicFunction;
    }
    async transpile(params) {
        const driver = this.logicFunctionDriverFactory.getCurrentDriver();
        return driver.transpile(params);
    }
    async throttleExecution(workspaceId) {
        try {
            await this.throttlerService.tokenBucketThrottleOrThrow(`${workspaceId}-logic-function-execution`, 1, this.twentyConfigService.get('LOGIC_FUNCTION_EXEC_THROTTLE_LIMIT'), this.twentyConfigService.get('LOGIC_FUNCTION_EXEC_THROTTLE_TTL'));
        } catch  {
            throw new LogicFunctionExecutionException('Logic function execution rate limit exceeded', "RATE_LIMIT_EXCEEDED");
        }
    }
    async getFlatEntitiesOrThrow({ workspaceId, logicFunctionId }) {
        const { flatLogicFunctionMaps, flatApplicationMaps, applicationVariableMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatLogicFunctionMaps',
            'flatApplicationMaps',
            'applicationVariableMaps'
        ]);
        const flatLogicFunction = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: logicFunctionId,
            flatEntityMaps: flatLogicFunctionMaps
        });
        if (!(0, _utils.isDefined)(flatLogicFunction) || (0, _utils.isDefined)(flatLogicFunction.deletedAt)) {
            throw new LogicFunctionExecutionException(`Logic function with id ${logicFunctionId} not found`, "LOGIC_FUNCTION_NOT_FOUND");
        }
        const flatApplication = (0, _utils.isDefined)(flatLogicFunction.applicationId) ? flatApplicationMaps.byId[flatLogicFunction.applicationId] : undefined;
        if (!(0, _utils.isDefined)(flatApplication)) {
            throw new LogicFunctionExecutionException(`Application not found for logic function ${logicFunctionId}`, "LOGIC_FUNCTION_NOT_FOUND");
        }
        const flatApplicationVariableUniversalIdentifiers = applicationVariableMaps.universalIdentifiersByApplicationId[flatApplication.id] ?? [];
        const flatApplicationVariables = flatApplicationVariableUniversalIdentifiers.map((universalIdentifier)=>applicationVariableMaps.byUniversalIdentifier[universalIdentifier]).filter(_utils.isDefined);
        return {
            flatApplication,
            flatLogicFunction,
            flatApplicationVariables
        };
    }
    async getExecutionEnvVariables({ workspaceId, flatApplication, flatApplicationVariables, userId, userWorkspaceId }) {
        const applicationAccessToken = await this.applicationTokenService.generateApplicationAccessToken({
            workspaceId,
            applicationId: flatApplication.id,
            userId,
            userWorkspaceId
        });
        const baseUrl = (0, _cleanserverurl.cleanServerUrl)(this.twentyConfigService.get('SERVER_URL'));
        const serverVariables = await this.buildServerVariableEnvMap(flatApplication.applicationRegistrationId);
        const workspaceVariables = (0, _buildenvvar.buildEnvVar)(flatApplicationVariables, this.secretEncryptionService);
        return {
            [_application.DEFAULT_API_URL_NAME]: baseUrl ?? '',
            [_application.DEFAULT_APP_ACCESS_TOKEN_NAME]: applicationAccessToken.token,
            [_application.DEFAULT_API_KEY_NAME]: applicationAccessToken.token,
            APPLICATION_ID: flatApplication.id,
            // Server variables first, workspace variables override. Workspace-level
            // values let a specific tenant customize a server default.
            ...serverVariables,
            ...workspaceVariables
        };
    }
    // Resolves encrypted server-level variables (ApplicationRegistrationVariable)
    // for the application's registration. Returns an empty object when the
    // application isn't linked to a registration (legacy LOCAL apps).
    //
    // Runs on every logic function execution — the query is indexed on
    // applicationRegistrationId and filters unfilled rows server-side. Most
    // apps have 0-3 server variables so the round-trip is cheap, but if this
    // becomes a hot path, move to a WorkspaceCacheProvider mirroring
    // WorkspaceApplicationVariableMapCacheService.
    async buildServerVariableEnvMap(applicationRegistrationId) {
        if (!(0, _utils.isDefined)(applicationRegistrationId)) {
            return {};
        }
        const serverVariables = await this.applicationRegistrationVariableRepository.find({
            where: {
                applicationRegistrationId,
                encryptedValue: (0, _typeorm1.Not)('')
            }
        });
        const envMap = {};
        // ApplicationRegistrationVariable.encryptedValue is always written
        // encrypted (ApplicationRegistrationVariableService.createVariable and
        // .updateVariable call encrypt unconditionally), independent of
        // `isSecret`. `isSecret` is display metadata — the storage contract is
        // not conditional, so decryption isn't either.
        //
        // Registration variables are server-level config — any installed
        // application across any workspace must be able to read them — so they
        // use the instance-scoped versioned envelope (no workspaceId in the HKDF
        // info).
        for (const variable of serverVariables){
            envMap[variable.key] = this.secretEncryptionService.decryptVersioned(variable.encryptedValue);
        }
        return envMap;
    }
    async handleExecutionResult({ result, flatApplication, flatLogicFunction, workspaceId }) {
        const executionId = (0, _uuid.v4)();
        const parsedLines = (0, _parseapplicationloglines.parseApplicationLogLines)(result.logs);
        const logEntries = parsedLines.map((line)=>({
                ...line,
                workspaceId,
                applicationId: flatApplication.id,
                logicFunctionId: flatLogicFunction.id,
                logicFunctionName: flatLogicFunction.name,
                executionId
            }));
        void this.applicationLogsService.writeLogs(logEntries).catch((error)=>{
            this.logger.error('Failed to persist application logs', error);
        });
        await this.subscriptionService.publish({
            channel: _subscriptionchannelenum.SubscriptionChannel.LOGIC_FUNCTION_LOGS_CHANNEL,
            workspaceId,
            payload: {
                logicFunctionLogs: {
                    logs: result.logs,
                    id: flatLogicFunction.id,
                    name: flatLogicFunction.name,
                    universalIdentifier: flatLogicFunction.universalIdentifier,
                    applicationId: flatApplication.id,
                    applicationUniversalIdentifier: flatApplication.universalIdentifier
                }
            }
        });
        void this.auditService.createContext({
            workspaceId
        }).insertWorkspaceEvent(_logicfunctionexecuted.LOGIC_FUNCTION_EXECUTED_EVENT, {
            duration: result.duration,
            status: result.status,
            ...result.error && {
                errorType: result.error.errorType
            },
            functionId: flatLogicFunction.id,
            functionName: flatLogicFunction.name
        });
        let periodStart;
        if (this.billingService.isBillingEnabled()) {
            const { billingSubscription: { currentPeriodStart } } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
                'billingSubscription'
            ]);
            periodStart = currentPeriodStart;
            await this.billingUsageService.decrementAvailableCreditsInCache({
                workspaceId,
                usedCredits: 100
            });
        }
        this.workspaceEventEmitter.emitCustomBatchEvent(_usagerecordedconstant.USAGE_RECORDED, [
            {
                resourceType: _usageresourcetypeenum.UsageResourceType.LOGIC_FUNCTION,
                operationType: _usageoperationtypeenum.UsageOperationType.CODE_EXECUTION,
                creditsUsedMicro: 100,
                quantity: 1,
                unit: _usageunitenum.UsageUnit.INVOCATION,
                resourceId: flatLogicFunction.id,
                periodStart
            }
        ], workspaceId);
    }
    constructor(logicFunctionDriverFactory, throttlerService, twentyConfigService, workspaceCacheService, applicationTokenService, secretEncryptionService, subscriptionService, auditService, applicationLogsService, workspaceEventEmitter, billingService, billingUsageService, applicationRegistrationVariableRepository){
        this.logicFunctionDriverFactory = logicFunctionDriverFactory;
        this.throttlerService = throttlerService;
        this.twentyConfigService = twentyConfigService;
        this.workspaceCacheService = workspaceCacheService;
        this.applicationTokenService = applicationTokenService;
        this.secretEncryptionService = secretEncryptionService;
        this.subscriptionService = subscriptionService;
        this.auditService = auditService;
        this.applicationLogsService = applicationLogsService;
        this.workspaceEventEmitter = workspaceEventEmitter;
        this.billingService = billingService;
        this.billingUsageService = billingUsageService;
        this.applicationRegistrationVariableRepository = applicationRegistrationVariableRepository;
        this.logger = new _common.Logger(LogicFunctionExecutorService.name);
    }
};
LogicFunctionExecutorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(12, (0, _typeorm.InjectRepository)(_applicationregistrationvariableentity.ApplicationRegistrationVariableEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctiondriverfactory.LogicFunctionDriverFactory === "undefined" ? Object : _logicfunctiondriverfactory.LogicFunctionDriverFactory,
        typeof _throttlerservice.ThrottlerService === "undefined" ? Object : _throttlerservice.ThrottlerService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _applicationtokenservice.ApplicationTokenService === "undefined" ? Object : _applicationtokenservice.ApplicationTokenService,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService,
        typeof _subscriptionservice.SubscriptionService === "undefined" ? Object : _subscriptionservice.SubscriptionService,
        typeof _auditservice.AuditService === "undefined" ? Object : _auditservice.AuditService,
        typeof _applicationlogsservice.ApplicationLogsService === "undefined" ? Object : _applicationlogsservice.ApplicationLogsService,
        typeof _workspaceeventemitter.WorkspaceEventEmitter === "undefined" ? Object : _workspaceeventemitter.WorkspaceEventEmitter,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _billingusageservice.BillingUsageService === "undefined" ? Object : _billingusageservice.BillingUsageService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], LogicFunctionExecutorService);

//# sourceMappingURL=logic-function-executor.service.js.map