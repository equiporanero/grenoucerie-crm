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
    get RunWorkspaceMigrationInput () {
        return RunWorkspaceMigrationInput;
    },
    get WorkspaceMigrationDeleteActionInput () {
        return WorkspaceMigrationDeleteActionInput;
    },
    get WorkspaceMigrationInput () {
        return WorkspaceMigrationInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _metadata = require("twenty-shared/metadata");
const _workspacemigrationactiontypeconstant = require("../../../../workspace-manager/workspace-migration/workspace-migration-builder/constants/workspace-migration-action-type.constant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_metadata.ALL_METADATA_NAME, {
    name: 'AllMetadataName'
});
(0, _graphql.registerEnumType)(_workspacemigrationactiontypeconstant.WORKSPACE_MIGRATION_ACTION_TYPE, {
    name: 'WorkspaceMigrationActionType'
});
let WorkspaceMigrationDeleteActionInput = class WorkspaceMigrationDeleteActionInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_workspacemigrationactiontypeconstant.WORKSPACE_MIGRATION_ACTION_TYPE),
    (0, _classvalidator.IsEnum)(_workspacemigrationactiontypeconstant.WORKSPACE_MIGRATION_ACTION_TYPE),
    _ts_metadata("design:type", String)
], WorkspaceMigrationDeleteActionInput.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_metadata.ALL_METADATA_NAME),
    (0, _classvalidator.IsEnum)(_metadata.ALL_METADATA_NAME),
    _ts_metadata("design:type", typeof _metadata.AllMetadataName === "undefined" ? Object : _metadata.AllMetadataName)
], WorkspaceMigrationDeleteActionInput.prototype, "metadataName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], WorkspaceMigrationDeleteActionInput.prototype, "universalIdentifier", void 0);
WorkspaceMigrationDeleteActionInput = _ts_decorate([
    (0, _graphql.InputType)()
], WorkspaceMigrationDeleteActionInput);
let WorkspaceMigrationInput = class WorkspaceMigrationInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            WorkspaceMigrationDeleteActionInput
        ]),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ArrayNotEmpty)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>WorkspaceMigrationDeleteActionInput),
    _ts_metadata("design:type", Array)
], WorkspaceMigrationInput.prototype, "actions", void 0);
WorkspaceMigrationInput = _ts_decorate([
    (0, _graphql.InputType)()
], WorkspaceMigrationInput);
let RunWorkspaceMigrationInput = class RunWorkspaceMigrationInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>WorkspaceMigrationInput),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>WorkspaceMigrationInput),
    _ts_metadata("design:type", typeof WorkspaceMigrationInput === "undefined" ? Object : WorkspaceMigrationInput)
], RunWorkspaceMigrationInput.prototype, "workspaceMigration", void 0);
RunWorkspaceMigrationInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], RunWorkspaceMigrationInput);

//# sourceMappingURL=run-workspace-migration.input.js.map