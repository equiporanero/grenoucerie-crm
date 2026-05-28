"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceDataSourceModule", {
    enumerable: true,
    get: function() {
        return WorkspaceDataSourceModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeormmodule = require("../../database/typeorm/typeorm.module");
const _workspaceentity = require("../core-modules/workspace/workspace.entity");
const _workspacedatasourceservice = require("./workspace-datasource.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceDataSourceModule = class WorkspaceDataSourceModule {
};
WorkspaceDataSourceModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ]),
            _typeormmodule.TypeORMModule
        ],
        exports: [
            _workspacedatasourceservice.WorkspaceDataSourceService
        ],
        providers: [
            _workspacedatasourceservice.WorkspaceDataSourceService
        ]
    })
], WorkspaceDataSourceModule);

//# sourceMappingURL=workspace-datasource.module.js.map