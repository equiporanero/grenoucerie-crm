"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatViewFieldGroupMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatViewFieldGroupMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromviewfieldgroupentitytoflatviewfieldgrouputil = require("../utils/from-view-field-group-entity-to-flat-view-field-group.util");
const _viewfieldgroupentity = require("../../view-field-group/entities/view-field-group.entity");
const _viewfieldentity = require("../../view-field/entities/view-field.entity");
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
let WorkspaceFlatViewFieldGroupMapCacheService = class WorkspaceFlatViewFieldGroupMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [viewFieldGroups, applications, views, viewFields] = await Promise.all([
            this.viewFieldGroupRepository.find({
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
            this.viewRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            }),
            this.viewFieldRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'viewFieldGroupId'
                ],
                withDeleted: true
            })
        ]);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const viewIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(views);
        const viewFieldsByViewFieldGroupId = (0, _regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId)({
            entities: viewFields,
            foreignKey: 'viewFieldGroupId'
        });
        const flatViewFieldGroupMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const viewFieldGroupEntity of viewFieldGroups){
            const flatViewFieldGroup = (0, _fromviewfieldgroupentitytoflatviewfieldgrouputil.fromViewFieldGroupEntityToFlatViewFieldGroup)({
                entity: {
                    ...viewFieldGroupEntity,
                    viewFields: viewFieldsByViewFieldGroupId.get(viewFieldGroupEntity.id) || []
                },
                applicationIdToUniversalIdentifierMap,
                viewIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatViewFieldGroup,
                flatEntityMapsToMutate: flatViewFieldGroupMaps
            });
        }
        return flatViewFieldGroupMaps;
    }
    constructor(viewFieldGroupRepository, applicationRepository, viewRepository, viewFieldRepository){
        super(), this.viewFieldGroupRepository = viewFieldGroupRepository, this.applicationRepository = applicationRepository, this.viewRepository = viewRepository, this.viewFieldRepository = viewFieldRepository;
    }
};
WorkspaceFlatViewFieldGroupMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatViewFieldGroupMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_viewfieldgroupentity.ViewFieldGroupEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_viewfieldentity.ViewFieldEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatViewFieldGroupMapCacheService);

//# sourceMappingURL=workspace-flat-view-field-group-map-cache.service.js.map