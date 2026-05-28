"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseConfigModule", {
    enumerable: true,
    get: function() {
        return DatabaseConfigModule;
    }
});
const _common = require("@nestjs/common");
const _schedule = require("@nestjs/schedule");
const _typeorm = require("@nestjs/typeorm");
const _keyvaluepairentity = require("../../key-value-pair/key-value-pair.entity");
const _secretencryptionmodule = require("../../secret-encryption/secret-encryption.module");
const _configcacheservice = require("../cache/config-cache.service");
const _configvariables = require("../config-variables");
const _configvariablesinstancetokensconstants = require("../constants/config-variables-instance-tokens.constants");
const _configvalueconverterservice = require("../conversion/config-value-converter.service");
const _databaseconfigdriver = require("./database-config.driver");
const _configstorageservice = require("../storage/config-storage.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DatabaseConfigModule = class DatabaseConfigModule {
    static forRoot() {
        return {
            module: DatabaseConfigModule,
            imports: [
                _typeorm.TypeOrmModule.forFeature([
                    _keyvaluepairentity.KeyValuePairEntity
                ]),
                _schedule.ScheduleModule.forRoot(),
                _secretencryptionmodule.SecretEncryptionModule
            ],
            providers: [
                _databaseconfigdriver.DatabaseConfigDriver,
                _configcacheservice.ConfigCacheService,
                _configstorageservice.ConfigStorageService,
                _configvalueconverterservice.ConfigValueConverterService,
                {
                    provide: _configvariablesinstancetokensconstants.CONFIG_VARIABLES_INSTANCE_TOKEN,
                    useValue: new _configvariables.ConfigVariables()
                }
            ],
            exports: [
                _databaseconfigdriver.DatabaseConfigDriver
            ]
        };
    }
};
DatabaseConfigModule = _ts_decorate([
    (0, _common.Module)({})
], DatabaseConfigModule);

//# sourceMappingURL=database-config.module.js.map