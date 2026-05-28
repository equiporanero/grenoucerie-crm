"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatTwentyOrmEventToDatabaseBatchEvent", {
    enumerable: true,
    get: function() {
        return formatTwentyOrmEventToDatabaseBatchEvent;
    }
});
const _databaseevents = require("twenty-shared/database-events");
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _databaseeventaction = require("../../api/graphql/graphql-query-runner/enums/database-event-action");
const _objectrecordchangedvalues = require("../../core-modules/event-emitter/utils/object-record-changed-values");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const formatTwentyOrmEventToDatabaseBatchEvent = ({ action, objectMetadataItem, flatFieldMetadataMaps, workspaceId, authContext, recordsAfter, recordsBefore })=>{
    if (objectMetadataItem.universalIdentifier === _metadata.STANDARD_OBJECTS.timelineActivity.universalIdentifier) {
        return;
    }
    const objectMetadataNameSingular = objectMetadataItem.nameSingular;
    let events = [];
    switch(action){
        case _databaseeventaction.DatabaseEventAction.CREATED:
            {
                if (!(0, _utils.isDefined)(recordsAfter)) {
                    throw new Error(`recordsAfter is required for ${action.toUpperCase()} action`);
                }
                if (!(0, _utils.isNonEmptyArray)(recordsAfter)) {
                    break;
                }
                events = recordsAfter?.map((recordAfter)=>{
                    const event = new _databaseevents.ObjectRecordCreateEvent();
                    event.userId = authContext?.user?.id;
                    event.userWorkspaceId = authContext?.userWorkspaceId;
                    event.workspaceMemberId = authContext?.workspaceMemberId;
                    event.recordId = recordAfter.id;
                    event.properties = {
                        after: recordAfter
                    };
                    return event;
                }) ?? [];
                break;
            }
        case _databaseeventaction.DatabaseEventAction.UPDATED:
        case _databaseeventaction.DatabaseEventAction.DELETED:
        case _databaseeventaction.DatabaseEventAction.RESTORED:
            {
                if (!(0, _utils.isDefined)(recordsAfter)) {
                    throw new Error(`recordsAfter is required for ${action.toUpperCase()} action`);
                }
                if (!(0, _utils.isDefined)(recordsBefore)) {
                    throw new Error(`recordsBefore is required for ${action.toUpperCase()} action`);
                }
                if (!(0, _utils.isNonEmptyArray)(recordsAfter)) {
                    break;
                }
                events = recordsAfter.map((recordAfter)=>{
                    if (!(0, _utils.isNonEmptyArray)(recordsBefore)) {
                        throw new Error(`recordsBefore is required for ${action.toUpperCase()} action`);
                    }
                    const correspondingRecordBefore = recordsBefore.find((recordBeforeToFind)=>recordBeforeToFind.id === recordAfter.id);
                    if (!(0, _utils.isDefined)(correspondingRecordBefore)) {
                        throw new _twentyormexception.TwentyORMException(`Record mismatch detected while computing event data for ${action.toUpperCase()} action`, _twentyormexception.TwentyORMExceptionCode.ORM_EVENT_DATA_CORRUPTED);
                    }
                    const diff = (0, _objectrecordchangedvalues.objectRecordChangedValues)(correspondingRecordBefore, recordAfter, objectMetadataItem, flatFieldMetadataMaps);
                    const updatedFields = Object.keys(diff);
                    if (updatedFields.length === 0) {
                        return;
                    }
                    const eventPayload = {
                        userId: authContext?.user?.id,
                        userWorkspaceId: authContext?.userWorkspaceId,
                        workspaceMemberId: authContext?.workspaceMemberId,
                        recordId: recordAfter.id,
                        properties: {
                            before: correspondingRecordBefore,
                            after: recordAfter,
                            updatedFields,
                            diff
                        }
                    };
                    switch(action){
                        case _databaseeventaction.DatabaseEventAction.DELETED:
                            return Object.assign(new _databaseevents.ObjectRecordDeleteEvent(), eventPayload);
                        case _databaseeventaction.DatabaseEventAction.UPDATED:
                            return Object.assign(new _databaseevents.ObjectRecordUpdateEvent(), eventPayload);
                        case _databaseeventaction.DatabaseEventAction.RESTORED:
                            return Object.assign(new _databaseevents.ObjectRecordRestoreEvent(), eventPayload);
                        default:
                            return (0, _utils.assertUnreachable)(action);
                    }
                }).filter(_utils.isDefined);
                break;
            }
        case _databaseeventaction.DatabaseEventAction.DESTROYED:
            {
                if (!(0, _utils.isDefined)(recordsBefore)) {
                    throw new Error(`recordsBefore is required for "${action}" action`);
                }
                if (!(0, _utils.isNonEmptyArray)(recordsBefore)) {
                    break;
                }
                events = recordsBefore.map((recordBefore)=>{
                    const event = new _databaseevents.ObjectRecordDestroyEvent();
                    event.userId = authContext?.user?.id;
                    event.userWorkspaceId = authContext?.userWorkspaceId;
                    event.workspaceMemberId = authContext?.workspaceMemberId;
                    event.recordId = recordBefore.id;
                    event.properties = {
                        before: recordBefore
                    };
                    return event;
                });
                break;
            }
        case _databaseeventaction.DatabaseEventAction.UPSERTED:
            {
                if (!(0, _utils.isDefined)(recordsAfter)) {
                    throw new Error(`recordsAfter is required for "${action}" action`);
                }
                if (!(0, _utils.isNonEmptyArray)(recordsAfter)) {
                    break;
                }
                events = recordsAfter.map((recordAfter)=>{
                    const event = new _databaseevents.ObjectRecordUpsertEvent();
                    event.userId = authContext?.user?.id;
                    event.userWorkspaceId = authContext?.userWorkspaceId;
                    event.workspaceMemberId = authContext?.workspaceMemberId;
                    event.recordId = recordAfter.id;
                    const correspondingRecordBefore = recordsBefore?.find((recordBeforeToFind)=>recordBeforeToFind.id === recordAfter.id);
                    let updatedFields;
                    let diff;
                    diff = (0, _objectrecordchangedvalues.objectRecordChangedValues)(correspondingRecordBefore ?? {}, recordAfter, objectMetadataItem, flatFieldMetadataMaps);
                    updatedFields = Object.keys(diff);
                    event.properties = {
                        after: recordAfter,
                        ...correspondingRecordBefore && {
                            before: correspondingRecordBefore
                        },
                        ...diff && {
                            diff
                        },
                        ...updatedFields && {
                            updatedFields
                        }
                    };
                    return event;
                });
                break;
            }
        default:
            return;
    }
    if (!events.length) {
        return;
    }
    return {
        objectMetadataNameSingular,
        action,
        events,
        objectMetadata: objectMetadataItem,
        workspaceId
    };
};

//# sourceMappingURL=format-twenty-orm-event-to-database-batch-event.util.js.map