"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatIndexMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatIndexMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromindexmetadataentitytoflatindexmetadatautil = require("../utils/from-index-metadata-entity-to-flat-index-metadata.util");
const _indexmetadataentity = require("../../index-metadata/index-metadata.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
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
let WorkspaceFlatIndexMapCacheService = class WorkspaceFlatIndexMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [indexes, applications, objectMetadatas, fieldMetadatas] = await Promise.all([
            this.indexMetadataRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true,
                relationLoadStrategy: 'join',
                relations: [
                    'indexFieldMetadatas'
                ]
            }),
            this.applicationRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ]
            }),
            this.objectMetadataRepository.find({
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
                    'universalIdentifier'
                ],
                withDeleted: true
            })
        ]);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const fieldMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(fieldMetadatas);
        const flatIndexMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const indexEntity of indexes){
            const flatIndex = (0, _fromindexmetadataentitytoflatindexmetadatautil.fromIndexMetadataEntityToFlatIndexMetadata)({
                entity: indexEntity,
                applicationIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                fieldMetadataIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatIndex,
                flatEntityMapsToMutate: flatIndexMaps
            });
        }
        return flatIndexMaps;
    }
    constructor(indexMetadataRepository, applicationRepository, objectMetadataRepository, fieldMetadataRepository){
        super(), this.indexMetadataRepository = indexMetadataRepository, this.applicationRepository = applicationRepository, this.objectMetadataRepository = objectMetadataRepository, this.fieldMetadataRepository = fieldMetadataRepository;
    }
};
WorkspaceFlatIndexMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatIndexMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_indexmetadataentity.IndexMetadataEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatIndexMapCacheService);

//# sourceMappingURL=workspace-flat-index-map-cache.service.js.map