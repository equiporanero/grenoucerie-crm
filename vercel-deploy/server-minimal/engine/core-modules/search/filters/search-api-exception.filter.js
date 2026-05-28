"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return SearchApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _searchexception = require("../exceptions/search.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SearchApiExceptionFilter = class SearchApiExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _searchexception.SearchExceptionCode.LABEL_IDENTIFIER_FIELD_NOT_FOUND:
            case _searchexception.SearchExceptionCode.OBJECT_METADATA_NOT_FOUND:
                throw exception;
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
    constructor(){}
};
SearchApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_searchexception.SearchException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], SearchApiExceptionFilter);

//# sourceMappingURL=search-api-exception.filter.js.map