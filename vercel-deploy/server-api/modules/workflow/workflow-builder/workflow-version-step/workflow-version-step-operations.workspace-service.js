"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionStepOperationsWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionStepOperationsWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _logicfunction = require("twenty-shared/logic-function");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _getflatfieldsforflatobjectmetadatautil = require("../../../../engine/api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _aiagentroleservice = require("../../../../engine/metadata-modules/ai/ai-agent-role/ai-agent-role.service");
const _agentservice = require("../../../../engine/metadata-modules/ai/ai-agent/agent.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _logicfunctionfromsourceservice = require("../../../../engine/metadata-modules/logic-function/services/logic-function-from-source.service");
const _findflatlogicfunctionorthrowutil = require("../../../../engine/metadata-modules/logic-function/utils/find-flat-logic-function-or-throw.util");
const _objectmetadataentity = require("../../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _roletargetentity = require("../../../../engine/metadata-modules/role-target/role-target.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _workflowversionstepexception = require("../../common/exceptions/workflow-version-step.exception");
const _workflowcommonworkspaceservice = require("../../common/workspace-services/workflow-common.workspace-service");
const _codestepbuildservice = require("./code-step/services/code-step-build.service");
const _workflowactiontype = require("../../workflow-executor/workflow-actions/types/workflow-action.type");
const _constants = require("twenty-shared/constants");
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
const BASE_STEP_DEFINITION = {
    outputSchema: {},
    errorHandlingOptions: {
        continueOnFailure: {
            value: false
        },
        retryOnFailure: {
            value: false
        }
    }
};
const DUPLICATED_STEP_POSITION_OFFSET = 50;
const ITERATOR_EMPTY_STEP_POSITION_OFFSET = {
    x: 174,
    y: 83
};
let WorkflowVersionStepOperationsWorkspaceService = class WorkflowVersionStepOperationsWorkspaceService {
    async runWorkflowVersionStepDeletionSideEffects({ step, workspaceId }) {
        switch(step.type){
            case _workflowactiontype.WorkflowActionType.CODE:
                {
                    await this.logicFunctionFromSourceService.deleteOneWithSource({
                        id: step.settings.input.logicFunctionId,
                        workspaceId
                    });
                    break;
                }
            case _workflowactiontype.WorkflowActionType.AI_AGENT:
                {
                    if (!(0, _utils.isDefined)(step.settings.input.agentId)) {
                        break;
                    }
                    const roleTarget = await this.roleTargetRepository.findOne({
                        where: {
                            agentId: step.settings.input.agentId,
                            workspaceId
                        }
                    });
                    await this.agentService.deleteManyAgents({
                        ids: [
                            step.settings.input.agentId
                        ],
                        workspaceId
                    });
                    if ((0, _utils.isDefined)(roleTarget?.roleId) && (0, _utils.isDefined)(roleTarget?.id)) {
                        await this.aiAgentRoleService.deleteAgentOnlyRoleIfUnused({
                            roleId: roleTarget.roleId,
                            roleTargetId: roleTarget.id,
                            workspaceId
                        });
                    }
                    break;
                }
        }
    }
    async runStepCreationSideEffectsAndBuildStep({ type, workspaceId, workflowVersionId, position, id, defaultSettings }) {
        const baseStep = {
            id: id || (0, _uuid.v4)(),
            position,
            valid: false,
            nextStepIds: []
        };
        switch(type){
            case _workflowactiontype.WorkflowActionType.CODE:
                {
                    const logicFunctionId = id ?? (0, _uuid.v4)();
                    const newLogicFunction = await this.codeStepBuildService.createCodeStepLogicFunction({
                        logicFunctionId,
                        workspaceId
                    });
                    if (!(0, _utils.isDefined)(newLogicFunction)) {
                        throw new _workflowversionstepexception.WorkflowVersionStepException('Fail to create Code Step', _workflowversionstepexception.WorkflowVersionStepExceptionCode.CODE_STEP_FAILURE);
                    }
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Code - Logic Function',
                            type: _workflowactiontype.WorkflowActionType.CODE,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                outputSchema: {
                                    link: {
                                        isLeaf: true,
                                        icon: 'IconVariable',
                                        tab: 'test',
                                        label: 'Generate Function Output'
                                    },
                                    _outputSchemaType: 'LINK'
                                },
                                input: {
                                    logicFunctionId: newLogicFunction.id,
                                    logicFunctionInput: (0, _utils.isDefined)(newLogicFunction.workflowActionTriggerSettings?.inputSchema) ? (0, _workflow.getFunctionInputFromInputSchema)(newLogicFunction.workflowActionTriggerSettings.inputSchema)[0] ?? {} : {}
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.LOGIC_FUNCTION:
                {
                    const logicFunctionId = defaultSettings?.input?.logicFunctionId;
                    if (!(0, _utils.isDefined)(logicFunctionId)) {
                        throw new _workflowversionstepexception.WorkflowVersionStepException('Logic function ID is required for LOGIC_FUNCTION step', _workflowversionstepexception.WorkflowVersionStepExceptionCode.INVALID_REQUEST);
                    }
                    const { flatLogicFunctionMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                        workspaceId,
                        flatMapsKeys: [
                            'flatLogicFunctionMaps'
                        ]
                    });
                    const flatLogicFunction = (0, _findflatlogicfunctionorthrowutil.findFlatLogicFunctionOrThrow)({
                        id: logicFunctionId,
                        flatLogicFunctionMaps
                    });
                    const declaredOutputSchema = flatLogicFunction.workflowActionTriggerSettings?.outputSchema;
                    const initialOutputSchema = (0, _utils.isDefined)(declaredOutputSchema) ? (0, _logicfunction.inputSchemaToOutputSchema)(declaredOutputSchema) : {
                        link: {
                            isLeaf: true,
                            icon: 'IconVariable',
                            tab: 'test',
                            label: 'Generate Function Output'
                        },
                        _outputSchemaType: 'LINK'
                    };
                    return {
                        builtStep: {
                            ...baseStep,
                            name: flatLogicFunction.workflowActionTriggerSettings?.label ?? flatLogicFunction.name,
                            type: _workflowactiontype.WorkflowActionType.LOGIC_FUNCTION,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                outputSchema: initialOutputSchema,
                                input: {
                                    logicFunctionId,
                                    logicFunctionInput: (0, _utils.isDefined)(flatLogicFunction.workflowActionTriggerSettings?.inputSchema) ? (0, _workflow.getFunctionInputFromInputSchema)(flatLogicFunction.workflowActionTriggerSettings.inputSchema)[0] ?? {} : {}
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.SEND_EMAIL:
                {
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Send Email',
                            type: _workflowactiontype.WorkflowActionType.SEND_EMAIL,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    connectedAccountId: '',
                                    recipients: {
                                        to: '',
                                        cc: '',
                                        bcc: ''
                                    },
                                    subject: '',
                                    body: ''
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.DRAFT_EMAIL:
                {
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Draft Email',
                            type: _workflowactiontype.WorkflowActionType.DRAFT_EMAIL,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    connectedAccountId: '',
                                    recipients: {
                                        to: '',
                                        cc: '',
                                        bcc: ''
                                    },
                                    subject: '',
                                    body: ''
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.CREATE_RECORD:
                {
                    const activeObjectMetadataItem = await this.objectMetadataRepository.findOne({
                        where: {
                            workspaceId,
                            isActive: true,
                            isSystem: false
                        }
                    });
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Create Record',
                            type: _workflowactiontype.WorkflowActionType.CREATE_RECORD,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    objectName: activeObjectMetadataItem?.nameSingular || '',
                                    objectRecord: {}
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.UPDATE_RECORD:
                {
                    const activeObjectMetadataItem = await this.objectMetadataRepository.findOne({
                        where: {
                            workspaceId,
                            isActive: true,
                            isSystem: false
                        }
                    });
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Update Record',
                            type: _workflowactiontype.WorkflowActionType.UPDATE_RECORD,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    objectName: activeObjectMetadataItem?.nameSingular || '',
                                    objectRecord: {},
                                    objectRecordId: '',
                                    fieldsToUpdate: []
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.DELETE_RECORD:
                {
                    const activeObjectMetadataItem = await this.objectMetadataRepository.findOne({
                        where: {
                            workspaceId,
                            isActive: true,
                            isSystem: false
                        }
                    });
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Delete Record',
                            type: _workflowactiontype.WorkflowActionType.DELETE_RECORD,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    objectName: activeObjectMetadataItem?.nameSingular || '',
                                    objectRecordId: ''
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.UPSERT_RECORD:
                {
                    const activeObjectMetadataItem = await this.objectMetadataRepository.findOne({
                        where: {
                            workspaceId,
                            isActive: true,
                            isSystem: false
                        }
                    });
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Create or Update Record',
                            type: _workflowactiontype.WorkflowActionType.UPSERT_RECORD,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    objectName: activeObjectMetadataItem?.nameSingular || '',
                                    objectRecord: {},
                                    fieldsToUpdate: []
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.FIND_RECORDS:
                {
                    const activeObjectMetadataItem = await this.objectMetadataRepository.findOne({
                        where: {
                            workspaceId,
                            isActive: true,
                            isSystem: false
                        }
                    });
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Search Records',
                            type: _workflowactiontype.WorkflowActionType.FIND_RECORDS,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    objectName: activeObjectMetadataItem?.nameSingular || '',
                                    limit: 1
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.FORM:
                {
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Form',
                            type: _workflowactiontype.WorkflowActionType.FORM,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: []
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.FILTER:
                {
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Filter',
                            type: _workflowactiontype.WorkflowActionType.FILTER,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    stepFilterGroups: [],
                                    stepFilters: []
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.HTTP_REQUEST:
                {
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'HTTP Request',
                            type: _workflowactiontype.WorkflowActionType.HTTP_REQUEST,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    url: '',
                                    method: 'GET',
                                    headers: {},
                                    body: {}
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.AI_AGENT:
                {
                    const newAgent = await this.agentService.createOneAgent({
                        label: 'Workflow Agent ' + baseStep.id.substring(0, 4),
                        icon: 'IconRobot',
                        description: '',
                        prompt: 'You are a helpful AI assistant. Complete the task based on the workflow context.',
                        modelId: _constants.AUTO_SELECT_SMART_MODEL_ID,
                        responseFormat: {
                            type: 'text'
                        },
                        isCustom: true
                    }, workspaceId);
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'AI Agent',
                            type: _workflowactiontype.WorkflowActionType.AI_AGENT,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    agentId: newAgent.id,
                                    prompt: ''
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.ITERATOR:
                {
                    const emptyNodeStep = await this.createEmptyNodeForIteratorStep({
                        iteratorStepId: baseStep.id,
                        workflowVersionId,
                        workspaceId,
                        iteratorPosition: position
                    });
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Iterator',
                            type: _workflowactiontype.WorkflowActionType.ITERATOR,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    items: [],
                                    initialLoopStepIds: [
                                        emptyNodeStep.id
                                    ],
                                    shouldContinueOnIterationFailure: true
                                }
                            }
                        },
                        additionalCreatedSteps: [
                            emptyNodeStep
                        ]
                    };
                }
            case _workflowactiontype.WorkflowActionType.IF_ELSE:
                {
                    const { ifEmptyNode, elseEmptyNode, ifFilterGroupId, branches } = await this.createEmptyNodesForIfElseStep({
                        workflowVersionId,
                        workspaceId,
                        ifElsePosition: position
                    });
                    const initialFilterId = (0, _uuid.v4)();
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'If/Else',
                            type: _workflowactiontype.WorkflowActionType.IF_ELSE,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    stepFilterGroups: [
                                        {
                                            id: ifFilterGroupId,
                                            logicalOperator: _types.StepLogicalOperator.AND
                                        }
                                    ],
                                    stepFilters: [
                                        {
                                            id: initialFilterId,
                                            type: 'unknown',
                                            stepOutputKey: '',
                                            operand: _types.ViewFilterOperand.IS,
                                            value: '',
                                            stepFilterGroupId: ifFilterGroupId,
                                            positionInStepFilterGroup: 0
                                        }
                                    ],
                                    branches
                                }
                            }
                        },
                        additionalCreatedSteps: [
                            ifEmptyNode,
                            elseEmptyNode
                        ]
                    };
                }
            case _workflowactiontype.WorkflowActionType.DELAY:
                {
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Delay',
                            type: _workflowactiontype.WorkflowActionType.DELAY,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {
                                    delayType: 'DURATION',
                                    duration: {
                                        days: 0,
                                        hours: 0,
                                        minutes: 0,
                                        seconds: 0
                                    }
                                }
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.EMPTY:
                {
                    return {
                        builtStep: {
                            ...baseStep,
                            name: 'Add an Action',
                            type: _workflowactiontype.WorkflowActionType.EMPTY,
                            valid: true,
                            settings: {
                                ...BASE_STEP_DEFINITION,
                                input: {}
                            }
                        }
                    };
                }
            default:
                throw new _workflowversionstepexception.WorkflowVersionStepException(`WorkflowActionType '${type}' unknown`, _workflowversionstepexception.WorkflowVersionStepExceptionCode.INVALID_REQUEST);
        }
    }
    async enrichFormStepResponse({ workspaceId, step, response }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const responseKeys = Object.keys(response);
            const enrichedResponses = await Promise.all(responseKeys.map(async (key)=>{
                // @ts-expect-error legacy noImplicitAny
                if (!(0, _utils.isDefined)(response[key])) {
                    // @ts-expect-error legacy noImplicitAny
                    return {
                        key,
                        value: response[key]
                    };
                }
                const field = step.settings.input.find((field)=>field.name === key);
                if (field?.type === 'RECORD' && field?.settings?.objectName && // @ts-expect-error legacy noImplicitAny
                (0, _utils.isDefined)(response[key].id) && // @ts-expect-error legacy noImplicitAny
                (0, _utils.isValidUuid)(response[key].id)) {
                    const { flatObjectMetadata, flatFieldMetadataMaps } = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(field.settings.objectName, workspaceId);
                    const relationFieldsNames = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps).filter((field)=>field.type === _types.FieldMetadataType.RELATION).map((field)=>field.name);
                    const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, field.settings.objectName, {
                        shouldBypassPermissionChecks: true
                    });
                    const record = await repository.findOne({
                        // @ts-expect-error legacy noImplicitAny
                        where: {
                            id: response[key].id
                        },
                        relations: relationFieldsNames
                    });
                    return {
                        key,
                        value: record
                    };
                } else {
                    // @ts-expect-error legacy noImplicitAny
                    return {
                        key,
                        value: response[key]
                    };
                }
            }));
            return enrichedResponses.reduce((acc, { key, value })=>{
                // @ts-expect-error legacy noImplicitAny
                acc[key] = value;
                return acc;
            }, {});
        }, authContext);
    }
    async cloneStep({ step, workspaceId }) {
        const duplicatedStepPosition = {
            x: step.position?.x ?? 0,
            y: step.position?.y ?? 0
        };
        switch(step.type){
            case _workflowactiontype.WorkflowActionType.CODE:
                {
                    const newLogicFunction = await this.codeStepBuildService.duplicateCodeStepLogicFunction({
                        existingLogicFunctionId: step.settings.input.logicFunctionId,
                        workspaceId
                    });
                    return {
                        ...step,
                        id: (0, _uuid.v4)(),
                        nextStepIds: [],
                        position: duplicatedStepPosition,
                        settings: {
                            ...step.settings,
                            input: {
                                ...step.settings.input,
                                logicFunctionId: newLogicFunction.id
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.AI_AGENT:
                {
                    const agentId = step.settings.input.agentId;
                    if (!(0, _utils.isDefined)(agentId)) {
                        throw new _workflowversionstepexception.WorkflowVersionStepException('Agent ID is required for cloning', _workflowversionstepexception.WorkflowVersionStepExceptionCode.AI_AGENT_STEP_FAILURE);
                    }
                    const existingAgent = await this.agentService.findOneAgentById({
                        id: agentId,
                        workspaceId
                    });
                    const clonedStepId = (0, _uuid.v4)();
                    const clonedAgent = await this.agentService.createOneAgent({
                        label: existingAgent.label + ' ' + clonedStepId.substring(0, 4),
                        icon: existingAgent.icon ?? undefined,
                        description: existingAgent.description ?? undefined,
                        prompt: existingAgent.prompt,
                        modelId: existingAgent.modelId,
                        responseFormat: existingAgent.responseFormat ?? undefined,
                        modelConfiguration: existingAgent.modelConfiguration ?? undefined,
                        isCustom: true
                    }, workspaceId);
                    return {
                        ...step,
                        id: clonedStepId,
                        nextStepIds: [],
                        position: duplicatedStepPosition,
                        settings: {
                            ...step.settings,
                            input: {
                                ...step.settings.input,
                                agentId: clonedAgent.id
                            }
                        }
                    };
                }
            case _workflowactiontype.WorkflowActionType.ITERATOR:
                {
                    return {
                        ...step,
                        id: (0, _uuid.v4)(),
                        nextStepIds: [],
                        position: duplicatedStepPosition,
                        settings: {
                            ...step.settings,
                            input: {
                                ...step.settings.input,
                                initialLoopStepIds: []
                            }
                        }
                    };
                }
            default:
                {
                    return {
                        ...step,
                        id: (0, _uuid.v4)(),
                        nextStepIds: [],
                        position: duplicatedStepPosition
                    };
                }
        }
    }
    markStepAsDuplicate({ step }) {
        return {
            ...step,
            name: `${step.name} (Duplicate)`,
            position: {
                x: (step.position?.x ?? 0) + DUPLICATED_STEP_POSITION_OFFSET,
                y: (step.position?.y ?? 0) + DUPLICATED_STEP_POSITION_OFFSET
            }
        };
    }
    async createEmptyNodeForIteratorStep({ iteratorStepId, workflowVersionId, workspaceId, iteratorPosition }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersion = await workflowVersionRepository.findOne({
                where: {
                    id: workflowVersionId
                }
            });
            if (!(0, _utils.isDefined)(workflowVersion)) {
                throw new _workflowversionstepexception.WorkflowVersionStepException('WorkflowVersion not found', _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND);
            }
            const existingSteps = workflowVersion.steps ?? [];
            const emptyNodeStep = {
                id: (0, _uuid.v4)(),
                name: 'Add an Action',
                type: _workflowactiontype.WorkflowActionType.EMPTY,
                valid: true,
                nextStepIds: [
                    iteratorStepId
                ],
                settings: {
                    ...BASE_STEP_DEFINITION,
                    input: {}
                },
                position: {
                    x: (iteratorPosition?.x ?? 0) + ITERATOR_EMPTY_STEP_POSITION_OFFSET.x,
                    y: (iteratorPosition?.y ?? 0) + ITERATOR_EMPTY_STEP_POSITION_OFFSET.y
                }
            };
            await workflowVersionRepository.update(workflowVersion.id, {
                steps: [
                    ...existingSteps,
                    emptyNodeStep
                ]
            });
            return emptyNodeStep;
        }, authContext);
    }
    async createEmptyNodesForIfElseStep({ workflowVersionId, workspaceId, ifElsePosition }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersion = await workflowVersionRepository.findOne({
                where: {
                    id: workflowVersionId
                }
            });
            if (!(0, _utils.isDefined)(workflowVersion)) {
                throw new _workflowversionstepexception.WorkflowVersionStepException('WorkflowVersion not found', _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND);
            }
            const existingSteps = workflowVersion.steps ?? [];
            const ifEmptyNode = {
                id: (0, _uuid.v4)(),
                name: 'Add an Action',
                type: _workflowactiontype.WorkflowActionType.EMPTY,
                valid: true,
                settings: {
                    ...BASE_STEP_DEFINITION,
                    input: {}
                },
                position: {
                    x: (ifElsePosition?.x ?? 0) + _workflow.IF_ELSE_BRANCH_POSITION_OFFSETS.IF.x,
                    y: (ifElsePosition?.y ?? 0) + _workflow.IF_ELSE_BRANCH_POSITION_OFFSETS.IF.y
                }
            };
            const elseEmptyNode = {
                id: (0, _uuid.v4)(),
                name: 'Add an Action',
                type: _workflowactiontype.WorkflowActionType.EMPTY,
                valid: true,
                settings: {
                    ...BASE_STEP_DEFINITION,
                    input: {}
                },
                position: {
                    x: (ifElsePosition?.x ?? 0) + _workflow.IF_ELSE_BRANCH_POSITION_OFFSETS.ELSE.x,
                    y: (ifElsePosition?.y ?? 0) + _workflow.IF_ELSE_BRANCH_POSITION_OFFSETS.ELSE.y
                }
            };
            await workflowVersionRepository.update(workflowVersion.id, {
                steps: [
                    ...existingSteps,
                    ifEmptyNode,
                    elseEmptyNode
                ]
            });
            const ifFilterGroupId = (0, _uuid.v4)();
            const branches = [
                {
                    id: (0, _uuid.v4)(),
                    filterGroupId: ifFilterGroupId,
                    nextStepIds: [
                        ifEmptyNode.id
                    ]
                },
                {
                    id: (0, _uuid.v4)(),
                    nextStepIds: [
                        elseEmptyNode.id
                    ]
                }
            ];
            return {
                ifEmptyNode,
                elseEmptyNode,
                ifFilterGroupId,
                branches
            };
        }, authContext);
    }
    async createDraftStep({ step, workspaceId }) {
        switch(step.type){
            case _workflowactiontype.WorkflowActionType.CODE:
                {
                    const newLogicFunction = await this.codeStepBuildService.duplicateCodeStepLogicFunction({
                        existingLogicFunctionId: step.settings.input.logicFunctionId,
                        workspaceId
                    });
                    return {
                        ...step,
                        settings: {
                            ...step.settings,
                            input: {
                                ...step.settings.input,
                                logicFunctionId: newLogicFunction.id
                            }
                        }
                    };
                }
            default:
                {
                    return step;
                }
        }
    }
    constructor(globalWorkspaceOrmManager, logicFunctionFromSourceService, codeStepBuildService, agentService, roleTargetRepository, objectMetadataRepository, workflowCommonWorkspaceService, aiAgentRoleService, workspaceCacheService, flatEntityMapsCacheService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logicFunctionFromSourceService = logicFunctionFromSourceService;
        this.codeStepBuildService = codeStepBuildService;
        this.agentService = agentService;
        this.roleTargetRepository = roleTargetRepository;
        this.objectMetadataRepository = objectMetadataRepository;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
        this.aiAgentRoleService = aiAgentRoleService;
        this.workspaceCacheService = workspaceCacheService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
    }
};
WorkflowVersionStepOperationsWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(4, (0, _typeorm.InjectRepository)(_roletargetentity.RoleTargetEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _logicfunctionfromsourceservice.LogicFunctionFromSourceService === "undefined" ? Object : _logicfunctionfromsourceservice.LogicFunctionFromSourceService,
        typeof _codestepbuildservice.CodeStepBuildService === "undefined" ? Object : _codestepbuildservice.CodeStepBuildService,
        typeof _agentservice.AgentService === "undefined" ? Object : _agentservice.AgentService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
        typeof _aiagentroleservice.AiAgentRoleService === "undefined" ? Object : _aiagentroleservice.AiAgentRoleService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], WorkflowVersionStepOperationsWorkspaceService);

//# sourceMappingURL=workflow-version-step-operations.workspace-service.js.map