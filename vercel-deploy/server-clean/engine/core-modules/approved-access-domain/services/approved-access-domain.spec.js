"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _approvedaccessdomainentity = require("../approved-access-domain.entity");
const _approvedaccessdomainexception = require("../approved-access-domain.exception");
const _authcontexttype = require("../../auth/types/auth-context.type");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _emailservice = require("../../email/email.service");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _getworkspacescopedrepositorytokenutil = require("../../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
const _fileurlservice = require("../../file/file-url/file-url.service");
const _approvedaccessdomainservice = require("./approved-access-domain.service");
// To avoid dynamic import issues in Jest
jest.mock('@react-email/render', ()=>({
        render: jest.fn().mockImplementation(async (template, options)=>{
            if (options?.plainText) {
                return 'Plain Text Email';
            }
            return '<html><body>HTML email content</body></html>';
        })
    }));
describe('ApprovedAccessDomainService', ()=>{
    let service;
    let approvedAccessDomainRepository;
    let approvedAccessDomainRepositoryUnscoped;
    let emailService;
    let twentyConfigService;
    let workspaceDomainsService;
    let jwtWrapperService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _approvedaccessdomainservice.ApprovedAccessDomainService,
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_approvedaccessdomainentity.ApprovedAccessDomainEntity),
                    useValue: {
                        delete: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                        save: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_approvedaccessdomainentity.ApprovedAccessDomainEntity),
                    useValue: {
                        findOneBy: jest.fn(),
                        find: jest.fn()
                    }
                },
                {
                    provide: _emailservice.EmailService,
                    useValue: {
                        send: jest.fn()
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {
                        buildWorkspaceURL: jest.fn()
                    }
                },
                {
                    provide: _fileurlservice.FileUrlService,
                    useValue: {
                        signFileByIdUrl: jest.fn().mockReturnValue('https://signed-url.com/logo.png')
                    }
                },
                {
                    provide: _jwtwrapperservice.JwtWrapperService,
                    useValue: {
                        signAsyncOrThrow: jest.fn(),
                        verifyJwtToken: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_approvedaccessdomainservice.ApprovedAccessDomainService);
        approvedAccessDomainRepository = module.get((0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_approvedaccessdomainentity.ApprovedAccessDomainEntity));
        approvedAccessDomainRepositoryUnscoped = module.get((0, _typeorm.getRepositoryToken)(_approvedaccessdomainentity.ApprovedAccessDomainEntity));
        emailService = module.get(_emailservice.EmailService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        workspaceDomainsService = module.get(_workspacedomainsservice.WorkspaceDomainsService);
        jwtWrapperService = module.get(_jwtwrapperservice.JwtWrapperService);
    });
    describe('createApprovedAccessDomain', ()=>{
        it('should successfully create an approved access domain', async ()=>{
            const domain = 'custom-domain.com';
            const inWorkspace = {
                id: 'workspace-id',
                customDomain: null,
                isCustomDomainEnabled: false
            };
            const fromUser = {
                userEmail: 'user@custom-domain.com'
            };
            const expectedApprovedAccessDomain = {
                workspaceId: 'workspace-id',
                domain,
                isValidated: true
            };
            jest.spyOn(approvedAccessDomainRepository, 'save').mockResolvedValue(expectedApprovedAccessDomain);
            jest.spyOn(service, 'sendApprovedAccessDomainValidationEmail').mockResolvedValue();
            const result = await service.createApprovedAccessDomain(domain, inWorkspace, fromUser, 'validator@custom-domain.com');
            expect(approvedAccessDomainRepository.save).toHaveBeenCalledWith('workspace-id', expect.objectContaining({
                domain
            }));
            expect(result).toEqual(expectedApprovedAccessDomain);
        });
        it('should throw an exception if approved access domain is not a company domain', async ()=>{
            await expect(service.createApprovedAccessDomain('gmail.com', {
                id: 'workspace-id'
            }, {
                userEmail: 'user@gmail.com'
            }, 'user@gmail.com')).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Approved access domain must be a company domain', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_MUST_BE_A_COMPANY_DOMAIN));
            expect(approvedAccessDomainRepository.save).not.toHaveBeenCalled();
        });
    });
    describe('deleteApprovedAccessDomain', ()=>{
        it('should delete an approved access domain successfully', async ()=>{
            const workspace = {
                id: 'workspace-id'
            };
            const approvedAccessDomainId = 'approved-access-domain-id';
            const approvedAccessDomainEntity = {
                id: approvedAccessDomainId,
                workspaceId: workspace.id
            };
            jest.spyOn(approvedAccessDomainRepository, 'findOne').mockResolvedValue(approvedAccessDomainEntity);
            jest.spyOn(approvedAccessDomainRepository, 'delete').mockResolvedValue({});
            await service.deleteApprovedAccessDomain(workspace, approvedAccessDomainId);
            expect(approvedAccessDomainRepository.findOne).toHaveBeenCalledWith(workspace.id, {
                where: {
                    id: approvedAccessDomainId
                }
            });
            expect(approvedAccessDomainRepository.delete).toHaveBeenCalledWith(workspace.id, {
                id: approvedAccessDomainEntity.id
            });
        });
        it('should throw an error if the approved access domain does not exist', async ()=>{
            const workspace = {
                id: 'workspace-id'
            };
            const approvedAccessDomainId = 'approved-access-domain-id';
            jest.spyOn(approvedAccessDomainRepository, 'findOne').mockResolvedValue(null);
            await expect(service.deleteApprovedAccessDomain(workspace, approvedAccessDomainId)).rejects.toThrow();
            expect(approvedAccessDomainRepository.findOne).toHaveBeenCalledWith(workspace.id, {
                where: {
                    id: approvedAccessDomainId
                }
            });
            expect(approvedAccessDomainRepository.delete).not.toHaveBeenCalled();
        });
    });
    describe('sendApprovedAccessDomainValidationEmail', ()=>{
        it('should throw an exception if the approved access domain is already validated', async ()=>{
            const approvedAccessDomainId = 'approved-access-domain-id';
            const sender = {};
            const workspace = {};
            const email = 'validator@example.com';
            const approvedAccessDomain = {
                id: approvedAccessDomainId,
                isValidated: true
            };
            await expect(service.sendApprovedAccessDomainValidationEmail(sender, email, workspace, approvedAccessDomain)).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Approved access domain has already been validated', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_ALREADY_VERIFIED));
        });
        it('should throw an exception if the email does not match the approved access domain', async ()=>{
            const approvedAccessDomainId = 'approved-access-domain-id';
            const sender = {};
            const workspace = {};
            const email = 'validator@different.com';
            const approvedAccessDomain = {
                id: approvedAccessDomainId,
                isValidated: false,
                domain: 'example.com'
            };
            await expect(service.sendApprovedAccessDomainValidationEmail(sender, email, workspace, approvedAccessDomain)).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Approved access domain does not match email domain', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_DOES_NOT_MATCH_DOMAIN_EMAIL));
        });
        it('should send a validation email if all conditions are met', async ()=>{
            const sender = {
                userEmail: 'sender@example.com',
                name: {
                    firstName: 'John',
                    lastName: 'Doe'
                },
                locale: 'en'
            };
            const workspace = {
                id: 'workspace-id',
                displayName: 'Test Workspace',
                logo: '/logo.png'
            };
            const email = 'validator@custom-domain.com';
            const approvedAccessDomain = {
                id: 'approved-access-domain-id',
                isValidated: false,
                domain: 'custom-domain.com'
            };
            jest.spyOn(workspaceDomainsService, 'buildWorkspaceURL').mockReturnValue(new URL('https://sub.twenty.com'));
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'EMAIL_FROM_ADDRESS') return 'no-reply@example.com';
                if (key === 'SERVER_URL') return 'https://api.example.com';
            });
            jwtWrapperService.signAsyncOrThrow.mockResolvedValue('signed.jwt.token');
            await service.sendApprovedAccessDomainValidationEmail(sender, email, workspace, approvedAccessDomain);
            expect(jwtWrapperService.signAsyncOrThrow).toHaveBeenCalledWith({
                sub: approvedAccessDomain.id,
                type: _authcontexttype.JwtTokenTypeEnum.APPROVED_ACCESS_DOMAIN,
                workspaceId: workspace.id,
                approvedAccessDomainId: approvedAccessDomain.id,
                domain: approvedAccessDomain.domain
            }, {
                expiresIn: '7d'
            });
            expect(workspaceDomainsService.buildWorkspaceURL).toHaveBeenCalledWith({
                workspace: workspace,
                pathname: (0, _utils.getSettingsPath)(_types.SettingsPath.WorkspaceMembersPage),
                searchParams: {
                    wtdId: approvedAccessDomain.id,
                    validationToken: 'signed.jwt.token'
                }
            });
            expect(emailService.send).toHaveBeenCalledWith({
                from: 'John Doe (via Twenty) <no-reply@example.com>',
                to: email,
                subject: 'Approve your access domain',
                text: expect.any(String),
                html: expect.any(String)
            });
        });
    });
    describe('validateApprovedAccessDomain', ()=>{
        const approvedAccessDomainId = 'domain-id';
        const workspaceId = 'workspace-id';
        const domain = 'example.com';
        const encodeSegment = (value)=>Buffer.from(JSON.stringify(value)).toString('base64url');
        const buildToken = (header)=>`${encodeSegment(header)}.${encodeSegment({})}.signature`;
        const validationToken = buildToken({
            alg: 'ES256',
            kid: 'test-kid'
        });
        const buildPayload = (overrides = {})=>({
                sub: approvedAccessDomainId,
                type: _authcontexttype.JwtTokenTypeEnum.APPROVED_ACCESS_DOMAIN,
                workspaceId,
                approvedAccessDomainId,
                domain,
                ...overrides
            });
        it('should validate the approved access domain successfully with a correct token', async ()=>{
            const approvedAccessDomain = {
                id: approvedAccessDomainId,
                workspaceId,
                domain,
                isValidated: false
            };
            jwtWrapperService.verifyJwtToken.mockResolvedValue(buildPayload());
            jest.spyOn(approvedAccessDomainRepositoryUnscoped, 'findOneBy').mockResolvedValue(approvedAccessDomain);
            const saveSpy = jest.spyOn(approvedAccessDomainRepository, 'save');
            await service.validateApprovedAccessDomain({
                validationToken,
                approvedAccessDomainId
            });
            expect(jwtWrapperService.verifyJwtToken).toHaveBeenCalledWith(validationToken);
            expect(approvedAccessDomainRepositoryUnscoped.findOneBy).toHaveBeenCalledWith({
                id: approvedAccessDomainId
            });
            expect(saveSpy).toHaveBeenCalledWith(workspaceId, expect.objectContaining({
                isValidated: true
            }));
        });
        it('should reject any token whose header is not asymmetric (no kid / wrong alg) before calling verify', async ()=>{
            const legacyHs256Token = buildToken({
                alg: 'HS256'
            });
            await expect(service.validateApprovedAccessDomain({
                validationToken: legacyHs256Token,
                approvedAccessDomainId
            })).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Invalid approved access domain validation token', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID));
            expect(jwtWrapperService.verifyJwtToken).not.toHaveBeenCalled();
            expect(approvedAccessDomainRepositoryUnscoped.findOneBy).not.toHaveBeenCalled();
        });
        it('should reject when the JWT verification fails (bad signature or expired)', async ()=>{
            jwtWrapperService.verifyJwtToken.mockRejectedValue(new Error('jwt expired'));
            await expect(service.validateApprovedAccessDomain({
                validationToken,
                approvedAccessDomainId
            })).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Invalid approved access domain validation token', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID));
            expect(approvedAccessDomainRepositoryUnscoped.findOneBy).not.toHaveBeenCalled();
        });
        it('should reject a JWT minted with a different token type', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue(buildPayload({
                type: _authcontexttype.JwtTokenTypeEnum.ACCESS
            }));
            await expect(service.validateApprovedAccessDomain({
                validationToken,
                approvedAccessDomainId
            })).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Invalid approved access domain validation token', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID));
            expect(approvedAccessDomainRepositoryUnscoped.findOneBy).not.toHaveBeenCalled();
        });
        it('should reject when the JWT approvedAccessDomainId does not match the input id', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue(buildPayload({
                approvedAccessDomainId: 'other-domain-id'
            }));
            await expect(service.validateApprovedAccessDomain({
                validationToken,
                approvedAccessDomainId
            })).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Invalid approved access domain validation token', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID));
            expect(approvedAccessDomainRepositoryUnscoped.findOneBy).not.toHaveBeenCalled();
        });
        it('should reject when the JWT-claimed domain does not match the stored row', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue(buildPayload({
                domain: 'attacker.com'
            }));
            jest.spyOn(approvedAccessDomainRepositoryUnscoped, 'findOneBy').mockResolvedValue({
                id: approvedAccessDomainId,
                workspaceId,
                domain,
                isValidated: false
            });
            await expect(service.validateApprovedAccessDomain({
                validationToken,
                approvedAccessDomainId
            })).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Invalid approved access domain validation token', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID));
        });
        it('should reject when the JWT-claimed workspaceId does not match the stored row', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue(buildPayload({
                workspaceId: 'other-workspace-id'
            }));
            jest.spyOn(approvedAccessDomainRepositoryUnscoped, 'findOneBy').mockResolvedValue({
                id: approvedAccessDomainId,
                workspaceId,
                domain,
                isValidated: false
            });
            await expect(service.validateApprovedAccessDomain({
                validationToken,
                approvedAccessDomainId
            })).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Invalid approved access domain validation token', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID));
        });
        it('should throw an error if the approved access domain does not exist', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue(buildPayload());
            jest.spyOn(approvedAccessDomainRepositoryUnscoped, 'findOneBy').mockResolvedValue(null);
            await expect(service.validateApprovedAccessDomain({
                validationToken,
                approvedAccessDomainId
            })).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Approved access domain not found', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_NOT_FOUND));
        });
        it('should throw an error if the approved access domain is already validated', async ()=>{
            jwtWrapperService.verifyJwtToken.mockResolvedValue(buildPayload());
            jest.spyOn(approvedAccessDomainRepositoryUnscoped, 'findOneBy').mockResolvedValue({
                id: approvedAccessDomainId,
                workspaceId,
                domain,
                isValidated: true
            });
            await expect(service.validateApprovedAccessDomain({
                validationToken,
                approvedAccessDomainId
            })).rejects.toThrowError(new _approvedaccessdomainexception.ApprovedAccessDomainException('Approved access domain has already been validated', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_ALREADY_VALIDATED));
        });
    });
});

//# sourceMappingURL=approved-access-domain.spec.js.map