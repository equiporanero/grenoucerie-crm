"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _billingsubscriptionservice = require("../../../billing/services/billing-subscription.service");
const _billingservice = require("../../../billing/services/billing.service");
const _dnsmanagerservice = require("../../../dns-manager/services/dns-manager.service");
const _customdomainmanagerservice = require("../../../domain/custom-domain-manager/services/custom-domain-manager.service");
const _subdomainmanagerservice = require("../../../domain/subdomain-manager/services/subdomain-manager.service");
const _exceptionhandlerservice = require("../../../exception-handler/exception-handler.service");
const _featureflagservice = require("../../../feature-flag/services/feature-flag.service");
const _filecorepictureservice = require("../../../file/file-core-picture/services/file-core-picture.service");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _getqueuetokenutil = require("../../../message-queue/utils/get-queue-token.util");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../../user-workspace/user-workspace.entity");
const _userworkspaceservice = require("../../../user-workspace/user-workspace.service");
const _userentity = require("../../../user/user.entity");
const _workspaceservice = require("../workspace.service");
const _workspaceentity = require("../../workspace.entity");
const _createemptyallflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-all-flat-entity-maps.constant");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _upgrademigrationservice = require("../../../upgrade/services/upgrade-migration.service");
const _upgradesequencereaderservice = require("../../../upgrade/services/upgrade-sequence-reader.service");
const _aimodelregistryservice = require("../../../../metadata-modules/ai/ai-models/services/ai-model-registry.service");
const _permissionsservice = require("../../../../metadata-modules/permissions/permissions.service");
const _coreentitycacheservice = require("../../../../core-entity-cache/services/core-entity-cache.service");
const _workspacecachestorageservice = require("../../../../workspace-cache-storage/workspace-cache-storage.service");
const _workspacedatasourceservice = require("../../../../workspace-datasource/workspace-datasource.service");
const _prefilllogicfunctionservice = require("../../../../workspace-manager/standard-objects-prefill-data/services/prefill-logic-function.service");
const _applicationservice = require("../../../application/application.service");
const _preinstalledappsservice = require("../../../application/pre-installed-apps/pre-installed-apps.service");
const _sdkclientgenerationservice = require("../../../sdk-client/sdk-client-generation.service");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
const _workspacemanagerservice = require("../../../../workspace-manager/workspace-manager.service");
describe('WorkspaceService', ()=>{
    let service;
    let userWorkspaceRepository;
    let userRepository;
    let workspaceRepository;
    let workspaceCacheStorageService;
    let messageQueueService;
    let dnsManagerService;
    let billingSubscriptionService;
    let userWorkspaceService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workspaceservice.WorkspaceService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: {
                        findOne: jest.fn(),
                        softDelete: jest.fn(),
                        delete: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: {
                        find: jest.fn(),
                        softDelete: jest.fn(),
                        delete: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useValue: {
                        softDelete: jest.fn()
                    }
                },
                {
                    provide: _billingservice.BillingService,
                    useValue: {
                        isBillingEnabled: jest.fn().mockReturnValue(true)
                    }
                },
                {
                    provide: _billingsubscriptionservice.BillingSubscriptionService,
                    useValue: {
                        cancelSubscription: jest.fn(),
                        assertSubscriptionCanceledOrNone: jest.fn()
                    }
                },
                ...[
                    _workspacemanagerservice.WorkspaceManagerService,
                    _dnsmanagerservice.DnsManagerService,
                    _customdomainmanagerservice.CustomDomainManagerService,
                    _subdomainmanagerservice.SubdomainManagerService,
                    _twentyconfigservice.TwentyConfigService,
                    _exceptionhandlerservice.ExceptionHandlerService,
                    _permissionsservice.PermissionsService,
                    _featureflagservice.FeatureFlagService,
                    _filecorepictureservice.FileCorePictureService,
                    _aimodelregistryservice.AiModelRegistryService,
                    _applicationservice.ApplicationService,
                    _preinstalledappsservice.PreInstalledAppsService,
                    _sdkclientgenerationservice.SdkClientGenerationService,
                    _prefilllogicfunctionservice.PrefillLogicFunctionService,
                    _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
                    _upgrademigrationservice.UpgradeMigrationService,
                    _upgradesequencereaderservice.UpgradeSequenceReaderService
                ].map((service)=>({
                        provide: service,
                        useValue: {}
                    })),
                {
                    provide: _workspacecachestorageservice.WorkspaceCacheStorageService,
                    useValue: {
                        flush: jest.fn()
                    }
                },
                {
                    provide: _workspacedatasourceservice.WorkspaceDataSourceService,
                    useValue: {
                        deleteWorkspaceDBSchema: jest.fn()
                    }
                },
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        flushFlatEntityMaps: jest.fn(),
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn().mockResolvedValue((0, _createemptyallflatentitymapsconstant.createEmptyAllFlatEntityMaps)())
                    }
                },
                {
                    provide: _userworkspaceservice.UserWorkspaceService,
                    useValue: {
                        deleteUserWorkspace: jest.fn()
                    }
                },
                {
                    provide: (0, _getqueuetokenutil.getQueueToken)(_messagequeueconstants.MessageQueue.deleteCascadeQueue),
                    useValue: {
                        add: jest.fn()
                    }
                },
                {
                    provide: _coreentitycacheservice.CoreEntityCacheService,
                    useValue: {
                        invalidate: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getDataSourceToken)(),
                    useValue: {
                        createQueryRunner: jest.fn().mockReturnValue({
                            connect: jest.fn(),
                            startTransaction: jest.fn(),
                            commitTransaction: jest.fn(),
                            rollbackTransaction: jest.fn(),
                            release: jest.fn(),
                            manager: {
                                delete: jest.fn().mockResolvedValue({
                                    affected: 0
                                })
                            }
                        })
                    }
                }
            ]
        }).compile();
        service = module.get(_workspaceservice.WorkspaceService);
        userWorkspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity));
        userRepository = module.get((0, _typeorm.getRepositoryToken)(_userentity.UserEntity));
        workspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity));
        workspaceCacheStorageService = module.get(_workspacecachestorageservice.WorkspaceCacheStorageService);
        messageQueueService = module.get((0, _getqueuetokenutil.getQueueToken)(_messagequeueconstants.MessageQueue.deleteCascadeQueue));
        dnsManagerService = module.get(_dnsmanagerservice.DnsManagerService);
        dnsManagerService.deleteHostnameSilently = jest.fn();
        billingSubscriptionService = module.get(_billingsubscriptionservice.BillingSubscriptionService);
        userWorkspaceService = module.get(_userworkspaceservice.UserWorkspaceService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('handleRemoveWorkspaceMember', ()=>{
        it('should soft delete the user workspace record', async ()=>{
            jest.spyOn(userWorkspaceRepository, 'find').mockResolvedValue([
                {
                    userId: 'user-id',
                    workspaceId: 'workspace-id',
                    id: 'user-workspace-id'
                }
            ]);
            await service.handleRemoveWorkspaceMember('workspace-id', 'user-id', true);
            expect(userWorkspaceService.deleteUserWorkspace).toHaveBeenCalledWith({
                userWorkspaceId: 'user-workspace-id',
                softDelete: true
            });
            expect(userWorkspaceRepository.delete).not.toHaveBeenCalled();
            expect(userRepository.softDelete).toHaveBeenCalledWith('user-id');
        });
        it('should destroy the user workspace record', async ()=>{
            jest.spyOn(userWorkspaceRepository, 'find').mockResolvedValue([
                {
                    id: 'user-workspace-id',
                    userId: 'user-id',
                    workspaceId: 'workspace-id'
                }
            ]);
            await service.handleRemoveWorkspaceMember('workspace-id', 'user-id', false);
            expect(userWorkspaceService.deleteUserWorkspace).toHaveBeenCalledWith({
                userWorkspaceId: 'user-workspace-id',
                softDelete: false
            });
            expect(userRepository.softDelete).toHaveBeenCalledWith('user-id');
        });
        it('should not soft delete the user record if there are other user workspace records', async ()=>{
            jest.spyOn(userWorkspaceRepository, 'find').mockResolvedValue([
                {
                    id: 'remaining-user-workspace-id',
                    userId: 'user-id',
                    workspaceId: 'other-workspace-id'
                },
                {
                    id: 'user-workspace-id',
                    userId: 'user-id',
                    workspaceId: 'workspace-id'
                }
            ]);
            await service.handleRemoveWorkspaceMember('workspace-id', 'user-id', false);
            expect(userWorkspaceService.deleteUserWorkspace).toHaveBeenCalledWith({
                userWorkspaceId: 'user-workspace-id',
                softDelete: false
            });
            expect(userWorkspaceService.deleteUserWorkspace).not.toHaveBeenCalledWith({
                userWorkspaceId: 'remaining-user-workspace-id',
                softDelete: false
            });
            expect(userRepository.softDelete).not.toHaveBeenCalled();
        });
    });
    describe('deleteWorkspace', ()=>{
        it('should hard delete the workspace', async ()=>{
            const mockWorkspace = {
                id: 'workspace-id',
                metadataVersion: 0
            };
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(userWorkspaceRepository, 'find').mockResolvedValue([]);
            await service.deleteWorkspace(mockWorkspace.id, false);
            expect(billingSubscriptionService.assertSubscriptionCanceledOrNone).toHaveBeenCalledWith(mockWorkspace.id);
            expect(workspaceCacheStorageService.flush).toHaveBeenCalledWith(mockWorkspace.id, mockWorkspace.metadataVersion);
            expect(messageQueueService.add).toHaveBeenCalled();
            expect(workspaceRepository.delete).toHaveBeenCalledWith(mockWorkspace.id);
            expect(workspaceRepository.softDelete).not.toHaveBeenCalled();
        });
        it('should soft delete the workspace', async ()=>{
            const mockWorkspace = {
                id: 'workspace-id',
                metadataVersion: 0
            };
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(userWorkspaceRepository, 'find').mockResolvedValue([]);
            await service.deleteWorkspace(mockWorkspace.id, true);
            expect(billingSubscriptionService.cancelSubscription).toHaveBeenCalledWith(mockWorkspace.id);
            expect(workspaceRepository.softDelete).toHaveBeenCalledWith({
                id: mockWorkspace.id
            });
            expect(workspaceRepository.delete).not.toHaveBeenCalled();
        });
        it('should delete the custom domain when hard deleting a workspace with a custom domain', async ()=>{
            const customDomain = 'custom.example.com';
            const mockWorkspace = {
                id: 'workspace-id',
                metadataVersion: 0,
                customDomain
            };
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(userWorkspaceRepository, 'find').mockResolvedValue([]);
            await service.deleteWorkspace(mockWorkspace.id, false);
            expect(dnsManagerService.deleteHostnameSilently).toHaveBeenCalledWith(customDomain);
        });
        it('should not delete the custom domain when soft deleting a workspace with a custom domain', async ()=>{
            const customDomain = 'custom.example.com';
            const mockWorkspace = {
                id: 'workspace-id',
                metadataVersion: 0,
                customDomain
            };
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValue(mockWorkspace);
            jest.spyOn(userWorkspaceRepository, 'find').mockResolvedValue([]);
            await service.deleteWorkspace(mockWorkspace.id, true);
            expect(dnsManagerService.deleteHostnameSilently).not.toHaveBeenCalled();
            expect(workspaceRepository.softDelete).toHaveBeenCalledWith({
                id: mockWorkspace.id
            });
        });
    });
});

//# sourceMappingURL=workspace.service.spec.js.map