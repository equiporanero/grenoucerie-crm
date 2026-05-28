"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileWorkflowModule", {
    enumerable: true,
    get: function() {
        return FileWorkflowModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../application/application.module");
const _fileurlmodule = require("../file-url/file-url.module");
const _fileworkflowresolver = require("./resolvers/file-workflow.resolver");
const _fileworkflowservice = require("./services/file-workflow.service");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FileWorkflowModule = class FileWorkflowModule {
};
FileWorkflowModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _fileurlmodule.FileUrlModule,
            _applicationmodule.ApplicationModule,
            _permissionsmodule.PermissionsModule
        ],
        providers: [
            _fileworkflowservice.FileWorkflowService,
            _fileworkflowresolver.FileWorkflowResolver
        ],
        exports: [
            _fileworkflowservice.FileWorkflowService
        ]
    })
], FileWorkflowModule);

//# sourceMappingURL=file-workflow.module.js.map