"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StaleRegistrationCleanupModule", {
    enumerable: true,
    get: function() {
        return StaleRegistrationCleanupModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationregistrationentity = require("../../application-registration/application-registration.entity");
const _applicationentity = require("../../application.entity");
const _staleregistrationcleanupcroncommand = require("./commands/stale-registration-cleanup.cron.command");
const _staleregistrationcleanupcronjob = require("./crons/stale-registration-cleanup.cron.job");
const _staleregistrationcleanupservice = require("./services/stale-registration-cleanup.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let StaleRegistrationCleanupModule = class StaleRegistrationCleanupModule {
};
StaleRegistrationCleanupModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationregistrationentity.ApplicationRegistrationEntity,
                _applicationentity.ApplicationEntity
            ])
        ],
        providers: [
            _staleregistrationcleanupservice.StaleRegistrationCleanupService,
            _staleregistrationcleanupcronjob.StaleRegistrationCleanupCronJob,
            _staleregistrationcleanupcroncommand.StaleRegistrationCleanupCronCommand
        ],
        exports: [
            _staleregistrationcleanupcroncommand.StaleRegistrationCleanupCronCommand
        ]
    })
], StaleRegistrationCleanupModule);

//# sourceMappingURL=stale-registration-cleanup.module.js.map