"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchArgs", {
    enumerable: true,
    get: function() {
        return SearchArgs;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _objectrecordfilterinput = require("./object-record-filter-input");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SearchArgs = class SearchArgs {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SearchArgs.prototype, "searchInput", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Max)(100, {
        message: 'Limit cannot exceed 100 items'
    }),
    _ts_metadata("design:type", Number)
], SearchArgs.prototype, "limit", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], SearchArgs.prototype, "after", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)(),
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], SearchArgs.prototype, "includedObjectNameSingulars", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_objectrecordfilterinput.ObjectRecordFilterInput, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _objectrecordfilterinput.ObjectRecordFilterInput === "undefined" ? Object : _objectrecordfilterinput.ObjectRecordFilterInput)
], SearchArgs.prototype, "filter", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)(),
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], SearchArgs.prototype, "excludedObjectNameSingulars", void 0);
SearchArgs = _ts_decorate([
    (0, _graphql.ArgsType)()
], SearchArgs);

//# sourceMappingURL=search-args.js.map