"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveOverridableEntityEventBatchOverrides", {
    enumerable: true,
    get: function() {
        return resolveOverridableEntityEventBatchOverrides;
    }
});
const _utils = require("twenty-shared/utils");
const OVERRIDABLE_ENTITY_METADATA_NAMES = new Set([
    'viewField',
    'viewFieldGroup',
    'pageLayoutTab',
    'pageLayoutWidget'
]);
const resolveRecordOverrides = (record)=>{
    const { overrides, ...base } = record;
    if (!(0, _utils.isDefined)(overrides)) {
        return base;
    }
    return {
        ...base,
        ...overrides
    };
};
const resolveEventOverrides = (event)=>{
    const properties = {
        ...event.properties
    };
    if ('before' in properties && (0, _utils.isDefined)(properties.before)) {
        properties.before = resolveRecordOverrides(properties.before);
    }
    if ('after' in properties && (0, _utils.isDefined)(properties.after)) {
        properties.after = resolveRecordOverrides(properties.after);
    }
    return {
        ...event,
        properties
    };
};
const resolveOverridableEntityEventBatchOverrides = (metadataEventBatch)=>{
    if (!OVERRIDABLE_ENTITY_METADATA_NAMES.has(metadataEventBatch.metadataName)) {
        return metadataEventBatch;
    }
    const events = metadataEventBatch.events.map(resolveEventOverrides);
    return {
        ...metadataEventBatch,
        events
    };
};

//# sourceMappingURL=sanitize-overridable-entity-event-batch.util.js.map