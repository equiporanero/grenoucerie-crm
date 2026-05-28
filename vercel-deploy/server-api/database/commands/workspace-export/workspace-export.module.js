"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceExportModule", {
    enumerable: true,
    get: function() {
        return WorkspaceExportModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspaceexportcommand = require("./workspace-export.command");
const _workspaceexportservice = require("./workspace-export.service");
const _fieldmetadataentity = require("../../../engine/metadata-modules/field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceExportModule = class WorkspaceExportModule {
};
WorkspaceExportModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity,
                _fieldmetadataentity.FieldMetadataEntity
            ])
        ],
        providers: [
            _workspaceexportcommand.WorkspaceExportCommand,
            _workspaceexportservice.WorkspaceExportService
        ]
    })
], WorkspaceExportModule);

//# sourceMappingURL=workspace-export.module.js.map