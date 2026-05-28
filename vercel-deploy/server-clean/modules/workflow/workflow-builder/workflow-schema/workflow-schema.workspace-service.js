"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowSchemaWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowSchemaWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _checkstringisdatabaseeventaction = require("../../../../engine/api/graphql/graphql-query-runner/utils/check-string-is-database-event-action");
const _generatefakevalue = require("../../../../engine/utils/generate-fake-value");
const _workflowcommonworkspaceservice = require("../../common/workspace-services/workflow-common.workspace-service");
const _defaultiteratorcurrentitemconst = require("./constants/default-iterator-current-item.const");
const _extractpropertypathfromvariable = require("./utils/extract-property-path-from-variable");
const _generatefakearrayitem = require("./utils/generate-fake-array-item");
const _generatefakeformresponse = require("./utils/generate-fake-form-response");
const _generatefakeobjectrecord = require("./utils/generate-fake-object-record");
const _generatefakeobjectrecordevent = require("./utils/generate-fake-object-record-event");
const _inferarrayitemschema = require("./utils/infer-array-item-schema");
const _workflowactiontype = require("../../workflow-executor/workflow-actions/types/workflow-action.type");
const _workflowtriggertype = require("../../workflow-trigger/types/workflow-trigger.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowSchemaWorkspaceService = class WorkflowSchemaWorkspaceService {
    async computeStepOutputSchema({ step, workspaceId, workflowVersionId }) {
        const stepType = step.type;
        switch(stepType){
            case _workflowtriggertype.WorkflowTriggerType.DATABASE_EVENT:
                {
                    return this.computeDatabaseEventTriggerOutputSchema({
                        eventName: step.settings.eventName,
                        workspaceId
                    });
                }
            case _workflowtriggertype.WorkflowTriggerType.MANUAL:
                {
                    const { availability } = step.settings;
                    if ((0, _utils.isDefined)(availability)) {
                        return this.computeTriggerOutputSchemaFromAvailability({
                            availability,
                            workspaceId
                        });
                    }
                    return {};
                }
            case _workflowtriggertype.WorkflowTriggerType.WEBHOOK:
            case _workflowtriggertype.WorkflowTriggerType.CRON:
                {
                    return {};
                }
            case _workflowactiontype.WorkflowActionType.SEND_EMAIL:
                {
                    return this.computeSendEmailActionOutputSchema();
                }
            case _workflowactiontype.WorkflowActionType.CREATE_RECORD:
            case _workflowactiontype.WorkflowActionType.UPDATE_RECORD:
            case _workflowactiontype.WorkflowActionType.DELETE_RECORD:
            case _workflowactiontype.WorkflowActionType.UPSERT_RECORD:
                return this.computeRecordOutputSchema({
                    objectType: step.settings.input.objectName,
                    workspaceId
                });
            case _workflowactiontype.WorkflowActionType.FIND_RECORDS:
                return this.computeFindRecordsOutputSchema({
                    objectType: step.settings.input.objectName,
                    workspaceId
                });
            case _workflowactiontype.WorkflowActionType.FORM:
                return this.computeFormActionOutputSchema({
                    formFieldMetadataItems: step.settings.input,
                    workspaceId
                });
            case _workflowactiontype.WorkflowActionType.ITERATOR:
                {
                    const items = step.settings.input.items;
                    return {
                        currentItem: await this.computeLoopCurrentItemOutputSchema({
                            items,
                            workspaceId,
                            workflowVersionId
                        }),
                        currentItemIndex: {
                            label: 'Current Item Index',
                            isLeaf: true,
                            type: 'number',
                            value: (0, _generatefakevalue.generateFakeValue)('number')
                        },
                        hasProcessedAllItems: {
                            label: 'Has Processed All Items',
                            isLeaf: true,
                            type: 'boolean',
                            value: false
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.AI_AGENT:
                {
                    return {
                        response: {
                            label: 'Response',
                            isLeaf: true,
                            type: 'string',
                            value: 'Response of the agent'
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.CODE:
            default:
                return {};
        }
    }
    async enrichOutputSchema({ step, workspaceId, workflowVersionId }) {
        const BACKEND_ENRICHED_TYPES = [
            _workflowactiontype.WorkflowActionType.ITERATOR
        ];
        if (!BACKEND_ENRICHED_TYPES.includes(step.type)) {
            return step;
        }
        const result = {
            ...step
        };
        const outputSchema = await this.computeStepOutputSchema({
            step,
            workspaceId,
            workflowVersionId
        });
        result.settings = {
            ...result.settings,
            outputSchema: outputSchema || {}
        };
        return result;
    }
    async computeDatabaseEventTriggerOutputSchema({ eventName, workspaceId }) {
        const [nameSingular, action] = eventName.split('.');
        if (!(0, _checkstringisdatabaseeventaction.checkStringIsDatabaseEventAction)(action)) {
            return {};
        }
        const objectMetadataInfo = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(nameSingular, workspaceId);
        return (0, _generatefakeobjectrecordevent.generateFakeObjectRecordEvent)(objectMetadataInfo, action);
    }
    async computeFindRecordsOutputSchema({ objectType, workspaceId }) {
        const recordOutputSchema = await this.computeRecordOutputSchema({
            objectType,
            workspaceId
        });
        const objectMetadataInfo = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(objectType, workspaceId);
        const first = {
            isLeaf: false,
            label: `First ${objectMetadataInfo.flatObjectMetadata.labelSingular ?? 'Record'}`,
            icon: 'IconAlpha',
            type: 'object',
            value: recordOutputSchema
        };
        const all = {
            isLeaf: true,
            label: `All ${objectMetadataInfo.flatObjectMetadata.labelPlural ?? 'Records'}`,
            type: 'array',
            icon: 'IconListDetails',
            value: 'Returns an array of records'
        };
        const totalCount = {
            isLeaf: true,
            label: 'Total Count',
            icon: 'IconSum',
            type: 'number',
            value: 'Count of matching records'
        };
        return {
            first,
            all,
            totalCount
        };
    }
    async computeRecordOutputSchema({ objectType, workspaceId }) {
        const objectMetadataInfo = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(objectType, workspaceId);
        return (0, _generatefakeobjectrecord.generateFakeObjectRecord)({
            objectMetadataInfo
        });
    }
    computeSendEmailActionOutputSchema() {
        return {
            success: {
                isLeaf: true,
                type: 'boolean',
                value: true
            }
        };
    }
    async computeFormActionOutputSchema({ formFieldMetadataItems, workspaceId }) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.workflowCommonWorkspaceService.getFlatEntityMaps(workspaceId);
        return (0, _generatefakeformresponse.generateFakeFormResponse)({
            formFieldMetadataItems,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            objectIdByNameSingular
        });
    }
    async computeTriggerOutputSchemaFromAvailability({ availability, workspaceId }) {
        if (availability.type === 'GLOBAL') {
            return {};
        }
        if (availability.type === 'SINGLE_RECORD') {
            return this.computeRecordOutputSchema({
                objectType: availability.objectNameSingular,
                workspaceId
            });
        }
        if (availability.type === 'BULK_RECORDS') {
            const objectMetadataInfo = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(availability.objectNameSingular, workspaceId);
            return {
                [objectMetadataInfo.flatObjectMetadata.namePlural]: {
                    label: objectMetadataInfo.flatObjectMetadata.labelPlural,
                    isLeaf: true,
                    type: 'array',
                    value: 'Array of ' + objectMetadataInfo.flatObjectMetadata.labelPlural
                }
            };
        }
        return {};
    }
    async computeLoopCurrentItemOutputSchema({ items, workspaceId, workflowVersionId }) {
        if (!(0, _utils.isDefined)(items)) {
            return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
        }
        if ((0, _guards.isString)(items) && (0, _utils.isValidVariable)(items)) {
            return this.computeIteratorCurrentItemFromVariable({
                items,
                workspaceId,
                workflowVersionId
            });
        }
        return (0, _generatefakearrayitem.generateFakeArrayItem)({
            items
        });
    }
    async computeIteratorCurrentItemFromVariable({ items, workspaceId, workflowVersionId }) {
        if (!(0, _utils.isDefined)(workflowVersionId)) {
            return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
        }
        const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
            workflowVersionId,
            workspaceId
        });
        const stepId = (0, _workflow.extractRawVariableNamePart)({
            rawVariableName: items,
            part: 'stepId'
        });
        if (stepId === _workflow.TRIGGER_STEP_ID) {
            const trigger = workflowVersion.trigger;
            if (!(0, _utils.isDefined)(trigger)) {
                return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
            }
            switch(trigger.type){
                case _workflowtriggertype.WorkflowTriggerType.MANUAL:
                    {
                        if (trigger.settings.availability?.type === 'BULK_RECORDS') {
                            const objectMetadataInfo = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(trigger.settings.availability.objectNameSingular, workspaceId);
                            return {
                                label: 'Current Item (' + objectMetadataInfo.flatObjectMetadata.labelSingular + ')',
                                isLeaf: false,
                                type: 'object',
                                value: await this.computeRecordOutputSchema({
                                    objectType: trigger.settings.availability.objectNameSingular,
                                    workspaceId
                                })
                            };
                        }
                        return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
                    }
                case _workflowtriggertype.WorkflowTriggerType.WEBHOOK:
                    {
                        const propertyPath = (0, _extractpropertypathfromvariable.extractPropertyPathFromVariable)(items);
                        const schemaNode = (0, _workflow.navigateOutputSchemaProperty)({
                            schema: trigger.settings.outputSchema,
                            propertyPath
                        });
                        if (!(0, _utils.isDefined)(schemaNode)) {
                            return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
                        }
                        return (0, _inferarrayitemschema.inferArrayItemSchema)({
                            schemaNode
                        });
                    }
                default:
                    {
                        return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
                    }
            }
        }
        const step = workflowVersion.steps?.find((step)=>step.id === stepId);
        if (!(0, _utils.isDefined)(step)) {
            return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
        }
        switch(step.type){
            case _workflowactiontype.WorkflowActionType.FIND_RECORDS:
                {
                    const objectMetadataInfo = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(step.settings.input.objectName, workspaceId);
                    return {
                        label: 'Current Item (' + objectMetadataInfo.flatObjectMetadata.labelSingular + ')',
                        isLeaf: false,
                        type: 'object',
                        value: await this.computeRecordOutputSchema({
                            objectType: step.settings.input.objectName,
                            workspaceId
                        })
                    };
                }
            case _workflowactiontype.WorkflowActionType.CODE:
            case _workflowactiontype.WorkflowActionType.HTTP_REQUEST:
            case _workflowactiontype.WorkflowActionType.LOGIC_FUNCTION:
                {
                    const propertyPath = (0, _extractpropertypathfromvariable.extractPropertyPathFromVariable)(items);
                    const schemaNode = (0, _workflow.navigateOutputSchemaProperty)({
                        schema: step.settings.outputSchema,
                        propertyPath
                    });
                    if (!(0, _utils.isDefined)(schemaNode)) {
                        return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
                    }
                    return (0, _inferarrayitemschema.inferArrayItemSchema)({
                        schemaNode
                    });
                }
            default:
                {
                    return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
                }
        }
    }
    constructor(workflowCommonWorkspaceService){
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
    }
};
WorkflowSchemaWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
    ])
], WorkflowSchemaWorkspaceService);

//# sourceMappingURL=workflow-schema.workspace-service.js.map