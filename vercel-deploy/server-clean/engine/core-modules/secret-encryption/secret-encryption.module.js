"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SecretEncryptionModule", {
    enumerable: true,
    get: function() {
        return SecretEncryptionModule;
    }
});
const _common = require("@nestjs/common");
const _secretencryptionservice = require("./secret-encryption.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SecretEncryptionModule = class SecretEncryptionModule {
};
SecretEncryptionModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _secretencryptionservice.SecretEncryptionService
        ],
        exports: [
            _secretencryptionservice.SecretEncryptionService
        ]
    })
], SecretEncryptionModule);

//# sourceMappingURL=secret-encryption.module.js.map