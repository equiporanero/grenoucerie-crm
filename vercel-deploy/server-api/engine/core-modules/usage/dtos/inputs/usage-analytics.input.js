/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsageAnalyticsInput", {
    enumerable: true,
    get: function() {
        return UsageAnalyticsInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _usageoperationtypeenum = require("../../enums/usage-operation-type.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UsageAnalyticsInput = class UsageAnalyticsInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UsageAnalyticsInput.prototype, "periodStart", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UsageAnalyticsInput.prototype, "periodEnd", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UsageAnalyticsInput.prototype, "userWorkspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _usageoperationtypeenum.UsageOperationType
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], UsageAnalyticsInput.prototype, "operationTypes", void 0);
UsageAnalyticsInput = _ts_decorate([
    (0, _graphql.InputType)()
], UsageAnalyticsInput);

//# sourceMappingURL=usage-analytics.input.js.map