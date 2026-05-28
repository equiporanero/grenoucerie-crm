"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueryRunnerArgsFactory", {
    enumerable: true,
    get: function() {
        return QueryRunnerArgsFactory;
    }
});
const _common = require("@nestjs/common");
const _recordinputtransformerservice = require("../../../core-modules/record-transformer/services/record-input-transformer.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let QueryRunnerArgsFactory = class QueryRunnerArgsFactory {
    async overrideValueByFieldMetadata(key, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    value, fieldIdByName, flatObjectMetadata, flatFieldMetadataMaps) {
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldIdByName[key],
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!fieldMetadata) {
            return value;
        }
        const processed = await this.recordInputTransformerService.process({
            recordInput: {
                [key]: value
            },
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        return processed[key] ?? value;
    }
    constructor(recordInputTransformerService){
        this.recordInputTransformerService = recordInputTransformerService;
    }
};
QueryRunnerArgsFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _recordinputtransformerservice.RecordInputTransformerService === "undefined" ? Object : _recordinputtransformerservice.RecordInputTransformerService
    ])
], QueryRunnerArgsFactory);

//# sourceMappingURL=query-runner-args.factory.js.map