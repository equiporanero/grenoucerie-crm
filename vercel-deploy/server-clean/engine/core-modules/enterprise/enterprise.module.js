/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnterpriseModule", {
    enumerable: true,
    get: function() {
        return EnterpriseModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _apptokenentity = require("../app-token/app-token.entity");
const _enterprisekeyvalidationcronjob = require("./cron/jobs/enterprise-key-validation.cron.job");
const _enterpriseresolver = require("./enterprise.resolver");
const _enterpriseplanservice = require("./services/enterprise-plan.service");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EnterpriseModule = class EnterpriseModule {
};
EnterpriseModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _twentyconfigmodule.TwentyConfigModule,
            _typeorm.TypeOrmModule.forFeature([
                _userworkspaceentity.UserWorkspaceEntity,
                _apptokenentity.AppTokenEntity
            ])
        ],
        providers: [
            _enterpriseplanservice.EnterprisePlanService,
            _enterprisekeyvalidationcronjob.EnterpriseKeyValidationCronJob,
            _enterpriseresolver.EnterpriseResolver
        ],
        exports: [
            _enterpriseplanservice.EnterprisePlanService,
            _enterprisekeyvalidationcronjob.EnterpriseKeyValidationCronJob
        ]
    })
], EnterpriseModule);

//# sourceMappingURL=enterprise.module.js.map