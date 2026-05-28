"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistQueryHookModule", {
    enumerable: true,
    get: function() {
        return BlocklistQueryHookModule;
    }
});
const _common = require("@nestjs/common");
const _blocklistvalidationmanagermodule = require("../blocklist-validation-manager/blocklist-validation-manager.module");
const _blocklistcreatemanyprequeryhook = require("./blocklist-create-many.pre-query.hook");
const _blocklistcreateoneprequeryhook = require("./blocklist-create-one.pre-query.hook");
const _blocklistupdatemanyprequeryhook = require("./blocklist-update-many.pre-query.hook");
const _blocklistupdateoneprequeryhook = require("./blocklist-update-one.pre-query.hook");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BlocklistQueryHookModule = class BlocklistQueryHookModule {
};
BlocklistQueryHookModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _blocklistvalidationmanagermodule.BlocklistValidationManagerModule
        ],
        providers: [
            _blocklistcreatemanyprequeryhook.BlocklistCreateManyPreQueryHook,
            _blocklistcreateoneprequeryhook.BlocklistCreateOnePreQueryHook,
            _blocklistupdatemanyprequeryhook.BlocklistUpdateManyPreQueryHook,
            _blocklistupdateoneprequeryhook.BlocklistUpdateOnePreQueryHook
        ]
    })
], BlocklistQueryHookModule);

//# sourceMappingURL=blocklist-query-hook.module.js.map