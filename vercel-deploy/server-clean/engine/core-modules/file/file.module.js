"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileModule", {
    enumerable: true,
    get: function() {
        return FileModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../application/application.entity");
const _filestoragemodule = require("../file-storage/file-storage.module");
const _fileaichatmodule = require("./file-ai-chat/file-ai-chat.module");
const _filepathguard = require("./guards/file-path-guard");
const _filedeletionjob = require("./jobs/file-deletion.job");
const _fileworkspacefolderdeletionjob = require("./jobs/file-workspace-folder-deletion.job");
const _jwtmodule = require("../jwt/jwt.module");
const _securehttpclientmodule = require("../secure-http-client/secure-http-client.module");
const _workspaceentity = require("../workspace/workspace.entity");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _filecontroller = require("./controllers/file.controller");
const _fileentity = require("./entities/file.entity");
const _filecorepicturemodule = require("./file-core-picture/file-core-picture.module");
const _fileemailattachmentmodule = require("./file-email-attachment/file-email-attachment.module");
const _fileurlmodule = require("./file-url/file-url.module");
const _fileworkflowmodule = require("./file-workflow/file-workflow.module");
const _filesfieldmodule = require("./files-field/files-field.module");
const _filebyidguard = require("./guards/file-by-id.guard");
const _fileservice = require("./services/file.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FileModule = class FileModule {
};
FileModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwtmodule.JwtModule,
            _typeorm.TypeOrmModule.forFeature([
                _fileentity.FileEntity,
                _workspaceentity.WorkspaceEntity,
                _applicationentity.ApplicationEntity
            ]),
            _permissionsmodule.PermissionsModule,
            _filestoragemodule.FileStorageModule,
            _fileurlmodule.FileUrlModule,
            _filesfieldmodule.FilesFieldModule,
            _filecorepicturemodule.FileCorePictureModule,
            _fileworkflowmodule.FileWorkflowModule,
            _fileaichatmodule.FileAiChatModule,
            _fileemailattachmentmodule.FileEmailAttachmentModule,
            _securehttpclientmodule.SecureHttpClientModule
        ],
        providers: [
            _fileservice.FileService,
            _filepathguard.FilePathGuard,
            _filebyidguard.FileByIdGuard,
            _fileworkspacefolderdeletionjob.FileWorkspaceFolderDeletionJob,
            _filedeletionjob.FileDeletionJob,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_fileentity.FileEntity)
        ],
        exports: [
            _fileservice.FileService,
            _fileurlmodule.FileUrlModule,
            _filesfieldmodule.FilesFieldModule,
            _filecorepicturemodule.FileCorePictureModule,
            _fileworkflowmodule.FileWorkflowModule,
            _fileaichatmodule.FileAiChatModule,
            _fileemailattachmentmodule.FileEmailAttachmentModule
        ],
        controllers: [
            _filecontroller.FileController
        ]
    })
], FileModule);

//# sourceMappingURL=file.module.js.map