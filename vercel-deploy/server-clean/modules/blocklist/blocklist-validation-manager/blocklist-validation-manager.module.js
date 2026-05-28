"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistValidationManagerModule", {
    enumerable: true,
    get: function() {
        return BlocklistValidationManagerModule;
    }
});
const _common = require("@nestjs/common");
const _objectmetadatarepositorymodule = require("../../../engine/object-metadata-repository/object-metadata-repository.module");
const _twentyormmodule = require("../../../engine/twenty-orm/twenty-orm.module");
const _blocklistvalidationservice = require("./services/blocklist-validation.service");
const _blocklistworkspaceentity = require("../standard-objects/blocklist.workspace-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BlocklistValidationManagerModule = class BlocklistValidationManagerModule {
};
BlocklistValidationManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _objectmetadatarepositorymodule.ObjectMetadataRepositoryModule.forFeature([
                _blocklistworkspaceentity.BlocklistWorkspaceEntity
            ]),
            _twentyormmodule.TwentyORMModule
        ],
        providers: [
            _blocklistvalidationservice.BlocklistValidationService
        ],
        exports: [
            _blocklistvalidationservice.BlocklistValidationService
        ]
    })
], BlocklistValidationManagerModule);

//# sourceMappingURL=blocklist-validation-manager.module.js.map