/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpsertRowLevelPermissionPredicatesResultDTO", {
    enumerable: true,
    get: function() {
        return UpsertRowLevelPermissionPredicatesResultDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _rowlevelpermissionpredicategroupdto = require("./row-level-permission-predicate-group.dto");
const _rowlevelpermissionpredicatedto = require("./row-level-permission-predicate.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpsertRowLevelPermissionPredicatesResultDTO = class UpsertRowLevelPermissionPredicatesResultDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _rowlevelpermissionpredicatedto.RowLevelPermissionPredicateDTO
        ]),
    _ts_metadata("design:type", Array)
], UpsertRowLevelPermissionPredicatesResultDTO.prototype, "predicates", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _rowlevelpermissionpredicategroupdto.RowLevelPermissionPredicateGroupDTO
        ]),
    _ts_metadata("design:type", Array)
], UpsertRowLevelPermissionPredicatesResultDTO.prototype, "predicateGroups", void 0);
UpsertRowLevelPermissionPredicatesResultDTO = _ts_decorate([
    (0, _graphql.ObjectType)('UpsertRowLevelPermissionPredicatesResult')
], UpsertRowLevelPermissionPredicatesResultDTO);

//# sourceMappingURL=upsert-row-level-permission-predicates-result.dto.js.map