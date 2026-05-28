"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SetMaintenanceModeInput", {
    enumerable: true,
    get: function() {
        return SetMaintenanceModeInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _classtransformer = require("class-transformer");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SetMaintenanceModeInput = class SetMaintenanceModeInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classtransformer.Type)(()=>Date),
    (0, _classvalidator.IsDate)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SetMaintenanceModeInput.prototype, "startAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classtransformer.Type)(()=>Date),
    (0, _classvalidator.IsDate)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SetMaintenanceModeInput.prototype, "endAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUrl)({
        require_tld: false,
        require_protocol: true
    }),
    _ts_metadata("design:type", String)
], SetMaintenanceModeInput.prototype, "link", void 0);
SetMaintenanceModeInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], SetMaintenanceModeInput);

//# sourceMappingURL=set-maintenance-mode.input.js.map