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
    get UpdateMessageFolderInput () {
        return UpdateMessageFolderInput;
    },
    get UpdateMessageFolderInputUpdates () {
        return UpdateMessageFolderInputUpdates;
    },
    get UpdateMessageFoldersInput () {
        return UpdateMessageFoldersInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateMessageFolderInputUpdates = class UpdateMessageFolderInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateMessageFolderInputUpdates.prototype, "isSynced", void 0);
UpdateMessageFolderInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateMessageFolderInputUpdates);
let UpdateMessageFolderInput = class UpdateMessageFolderInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpdateMessageFolderInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateMessageFolderInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateMessageFolderInputUpdates),
    _ts_metadata("design:type", typeof UpdateMessageFolderInputUpdates === "undefined" ? Object : UpdateMessageFolderInputUpdates)
], UpdateMessageFolderInput.prototype, "update", void 0);
UpdateMessageFolderInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateMessageFolderInput);
let UpdateMessageFoldersInput = class UpdateMessageFoldersInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        each: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        each: true
    }),
    (0, _graphql.Field)(()=>[
            _scalars.UUIDScalarType
        ]),
    _ts_metadata("design:type", Array)
], UpdateMessageFoldersInput.prototype, "ids", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateMessageFolderInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateMessageFolderInputUpdates),
    _ts_metadata("design:type", typeof UpdateMessageFolderInputUpdates === "undefined" ? Object : UpdateMessageFolderInputUpdates)
], UpdateMessageFoldersInput.prototype, "update", void 0);
UpdateMessageFoldersInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateMessageFoldersInput);

//# sourceMappingURL=update-message-folder.input.js.map