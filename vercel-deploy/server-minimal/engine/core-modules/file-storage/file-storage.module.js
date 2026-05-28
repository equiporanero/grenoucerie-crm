"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileStorageModule", {
    enumerable: true,
    get: function() {
        return FileStorageModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../application/application.entity");
const _filestorageexceptionfilter = require("./file-storage-exception-filter");
const _filestoragedriverfactory = require("./file-storage-driver.factory");
const _filestorageservice = require("./file-storage.service");
const _fileentity = require("../file/entities/file.entity");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FileStorageModule = class FileStorageModule {
    static forRoot() {
        return {
            module: FileStorageModule,
            imports: [
                _twentyconfigmodule.TwentyConfigModule,
                _typeorm.TypeOrmModule.forFeature([
                    _fileentity.FileEntity,
                    _applicationentity.ApplicationEntity
                ])
            ],
            providers: [
                _filestoragedriverfactory.FileStorageDriverFactory,
                _filestorageservice.FileStorageService,
                (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_fileentity.FileEntity),
                {
                    provide: _core.APP_FILTER,
                    useClass: _filestorageexceptionfilter.FileStorageExceptionFilter
                }
            ],
            exports: [
                _filestoragedriverfactory.FileStorageDriverFactory,
                _filestorageservice.FileStorageService
            ]
        };
    }
};
FileStorageModule = _ts_decorate([
    (0, _common.Global)()
], FileStorageModule);

//# sourceMappingURL=file-storage.module.js.map