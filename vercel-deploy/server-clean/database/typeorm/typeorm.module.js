"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TypeORMModule", {
    enumerable: true,
    get: function() {
        return TypeORMModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _coredatasource = require("./core/core.datasource");
const _databasegaugeservice = require("./database-gauge.service");
const _metricsmodule = require("../../engine/core-modules/metrics/metrics.module");
const _installupgradeawarerepositoryproxy = require("../../engine/twenty-orm/upgrade-aware/install-upgrade-aware-repository-proxy");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TypeORMModule = class TypeORMModule {
};
TypeORMModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forRootAsync({
                useFactory: ()=>_coredatasource.typeORMCoreModuleOptions,
                dataSourceFactory: async (options)=>{
                    const dataSource = new _typeorm1.DataSource(options);
                    await dataSource.initialize();
                    (0, _installupgradeawarerepositoryproxy.installUpgradeAwareRepositoryProxy)(dataSource);
                    return dataSource;
                }
            }),
            _metricsmodule.MetricsModule
        ],
        providers: [
            _databasegaugeservice.DatabaseGaugeService
        ],
        exports: []
    })
], TypeORMModule);

//# sourceMappingURL=typeorm.module.js.map