"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatFieldMetadataModule", {
    enumerable: true,
    get: function() {
        return FlatFieldMetadataModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _flatfieldmetadatatypevalidatorservice = require("./services/flat-field-metadata-type-validator.service");
const _flatfieldmetadatavalidatorservice = require("../../workspace-manager/workspace-migration/workspace-migration-builder/validators/services/flat-field-metadata-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatFieldMetadataModule = class FlatFieldMetadataModule {
};
FlatFieldMetadataModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _featureflagmodule.FeatureFlagModule
        ],
        providers: [
            _flatfieldmetadatavalidatorservice.FlatFieldMetadataValidatorService,
            _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService
        ],
        exports: [
            _flatfieldmetadatavalidatorservice.FlatFieldMetadataValidatorService,
            _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService
        ]
    })
], FlatFieldMetadataModule);

//# sourceMappingURL=flat-field-metadata.module.js.map