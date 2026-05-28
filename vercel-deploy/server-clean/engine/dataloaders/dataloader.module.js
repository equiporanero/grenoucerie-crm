"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DataloaderModule", {
    enumerable: true,
    get: function() {
        return DataloaderModule;
    }
});
const _common = require("@nestjs/common");
const _applicationregistrationvariablemodule = require("../core-modules/application/application-registration-variable/application-registration-variable.module");
const _dataloaderservice = require("./dataloader.service");
const _fieldmetadatamodule = require("../metadata-modules/field-metadata/field-metadata.module");
const _workspacemanyorallflatentitymapscachemodule = require("../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DataloaderModule = class DataloaderModule {
};
DataloaderModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _fieldmetadatamodule.FieldMetadataModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _applicationregistrationvariablemodule.ApplicationRegistrationVariableModule
        ],
        providers: [
            _dataloaderservice.DataloaderService
        ],
        exports: [
            _dataloaderservice.DataloaderService
        ]
    })
], DataloaderModule);

//# sourceMappingURL=dataloader.module.js.map