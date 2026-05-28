"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMemberModule", {
    enumerable: true,
    get: function() {
        return WorkspaceMemberModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../../engine/core-modules/feature-flag/feature-flag.module");
const _filemodule = require("../../engine/core-modules/file/file.module");
const _twentyormmodule = require("../../engine/twenty-orm/twenty-orm.module");
const _workspacememberavatarfiledeletionlistener = require("./listeners/workspace-member-avatar-file-deletion.listener");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceMemberModule = class WorkspaceMemberModule {
};
WorkspaceMemberModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _twentyormmodule.TwentyORMModule,
            _featureflagmodule.FeatureFlagModule,
            _filemodule.FileModule
        ],
        providers: [
            _workspacememberavatarfiledeletionlistener.WorkspaceMemberAvatarFileDeletionListener
        ]
    })
], WorkspaceMemberModule);

//# sourceMappingURL=workspace-member.module.js.map