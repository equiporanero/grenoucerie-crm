"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SdkClientModule", {
    enumerable: true,
    get: function() {
        return SdkClientModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _coregraphqlapimodule = require("../../api/graphql/core-graphql-api.module");
const _applicationentity = require("../application/application.entity");
const _applicationmodule = require("../application/application.module");
const _sdkclientcontroller = require("./controllers/sdk-client.controller");
const _sdkclientarchiveservice = require("./sdk-client-archive.service");
const _sdkclientgenerationservice = require("./sdk-client-generation.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SdkClientModule = class SdkClientModule {
};
SdkClientModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _workspacecachemodule.WorkspaceCacheModule,
            _coregraphqlapimodule.CoreGraphQLApiModule,
            _applicationmodule.ApplicationModule
        ],
        controllers: [
            _sdkclientcontroller.SdkClientController
        ],
        providers: [
            _sdkclientgenerationservice.SdkClientGenerationService,
            _sdkclientarchiveservice.SdkClientArchiveService
        ],
        exports: [
            _sdkclientgenerationservice.SdkClientGenerationService,
            _sdkclientarchiveservice.SdkClientArchiveService
        ]
    })
], SdkClientModule);

//# sourceMappingURL=sdk-client.module.js.map