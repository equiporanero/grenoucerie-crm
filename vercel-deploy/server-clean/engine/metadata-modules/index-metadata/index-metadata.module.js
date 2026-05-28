"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IndexMetadataModule", {
    enumerable: true,
    get: function() {
        return IndexMetadataModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerycore = require("@ptc-org/nestjs-query-core");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _indexmetadatadto = require("./dtos/index-metadata.dto");
const _indexfieldmetadataentity = require("./index-field-metadata.entity");
const _indexmetadataentity = require("./index-metadata.entity");
const _indexmetadataresolver = require("./index-metadata.resolver");
const _indexmetadataservice = require("./services/index-metadata.service");
const _objectmetadatagraphqlapiexceptioninterceptor = require("../object-metadata/interceptors/object-metadata-graphql-api-exception.interceptor");
const _permissionsmodule = require("../permissions/permissions.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IndexMetadataModule = class IndexMetadataModule {
};
IndexMetadataModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _indexmetadataentity.IndexMetadataEntity
            ]),
            _applicationmodule.ApplicationModule,
            _permissionsmodule.PermissionsModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _nestjsquerygraphql.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                        _indexmetadataentity.IndexMetadataEntity,
                        _indexfieldmetadataentity.IndexFieldMetadataEntity
                    ])
                ],
                resolvers: [
                    {
                        EntityClass: _indexmetadataentity.IndexMetadataEntity,
                        DTOClass: _indexmetadatadto.IndexMetadataDTO,
                        read: {
                            defaultSort: [
                                {
                                    field: 'id',
                                    direction: _nestjsquerycore.SortDirection.DESC
                                }
                            ],
                            many: {
                                name: 'indexMetadatas'
                            }
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
                        ]
                    }
                ]
            })
        ],
        providers: [
            _indexmetadataresolver.IndexMetadataResolver,
            _indexmetadataservice.IndexMetadataService
        ],
        exports: [
            _indexmetadataservice.IndexMetadataService
        ]
    })
], IndexMetadataModule);

//# sourceMappingURL=index-metadata.module.js.map