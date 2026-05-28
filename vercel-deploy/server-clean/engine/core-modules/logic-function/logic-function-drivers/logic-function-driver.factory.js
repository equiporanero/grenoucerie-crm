"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionDriverFactory", {
    enumerable: true,
    get: function() {
        return LogicFunctionDriverFactory;
    }
});
const _common = require("@nestjs/common");
const _credentialproviders = require("@aws-sdk/credential-providers");
const _logicfunctiondriverinterface = require("./interfaces/logic-function-driver.interface");
const _cachelockservice = require("../../cache-lock/cache-lock.service");
const _disableddriver = require("./drivers/disabled.driver");
const _lambdadriver = require("./drivers/lambda.driver");
const _localdriver = require("./drivers/local.driver");
const _logicfunctionresourceservice = require("../logic-function-resource/logic-function-resource.service");
const _sdkclientarchiveservice = require("../../sdk-client/sdk-client-archive.service");
const _dynamicfactorybase = require("../../twenty-config/dynamic-factory.base");
const _configvariablesgroupenum = require("../../twenty-config/enums/config-variables-group.enum");
const _configgrouphashservice = require("../../twenty-config/services/config-group-hash.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LogicFunctionDriverFactory = class LogicFunctionDriverFactory extends _dynamicfactorybase.DriverFactoryBase {
    buildConfigKey() {
        const driverType = this.twentyConfigService.get('LOGIC_FUNCTION_TYPE');
        if (driverType === _logicfunctiondriverinterface.LogicFunctionDriverType.LAMBDA) {
            return `lambda|${this.configGroupHashService.computeHash(_configvariablesgroupenum.ConfigVariablesGroup.LOGIC_FUNCTION_CONFIG)}`;
        }
        return driverType;
    }
    createDriver() {
        const driverType = this.twentyConfigService.get('LOGIC_FUNCTION_TYPE');
        switch(driverType){
            case _logicfunctiondriverinterface.LogicFunctionDriverType.DISABLED:
                return new _disableddriver.DisabledDriver();
            case _logicfunctiondriverinterface.LogicFunctionDriverType.LOCAL:
                return new _localdriver.LocalDriver({
                    logicFunctionResourceService: this.logicFunctionResourceService,
                    sdkClientArchiveService: this.sdkClientArchiveService,
                    cacheLockService: this.cacheLockService,
                    workspaceCacheService: this.workspaceCacheService
                });
            case _logicfunctiondriverinterface.LogicFunctionDriverType.LAMBDA:
                {
                    const region = this.twentyConfigService.get('LOGIC_FUNCTION_LAMBDA_REGION');
                    const accessKeyId = this.twentyConfigService.get('LOGIC_FUNCTION_LAMBDA_ACCESS_KEY_ID');
                    const secretAccessKey = this.twentyConfigService.get('LOGIC_FUNCTION_LAMBDA_SECRET_ACCESS_KEY');
                    const lambdaRole = this.twentyConfigService.get('LOGIC_FUNCTION_LAMBDA_ROLE');
                    const subhostingRole = this.twentyConfigService.get('LOGIC_FUNCTION_LAMBDA_SUBHOSTING_ROLE');
                    const s3BucketName = this.twentyConfigService.get('STORAGE_S3_NAME');
                    const layerBucket = this.twentyConfigService.get('LOGIC_FUNCTION_LAMBDA_LAYER_BUCKET') ?? s3BucketName ?? 'twenty-lambda-layer';
                    const layerBucketRegion = this.twentyConfigService.get('LOGIC_FUNCTION_LAMBDA_LAYER_BUCKET_REGION') ?? region;
                    return new _lambdadriver.LambdaDriver({
                        logicFunctionResourceService: this.logicFunctionResourceService,
                        cacheLockService: this.cacheLockService,
                        credentials: accessKeyId ? {
                            accessKeyId,
                            secretAccessKey
                        } : (0, _credentialproviders.fromNodeProviderChain)({
                            clientConfig: {
                                region
                            }
                        }),
                        region,
                        lambdaRole,
                        subhostingRole,
                        layerBucket,
                        layerBucketRegion,
                        sdkClientArchiveService: this.sdkClientArchiveService
                    });
                }
            default:
                throw new Error(`Invalid logic function driver type (${driverType}), check your .env file`);
        }
    }
    constructor(twentyConfigService, configGroupHashService, logicFunctionResourceService, sdkClientArchiveService, cacheLockService, workspaceCacheService){
        super(twentyConfigService, configGroupHashService), this.logicFunctionResourceService = logicFunctionResourceService, this.sdkClientArchiveService = sdkClientArchiveService, this.cacheLockService = cacheLockService, this.workspaceCacheService = workspaceCacheService;
    }
};
LogicFunctionDriverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _configgrouphashservice.ConfigGroupHashService === "undefined" ? Object : _configgrouphashservice.ConfigGroupHashService,
        typeof _logicfunctionresourceservice.LogicFunctionResourceService === "undefined" ? Object : _logicfunctionresourceservice.LogicFunctionResourceService,
        typeof _sdkclientarchiveservice.SdkClientArchiveService === "undefined" ? Object : _sdkclientarchiveservice.SdkClientArchiveService,
        typeof _cachelockservice.CacheLockService === "undefined" ? Object : _cachelockservice.CacheLockService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], LogicFunctionDriverFactory);

//# sourceMappingURL=logic-function-driver.factory.js.map