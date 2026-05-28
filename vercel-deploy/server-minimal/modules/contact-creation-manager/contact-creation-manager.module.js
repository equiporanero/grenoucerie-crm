"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContactCreationManagerModule", {
    enumerable: true,
    get: function() {
        return ContactCreationManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagentity = require("../../engine/core-modules/feature-flag/feature-flag.entity");
const _securehttpclientmodule = require("../../engine/core-modules/secure-http-client/secure-http-client.module");
const _userworkspaceentity = require("../../engine/core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../../engine/core-modules/workspace/workspace.entity");
const _fieldmetadataentity = require("../../engine/metadata-modules/field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _workspacedatasourcemodule = require("../../engine/workspace-datasource/workspace-datasource.module");
const _createcompanyandcontactservice = require("./services/create-company-and-contact.service");
const _createcompanyservice = require("./services/create-company.service");
const _createpersonservice = require("./services/create-person.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ContactCreationManagerModule = class ContactCreationManagerModule {
};
ContactCreationManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _typeorm.TypeOrmModule.forFeature([
                _featureflagentity.FeatureFlagEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _typeorm.TypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity,
                _fieldmetadataentity.FieldMetadataEntity
            ]),
            _securehttpclientmodule.SecureHttpClientModule
        ],
        providers: [
            _createcompanyservice.CreateCompanyService,
            _createpersonservice.CreatePersonService,
            _createcompanyandcontactservice.CreateCompanyAndPersonService
        ],
        exports: [
            _createcompanyandcontactservice.CreateCompanyAndPersonService
        ]
    })
], ContactCreationManagerModule);

//# sourceMappingURL=contact-creation-manager.module.js.map