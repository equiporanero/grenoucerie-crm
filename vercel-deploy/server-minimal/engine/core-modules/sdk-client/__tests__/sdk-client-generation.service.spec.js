"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _workspaceschemafactory = require("../../../api/graphql/workspace-schema.factory");
const _applicationentity = require("../../application/application.entity");
const _applicationservice = require("../../application/application.service");
const _filestorageservice = require("../../file-storage/file-storage.service");
const _getqueuetokenutil = require("../../message-queue/utils/get-queue-token.util");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _generatesdkclientjobconstants = require("../jobs/generate-sdk-client.job-constants");
const _sdkclientgenerationservice = require("../sdk-client-generation.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
describe('SdkClientGenerationService', ()=>{
    let service;
    let applicationService;
    let messageQueueService;
    beforeEach(async ()=>{
        applicationService = {
            findWorkspaceTwentyStandardAndCustomApplicationOrThrow: jest.fn()
        };
        messageQueueService = {
            add: jest.fn().mockResolvedValue(undefined)
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _sdkclientgenerationservice.SdkClientGenerationService,
                {
                    provide: _filestorageservice.FileStorageService,
                    useValue: {}
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_applicationentity.ApplicationEntity),
                    useValue: {}
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: {}
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: {}
                },
                {
                    provide: _workspaceschemafactory.WorkspaceSchemaFactory,
                    useValue: {}
                },
                {
                    provide: _applicationservice.ApplicationService,
                    useValue: applicationService
                },
                {
                    provide: (0, _getqueuetokenutil.getQueueToken)(_messagequeueconstants.MessageQueue.workspaceQueue),
                    useValue: messageQueueService
                }
            ]
        }).compile();
        service = module.get(_sdkclientgenerationservice.SdkClientGenerationService);
    });
    describe('enqueueSdkClientGenerationForWorkspace', ()=>{
        const workspaceId = 'workspace-1';
        const apps = {
            twentyStandardFlatApplication: {
                id: 'std-app-id',
                universalIdentifier: 'twenty-standard'
            },
            workspaceCustomFlatApplication: {
                id: 'custom-app-id',
                universalIdentifier: 'workspace-custom'
            }
        };
        it('enqueues one job per application with dedup id and retry limit', async ()=>{
            applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow.mockResolvedValue(apps);
            await service.enqueueSdkClientGenerationForWorkspace(workspaceId);
            expect(messageQueueService.add).toHaveBeenCalledTimes(2);
            expect(messageQueueService.add).toHaveBeenNthCalledWith(1, _generatesdkclientjobconstants.GENERATE_SDK_CLIENT_JOB_NAME, {
                workspaceId,
                applicationId: 'std-app-id',
                applicationUniversalIdentifier: 'twenty-standard'
            }, {
                id: `sdk-client:${workspaceId}:std-app-id`,
                retryLimit: 3
            });
            expect(messageQueueService.add).toHaveBeenNthCalledWith(2, _generatesdkclientjobconstants.GENERATE_SDK_CLIENT_JOB_NAME, {
                workspaceId,
                applicationId: 'custom-app-id',
                applicationUniversalIdentifier: 'workspace-custom'
            }, {
                id: `sdk-client:${workspaceId}:custom-app-id`,
                retryLimit: 3
            });
        });
        it('propagates errors thrown by the message queue service', async ()=>{
            applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow.mockResolvedValue(apps);
            const failure = new Error('Redis unavailable');
            messageQueueService.add.mockRejectedValueOnce(failure);
            await expect(service.enqueueSdkClientGenerationForWorkspace(workspaceId)).rejects.toBe(failure);
        });
    });
});

//# sourceMappingURL=sdk-client-generation.service.spec.js.map