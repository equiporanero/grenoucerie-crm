"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftCalendarDriverModule", {
    enumerable: true,
    get: function() {
        return MicrosoftCalendarDriverModule;
    }
});
const _common = require("@nestjs/common");
const _microsoftcalendargeteventsservice = require("./services/microsoft-calendar-get-events.service");
const _microsoftcalendarimporteventsservice = require("./services/microsoft-calendar-import-events.service");
const _oauth2clientmanagermodule = require("../../../../connected-account/oauth2-client-manager/oauth2-client-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MicrosoftCalendarDriverModule = class MicrosoftCalendarDriverModule {
};
MicrosoftCalendarDriverModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _oauth2clientmanagermodule.OAuth2ClientManagerModule
        ],
        providers: [
            _microsoftcalendargeteventsservice.MicrosoftCalendarGetEventsService,
            _microsoftcalendarimporteventsservice.MicrosoftCalendarImportEventsService
        ],
        exports: [
            _microsoftcalendargeteventsservice.MicrosoftCalendarGetEventsService,
            _microsoftcalendarimporteventsservice.MicrosoftCalendarImportEventsService
        ]
    })
], MicrosoftCalendarDriverModule);

//# sourceMappingURL=microsoft-calendar-driver.module.js.map