"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformEventBatchToEventPayloads", {
    enumerable: true,
    get: function() {
        return transformEventBatchToEventPayloads;
    }
});
const _utils = require("twenty-shared/utils");
const transformEventBatchToEventPayloads = ({ workspaceEventBatch, logicFunctions })=>{
    const result = [];
    const { events, ...batchEventInfo } = workspaceEventBatch;
    const [, operation] = workspaceEventBatch.name.split('.');
    for (const logicFunction of logicFunctions){
        const triggerUpdatedFields = logicFunction.databaseEventTriggerSettings?.updatedFields;
        const filteredEvents = filterEventsByUpdatedFields({
            events,
            operation,
            triggerUpdatedFields
        });
        for (const event of filteredEvents){
            const payload = {
                ...batchEventInfo,
                ...event
            };
            result.push({
                logicFunctionId: logicFunction.id,
                workspaceId: logicFunction.workspaceId,
                payload
            });
        }
    }
    return result;
};
const filterEventsByUpdatedFields = ({ events, operation, triggerUpdatedFields })=>{
    if (operation !== 'updated' || !(0, _utils.isDefined)(triggerUpdatedFields) || triggerUpdatedFields.length === 0) {
        return events;
    }
    return events.filter((event)=>{
        const eventUpdatedFields = event.properties?.updatedFields;
        if (!(0, _utils.isDefined)(eventUpdatedFields) || eventUpdatedFields.length === 0) {
            return false;
        }
        return eventUpdatedFields.some((fieldName)=>triggerUpdatedFields.includes(fieldName));
    });
};

//# sourceMappingURL=transform-event-batch-to-event-payloads.js.map