"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteJobsResponseDTO", {
    enumerable: true,
    get: function() {
        return DeleteJobsResponseDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _joboperationresultdto = require("./job-operation-result.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteJobsResponseDTO = class DeleteJobsResponseDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], DeleteJobsResponseDTO.prototype, "deletedCount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _joboperationresultdto.JobOperationResultDTO
        ]),
    _ts_metadata("design:type", Array)
], DeleteJobsResponseDTO.prototype, "results", void 0);
DeleteJobsResponseDTO = _ts_decorate([
    (0, _graphql.ObjectType)('DeleteJobsResponse')
], DeleteJobsResponseDTO);

//# sourceMappingURL=delete-jobs-response.dto.js.map