"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _aiexception = require("../ai.exception");
const _agententity = require("../ai-agent/entities/agent.entity");
const _roletargetentity = require("../../role-target/role-target.entity");
const _roletargetservice = require("../../role-target/services/role-target.service");
const _roleentity = require("../../role/role.entity");
const _getworkspacescopedrepositorytokenutil = require("../../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
const _aiagentroleservice = require("./ai-agent-role.service");
describe('AiAgentRoleService', ()=>{
    let service;
    let agentRepository;
    let roleRepository;
    let roleTargetRepository;
    let roleTargetService;
    const testWorkspaceId = 'test-workspace-id';
    let testAgent;
    let testRole;
    let testRole2;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _aiagentroleservice.AiAgentRoleService,
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_agententity.AgentEntity),
                    useValue: {
                        findOne: jest.fn(),
                        find: jest.fn(),
                        save: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_roleentity.RoleEntity),
                    useValue: {
                        findOne: jest.fn(),
                        save: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_roletargetentity.RoleTargetEntity),
                    useValue: {
                        findOne: jest.fn(),
                        save: jest.fn(),
                        delete: jest.fn(),
                        find: jest.fn()
                    }
                },
                {
                    provide: _roletargetservice.RoleTargetService,
                    useValue: {
                        create: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_aiagentroleservice.AiAgentRoleService);
        agentRepository = module.get((0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_agententity.AgentEntity));
        roleRepository = module.get((0, _typeorm.getRepositoryToken)(_roleentity.RoleEntity));
        roleTargetRepository = module.get((0, _typeorm.getRepositoryToken)(_roletargetentity.RoleTargetEntity));
        roleTargetService = module.get(_roletargetservice.RoleTargetService);
        // Setup test data
        testAgent = {
            id: 'test-agent-id',
            name: 'Test Agent',
            description: 'Test agent for unit tests',
            prompt: 'You are a test agent',
            modelId: 'openai/gpt-4o',
            workspaceId: testWorkspaceId,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        testRole = {
            id: 'test-role-id',
            label: 'Test Role',
            description: 'Test role for unit tests',
            canUpdateAllSettings: false,
            canReadAllObjectRecords: true,
            canUpdateAllObjectRecords: false,
            canSoftDeleteAllObjectRecords: false,
            canDestroyAllObjectRecords: false,
            canBeAssignedToAgents: true,
            canBeAssignedToUsers: true,
            canBeAssignedToApiKeys: true,
            workspaceId: testWorkspaceId,
            createdAt: new Date(),
            updatedAt: new Date(),
            isEditable: true
        };
        testRole2 = {
            id: 'test-role-2-id',
            label: 'Test Role 2',
            description: 'Second test role for unit tests',
            canUpdateAllSettings: true,
            canReadAllObjectRecords: true,
            canUpdateAllObjectRecords: true,
            canSoftDeleteAllObjectRecords: false,
            canDestroyAllObjectRecords: false,
            canBeAssignedToAgents: true,
            canBeAssignedToUsers: true,
            canBeAssignedToApiKeys: true,
            workspaceId: testWorkspaceId,
            createdAt: new Date(),
            updatedAt: new Date(),
            isEditable: true
        };
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('assignRoleToAgent', ()=>{
        it('should successfully assign a role to an agent', async ()=>{
            // Arrange
            jest.spyOn(agentRepository, 'findOne').mockResolvedValue(testAgent);
            jest.spyOn(roleRepository, 'findOne').mockResolvedValue(testRole);
            jest.spyOn(roleTargetRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(roleTargetService, 'create').mockResolvedValue({});
            // Act
            await service.assignRoleToAgent({
                workspaceId: testWorkspaceId,
                agentId: testAgent.id,
                roleId: testRole.id
            });
            // Assert
            expect(agentRepository.findOne).toHaveBeenCalledWith(testWorkspaceId, {
                where: {
                    id: testAgent.id
                }
            });
            expect(roleRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: testRole.id,
                    workspaceId: testWorkspaceId
                }
            });
            expect(roleTargetRepository.findOne).toHaveBeenCalledWith({
                where: {
                    agentId: testAgent.id,
                    roleId: testRole.id,
                    workspaceId: testWorkspaceId
                }
            });
            expect(roleTargetService.create).toHaveBeenCalledWith({
                createRoleTargetInput: {
                    roleId: testRole.id,
                    targetId: testAgent.id,
                    targetMetadataForeignKey: 'agentId'
                },
                workspaceId: testWorkspaceId
            });
        });
        it('should replace existing role when assigning a new role to an agent', async ()=>{
            // Arrange
            jest.spyOn(agentRepository, 'findOne').mockResolvedValue(testAgent);
            jest.spyOn(roleRepository, 'findOne').mockResolvedValue(testRole2);
            jest.spyOn(roleTargetRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(roleTargetService, 'create').mockResolvedValue({});
            // Act
            await service.assignRoleToAgent({
                workspaceId: testWorkspaceId,
                agentId: testAgent.id,
                roleId: testRole2.id
            });
            // Assert
            expect(roleTargetService.create).toHaveBeenCalledWith({
                createRoleTargetInput: {
                    roleId: testRole2.id,
                    targetId: testAgent.id,
                    targetMetadataForeignKey: 'agentId'
                },
                workspaceId: testWorkspaceId
            });
        });
        it('should not create duplicate role target when assigning the same role', async ()=>{
            // Arrange
            const existingRoleTarget = {
                id: 'existing-role-target-id',
                roleId: testRole.id,
                agentId: testAgent.id,
                workspaceId: testWorkspaceId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            jest.spyOn(agentRepository, 'findOne').mockResolvedValue(testAgent);
            jest.spyOn(roleRepository, 'findOne').mockResolvedValue(testRole);
            jest.spyOn(roleTargetRepository, 'findOne').mockResolvedValue(existingRoleTarget);
            // Act
            await service.assignRoleToAgent({
                workspaceId: testWorkspaceId,
                agentId: testAgent.id,
                roleId: testRole.id
            });
            // Assert
            expect(roleTargetService.create).not.toHaveBeenCalled();
        });
        it('should throw AiException when agent does not exist', async ()=>{
            // Arrange
            const nonExistentAgentId = 'non-existent-agent-id';
            jest.spyOn(agentRepository, 'findOne').mockResolvedValue(null);
            // Act & Assert
            await expect(service.assignRoleToAgent({
                workspaceId: testWorkspaceId,
                agentId: nonExistentAgentId,
                roleId: testRole.id
            })).rejects.toThrow(_aiexception.AiException);
            await expect(service.assignRoleToAgent({
                workspaceId: testWorkspaceId,
                agentId: nonExistentAgentId,
                roleId: testRole.id
            })).rejects.toMatchObject({
                code: _aiexception.AiExceptionCode.AGENT_NOT_FOUND,
                message: `Agent with id ${nonExistentAgentId} not found in workspace`
            });
        });
        it('should throw AiException when role does not exist', async ()=>{
            // Arrange
            const nonExistentRoleId = 'non-existent-role-id';
            jest.spyOn(agentRepository, 'findOne').mockResolvedValue(testAgent);
            jest.spyOn(roleRepository, 'findOne').mockResolvedValue(null);
            // Act & Assert
            await expect(service.assignRoleToAgent({
                workspaceId: testWorkspaceId,
                agentId: testAgent.id,
                roleId: nonExistentRoleId
            })).rejects.toThrow(_aiexception.AiException);
            await expect(service.assignRoleToAgent({
                workspaceId: testWorkspaceId,
                agentId: testAgent.id,
                roleId: nonExistentRoleId
            })).rejects.toMatchObject({
                code: _aiexception.AiExceptionCode.ROLE_NOT_FOUND,
                message: `Role with id ${nonExistentRoleId} not found in workspace`
            });
        });
        it('should throw AiException when agent belongs to different workspace', async ()=>{
            // Arrange
            const differentWorkspaceId = 'different-workspace-id';
            jest.spyOn(agentRepository, 'findOne').mockResolvedValue(null);
            // Act & Assert
            await expect(service.assignRoleToAgent({
                workspaceId: differentWorkspaceId,
                agentId: testAgent.id,
                roleId: testRole.id
            })).rejects.toThrow(_aiexception.AiException);
            await expect(service.assignRoleToAgent({
                workspaceId: differentWorkspaceId,
                agentId: testAgent.id,
                roleId: testRole.id
            })).rejects.toMatchObject({
                code: _aiexception.AiExceptionCode.AGENT_NOT_FOUND,
                message: `Agent with id ${testAgent.id} not found in workspace`
            });
        });
    });
    describe('removeRoleFromAgent', ()=>{
        it('should successfully remove role from agent', async ()=>{
            // Arrange
            const existingRoleTarget = {
                id: 'existing-role-target-id',
                roleId: testRole.id,
                agentId: testAgent.id,
                workspaceId: testWorkspaceId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            jest.spyOn(roleTargetRepository, 'findOne').mockResolvedValue(existingRoleTarget);
            jest.spyOn(roleTargetService, 'delete').mockResolvedValue(undefined);
            // Act
            await service.removeRoleFromAgent({
                workspaceId: testWorkspaceId,
                agentId: testAgent.id
            });
            // Assert
            expect(roleTargetRepository.findOne).toHaveBeenCalledWith({
                where: {
                    agentId: testAgent.id,
                    workspaceId: testWorkspaceId
                }
            });
            expect(roleTargetService.delete).toHaveBeenCalledWith({
                id: existingRoleTarget.id,
                workspaceId: testWorkspaceId
            });
        });
        it('should throw error when removing role from agent that has no role', async ()=>{
            // Arrange
            jest.spyOn(roleTargetRepository, 'findOne').mockResolvedValue(null);
            // Act & Assert
            await expect(service.removeRoleFromAgent({
                workspaceId: testWorkspaceId,
                agentId: testAgent.id
            })).rejects.toThrow(_aiexception.AiException);
            await expect(service.removeRoleFromAgent({
                workspaceId: testWorkspaceId,
                agentId: testAgent.id
            })).rejects.toMatchObject({
                code: _aiexception.AiExceptionCode.ROLE_NOT_FOUND,
                message: `Role target not found for agent ${testAgent.id}`
            });
        });
    });
});

//# sourceMappingURL=agent-role.service.spec.js.map