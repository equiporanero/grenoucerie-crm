"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _authexception = require("../../auth.exception");
const _workspaceauthcontextstorage = require("../../storage/workspace-auth-context.storage");
const _workspaceauthcontextmiddleware = require("../workspace-auth-context.middleware");
const mockWorkspace = {
    id: 'workspace-id',
    displayName: 'Test Workspace'
};
const mockUser = {
    id: 'user-id',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User'
};
const mockApplication = {
    id: 'application-id',
    name: 'Test App',
    defaultRoleId: 'app-role-id'
};
const mockApiKey = {
    id: 'api-key-id',
    name: 'Test API Key'
};
const mockWorkspaceMember = {
    id: 'workspace-member-id',
    name: {
        firstName: 'Test',
        lastName: 'User'
    }
};
describe('WorkspaceAuthContextMiddleware', ()=>{
    let middleware;
    let mockResponse;
    let mockNext;
    beforeEach(()=>{
        middleware = new _workspaceauthcontextmiddleware.WorkspaceAuthContextMiddleware();
        mockResponse = {};
        mockNext = jest.fn();
    });
    const buildRequest = (overrides = {})=>({
            workspace: mockWorkspace,
            ...overrides
        });
    it('should call next without auth context when workspace is not defined', ()=>{
        const req = buildRequest({
            workspace: undefined
        });
        middleware.use(req, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(_workspaceauthcontextstorage.workspaceAuthContextStorage.getStore()).toBeUndefined();
    });
    it('should create an apiKey auth context when apiKey is present', ()=>{
        const req = buildRequest({
            apiKey: mockApiKey
        });
        let capturedContext;
        mockNext.mockImplementation(()=>{
            capturedContext = _workspaceauthcontextstorage.workspaceAuthContextStorage.getStore();
        });
        middleware.use(req, mockResponse, mockNext);
        expect(capturedContext).toEqual(expect.objectContaining({
            type: 'apiKey',
            apiKey: mockApiKey
        }));
    });
    it('should create a user auth context when both application and user are present', ()=>{
        const req = buildRequest({
            application: mockApplication,
            user: mockUser,
            userWorkspaceId: 'user-workspace-id',
            workspaceMemberId: 'workspace-member-id',
            workspaceMember: mockWorkspaceMember
        });
        let capturedContext;
        mockNext.mockImplementation(()=>{
            capturedContext = _workspaceauthcontextstorage.workspaceAuthContextStorage.getStore();
        });
        middleware.use(req, mockResponse, mockNext);
        expect(capturedContext).toEqual(expect.objectContaining({
            type: 'user',
            user: mockUser,
            userWorkspaceId: 'user-workspace-id',
            workspaceMemberId: 'workspace-member-id',
            workspaceMember: mockWorkspaceMember
        }));
    });
    it('should create an application auth context when application is present without user', ()=>{
        const req = buildRequest({
            application: mockApplication
        });
        let capturedContext;
        mockNext.mockImplementation(()=>{
            capturedContext = _workspaceauthcontextstorage.workspaceAuthContextStorage.getStore();
        });
        middleware.use(req, mockResponse, mockNext);
        expect(capturedContext).toEqual(expect.objectContaining({
            type: 'application',
            application: mockApplication
        }));
    });
    it('should fall back to application auth context when application and user are present but workspaceMember is missing', ()=>{
        const req = buildRequest({
            application: mockApplication,
            user: mockUser,
            userWorkspaceId: 'user-workspace-id'
        });
        let capturedContext;
        mockNext.mockImplementation(()=>{
            capturedContext = _workspaceauthcontextstorage.workspaceAuthContextStorage.getStore();
        });
        middleware.use(req, mockResponse, mockNext);
        expect(capturedContext).toEqual(expect.objectContaining({
            type: 'application',
            application: mockApplication
        }));
    });
    it('should create a user auth context when user is present without application', ()=>{
        const req = buildRequest({
            user: mockUser,
            userWorkspaceId: 'user-workspace-id',
            workspaceMemberId: 'workspace-member-id',
            workspaceMember: mockWorkspaceMember
        });
        let capturedContext;
        mockNext.mockImplementation(()=>{
            capturedContext = _workspaceauthcontextstorage.workspaceAuthContextStorage.getStore();
        });
        middleware.use(req, mockResponse, mockNext);
        expect(capturedContext).toEqual(expect.objectContaining({
            type: 'user',
            user: mockUser,
            userWorkspaceId: 'user-workspace-id'
        }));
    });
    it('should create a pendingActivationUser auth context when user and userWorkspaceId are present without workspaceMember', ()=>{
        const req = buildRequest({
            user: mockUser,
            userWorkspaceId: 'user-workspace-id'
        });
        let capturedContext;
        mockNext.mockImplementation(()=>{
            capturedContext = _workspaceauthcontextstorage.workspaceAuthContextStorage.getStore();
        });
        middleware.use(req, mockResponse, mockNext);
        expect(capturedContext).toEqual(expect.objectContaining({
            type: 'pendingActivationUser',
            user: mockUser,
            userWorkspaceId: 'user-workspace-id'
        }));
    });
    it('should throw AuthException when workspace is present but no auth mechanism is found', ()=>{
        const req = buildRequest();
        expect(()=>middleware.use(req, mockResponse, mockNext)).toThrow(new _authexception.AuthException('No authentication context found', _authexception.AuthExceptionCode.UNAUTHENTICATED));
    });
    it('should prioritize apiKey over application and user', ()=>{
        const req = buildRequest({
            apiKey: mockApiKey,
            application: mockApplication,
            user: mockUser,
            userWorkspaceId: 'user-workspace-id',
            workspaceMemberId: 'workspace-member-id',
            workspaceMember: mockWorkspaceMember
        });
        let capturedContext;
        mockNext.mockImplementation(()=>{
            capturedContext = _workspaceauthcontextstorage.workspaceAuthContextStorage.getStore();
        });
        middleware.use(req, mockResponse, mockNext);
        expect(capturedContext).toEqual(expect.objectContaining({
            type: 'apiKey'
        }));
    });
});

//# sourceMappingURL=workspace-auth-context.middleware.spec.js.map