"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilesFieldModule", {
    enumerable: true,
    get: function() {
        return FilesFieldModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../application/application.entity");
const _filestoragemodule = require("../../file-storage/file-storage.module");
const _fileurlmodule = require("../file-url/file-url.module");
const _filesfielddeletionjob = require("./jobs/files-field-deletion.job");
const _filesfielddeletionlistener = require("./listeners/files-field-deletion.listener");
const _filesfieldresolver = require("./resolvers/files-field.resolver");
const _filesfieldservice = require("./services/files-field.service");
const _jwtmodule = require("../../jwt/jwt.module");
const _workspaceentity = require("../../workspace/workspace.entity");
const _fieldmetadataentity = require("../../../metadata-modules/field-metadata/field-metadata.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FilesFieldModule = class FilesFieldModule {
};
FilesFieldModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwtmodule.JwtModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _applicationentity.ApplicationEntity,
                _fieldmetadataentity.FieldMetadataEntity
            ]),
            _permissionsmodule.PermissionsModule,
            _filestoragemodule.FileStorageModule,
            _fileurlmodule.FileUrlModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _filesfieldservice.FilesFieldService,
            _filesfieldresolver.FilesFieldResolver,
            _filesfielddeletionlistener.FilesFieldDeletionListener,
            _filesfielddeletionjob.FilesFieldDeletionJob
        ],
        exports: [
            _filesfieldservice.FilesFieldService
        ]
    })
], FilesFieldModule);

//# sourceMappingURL=files-field.module.js.map