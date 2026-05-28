"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccountSyncJobByStatusCounter", {
    enumerable: true,
    get: function() {
        return AccountSyncJobByStatusCounter;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AccountSyncJobByStatusCounter = class AccountSyncJobByStatusCounter {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], AccountSyncJobByStatusCounter.prototype, "NOT_SYNCED", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], AccountSyncJobByStatusCounter.prototype, "ACTIVE", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], AccountSyncJobByStatusCounter.prototype, "FAILED_INSUFFICIENT_PERMISSIONS", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], AccountSyncJobByStatusCounter.prototype, "FAILED_UNKNOWN", void 0);
AccountSyncJobByStatusCounter = _ts_decorate([
    (0, _graphql.ObjectType)()
], AccountSyncJobByStatusCounter);

//# sourceMappingURL=account-sync-metrics.types.js.map