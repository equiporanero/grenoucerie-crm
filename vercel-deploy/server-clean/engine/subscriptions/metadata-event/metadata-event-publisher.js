"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataEventPublisher", {
    enumerable: true,
    get: function() {
        return MetadataEventPublisher;
    }
});
const _common = require("@nestjs/common");
const _translations = require("twenty-shared/translations");
const _utils = require("twenty-shared/utils");
const _i18nservice = require("../../core-modules/i18n/i18n.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _navigationmenuitemrecordidentifierservice = require("../../metadata-modules/navigation-menu-item/services/navigation-menu-item-record-identifier.service");
const _fieldmetadatastandardoverridespropertiesconstant = require("../../metadata-modules/field-metadata/constants/field-metadata-standard-overrides-properties.constant");
const _objectmetadatastandardoverridespropertiesconstant = require("../../metadata-modules/object-metadata/constants/object-metadata-standard-overrides-properties.constant");
const _enrichcommandmenuitemeventwithresolvednavigationutil = require("./utils/enrich-command-menu-item-event-with-resolved-navigation.util");
const _enrichfieldmetadataeventwithrelationsutil = require("./utils/enrich-field-metadata-event-with-relations.util");
const _sanitizeoverridableentityeventbatchutil = require("./utils/sanitize-overridable-entity-event-batch.util");
const _workspaceeventbroadcasterservice = require("../workspace-event-broadcaster/workspace-event-broadcaster.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MetadataEventPublisher = class MetadataEventPublisher {
    async publish(metadataEventBatch) {
        if (!(0, _utils.isNonEmptyArray)(metadataEventBatch.events)) {
            return;
        }
        const enrichedBatch = await this.enrichMetadataEventBatch(metadataEventBatch);
        await this.workspaceEventBroadcaster.broadcast({
            workspaceId: enrichedBatch.workspaceId,
            updatedCollectionHash: enrichedBatch.updatedCollectionHash,
            events: enrichedBatch.events.map((event)=>({
                    type: event.type,
                    entityName: event.metadataName,
                    recordId: event.recordId,
                    properties: event.properties
                }))
        });
    }
    async enrichMetadataEventBatch(metadataEventBatch) {
        switch(metadataEventBatch.metadataName){
            case 'fieldMetadata':
                return this.enrichFieldMetadataEventsWithRelations(metadataEventBatch);
            case 'navigationMenuItem':
                return this.enrichNavigationMenuItemEventsWithTargetRecordIdentifier(metadataEventBatch);
            case 'commandMenuItem':
                return this.enrichCommandMenuItemEventsWithResolvedNavigation(metadataEventBatch);
            case 'objectMetadata':
                return this.resolveObjectMetadataStandardOverrides(metadataEventBatch);
            default:
                return (0, _sanitizeoverridableentityeventbatchutil.resolveOverridableEntityEventBatchOverrides)(metadataEventBatch);
        }
    }
    async enrichFieldMetadataEventsWithRelations(metadataEventBatch) {
        const { flatFieldMetadataMaps, flatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: metadataEventBatch.workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps',
                'flatObjectMetadataMaps'
            ]
        });
        const enrichedEvents = metadataEventBatch.events.map((event)=>{
            const enrichedProperties = {
                ...event.properties
            };
            if ('before' in enrichedProperties && (0, _utils.isDefined)(enrichedProperties.before)) {
                enrichedProperties.before = this.applyStandardOverridesToMetadataRecord(enrichedProperties.before, _fieldmetadatastandardoverridespropertiesconstant.FIELD_METADATA_STANDARD_OVERRIDES_PROPERTIES);
            }
            if ('after' in enrichedProperties && (0, _utils.isDefined)(enrichedProperties.after)) {
                const enrichedAfter = (0, _enrichfieldmetadataeventwithrelationsutil.enrichFieldMetadataEventWithRelations)({
                    record: enrichedProperties.after,
                    flatFieldMetadataMaps,
                    flatObjectMetadataMaps
                });
                enrichedProperties.after = this.applyStandardOverridesToMetadataRecord(enrichedAfter, _fieldmetadatastandardoverridespropertiesconstant.FIELD_METADATA_STANDARD_OVERRIDES_PROPERTIES);
            }
            return {
                ...event,
                properties: enrichedProperties
            };
        });
        return {
            ...metadataEventBatch,
            events: enrichedEvents
        };
    }
    async enrichCommandMenuItemEventsWithResolvedNavigation(metadataEventBatch) {
        const { flatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: metadataEventBatch.workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const i18nInstance = this.i18nService.getI18nInstance(_translations.SOURCE_LOCALE);
        const enrichedEvents = metadataEventBatch.events.map((event)=>{
            if (!('after' in event.properties) || !(0, _utils.isDefined)(event.properties.after)) {
                return event;
            }
            const enrichedAfter = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
                record: event.properties.after,
                flatObjectMetadataMaps,
                locale: _translations.SOURCE_LOCALE,
                i18nInstance
            });
            return {
                ...event,
                properties: {
                    ...event.properties,
                    after: enrichedAfter
                }
            };
        });
        return {
            ...metadataEventBatch,
            events: enrichedEvents
        };
    }
    async enrichNavigationMenuItemEventsWithTargetRecordIdentifier(metadataEventBatch) {
        const enrichedEvents = await Promise.all(metadataEventBatch.events.map(async (event)=>{
            if (!('after' in event.properties) || !(0, _utils.isDefined)(event.properties.after)) {
                return event;
            }
            const after = event.properties.after;
            const targetRecordId = after.targetRecordId;
            const targetObjectMetadataId = after.targetObjectMetadataId;
            if (!(0, _utils.isDefined)(targetRecordId) || !(0, _utils.isDefined)(targetObjectMetadataId)) {
                return event;
            }
            const targetRecordIdentifier = await this.navigationMenuItemRecordIdentifierService.resolveRecordIdentifier({
                targetRecordId,
                targetObjectMetadataId,
                workspaceId: metadataEventBatch.workspaceId
            });
            const enrichedAfter = {
                ...after,
                targetRecordIdentifier
            };
            return {
                ...event,
                properties: {
                    ...event.properties,
                    after: enrichedAfter
                }
            };
        }));
        return {
            ...metadataEventBatch,
            events: enrichedEvents
        };
    }
    resolveObjectMetadataStandardOverrides(metadataEventBatch) {
        const enrichedEvents = metadataEventBatch.events.map((event)=>{
            const enrichedProperties = {
                ...event.properties
            };
            if ('before' in enrichedProperties && (0, _utils.isDefined)(enrichedProperties.before)) {
                enrichedProperties.before = this.applyStandardOverridesToMetadataRecord(enrichedProperties.before, _objectmetadatastandardoverridespropertiesconstant.OBJECT_METADATA_STANDARD_OVERRIDES_PROPERTIES);
            }
            if ('after' in enrichedProperties && (0, _utils.isDefined)(enrichedProperties.after)) {
                enrichedProperties.after = this.applyStandardOverridesToMetadataRecord(enrichedProperties.after, _objectmetadatastandardoverridespropertiesconstant.OBJECT_METADATA_STANDARD_OVERRIDES_PROPERTIES);
            }
            return {
                ...event,
                properties: enrichedProperties
            };
        });
        return {
            ...metadataEventBatch,
            events: enrichedEvents
        };
    }
    applyStandardOverridesToMetadataRecord(record, standardOverrideProperties) {
        const standardOverrides = record.standardOverrides;
        if (!(0, _utils.isDefined)(standardOverrides)) {
            return record;
        }
        const resolved = {
            ...record
        };
        for (const key of standardOverrideProperties){
            if ((0, _utils.isDefined)(standardOverrides[key])) {
                resolved[key] = standardOverrides[key];
            }
        }
        return resolved;
    }
    constructor(workspaceEventBroadcaster, workspaceManyOrAllFlatEntityMapsCacheService, navigationMenuItemRecordIdentifierService, i18nService){
        this.workspaceEventBroadcaster = workspaceEventBroadcaster;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.navigationMenuItemRecordIdentifierService = navigationMenuItemRecordIdentifierService;
        this.i18nService = i18nService;
    }
};
MetadataEventPublisher = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbroadcasterservice.WorkspaceEventBroadcaster === "undefined" ? Object : _workspaceeventbroadcasterservice.WorkspaceEventBroadcaster,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _navigationmenuitemrecordidentifierservice.NavigationMenuItemRecordIdentifierService === "undefined" ? Object : _navigationmenuitemrecordidentifierservice.NavigationMenuItemRecordIdentifierService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], MetadataEventPublisher);

//# sourceMappingURL=metadata-event-publisher.js.map