"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _messagingrelaunchfailedmessagechanneljob = require("../messaging-relaunch-failed-message-channel.job");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
describe('MessagingRelaunchFailedMessageChannelJob', ()=>{
    let job;
    let mockUpdate;
    let mockFindOne;
    const workspaceId = 'workspace-id';
    const messageChannelId = 'message-channel-id';
    beforeEach(async ()=>{
        mockUpdate = jest.fn();
        mockFindOne = jest.fn();
        const providers = [
            _messagingrelaunchfailedmessagechanneljob.MessagingRelaunchFailedMessageChannelJob,
            {
                provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                useValue: {
                    executeInWorkspaceContext: jest.fn().mockImplementation((callback)=>callback())
                }
            },
            {
                provide: (0, _typeorm.getRepositoryToken)(_messagechannelentity.MessageChannelEntity),
                useValue: {
                    findOne: mockFindOne,
                    update: mockUpdate
                }
            }
        ];
        const module = await _testing.Test.createTestingModule({
            providers
        }).compile();
        job = await module.resolve(_messagingrelaunchfailedmessagechanneljob.MessagingRelaunchFailedMessageChannelJob);
    });
    it('should reset throttle state when relaunching a failed channel', async ()=>{
        mockFindOne.mockResolvedValue({
            id: messageChannelId,
            syncStage: _types.MessageChannelSyncStage.FAILED,
            syncStatus: _types.MessageChannelSyncStatus.FAILED_UNKNOWN,
            throttleFailureCount: 5,
            throttleRetryAfter: '2026-03-19T06:49:34.295Z',
            syncStageStartedAt: '2026-03-19T06:34:34.000Z'
        });
        await job.handle({
            workspaceId,
            messageChannelId
        });
        expect(mockUpdate).toHaveBeenCalledWith({
            id: messageChannelId,
            workspaceId
        }, {
            syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_PENDING,
            syncStatus: _types.MessageChannelSyncStatus.ACTIVE,
            throttleFailureCount: 0,
            throttleRetryAfter: null,
            syncStageStartedAt: null
        });
    });
});

//# sourceMappingURL=messaging-relaunch-failed-message-channel.job.spec.js.map