"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataModule", {
    enumerable: true,
    get: function() {
        return ObjectMetadataModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerycore = require("@ptc-org/nestjs-query-core");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _typeormmodule = require("../../../database/typeorm/typeorm.module");
const _applicationmodule = require("../../core-modules/application/application.module");
const _tokenmodule = require("../../core-modules/auth/token/token.module");
const _featureflagentity = require("../../core-modules/feature-flag/feature-flag.entity");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _fieldmetadataentity = require("../field-metadata/field-metadata.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatfieldmetadatatypevalidatorservice = require("../flat-field-metadata/services/flat-field-metadata-type-validator.service");
const _indexmetadatamodule = require("../index-metadata/index-metadata.module");
const _objectmetadatacontroller = require("./controllers/object-metadata.controller");
const _createobjectinput = require("./dtos/create-object.input");
const _objectmetadatadto = require("./dtos/object-metadata.dto");
const _updateobjectinput = require("./dtos/update-object.input");
const _objectmetadatagraphqlapiexceptioninterceptor = require("./interceptors/object-metadata-graphql-api-exception.interceptor");
const _objectmetadataentity = require("./object-metadata.entity");
const _objectmetadataresolver = require("./object-metadata.resolver");
const _objectmetadataservice = require("./object-metadata.service");
const _objectrecordcountservice = require("./object-record-count.service");
const _objectmetadatatoolsfactory = require("./tools/object-metadata-tools.factory");
const _permissionsmodule = require("../permissions/permissions.module");
const _permissionsgraphqlapiexceptionfilter = require("../permissions/utils/permissions-graphql-api-exception.filter");
const _viewfieldmodule = require("../view-field/view-field.module");
const _viewentity = require("../view/entities/view.entity");
const _viewmodule = require("../view/view.module");
const _workspacemetadataversionmodule = require("../workspace-metadata-version/workspace-metadata-version.module");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacedatasourcemodule = require("../../workspace-datasource/workspace-datasource.module");
const _flatfieldmetadatavalidatorservice = require("../../workspace-manager/workspace-migration/workspace-migration-builder/validators/services/flat-field-metadata-validator.service");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ObjectMetadataModule = class ObjectMetadataModule {
};
ObjectMetadataModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _tokenmodule.TokenModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _featureflagmodule.FeatureFlagModule,
            _nestjsquerygraphql.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    _typeormmodule.TypeORMModule,
                    _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                        _objectmetadataentity.ObjectMetadataEntity,
                        _fieldmetadataentity.FieldMetadataEntity
                    ]),
                    _typeorm.TypeOrmModule.forFeature([
                        _featureflagentity.FeatureFlagEntity,
                        _viewentity.ViewEntity
                    ]),
                    _applicationmodule.ApplicationModule,
                    _workspacemetadataversionmodule.WorkspaceMetadataVersionModule,
                    _indexmetadatamodule.IndexMetadataModule,
                    _permissionsmodule.PermissionsModule,
                    _workspacecachestoragemodule.WorkspaceCacheStorageModule,
                    _workspacedatasourcemodule.WorkspaceDataSourceModule,
                    _featureflagmodule.FeatureFlagModule,
                    _workspacemigrationmodule.WorkspaceMigrationModule,
                    _viewmodule.ViewModule,
                    _viewfieldmodule.ViewFieldModule,
                    _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
                    _workspacecachemodule.WorkspaceCacheModule
                ],
                services: [
                    _objectmetadataservice.ObjectMetadataService,
                    _flatfieldmetadatavalidatorservice.FlatFieldMetadataValidatorService,
                    _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService
                ],
                resolvers: [
                    {
                        EntityClass: _objectmetadataentity.ObjectMetadataEntity,
                        DTOClass: _objectmetadatadto.ObjectMetadataDTO,
                        CreateDTOClass: _createobjectinput.CreateObjectInput,
                        UpdateDTOClass: _updateobjectinput.UpdateObjectPayload,
                        ServiceClass: _objectmetadataservice.ObjectMetadataService,
                        pagingStrategy: _nestjsquerygraphql.PagingStrategies.CURSOR,
                        read: {
                            defaultSort: [
                                {
                                    field: 'id',
                                    direction: _nestjsquerycore.SortDirection.DESC
                                }
                            ]
                        },
                        create: {
                            disabled: true
                        },
                        update: {
                            disabled: true
                        },
                        delete: {
                            disabled: true
                        },
                        guards: [
                            _workspaceauthguard.WorkspaceAuthGuard
                        ],
                        interceptors: [
                            _objectmetadatagraphqlapiexceptioninterceptor.ObjectMetadataGraphqlApiExceptionInterceptor
                        ],
                        filters: [
                            _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter
                        ]
                    }
                ]
            })
        ],
        controllers: [
            _objectmetadatacontroller.ObjectMetadataController
        ],
        providers: [
            _objectmetadataservice.ObjectMetadataService,
            _objectmetadataresolver.ObjectMetadataResolver,
            _objectrecordcountservice.ObjectRecordCountService,
            _objectmetadatatoolsfactory.ObjectMetadataToolsFactory
        ],
        exports: [
            _objectmetadataservice.ObjectMetadataService,
            _objectmetadatatoolsfactory.ObjectMetadataToolsFactory
        ]
    })
], ObjectMetadataModule);

//# sourceMappingURL=object-metadata.module.js.map