"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueJobDTO", {
    enumerable: true,
    get: function() {
        return QueueJobDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _jobstateenum = require("../enums/job-state.enum");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let QueueJobDTO = class QueueJobDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], QueueJobDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], QueueJobDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], QueueJobDTO.prototype, "data", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_jobstateenum.JobStateEnum),
    _ts_metadata("design:type", typeof _jobstateenum.JobStateEnum === "undefined" ? Object : _jobstateenum.JobStateEnum)
], QueueJobDTO.prototype, "state", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], QueueJobDTO.prototype, "timestamp", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], QueueJobDTO.prototype, "failedReason", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], QueueJobDTO.prototype, "processedOn", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], QueueJobDTO.prototype, "finishedOn", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], QueueJobDTO.prototype, "attemptsMade", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], QueueJobDTO.prototype, "returnValue", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], QueueJobDTO.prototype, "logs", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], QueueJobDTO.prototype, "stackTrace", void 0);
QueueJobDTO = _ts_decorate([
    (0, _graphql.ObjectType)('QueueJob')
], QueueJobDTO);

//# sourceMappingURL=queue-job.dto.js.map