"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _logicfunction = require("twenty-shared/logic-function");
const _aiagentroleservice = require("../../../../../engine/metadata-modules/ai/ai-agent-role/ai-agent-role.service");
const _agentservice = require("../../../../../engine/metadata-modules/ai/ai-agent/agent.service");
const _createemptyallflatentitymapsconstant = require("../../../../../engine/metadata-modules/flat-entity/constant/create-empty-all-flat-entity-maps.constant");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _logicfunctionentity = require("../../../../../engine/metadata-modules/logic-function/logic-function.entity");
const _logicfunctionfromsourceservice = require("../../../../../engine/metadata-modules/logic-function/services/logic-function-from-source.service");
const _objectmetadataentity = require("../../../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _roletargetentity = require("../../../../../engine/metadata-modules/role-target/role-target.entity");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _workspacecacheservice = require("../../../../../engine/workspace-cache/services/workspace-cache.service");
const _workflowcommonworkspaceservice = require("../../../common/workspace-services/workflow-common.workspace-service");
const _codestepbuildservice = require("../code-step/services/code-step-build.service");
const _workflowversionstepoperationsworkspaceservice = require("../workflow-version-step-operations.workspace-service");
const _workflowactiontype = require("../../../workflow-executor/workflow-actions/types/workflow-action.type");
const mockWorkspaceId = 'workspace-id';
describe('WorkflowVersionStepOperationsWorkspaceService', ()=>{
    let service;
    let globalWorkspaceOrmManager;
    let logicFunctionFromSourceService;
    let codeStepBuildService;
    let agentService;
    let roleTargetRepository;
    let objectMetadataRepository;
    let workflowCommonWorkspaceService;
    let aiAgentRoleService;
    let workspaceCacheService;
    beforeEach(async ()=>{
        codeStepBuildService = {
            seedCodeStepFiles: jest.fn().mockResolvedValue({
                sourceHandlerPath: 'workflow/logic-fn-id/src/index.ts',
                builtHandlerPath: 'workflow/logic-fn-id/src/index.mjs',
                checksum: 'seed-checksum'
            }),
            createCodeStepLogicFunction: jest.fn().mockResolvedValue({
                id: 'new-function-id',
                name: 'Test Function',
                description: 'Test Description',
                workspaceId: mockWorkspaceId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                deletedAt: null,
                runtime: _logicfunctionentity.LogicFunctionRuntime.NODE22,
                timeoutSeconds: 30,
                sourceHandlerPath: 'src/index.ts',
                builtHandlerPath: 'index.mjs',
                handlerName: 'main',
                checksum: null,
                toolTriggerSettings: null,
                workflowActionTriggerSettings: _logicfunction.SEED_WORKFLOW_ACTION_TRIGGER_SETTINGS,
                universalIdentifier: 'universal-id',
                applicationId: 'application-id',
                cronTriggerSettings: null,
                databaseEventTriggerSettings: null,
                httpRouteTriggerSettings: null
            }),
            copySourceAndBuiltForNewCodeStep: jest.fn().mockResolvedValue(undefined),
            duplicateCodeStepLogicFunction: jest.fn().mockResolvedValue({
                id: 'new-function-id',
                name: 'Test Function',
                description: 'Test Description',
                workspaceId: mockWorkspaceId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                deletedAt: null,
                runtime: _logicfunctionentity.LogicFunctionRuntime.NODE22,
                timeoutSeconds: 30,
                sourceHandlerPath: 'src/index.ts',
                builtHandlerPath: 'index.mjs',
                handlerName: 'main',
                checksum: null,
                toolTriggerSettings: null,
                workflowActionTriggerSettings: null,
                universalIdentifier: 'universal-id',
                applicationId: 'application-id',
                cronTriggerSettings: null,
                databaseEventTriggerSettings: null,
                httpRouteTriggerSettings: null
            })
        };
        logicFunctionFromSourceService = {
            deleteOneWithSource: jest.fn()
        };
        agentService = {
            deleteManyAgents: jest.fn().mockResolvedValue([]),
            findOneAgentById: jest.fn(),
            createOneAgent: jest.fn()
        };
        roleTargetRepository = {
            findOne: jest.fn(),
            count: jest.fn()
        };
        objectMetadataRepository = {
            findOne: jest.fn()
        };
        workflowCommonWorkspaceService = {
            getObjectMetadataItemWithFieldsMaps: jest.fn()
        };
        aiAgentRoleService = {
            deleteAgentOnlyRoleIfUnused: jest.fn()
        };
        globalWorkspaceOrmManager = {
            getRepository: jest.fn()
        };
        workspaceCacheService = {
            flush: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: globalWorkspaceOrmManager
                },
                {
                    provide: _logicfunctionfromsourceservice.LogicFunctionFromSourceService,
                    useValue: logicFunctionFromSourceService
                },
                {
                    provide: _codestepbuildservice.CodeStepBuildService,
                    useValue: codeStepBuildService
                },
                {
                    provide: _agentservice.AgentService,
                    useValue: agentService
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_roletargetentity.RoleTargetEntity),
                    useValue: roleTargetRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_objectmetadataentity.ObjectMetadataEntity),
                    useValue: objectMetadataRepository
                },
                {
                    provide: _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
                    useValue: workflowCommonWorkspaceService
                },
                {
                    provide: _aiagentroleservice.AiAgentRoleService,
                    useValue: aiAgentRoleService
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: workspaceCacheService
                },
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        flushFlatEntityMaps: jest.fn(),
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn().mockResolvedValue((0, _createemptyallflatentitymapsconstant.createEmptyAllFlatEntityMaps)())
                    }
                }
            ]
        }).compile();
        service = module.get(_workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService);
    });
    describe('runWorkflowVersionStepDeletionSideEffects', ()=>{
        it('should delete logic function when deleting code step', async ()=>{
            const step = {
                id: 'step-id',
                name: 'Code Step',
                type: _workflowactiontype.WorkflowActionType.CODE,
                valid: true,
                nextStepIds: [],
                settings: {
                    input: {
                        logicFunctionId: 'function-id'
                    },
                    outputSchema: {},
                    errorHandlingOptions: {
                        continueOnFailure: {
                            value: false
                        },
                        retryOnFailure: {
                            value: false
                        }
                    }
                }
            };
            await service.runWorkflowVersionStepDeletionSideEffects({
                step,
                workspaceId: mockWorkspaceId
            });
            expect(logicFunctionFromSourceService.deleteOneWithSource).toHaveBeenCalledWith({
                id: 'function-id',
                workspaceId: mockWorkspaceId
            });
        });
        it('should delete agent when deleting AI agent step', async ()=>{
            const step = {
                id: 'step-id',
                name: 'AI Agent Step',
                type: _workflowactiontype.WorkflowActionType.AI_AGENT,
                valid: true,
                nextStepIds: [],
                settings: {
                    input: {
                        agentId: 'agent-id',
                        prompt: ''
                    },
                    outputSchema: {},
                    errorHandlingOptions: {
                        continueOnFailure: {
                            value: false
                        },
                        retryOnFailure: {
                            value: false
                        }
                    }
                }
            };
            await service.runWorkflowVersionStepDeletionSideEffects({
                step,
                workspaceId: mockWorkspaceId
            });
            expect(agentService.deleteManyAgents).toHaveBeenCalledWith({
                ids: [
                    'agent-id'
                ],
                workspaceId: mockWorkspaceId
            });
        });
        it('should delete attached role when it is agent-only and unassigned elsewhere', async ()=>{
            const step = {
                id: 'step-id',
                name: 'AI Agent Step',
                type: _workflowactiontype.WorkflowActionType.AI_AGENT,
                valid: true,
                nextStepIds: [],
                settings: {
                    input: {
                        agentId: 'agent-id',
                        prompt: ''
                    },
                    outputSchema: {},
                    errorHandlingOptions: {
                        continueOnFailure: {
                            value: false
                        },
                        retryOnFailure: {
                            value: false
                        }
                    }
                }
            };
            roleTargetRepository.findOne.mockResolvedValue({
                id: 'role-target-id',
                roleId: 'role-id'
            });
            await service.runWorkflowVersionStepDeletionSideEffects({
                step,
                workspaceId: mockWorkspaceId
            });
            expect(agentService.deleteManyAgents).toHaveBeenCalledWith({
                ids: [
                    'agent-id'
                ],
                workspaceId: mockWorkspaceId
            });
            expect(aiAgentRoleService.deleteAgentOnlyRoleIfUnused).toHaveBeenCalledWith({
                roleId: 'role-id',
                roleTargetId: 'role-target-id',
                workspaceId: mockWorkspaceId
            });
        });
    });
    describe('runStepCreationSideEffectsAndBuildStep', ()=>{
        it('should create code step with logic function and seed input fields', async ()=>{
            const result = await service.runStepCreationSideEffectsAndBuildStep({
                type: _workflowactiontype.WorkflowActionType.CODE,
                workspaceId: mockWorkspaceId,
                workflowVersionId: 'workflow-version-id'
            });
            expect(result.builtStep.type).toBe(_workflowactiontype.WorkflowActionType.CODE);
            const codeResult = result.builtStep;
            expect(codeResult.settings.input.logicFunctionId).toBe('new-function-id');
            expect(codeResult.settings.input.logicFunctionInput).toEqual({
                a: null,
                b: null
            });
        });
        it('should create form step', async ()=>{
            const result = await service.runStepCreationSideEffectsAndBuildStep({
                type: _workflowactiontype.WorkflowActionType.FORM,
                workspaceId: mockWorkspaceId,
                workflowVersionId: 'workflow-version-id'
            });
            expect(result.builtStep.type).toBe(_workflowactiontype.WorkflowActionType.FORM);
            expect(result.builtStep.settings.input).toEqual([]);
        });
    });
    describe('createStepForDuplicate', ()=>{
        it('should duplicate code step with new logic function', async ()=>{
            const originalStep = {
                id: 'original-id',
                type: _workflowactiontype.WorkflowActionType.CODE,
                name: 'Original Step',
                valid: true,
                settings: {
                    input: {
                        logicFunctionId: 'function-id'
                    }
                },
                nextStepIds: [
                    'next-step'
                ]
            };
            const clonedStep = await service.cloneStep({
                step: originalStep,
                workspaceId: mockWorkspaceId
            });
            const duplicateStep = service.markStepAsDuplicate({
                step: clonedStep
            });
            expect(duplicateStep.id).not.toBe('original-id');
            expect(duplicateStep.name).toBe('Original Step (Duplicate)');
            const codeResult = duplicateStep;
            expect(codeResult.settings.input.logicFunctionId).toBe('new-function-id');
            expect(duplicateStep.nextStepIds).toEqual([]);
            expect(codeStepBuildService.duplicateCodeStepLogicFunction).toHaveBeenCalledWith({
                existingLogicFunctionId: 'function-id',
                workspaceId: mockWorkspaceId
            });
        });
        it('should duplicate non-code step', async ()=>{
            const originalStep = {
                id: 'original-id',
                type: _workflowactiontype.WorkflowActionType.FORM,
                name: 'Original Step',
                valid: true,
                settings: {
                    input: []
                },
                nextStepIds: [
                    'next-step'
                ]
            };
            const clonedStep = await service.cloneStep({
                step: originalStep,
                workspaceId: mockWorkspaceId
            });
            const duplicateStep = service.markStepAsDuplicate({
                step: clonedStep
            });
            expect(duplicateStep.id).not.toBe('original-id');
            expect(duplicateStep.name).toBe('Original Step (Duplicate)');
            expect(duplicateStep.settings).toEqual(originalStep.settings);
            expect(duplicateStep.nextStepIds).toEqual([]);
        });
        it('should duplicate iterator step with cleared initialLoopStepIds', async ()=>{
            const originalStep = {
                id: 'original-iterator-id',
                type: _workflowactiontype.WorkflowActionType.ITERATOR,
                name: 'Iterator Step',
                valid: true,
                position: {
                    x: 100,
                    y: 200
                },
                settings: {
                    input: {
                        items: [
                            'item1',
                            'item2',
                            'item3'
                        ],
                        initialLoopStepIds: [
                            'loop-step-1',
                            'loop-step-2'
                        ]
                    },
                    outputSchema: {},
                    errorHandlingOptions: {
                        continueOnFailure: {
                            value: false
                        },
                        retryOnFailure: {
                            value: false
                        }
                    }
                },
                nextStepIds: [
                    'next-step'
                ]
            };
            const clonedStep = await service.cloneStep({
                step: originalStep,
                workspaceId: mockWorkspaceId
            });
            expect(clonedStep.id).not.toBe('original-iterator-id');
            expect(clonedStep.type).toBe(_workflowactiontype.WorkflowActionType.ITERATOR);
            expect(clonedStep.nextStepIds).toEqual([]);
            expect(clonedStep.position).toEqual({
                x: 100,
                y: 200
            });
            const iteratorResult = clonedStep;
            expect(iteratorResult.settings.input.items).toEqual([
                'item1',
                'item2',
                'item3'
            ]);
            expect(iteratorResult.settings.input.initialLoopStepIds).toEqual([]);
        });
    });
});

//# sourceMappingURL=workflow-version-step-operations.workspace-service.spec.js.map