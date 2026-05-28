"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueRetentionConfigDTO", {
    enumerable: true,
    get: function() {
        return QueueRetentionConfigDTO;
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
let QueueRetentionConfigDTO = class QueueRetentionConfigDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], QueueRetentionConfigDTO.prototype, "completedMaxAge", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], QueueRetentionConfigDTO.prototype, "completedMaxCount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], QueueRetentionConfigDTO.prototype, "failedMaxAge", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], QueueRetentionConfigDTO.prototype, "failedMaxCount", void 0);
QueueRetentionConfigDTO = _ts_decorate([
    (0, _graphql.ObjectType)('QueueRetentionConfig')
], QueueRetentionConfigDTO);

//# sourceMappingURL=queue-retention-config.dto.js.map