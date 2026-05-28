"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../app-token/app-token.entity");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _emailservice = require("../../email/email.service");
const _i18nservice = require("../../i18n/i18n.service");
const _onboardingservice = require("../../onboarding/onboarding.service");
const _throttlerservice = require("../../throttler/throttler.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _workspaceinvitationexception = require("../workspace-invitation.exception");
const _workspaceservice = require("../../workspace/services/workspace.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _rolevalidationservice = require("../../../metadata-modules/role-validation/services/role-validation.service");
const _fileurlservice = require("../../file/file-url/file-url.service");
const _workspaceinvitationservice = require("./workspace-invitation.service");
// To fix a circular dependency issue
jest.mock('src/engine/core-modules/workspace/services/workspace.service');
// To avoid dynamic import issues in Jest
jest.mock('@react-email/render', ()=>({
        render: jest.fn().mockImplementation(async (template, options)=>{
            if (options?.plainText) {
                return 'Plain Text Email';
            }
            return '<html><body>HTML email content</body></html>';
        })
    }));
describe('WorkspaceInvitationService', ()=>{
    let service;
    let appTokenRepository;
    let userWorkspaceRepository;
    let twentyConfigService;
    let emailService;
    let onboardingService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workspaceinvitationservice.WorkspaceInvitationService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: _rolevalidationservice.RoleValidationService,
                    useValue: {
                        validateRoleAssignableToUsersOrThrow: jest.fn()
                    }
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {
                        buildWorkspaceURL: jest.fn().mockResolvedValue(new URL('http://localhost:3001'))
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: _emailservice.EmailService,
                    useValue: {
                        send: jest.fn()
                    }
                },
                {
                    provide: _onboardingservice.OnboardingService,
                    useValue: {
                        setOnboardingInviteTeamPending: jest.fn(),
                        setOnboardingBookOnboardingPending: jest.fn()
                    }
                },
                {
                    provide: _workspaceservice.WorkspaceService,
                    useValue: {
                        // Mock methods you expect WorkspaceInvitationService to call
                        getDefaultWorkspace: jest.fn().mockResolvedValue({
                            id: 'default-workspace-id'
                        })
                    }
                },
                {
                    provide: _i18nservice.I18nService,
                    useValue: {
                        getI18nInstance: jest.fn().mockReturnValue({
                            _: jest.fn().mockReturnValue('mocked-translation')
                        })
                    }
                },
                {
                    provide: _fileurlservice.FileUrlService,
                    useValue: {
                        signFileByIdUrl: jest.fn().mockReturnValue('https://signed-url.com/logo.png')
                    }
                },
                {
                    provide: _throttlerservice.ThrottlerService,
                    useValue: {
                        tokenBucketThrottleOrThrow: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_workspaceinvitationservice.WorkspaceInvitationService);
        appTokenRepository = module.get((0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity));
        userWorkspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity));
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        emailService = module.get(_emailservice.EmailService);
        onboardingService = module.get(_onboardingservice.OnboardingService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('createWorkspaceInvitation', ()=>{
        it('should create a workspace invitation successfully', async ()=>{
            const email = 'test@example.com';
            const workspace = {
                id: 'workspace-id'
            };
            jest.spyOn(appTokenRepository, 'createQueryBuilder').mockReturnValue({
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getOne: jest.fn().mockResolvedValue(null)
            });
            jest.spyOn(userWorkspaceRepository, 'exists').mockResolvedValue(false);
            jest.spyOn(service, 'generateInvitationToken').mockResolvedValue({});
            await expect(service.createWorkspaceInvitation(email, workspace)).resolves.not.toThrow();
        });
        it('should throw an exception if invitation already exists', async ()=>{
            const email = 'test@example.com';
            const workspace = {
                id: 'workspace-id'
            };
            jest.spyOn(appTokenRepository, 'createQueryBuilder').mockReturnValue({
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getOne: jest.fn().mockResolvedValue({})
            });
            await expect(service.createWorkspaceInvitation(email, workspace)).rejects.toThrow(_workspaceinvitationexception.WorkspaceInvitationException);
        });
    });
    describe('sendInvitations', ()=>{
        it('should send invitations successfully', async ()=>{
            const emails = [
                'test1@example.com',
                'test2@example.com'
            ];
            const workspace = {
                id: 'workspace-id',
                inviteHash: 'invite-hash',
                displayName: 'Test Workspace'
            };
            const sender = {
                userEmail: 'sender@example.com',
                name: {
                    firstName: 'Sender'
                },
                locale: 'en'
            };
            jest.spyOn(service, 'createWorkspaceInvitation').mockResolvedValue({
                context: {
                    email: 'test@example.com'
                },
                value: 'token-value',
                type: _apptokenentity.AppTokenType.InvitationToken
            });
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('http://localhost:3000');
            jest.spyOn(emailService, 'send').mockResolvedValue({});
            jest.spyOn(onboardingService, 'setOnboardingInviteTeamPending').mockResolvedValue({});
            const result = await service.sendInvitations(emails, workspace, sender);
            expect(result.success).toBe(true);
            expect(result.result.length).toBe(2);
            expect(emailService.send).toHaveBeenCalledTimes(2);
            expect(onboardingService.setOnboardingInviteTeamPending).toHaveBeenCalledWith({
                workspaceId: workspace.id,
                value: false
            });
            expect(onboardingService.setOnboardingBookOnboardingPending).toHaveBeenCalledWith({
                workspaceId: workspace.id,
                value: true
            });
        });
    });
});

//# sourceMappingURL=workspace-invitation.service.spec.js.map