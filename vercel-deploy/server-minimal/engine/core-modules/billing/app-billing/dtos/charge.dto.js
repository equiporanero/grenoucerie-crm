/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChargeDto", {
    enumerable: true,
    get: function() {
        return ChargeDto;
    }
});
const _classvalidator = require("class-validator");
const _usageoperationtypeenum = require("../../../usage/enums/usage-operation-type.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
// $1000 in micro-credits (1 USD = 1_000_000 micro-credits). Bounds a single
// charge so a compromised or buggy app can't drain credits in one request.
const MAX_CREDITS_USED_MICRO_PER_CHARGE = 1_000_000_000;
const MAX_QUANTITY_PER_CHARGE = 10_000;
let ChargeDto = class ChargeDto {
};
_ts_decorate([
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.Max)(MAX_CREDITS_USED_MICRO_PER_CHARGE),
    _ts_metadata("design:type", Number)
], ChargeDto.prototype, "creditsUsedMicro", void 0);
_ts_decorate([
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.Max)(MAX_QUANTITY_PER_CHARGE),
    _ts_metadata("design:type", Number)
], ChargeDto.prototype, "quantity", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_usageoperationtypeenum.UsageOperationType),
    _ts_metadata("design:type", typeof _usageoperationtypeenum.UsageOperationType === "undefined" ? Object : _usageoperationtypeenum.UsageOperationType)
], ChargeDto.prototype, "operationType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], ChargeDto.prototype, "resourceContext", void 0);

//# sourceMappingURL=charge.dto.js.map