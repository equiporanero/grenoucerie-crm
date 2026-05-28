"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationPackageModule", {
    enumerable: true,
    get: function() {
        return ApplicationPackageModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationpackagefetcherservice = require("./application-package-fetcher.service");
const _applicationversionvalidationservice = require("./application-version-validation.service");
const _applicationentity = require("../application.entity");
const _filestoragemodule = require("../../file-storage/file-storage.module");
const _fileentity = require("../../file/entities/file.entity");
const _securehttpclientmodule = require("../../secure-http-client/secure-http-client.module");
const _twentyconfigmodule = require("../../twenty-config/twenty-config.module");
const _upgrademodule = require("../../upgrade/upgrade.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationPackageModule = class ApplicationPackageModule {
};
ApplicationPackageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _filestoragemodule.FileStorageModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _twentyconfigmodule.TwentyConfigModule,
            _upgrademodule.UpgradeModule,
            _typeorm.TypeOrmModule.forFeature([
                _fileentity.FileEntity,
                _applicationentity.ApplicationEntity
            ])
        ],
        providers: [
            _applicationpackagefetcherservice.ApplicationPackageFetcherService,
            _applicationversionvalidationservice.ApplicationVersionValidationService
        ],
        exports: [
            _applicationpackagefetcherservice.ApplicationPackageFetcherService,
            _applicationversionvalidationservice.ApplicationVersionValidationService
        ]
    })
], ApplicationPackageModule);

//# sourceMappingURL=application-package.module.js.map