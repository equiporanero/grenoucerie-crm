/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RowLevelPermissionModule", {
    enumerable: true,
    get: function() {
        return RowLevelPermissionModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _billingmodule = require("../../core-modules/billing/billing.module");
const _enterprisemodule = require("../../core-modules/enterprise/enterprise.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _rowlevelpermissionpredicategroupentity = require("./entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("./entities/row-level-permission-predicate.entity");
const _rowlevelpermissionpredicategroupservice = require("./services/row-level-permission-predicate-group.service");
const _rowlevelpermissionpredicateservice = require("./services/row-level-permission-predicate.service");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RowLevelPermissionModule = class RowLevelPermissionModule {
};
RowLevelPermissionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity,
                _rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity
            ]),
            _workspacecachemodule.WorkspaceCacheModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _billingmodule.BillingModule,
            _applicationmodule.ApplicationModule,
            _enterprisemodule.EnterpriseModule
        ],
        providers: [
            _rowlevelpermissionpredicateservice.RowLevelPermissionPredicateService,
            _rowlevelpermissionpredicategroupservice.RowLevelPermissionPredicateGroupService
        ],
        exports: [
            _rowlevelpermissionpredicateservice.RowLevelPermissionPredicateService,
            _rowlevelpermissionpredicategroupservice.RowLevelPermissionPredicateGroupService
        ]
    })
], RowLevelPermissionModule);

//# sourceMappingURL=row-level-permission.module.js.map