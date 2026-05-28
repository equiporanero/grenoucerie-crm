"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StandardObjectsPrefillModule", {
    enumerable: true,
    get: function() {
        return StandardObjectsPrefillModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../core-modules/application/application.module");
const _filestoragemodule = require("../../core-modules/file-storage/file-storage.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _frontcomponentmodule = require("../../metadata-modules/front-component/front-component.module");
const _logicfunctionmodule = require("../../metadata-modules/logic-function/logic-function.module");
const _prefillfrontcomponentservice = require("./services/prefill-front-component.service");
const _prefilllogicfunctionservice = require("./services/prefill-logic-function.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let StandardObjectsPrefillModule = class StandardObjectsPrefillModule {
};
StandardObjectsPrefillModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _logicfunctionmodule.LogicFunctionModule,
            _frontcomponentmodule.FrontComponentModule,
            _filestoragemodule.FileStorageModule,
            _applicationmodule.ApplicationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _prefilllogicfunctionservice.PrefillLogicFunctionService,
            _prefillfrontcomponentservice.PrefillFrontComponentService
        ],
        exports: [
            _prefilllogicfunctionservice.PrefillLogicFunctionService,
            _prefillfrontcomponentservice.PrefillFrontComponentService
        ]
    })
], StandardObjectsPrefillModule);

//# sourceMappingURL=standard-objects-prefill.module.js.map