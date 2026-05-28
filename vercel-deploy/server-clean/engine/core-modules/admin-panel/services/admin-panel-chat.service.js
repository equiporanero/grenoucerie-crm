"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelChatService", {
    enumerable: true,
    get: function() {
        return AdminPanelChatService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _workspaceentity = require("../../workspace/workspace.entity");
const _agentmessageentity = require("../../../metadata-modules/ai/ai-agent-execution/entities/agent-message.entity");
const _agentchatthreadentity = require("../../../metadata-modules/ai/ai-chat/entities/agent-chat-thread.entity");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
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
let AdminPanelChatService = class AdminPanelChatService {
    async assertWorkspaceAllowsImpersonation(workspaceId) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            },
            select: {
                id: true,
                allowImpersonation: true
            }
        });
        if (!workspace) {
            throw new _graphqlerrorsutil.UserInputError('Workspace not found');
        }
        if (!workspace.allowImpersonation) {
            throw new _graphqlerrorsutil.UserInputError('This workspace has not enabled support access');
        }
    }
    async getWorkspaceChatThreads(workspaceId) {
        await this.assertWorkspaceAllowsImpersonation(workspaceId);
        const threads = await this.agentChatThreadRepository.find({
            where: {
                workspaceId
            },
            order: {
                updatedAt: 'DESC'
            },
            take: 100
        });
        return threads.map((thread)=>({
                id: thread.id,
                title: thread.title,
                totalInputTokens: thread.totalInputTokens,
                totalOutputTokens: thread.totalOutputTokens,
                conversationSize: thread.conversationSize,
                createdAt: thread.createdAt,
                updatedAt: thread.updatedAt
            }));
    }
    async getChatThreadMessages(threadId) {
        const thread = await this.agentChatThreadRepository.findOne({
            where: {
                id: threadId
            }
        });
        if (!thread) {
            throw new _graphqlerrorsutil.UserInputError('Thread not found');
        }
        await this.assertWorkspaceAllowsImpersonation(thread.workspaceId);
        const messages = await this.agentMessageRepository.find(thread.workspaceId, {
            where: {
                threadId
            },
            relations: {
                parts: true
            },
            order: {
                createdAt: 'ASC'
            }
        });
        return {
            thread: {
                id: thread.id,
                title: thread.title,
                totalInputTokens: thread.totalInputTokens,
                totalOutputTokens: thread.totalOutputTokens,
                conversationSize: thread.conversationSize,
                createdAt: thread.createdAt,
                updatedAt: thread.updatedAt
            },
            messages: messages.map((message)=>({
                    id: message.id,
                    role: message.role,
                    parts: (message.parts ?? []).sort((a, b)=>a.orderIndex - b.orderIndex).map((part)=>({
                            type: part.type,
                            textContent: part.textContent,
                            toolName: part.toolName
                        })),
                    createdAt: message.createdAt
                }))
        };
    }
    constructor(workspaceRepository, // Thread lookup is by id alone; the admin does not know the workspaceId
    // upfront. assertWorkspaceAllowsImpersonation gates every other read.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    agentChatThreadRepository, agentMessageRepository){
        this.workspaceRepository = workspaceRepository;
        this.agentChatThreadRepository = agentChatThreadRepository;
        this.agentMessageRepository = agentMessageRepository;
    }
};
AdminPanelChatService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_agentchatthreadentity.AgentChatThreadEntity)),
    _ts_param(2, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentmessageentity.AgentMessageEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], AdminPanelChatService);

//# sourceMappingURL=admin-panel-chat.service.js.map