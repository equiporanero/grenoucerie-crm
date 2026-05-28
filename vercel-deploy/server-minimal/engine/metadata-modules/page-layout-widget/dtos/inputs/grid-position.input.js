"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GridPositionInput", {
    enumerable: true,
    get: function() {
        return GridPositionInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GridPositionInput = class GridPositionInput {
};
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], GridPositionInput.prototype, "row", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], GridPositionInput.prototype, "column", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], GridPositionInput.prototype, "rowSpan", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], GridPositionInput.prototype, "columnSpan", void 0);
GridPositionInput = _ts_decorate([
    (0, _graphql.InputType)('GridPositionInput')
], GridPositionInput);

//# sourceMappingURL=grid-position.input.js.map