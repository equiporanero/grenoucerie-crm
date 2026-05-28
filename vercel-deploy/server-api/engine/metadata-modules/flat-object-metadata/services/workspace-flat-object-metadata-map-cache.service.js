"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatObjectMetadataMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatObjectMetadataMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromobjectmetadataentitytoflatobjectmetadatautil = require("../utils/from-object-metadata-entity-to-flat-object-metadata.util");
const _indexmetadataentity = require("../../index-metadata/index-metadata.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _objectpermissionentity = require("../../object-permission/object-permission.entity");
const _viewentity = require("../../view/entities/view.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
const _regroupentitiesbyrelatedentityid = require("../../../workspace-cache/utils/regroup-entities-by-related-entity-id");
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/utils/add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
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
let WorkspaceFlatObjectMetadataMapCacheService = class WorkspaceFlatObjectMetadataMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [objectMetadatas, applications, fields, indexMetadatas, views, objectPermissions] = await Promise.all([
            this.objectMetadataRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true
            }),
            this.applicationRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            }),
            this.fieldMetadataRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'objectMetadataId'
                ],
                withDeleted: true
            }),
            this.indexMetadataRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'objectMetadataId'
                ],
                withDeleted: true
            }),
            this.viewRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'objectMetadataId'
                ],
                withDeleted: true
            }),
            this.objectPermissionRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'objectMetadataId'
                ],
                withDeleted: true
            })
        ]);
        const [fieldsByObjectId, indexesByObjectId, viewsByObjectId, objectPermissionsByObjectId] = [
            {
                entities: fields,
                foreignKey: 'objectMetadataId'
            },
            {
                entities: indexMetadatas,
                foreignKey: 'objectMetadataId'
            },
            {
                entities: views,
                foreignKey: 'objectMetadataId'
            },
            {
                entities: objectPermissions,
                foreignKey: 'objectMetadataId'
            }
        ].map(_regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const fieldMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(fields);
        const flatObjectMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const objectMetadataEntity of objectMetadatas){
            const flatObjectMetadata = (0, _fromobjectmetadataentitytoflatobjectmetadatautil.fromObjectMetadataEntityToFlatObjectMetadata)({
                entity: {
                    ...objectMetadataEntity,
                    fields: fieldsByObjectId.get(objectMetadataEntity.id) || [],
                    indexMetadatas: indexesByObjectId.get(objectMetadataEntity.id) || [],
                    views: viewsByObjectId.get(objectMetadataEntity.id) || [],
                    objectPermissions: objectPermissionsByObjectId.get(objectMetadataEntity.id) || []
                },
                applicationIdToUniversalIdentifierMap,
                fieldMetadataIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatObjectMetadata,
                flatEntityMapsToMutate: flatObjectMetadataMaps
            });
        }
        return flatObjectMetadataMaps;
    }
    constructor(objectMetadataRepository, applicationRepository, fieldMetadataRepository, indexMetadataRepository, viewRepository, objectPermissionRepository){
        super(), this.objectMetadataRepository = objectMetadataRepository, this.applicationRepository = applicationRepository, this.fieldMetadataRepository = fieldMetadataRepository, this.indexMetadataRepository = indexMetadataRepository, this.viewRepository = viewRepository, this.objectPermissionRepository = objectPermissionRepository;
    }
};
WorkspaceFlatObjectMetadataMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatObjectMetadataMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_indexmetadataentity.IndexMetadataEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_objectpermissionentity.ObjectPermissionEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatObjectMetadataMapCacheService);

//# sourceMappingURL=workspace-flat-object-metadata-map-cache.service.js.map