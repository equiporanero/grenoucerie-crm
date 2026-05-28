"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatPageLayoutWidgetMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatPageLayoutWidgetMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _frompagelayoutwidgetentitytoflatpagelayoutwidgetutil = require("../utils/from-page-layout-widget-entity-to-flat-page-layout-widget.util");
const _frontcomponententity = require("../../front-component/entities/front-component.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _pagelayouttabentity = require("../../page-layout-tab/entities/page-layout-tab.entity");
const _pagelayoutwidgetentity = require("../../page-layout-widget/entities/page-layout-widget.entity");
const _viewentity = require("../../view/entities/view.entity");
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
let WorkspaceFlatPageLayoutWidgetMapCacheService = class WorkspaceFlatPageLayoutWidgetMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [existingPageLayoutWidgets, applications, pageLayoutTabs, objectMetadatas, fieldMetadatas, frontComponents, views] = await Promise.all([
            this.pageLayoutWidgetRepository.find({
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
            this.pageLayoutTabRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
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
            }),
            this.frontComponentRepository.find({
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
            })
        ]);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const pageLayoutTabIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(pageLayoutTabs);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const fieldMetadataUniversalIdentifierById = Object.fromEntries((0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(fieldMetadatas));
        const frontComponentUniversalIdentifierById = Object.fromEntries((0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(frontComponents));
        const viewUniversalIdentifierById = Object.fromEntries((0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(views));
        const flatPageLayoutWidgetMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const pageLayoutWidgetEntity of existingPageLayoutWidgets){
            const flatPageLayoutWidget = (0, _frompagelayoutwidgetentitytoflatpagelayoutwidgetutil.fromPageLayoutWidgetEntityToFlatPageLayoutWidget)({
                entity: pageLayoutWidgetEntity,
                applicationIdToUniversalIdentifierMap,
                pageLayoutTabIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                fieldMetadataUniversalIdentifierById,
                frontComponentUniversalIdentifierById,
                viewUniversalIdentifierById
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatPageLayoutWidget,
                flatEntityMapsToMutate: flatPageLayoutWidgetMaps
            });
        }
        return flatPageLayoutWidgetMaps;
    }
    constructor(pageLayoutWidgetRepository, applicationRepository, pageLayoutTabRepository, objectMetadataRepository, fieldMetadataRepository, frontComponentRepository, viewRepository){
        super(), this.pageLayoutWidgetRepository = pageLayoutWidgetRepository, this.applicationRepository = applicationRepository, this.pageLayoutTabRepository = pageLayoutTabRepository, this.objectMetadataRepository = objectMetadataRepository, this.fieldMetadataRepository = fieldMetadataRepository, this.frontComponentRepository = frontComponentRepository, this.viewRepository = viewRepository;
    }
};
WorkspaceFlatPageLayoutWidgetMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatPageLayoutWidgetMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_pagelayoutwidgetentity.PageLayoutWidgetEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_pagelayouttabentity.PageLayoutTabEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_frontcomponententity.FrontComponentEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatPageLayoutWidgetMapCacheService);

//# sourceMappingURL=workspace-flat-page-layout-widget-map-cache.service.js.map