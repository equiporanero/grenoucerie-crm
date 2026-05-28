"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchResultConnectionDTO", {
    enumerable: true,
    get: function() {
        return SearchResultConnectionDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _searchresultedgedto = require("./search-result-edge.dto");
const _searchresultpageinfodto = require("./search-result-page-info.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SearchResultConnectionDTO = class SearchResultConnectionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _searchresultedgedto.SearchResultEdgeDTO
        ]),
    _ts_metadata("design:type", Array)
], SearchResultConnectionDTO.prototype, "edges", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_searchresultpageinfodto.SearchResultPageInfoDTO),
    _ts_metadata("design:type", typeof _searchresultpageinfodto.SearchResultPageInfoDTO === "undefined" ? Object : _searchresultpageinfodto.SearchResultPageInfoDTO)
], SearchResultConnectionDTO.prototype, "pageInfo", void 0);
SearchResultConnectionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('SearchResultConnection')
], SearchResultConnectionDTO);

//# sourceMappingURL=search-result-connection.dto.js.map