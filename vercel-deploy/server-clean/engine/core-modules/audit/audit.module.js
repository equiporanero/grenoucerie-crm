"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuditModule", {
    enumerable: true,
    get: function() {
        return AuditModule;
    }
});
const _common = require("@nestjs/common");
const _clickHousemodule = require("../../../database/clickHouse/clickHouse.module");
const _jwtmodule = require("../jwt/jwt.module");
const _auditresolver = require("./audit.resolver");
const _auditservice = require("./services/audit.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AuditModule = class AuditModule {
};
AuditModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _auditresolver.AuditResolver,
            _auditservice.AuditService
        ],
        imports: [
            _jwtmodule.JwtModule,
            _clickHousemodule.ClickHouseModule
        ],
        exports: [
            _auditservice.AuditService
        ]
    })
], AuditModule);

//# sourceMappingURL=audit.module.js.map