"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get FieldMetadataComplexOption () {
        return FieldMetadataComplexOption;
    },
    get FieldMetadataDefaultOption () {
        return FieldMetadataDefaultOption;
    }
});
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FieldMetadataDefaultOption = class FieldMetadataDefaultOption {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FieldMetadataDefaultOption.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    _ts_metadata("design:type", Number)
], FieldMetadataDefaultOption.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], FieldMetadataDefaultOption.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _types.IsValidGraphQLEnumName)(),
    _ts_metadata("design:type", String)
], FieldMetadataDefaultOption.prototype, "value", void 0);
let FieldMetadataComplexOption = class FieldMetadataComplexOption extends FieldMetadataDefaultOption {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", typeof TagColor === "undefined" ? Object : TagColor)
], FieldMetadataComplexOption.prototype, "color", void 0);

//# sourceMappingURL=options.input.js.map