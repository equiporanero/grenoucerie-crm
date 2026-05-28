"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectPermissionModule", {
    enumerable: true,
    get: function() {
        return ObjectPermissionModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _fieldmetadataentity = require("../field-metadata/field-metadata.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
const _fieldpermissionentity = require("./field-permission/field-permission.entity");
const _fieldpermissionservice = require("./field-permission/field-permission.service");
const _objectpermissionentity = require("./object-permission.entity");
const _objectpermissionservice = require("./object-permission.service");
const _roleentity = require("../role/role.entity");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ObjectPermissionModule = class ObjectPermissionModule {
};
ObjectPermissionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _objectpermissionentity.ObjectPermissionEntity,
                _roleentity.RoleEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _fieldpermissionentity.FieldPermissionEntity,
                _fieldmetadataentity.FieldMetadataEntity
            ]),
            _workspacecachemodule.WorkspaceCacheModule,
            _applicationmodule.ApplicationModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _objectpermissionservice.ObjectPermissionService,
            _fieldpermissionservice.FieldPermissionService
        ],
        exports: [
            _objectpermissionservice.ObjectPermissionService,
            _fieldpermissionservice.FieldPermissionService
        ]
    })
], ObjectPermissionModule);

//# sourceMappingURL=object-permission.module.js.map