"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationVariableModule", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationVariableModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationregistrationvariableentity = require("./application-registration-variable.entity");
const _applicationregistrationvariableservice = require("./application-registration-variable.service");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
const _secretencryptionmodule = require("../../secret-encryption/secret-encryption.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationRegistrationVariableModule = class ApplicationRegistrationVariableModule {
};
ApplicationRegistrationVariableModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationregistrationvariableentity.ApplicationRegistrationVariableEntity,
                _applicationregistrationentity.ApplicationRegistrationEntity
            ]),
            _secretencryptionmodule.SecretEncryptionModule
        ],
        providers: [
            _applicationregistrationvariableservice.ApplicationRegistrationVariableService
        ],
        exports: [
            _applicationregistrationvariableservice.ApplicationRegistrationVariableService
        ]
    })
], ApplicationRegistrationVariableModule);

//# sourceMappingURL=application-registration-variable.module.js.map