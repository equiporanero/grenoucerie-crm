"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UploadApplicationFileInput", {
    enumerable: true,
    get: function() {
        return UploadApplicationFileInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _issaferelativepathvalidator = require("../../../file-storage/validators/is-safe-relative-path.validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UploadApplicationFileInput = class UploadApplicationFileInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], UploadApplicationFileInput.prototype, "applicationUniversalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.FileFolder),
    _ts_metadata("design:type", typeof _types.FileFolder === "undefined" ? Object : _types.FileFolder)
], UploadApplicationFileInput.prototype, "fileFolder", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _issaferelativepathvalidator.IsSafeRelativePath)(),
    _ts_metadata("design:type", String)
], UploadApplicationFileInput.prototype, "filePath", void 0);
UploadApplicationFileInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], UploadApplicationFileInput);

//# sourceMappingURL=upload-application-file.input.js.map