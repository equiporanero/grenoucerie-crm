"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileCorePictureModule", {
    enumerable: true,
    get: function() {
        return FileCorePictureModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _filestoragemodule = require("../../file-storage/file-storage.module");
const _fileentity = require("../entities/file.entity");
const _filecorepictureresolver = require("./resolvers/file-core-picture.resolver");
const _filecorepictureservice = require("./services/file-core-picture.service");
const _fileurlmodule = require("../file-url/file-url.module");
const _jwtmodule = require("../../jwt/jwt.module");
const _securehttpclientmodule = require("../../secure-http-client/secure-http-client.module");
const _workspaceentity = require("../../workspace/workspace.entity");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _provideworkspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FileCorePictureModule = class FileCorePictureModule {
};
FileCorePictureModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwtmodule.JwtModule,
            _typeorm.TypeOrmModule.forFeature([
                _fileentity.FileEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _permissionsmodule.PermissionsModule,
            _filestoragemodule.FileStorageModule,
            _fileurlmodule.FileUrlModule,
            _securehttpclientmodule.SecureHttpClientModule
        ],
        providers: [
            _filecorepictureservice.FileCorePictureService,
            _filecorepictureresolver.FileCorePictureResolver,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_fileentity.FileEntity)
        ],
        exports: [
            _filecorepictureservice.FileCorePictureService
        ]
    })
], FileCorePictureModule);

//# sourceMappingURL=file-core-picture.module.js.map