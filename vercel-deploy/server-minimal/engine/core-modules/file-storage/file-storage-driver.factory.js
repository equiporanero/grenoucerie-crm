"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileStorageDriverFactory", {
    enumerable: true,
    get: function() {
        return FileStorageDriverFactory;
    }
});
const _common = require("@nestjs/common");
const _credentialproviders = require("@aws-sdk/credential-providers");
const _filestorageinterface = require("./interfaces/file-storage.interface");
const _localdriver = require("./drivers/local.driver");
const _s3driver = require("./drivers/s3.driver");
const _validatedstoragedriver = require("./drivers/validated-storage.driver");
const _dynamicfactorybase = require("../twenty-config/dynamic-factory.base");
const _configvariablesgroupenum = require("../twenty-config/enums/config-variables-group.enum");
const _configgrouphashservice = require("../twenty-config/services/config-group-hash.service");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
const _resolveabsolutepath = require("../../../utils/resolve-absolute-path");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FileStorageDriverFactory = class FileStorageDriverFactory extends _dynamicfactorybase.DriverFactoryBase {
    buildConfigKey() {
        const storageType = this.twentyConfigService.get('STORAGE_TYPE');
        if (storageType === _filestorageinterface.StorageDriverType.LOCAL) {
            const storagePath = this.twentyConfigService.get('STORAGE_LOCAL_PATH');
            return `local|${storagePath}`;
        }
        if (storageType === _filestorageinterface.StorageDriverType.S_3) {
            const storageConfigHash = this.configGroupHashService.computeHash(_configvariablesgroupenum.ConfigVariablesGroup.STORAGE_CONFIG);
            return `s3|${storageConfigHash}`;
        }
        throw new Error(`Unsupported storage type: ${storageType}`);
    }
    createDriver() {
        const storageType = this.twentyConfigService.get('STORAGE_TYPE');
        let rawDriver;
        switch(storageType){
            case _filestorageinterface.StorageDriverType.LOCAL:
                {
                    const storagePath = this.twentyConfigService.get('STORAGE_LOCAL_PATH');
                    rawDriver = new _localdriver.LocalDriver({
                        storagePath: (0, _resolveabsolutepath.resolveAbsolutePath)(storagePath)
                    });
                    break;
                }
            case _filestorageinterface.StorageDriverType.S_3:
                {
                    const bucketName = this.twentyConfigService.get('STORAGE_S3_NAME');
                    const endpoint = this.twentyConfigService.get('STORAGE_S3_ENDPOINT');
                    const region = this.twentyConfigService.get('STORAGE_S3_REGION');
                    const accessKeyId = this.twentyConfigService.get('STORAGE_S3_ACCESS_KEY_ID');
                    const secretAccessKey = this.twentyConfigService.get('STORAGE_S3_SECRET_ACCESS_KEY');
                    const presignEnabled = this.twentyConfigService.get('STORAGE_S3_PRESIGNED_URL_ENABLED');
                    const presignEndpointOverride = this.twentyConfigService.get('STORAGE_S3_PRESIGNED_URL_BASE');
                    rawDriver = new _s3driver.S3Driver({
                        bucketName: bucketName ?? '',
                        endpoint: endpoint,
                        presignEnabled,
                        presignEndpoint: presignEndpointOverride || undefined,
                        credentials: accessKeyId ? {
                            accessKeyId,
                            secretAccessKey
                        } : (0, _credentialproviders.fromNodeProviderChain)({
                            clientConfig: {
                                region
                            }
                        }),
                        forcePathStyle: true,
                        region: region ?? ''
                    });
                    break;
                }
            default:
                throw new Error(`Invalid storage driver type: ${storageType}`);
        }
        return new _validatedstoragedriver.ValidatedStorageDriver(rawDriver);
    }
    constructor(twentyConfigService, configGroupHashService){
        super(twentyConfigService, configGroupHashService);
    }
};
FileStorageDriverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _configgrouphashservice.ConfigGroupHashService === "undefined" ? Object : _configgrouphashservice.ConfigGroupHashService
    ])
], FileStorageDriverFactory);

//# sourceMappingURL=file-storage-driver.factory.js.map