"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueJobsResponseDTO", {
    enumerable: true,
    get: function() {
        return QueueJobsResponseDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _queuejobdto = require("./queue-job.dto");
const _queueretentionconfigdto = require("./queue-retention-config.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let QueueJobsResponseDTO = class QueueJobsResponseDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _queuejobdto.QueueJobDTO
        ]),
    _ts_metadata("design:type", Array)
], QueueJobsResponseDTO.prototype, "jobs", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], QueueJobsResponseDTO.prototype, "count", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], QueueJobsResponseDTO.prototype, "totalCount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], QueueJobsResponseDTO.prototype, "hasMore", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_queueretentionconfigdto.QueueRetentionConfigDTO),
    _ts_metadata("design:type", typeof _queueretentionconfigdto.QueueRetentionConfigDTO === "undefined" ? Object : _queueretentionconfigdto.QueueRetentionConfigDTO)
], QueueJobsResponseDTO.prototype, "retentionConfig", void 0);
QueueJobsResponseDTO = _ts_decorate([
    (0, _graphql.ObjectType)('QueueJobsResponse')
], QueueJobsResponseDTO);

//# sourceMappingURL=queue-jobs-response.dto.js.map