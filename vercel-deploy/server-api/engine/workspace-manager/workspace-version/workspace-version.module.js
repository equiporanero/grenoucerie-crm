"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceVersionModule", {
    enumerable: true,
    get: function() {
        return WorkspaceVersionModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _workspaceversionservice = require("./services/workspace-version.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceVersionModule = class WorkspaceVersionModule {
};
WorkspaceVersionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity
            ])
        ],
        providers: [
            _workspaceversionservice.WorkspaceVersionService
        ],
        exports: [
            _workspaceversionservice.WorkspaceVersionService
        ]
    })
], WorkspaceVersionModule);

//# sourceMappingURL=workspace-version.module.js.map