"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DataloaderService", {
    enumerable: true,
    get: function() {
        return DataloaderService;
    }
});
const _common = require("@nestjs/common");
const _dataloader = /*#__PURE__*/ _interop_require_default(require("dataloader"));
const _translations = require("twenty-shared/translations");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _applicationregistrationvariableservice = require("../core-modules/application/application-registration-variable/application-registration-variable.service");
const _i18nservice = require("../core-modules/i18n/i18n.service");
const _filtermorphrelationduplicatefieldsutil = require("./utils/filter-morph-relation-duplicate-fields.util");
const _fieldmetadatastandardoverridespropertiesconstant = require("../metadata-modules/field-metadata/constants/field-metadata-standard-overrides-properties.constant");
const _resolvefieldmetadatastandardoverrideutil = require("../metadata-modules/field-metadata/utils/resolve-field-metadata-standard-override.util");
const _workspacemanyorallflatentitymapscacheservice = require("../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsutil = require("../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _fromflatfieldmetadatatofieldmetadatadtoutil = require("../metadata-modules/flat-field-metadata/utils/from-flat-field-metadata-to-field-metadata-dto.util");
const _isflatfieldmetadataoftypeutil = require("../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const _resolvemorphrelationsfromflatfieldmetadatautil = require("../metadata-modules/flat-field-metadata/utils/resolve-morph-relations-from-flat-field-metadata.util");
const _resolverelationfromflatfieldmetadatautil = require("../metadata-modules/flat-field-metadata/utils/resolve-relation-from-flat-field-metadata.util");
const _fromflatobjectmetadatatoobjectmetadatadtoutil = require("../metadata-modules/flat-object-metadata/utils/from-flat-object-metadata-to-object-metadata-dto.util");
const _getmorphnamefrommorphfieldmetadatanameutil = require("../metadata-modules/flat-object-metadata/utils/get-morph-name-from-morph-field-metadata-name.util");
const _fromflatviewfieldgrouptoviewfieldgroupdtoutil = require("../metadata-modules/view-field-group/utils/from-flat-view-field-group-to-view-field-group-dto.util");
const _fromflatviewfieldtoviewfielddtoutil = require("../metadata-modules/view-field/utils/from-flat-view-field-to-view-field-dto.util");
const _fromflatviewfiltertoviewfilterdtoutil = require("../metadata-modules/view-filter/utils/from-flat-view-filter-to-view-filter-dto.util");
const _fromflatviewfiltergrouptoviewfiltergroupdtoutil = require("../metadata-modules/view-filter-group/utils/from-flat-view-filter-group-to-view-filter-group-dto.util");
const _fromflatviewgrouptoviewgroupdtoutil = require("../metadata-modules/view-group/utils/from-flat-view-group-to-view-group-dto.util");
const _fromflatviewsorttoviewsortdtoutil = require("../metadata-modules/view-sort/utils/from-flat-view-sort-to-view-sort-dto.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DataloaderService = class DataloaderService {
    createLoaders() {
        const relationLoader = this.createRelationLoader();
        const morphRelationLoader = this.createMorphRelationLoader();
        const fieldMetadataLoader = this.createFieldMetadataLoader();
        const indexMetadataLoader = this.createIndexMetadataLoader();
        const indexFieldMetadataLoader = this.createIndexFieldMetadataLoader();
        const objectMetadataLoader = this.createObjectMetadataLoader();
        const viewFieldGroupsByViewIdLoader = this.createViewFieldGroupsByViewIdLoader();
        const viewFieldsByViewFieldGroupIdLoader = this.createViewFieldsByViewFieldGroupIdLoader();
        const viewFieldsByViewIdLoader = this.createViewFieldsByViewIdLoader();
        const viewFiltersByViewIdLoader = this.createViewFiltersByViewIdLoader();
        const viewSortsByViewIdLoader = this.createViewSortsByViewIdLoader();
        const viewGroupsByViewIdLoader = this.createViewGroupsByViewIdLoader();
        const viewFilterGroupsByViewIdLoader = this.createViewFilterGroupsByViewIdLoader();
        const isConfiguredLoader = this.createIsConfiguredLoader();
        return {
            relationLoader,
            morphRelationLoader,
            fieldMetadataLoader,
            indexMetadataLoader,
            indexFieldMetadataLoader,
            objectMetadataLoader,
            viewFieldGroupsByViewIdLoader,
            viewFieldsByViewFieldGroupIdLoader,
            viewFieldsByViewIdLoader,
            viewFiltersByViewIdLoader,
            viewSortsByViewIdLoader,
            viewGroupsByViewIdLoader,
            viewFilterGroupsByViewIdLoader,
            isConfiguredLoader
        };
    }
    createRelationLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatFieldMetadataMaps, flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatFieldMetadataMaps',
                    'flatObjectMetadataMaps'
                ]
            });
            return dataLoaderParams.map(({ fieldMetadataId })=>{
                const sourceFlatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: fieldMetadataId,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                if (!(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(sourceFlatFieldMetadata, _types.FieldMetadataType.RELATION)) {
                    return null;
                }
                return (0, _resolverelationfromflatfieldmetadatautil.resolveRelationFromFlatFieldMetadata)({
                    sourceFlatFieldMetadata,
                    flatFieldMetadataMaps,
                    flatObjectMetadataMaps
                });
            });
        });
    }
    createMorphRelationLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatFieldMetadataMaps, flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatFieldMetadataMaps',
                    'flatObjectMetadataMaps'
                ]
            });
            return dataLoaderParams.map(({ fieldMetadataId })=>{
                const morphFlatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: fieldMetadataId,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                if (!(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(morphFlatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
                    return null;
                }
                return (0, _resolvemorphrelationsfromflatfieldmetadatautil.resolveMorphRelationsFromFlatFieldMetadata)({
                    morphFlatFieldMetadata,
                    flatFieldMetadataMaps,
                    flatObjectMetadataMaps
                });
            });
        });
    }
    createIndexMetadataLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const objectMetadataIds = dataLoaderParams.map((dataLoaderParam)=>dataLoaderParam.objectMetadata.id);
            const { flatIndexMaps, flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatIndexMaps',
                    'flatObjectMetadataMaps'
                ]
            });
            const indexMetadataCollection = objectMetadataIds.map((objectMetadataId)=>{
                const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: objectMetadataId,
                    flatEntityMaps: flatObjectMetadataMaps
                });
                const indexMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityIds: flatObjectMetadata.indexMetadataIds,
                    flatEntityMaps: flatIndexMaps
                });
                return indexMetadatas.map((indexMetadata)=>({
                        ...indexMetadata,
                        indexFieldMetadatas: indexMetadata.flatIndexFieldMetadatas,
                        createdAt: new Date(indexMetadata.createdAt),
                        updatedAt: new Date(indexMetadata.updatedAt),
                        id: indexMetadata.id,
                        indexWhereClause: indexMetadata.indexWhereClause ?? undefined,
                        objectMetadataId,
                        workspaceId
                    }));
            });
            return indexMetadataCollection;
        });
    }
    createFieldMetadataLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const locale = dataLoaderParams[0].locale;
            const i18nInstance = this.i18nService.getI18nInstance(locale ?? _translations.SOURCE_LOCALE);
            const workspaceId = dataLoaderParams[0].workspaceId;
            const objectMetadataIds = dataLoaderParams.map((dataLoaderParam)=>dataLoaderParam.objectMetadata.id);
            const { flatFieldMetadataMaps, flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatFieldMetadataMaps',
                    'flatObjectMetadataMaps'
                ]
            });
            const fieldMetadataCollection = objectMetadataIds.map((objectMetadataId)=>{
                const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: objectMetadataId,
                    flatEntityMaps: flatObjectMetadataMaps
                });
                const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityIds: flatObjectMetadata.fieldIds,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                const overriddenFieldMetadataEntities = objectFlatFieldMetadatas.map((flatFieldMetadata)=>{
                    return _fieldmetadatastandardoverridespropertiesconstant.FIELD_METADATA_STANDARD_OVERRIDES_PROPERTIES.reduce((acc, property)=>({
                            ...acc,
                            [property]: (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)({
                                label: flatFieldMetadata.label,
                                description: flatFieldMetadata.description ?? undefined,
                                icon: flatFieldMetadata.icon ?? undefined,
                                isCustom: flatFieldMetadata.isCustom,
                                standardOverrides: flatFieldMetadata.standardOverrides ?? undefined
                            }, property, dataLoaderParams[0].locale, i18nInstance)
                        }), flatFieldMetadata);
                });
                const filteredFieldMetadataEntities = (0, _filtermorphrelationduplicatefieldsutil.filterMorphRelationDuplicateFields)(overriddenFieldMetadataEntities);
                const filteredFieldMetadataEntitiesWithMorphRenamed = filteredFieldMetadataEntities.map((flatFieldMetadata)=>{
                    if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
                        const relationTargetObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                            flatEntityId: flatFieldMetadata.relationTargetObjectMetadataId,
                            flatEntityMaps: flatObjectMetadataMaps
                        });
                        return {
                            ...flatFieldMetadata,
                            name: (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
                                morphRelationFlatFieldMetadata: flatFieldMetadata,
                                nameSingular: relationTargetObjectMetadata.nameSingular,
                                namePlural: relationTargetObjectMetadata.namePlural
                            })
                        };
                    }
                    return flatFieldMetadata;
                });
                return filteredFieldMetadataEntitiesWithMorphRenamed.map(_fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto);
            });
            return fieldMetadataCollection;
        });
    }
    createIndexFieldMetadataLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatIndexMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatIndexMaps'
                ]
            });
            return dataLoaderParams.map(({ indexMetadata: { id: indexMetadataId } })=>{
                const indexMetadataEntity = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: indexMetadataId,
                    flatEntityMaps: flatIndexMaps
                });
                if (!(0, _utils.isDefined)(indexMetadataEntity)) {
                    return [];
                }
                return [
                    ...indexMetadataEntity.flatIndexFieldMetadatas
                ].sort((a, b)=>a.order - b.order).map((indexFieldMetadata)=>{
                    return {
                        id: indexFieldMetadata.id,
                        fieldMetadataId: indexFieldMetadata.fieldMetadataId,
                        subFieldName: indexFieldMetadata.subFieldName ?? undefined,
                        order: indexFieldMetadata.order,
                        createdAt: new Date(indexFieldMetadata.createdAt),
                        updatedAt: new Date(indexFieldMetadata.updatedAt),
                        indexMetadataId,
                        workspaceId
                    };
                });
            });
        });
    }
    createObjectMetadataLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatObjectMetadataMaps'
                ]
            });
            return dataLoaderParams.map((dataLoaderParam)=>{
                const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: dataLoaderParam.objectMetadataId,
                    flatEntityMaps: flatObjectMetadataMaps
                });
                if (!(0, _utils.isDefined)(flatObjectMetadata)) {
                    return null;
                }
                return (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(flatObjectMetadata);
            });
        });
    }
    createViewFieldGroupsByViewIdLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatViewMaps, flatViewFieldGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatViewMaps',
                    'flatViewFieldGroupMaps'
                ]
            });
            return dataLoaderParams.map(({ viewId })=>{
                const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: viewId,
                    flatEntityMaps: flatViewMaps
                });
                if (!(0, _utils.isDefined)(flatView)) {
                    return [];
                }
                return (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                    flatEntityIds: flatView.viewFieldGroupIds,
                    flatEntityMaps: flatViewFieldGroupMaps
                }).filter((flatViewFieldGroup)=>flatViewFieldGroup.deletedAt === null && flatViewFieldGroup.isActive).map(_fromflatviewfieldgrouptoviewfieldgroupdtoutil.fromFlatViewFieldGroupToViewFieldGroupDto);
            });
        });
    }
    createViewFieldsByViewFieldGroupIdLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatViewFieldGroupMaps, flatViewFieldMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatViewFieldGroupMaps',
                    'flatViewFieldMaps'
                ]
            });
            const viewFieldsByResolvedGroupId = new Map();
            for (const flatViewField of Object.values(flatViewFieldMaps.byUniversalIdentifier)){
                if (!(0, _utils.isDefined)(flatViewField) || flatViewField.deletedAt !== null || !flatViewField.isActive) {
                    continue;
                }
                const resolvedGroupId = flatViewField.overrides?.viewFieldGroupId !== undefined ? flatViewField.overrides.viewFieldGroupId : flatViewField.viewFieldGroupId;
                if (!(0, _utils.isDefined)(resolvedGroupId)) {
                    continue;
                }
                if (!viewFieldsByResolvedGroupId.has(resolvedGroupId)) {
                    viewFieldsByResolvedGroupId.set(resolvedGroupId, []);
                }
                viewFieldsByResolvedGroupId.get(resolvedGroupId).push((0, _fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto)(flatViewField));
            }
            return dataLoaderParams.map(({ viewFieldGroupId })=>{
                const flatViewFieldGroup = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: viewFieldGroupId,
                    flatEntityMaps: flatViewFieldGroupMaps
                });
                if (!(0, _utils.isDefined)(flatViewFieldGroup)) {
                    return [];
                }
                return viewFieldsByResolvedGroupId.get(viewFieldGroupId) ?? [];
            });
        });
    }
    createViewFieldsByViewIdLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatViewMaps, flatViewFieldMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatViewMaps',
                    'flatViewFieldMaps'
                ]
            });
            return dataLoaderParams.map(({ viewId })=>{
                const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: viewId,
                    flatEntityMaps: flatViewMaps
                });
                if (!(0, _utils.isDefined)(flatView)) {
                    return [];
                }
                return (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                    flatEntityIds: flatView.viewFieldIds,
                    flatEntityMaps: flatViewFieldMaps
                }).filter((flatViewField)=>flatViewField.deletedAt === null && flatViewField.isActive).map(_fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto);
            });
        });
    }
    createViewFiltersByViewIdLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatViewMaps, flatViewFilterMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatViewMaps',
                    'flatViewFilterMaps'
                ]
            });
            return dataLoaderParams.map(({ viewId })=>{
                const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: viewId,
                    flatEntityMaps: flatViewMaps
                });
                if (!(0, _utils.isDefined)(flatView)) {
                    return [];
                }
                return (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                    flatEntityIds: flatView.viewFilterIds,
                    flatEntityMaps: flatViewFilterMaps
                }).filter((flatViewFilter)=>flatViewFilter.deletedAt === null).map(_fromflatviewfiltertoviewfilterdtoutil.fromFlatViewFilterToViewFilterDto);
            });
        });
    }
    createViewSortsByViewIdLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatViewMaps, flatViewSortMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatViewMaps',
                    'flatViewSortMaps'
                ]
            });
            return dataLoaderParams.map(({ viewId })=>{
                const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: viewId,
                    flatEntityMaps: flatViewMaps
                });
                if (!(0, _utils.isDefined)(flatView)) {
                    return [];
                }
                return (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                    flatEntityIds: flatView.viewSortIds,
                    flatEntityMaps: flatViewSortMaps
                }).filter((flatViewSort)=>flatViewSort.deletedAt === null).map(_fromflatviewsorttoviewsortdtoutil.fromFlatViewSortToViewSortDto);
            });
        });
    }
    createViewGroupsByViewIdLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatViewMaps, flatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatViewMaps',
                    'flatViewGroupMaps'
                ]
            });
            return dataLoaderParams.map(({ viewId })=>{
                const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: viewId,
                    flatEntityMaps: flatViewMaps
                });
                if (!(0, _utils.isDefined)(flatView)) {
                    return [];
                }
                return (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                    flatEntityIds: flatView.viewGroupIds,
                    flatEntityMaps: flatViewGroupMaps
                }).filter((flatViewGroup)=>flatViewGroup.deletedAt === null).map(_fromflatviewgrouptoviewgroupdtoutil.fromFlatViewGroupToViewGroupDto);
            });
        });
    }
    createViewFilterGroupsByViewIdLoader() {
        return new _dataloader.default(async (dataLoaderParams)=>{
            const workspaceId = dataLoaderParams[0].workspaceId;
            const { flatViewMaps, flatViewFilterGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatViewMaps',
                    'flatViewFilterGroupMaps'
                ]
            });
            return dataLoaderParams.map(({ viewId })=>{
                const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: viewId,
                    flatEntityMaps: flatViewMaps
                });
                if (!(0, _utils.isDefined)(flatView)) {
                    return [];
                }
                return (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                    flatEntityIds: flatView.viewFilterGroupIds,
                    flatEntityMaps: flatViewFilterGroupMaps
                }).filter((flatViewFilterGroup)=>flatViewFilterGroup.deletedAt === null).map(_fromflatviewfiltergrouptoviewfiltergroupdtoutil.fromFlatViewFilterGroupToViewFilterGroupDto);
            });
        });
    }
    createIsConfiguredLoader() {
        return new _dataloader.default(async (params)=>{
            const ids = params.map((p)=>p.applicationRegistrationId);
            const resultMap = await this.applicationRegistrationVariableService.isConfiguredBatch(ids);
            return params.map((p)=>resultMap.get(p.applicationRegistrationId) ?? true);
        });
    }
    constructor(i18nService, flatEntityMapsCacheService, applicationRegistrationVariableService){
        this.i18nService = i18nService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.applicationRegistrationVariableService = applicationRegistrationVariableService;
    }
};
DataloaderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationregistrationvariableservice.ApplicationRegistrationVariableService === "undefined" ? Object : _applicationregistrationvariableservice.ApplicationRegistrationVariableService
    ])
], DataloaderService);

//# sourceMappingURL=dataloader.service.js.map