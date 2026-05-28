"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OpenApiModule", {
    enumerable: true,
    get: function() {
        return OpenApiModule;
    }
});
const _common = require("@nestjs/common");
const _authmodule = require("../auth/auth.module");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _openapicontroller = require("./open-api.controller");
const _openapiservice = require("./open-api.service");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _objectmetadatamodule = require("../../metadata-modules/object-metadata/object-metadata.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let OpenApiModule = class OpenApiModule {
};
OpenApiModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _objectmetadatamodule.ObjectMetadataModule,
            _authmodule.AuthModule,
            _featureflagmodule.FeatureFlagModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        controllers: [
            _openapicontroller.OpenApiController
        ],
        providers: [
            _openapiservice.OpenApiService
        ]
    })
], OpenApiModule);

//# sourceMappingURL=open-api.module.js.map