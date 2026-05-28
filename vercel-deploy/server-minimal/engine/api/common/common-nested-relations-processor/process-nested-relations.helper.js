"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProcessNestedRelationsHelper", {
    enumerable: true,
    get: function() {
        return ProcessNestedRelationsHelper;
    }
});
const _common = require("@nestjs/common");
const _processnestedrelationsv2helper = require("./process-nested-relations-v2.helper");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ProcessNestedRelationsHelper = class ProcessNestedRelationsHelper {
    async processNestedRelations({ flatObjectMetadataMaps, flatFieldMetadataMaps, parentObjectMetadataItem, parentObjectRecords, parentObjectRecordsAggregatedValues = {}, relations, aggregate = {}, limit, authContext, workspaceDataSource, rolePermissionConfig, selectedFields }) {
        return this.processNestedRelationsV2Helper.processNestedRelations({
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            parentObjectMetadataItem,
            parentObjectRecords,
            parentObjectRecordsAggregatedValues,
            relations,
            aggregate,
            limit,
            authContext,
            workspaceDataSource,
            rolePermissionConfig,
            selectedFields
        });
    }
    constructor(processNestedRelationsV2Helper){
        this.processNestedRelationsV2Helper = processNestedRelationsV2Helper;
    }
};
ProcessNestedRelationsHelper = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _processnestedrelationsv2helper.ProcessNestedRelationsV2Helper === "undefined" ? Object : _processnestedrelationsv2helper.ProcessNestedRelationsV2Helper
    ])
], ProcessNestedRelationsHelper);

//# sourceMappingURL=process-nested-relations.helper.js.map