"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceORMEntityMetadatasCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceORMEntityMetadatasCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _EntitySchemaTransformer = require("typeorm/entity-schema/EntitySchemaTransformer");
const _EntityMetadataBuilder = require("typeorm/metadata-builder/EntityMetadataBuilder");
const _workspacecacheproviderservice = require("../../workspace-cache/interfaces/workspace-cache-provider.service");
const _fieldmetadataentity = require("../../metadata-modules/field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../../metadata-modules/object-metadata/object-metadata.entity");
const _entityschemafactory = require("../factories/entity-schema.factory");
const _globalworkspaceormmanager = require("./global-workspace-orm.manager");
const _entityschemametadatatype = require("./types/entity-schema-metadata.type");
const _workspacecachedecorator = require("../../workspace-cache/decorators/workspace-cache.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let WorkspaceORMEntityMetadatasCacheService = class WorkspaceORMEntityMetadatasCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [objectMetadatas, fieldMetadatas] = await Promise.all([
            this.objectMetadataRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true
            }),
            this.fieldMetadataRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true
            })
        ]);
        const { objectMetadataMaps, fieldMetadataMaps } = (0, _entityschemametadatatype.buildEntitySchemaMetadataMaps)(objectMetadatas, fieldMetadatas);
        const entitySchemas = Object.values(objectMetadataMaps.byId).filter(_utils.isDefined).map((objectMetadata)=>this.entitySchemaFactory.create(workspaceId, objectMetadata, objectMetadataMaps, fieldMetadataMaps));
        const entityMetadatas = await this.buildEntityMetadatas(entitySchemas);
        return entityMetadatas;
    }
    async buildEntityMetadatas(entitySchemas) {
        const transformer = new _EntitySchemaTransformer.EntitySchemaTransformer();
        const metadataArgsStorage = transformer.transform(entitySchemas);
        const dataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
        const entityMetadataBuilder = new _EntityMetadataBuilder.EntityMetadataBuilder(dataSource, metadataArgsStorage);
        return entityMetadataBuilder.build();
    }
    constructor(objectMetadataRepository, fieldMetadataRepository, entitySchemaFactory, globalWorkspaceOrmManager){
        super(), this.objectMetadataRepository = objectMetadataRepository, this.fieldMetadataRepository = fieldMetadataRepository, this.entitySchemaFactory = entitySchemaFactory, this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
WorkspaceORMEntityMetadatasCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('ORMEntityMetadatas', {
        localDataOnly: true
    }),
    _ts_param(0, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _entityschemafactory.EntitySchemaFactory === "undefined" ? Object : _entityschemafactory.EntitySchemaFactory,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], WorkspaceORMEntityMetadatasCacheService);

//# sourceMappingURL=workspace-orm-entity-metadatas-cache.service.js.map