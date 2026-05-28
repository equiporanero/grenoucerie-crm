"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailModule", {
    enumerable: true,
    get: function() {
        return EmailModule;
    }
});
const _common = require("@nestjs/common");
const _emaildriverfactory = require("./email-driver.factory");
const _emailsenderservice = require("./email-sender.service");
const _emailservice = require("./email.service");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EmailModule = class EmailModule {
    static forRoot() {
        return {
            module: EmailModule,
            imports: [
                _twentyconfigmodule.TwentyConfigModule
            ],
            providers: [
                _emaildriverfactory.EmailDriverFactory,
                _emailsenderservice.EmailSenderService,
                _emailservice.EmailService
            ],
            exports: [
                _emailsenderservice.EmailSenderService,
                _emailservice.EmailService
            ]
        };
    }
};
EmailModule = _ts_decorate([
    (0, _common.Global)()
], EmailModule);

//# sourceMappingURL=email.module.js.map