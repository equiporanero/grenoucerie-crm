"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _exceptionhandlerservice = require("../../../../engine/core-modules/exception-handler/exception-handler.service");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _createcompanyandcontactservice = require("../create-company-and-contact.service");
const _createcompanyservice = require("../create-company.service");
const _createpersonservice = require("../create-person.service");
describe('CreateCompanyAndPersonService', ()=>{
    let service;
    const mockConnectedAccount = {
        id: 'connected-account-1',
        accountOwner: {
            id: 'workspace-member-1'
        }
    };
    beforeEach(async ()=>{
        const mockCreateCompaniesService = {
            createOrRestoreCompanies: jest.fn()
        };
        const mockCreatePersonService = {
            restorePeople: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _createcompanyandcontactservice.CreateCompanyAndPersonService,
                {
                    provide: _createcompanyservice.CreateCompanyService,
                    useValue: mockCreateCompaniesService
                },
                {
                    provide: _createpersonservice.CreatePersonService,
                    useValue: mockCreatePersonService
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {}
                },
                {
                    provide: _exceptionhandlerservice.ExceptionHandlerService,
                    useValue: {}
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_createcompanyandcontactservice.CreateCompanyAndPersonService);
    });
    describe('computeContactsThatNeedPersonCreateAndRestoreAndWorkDomainNamesToCreate', ()=>{
        const mockContacts = [
            {
                handle: 'john.doe@company.com',
                displayName: 'John Doe'
            },
            {
                handle: 'jane.smith@company.com',
                displayName: 'Jane Smith'
            },
            {
                handle: 'personal@email.com',
                displayName: 'Personal Contact'
            }
        ];
        const mockExistingPeople = [
            {
                id: 'soft-deleted-person-1',
                emails: {
                    primaryEmail: 'john.doe@company.com',
                    additionalEmails: null
                },
                deletedAt: new Date()
            },
            {
                id: 'soft-deleted-person-2',
                emails: {
                    primaryEmail: 'different@company.com',
                    additionalEmails: [
                        'jane.smith@company.com'
                    ]
                },
                deletedAt: new Date()
            },
            {
                id: 'active-person-3',
                emails: {
                    primaryEmail: 'active@company.com',
                    additionalEmails: null
                },
                deletedAt: null
            }
        ];
        it('should identify contacts that need person creation for new contacts', ()=>{
            const result = service.computeContactsThatNeedPersonCreateAndRestoreAndWorkDomainNamesToCreate(mockContacts, mockExistingPeople, _types.FieldActorSource.CALENDAR, mockConnectedAccount, null);
            expect(result.contactsThatNeedPersonCreate).toHaveLength(1);
            expect(result.contactsThatNeedPersonCreate[0].handle).toBe('personal@email.com');
        });
        it('should identify contacts that need person restoration for soft-deleted contacts', ()=>{
            const result = service.computeContactsThatNeedPersonCreateAndRestoreAndWorkDomainNamesToCreate(mockContacts, mockExistingPeople, _types.FieldActorSource.CALENDAR, mockConnectedAccount, null);
            expect(result.contactsThatNeedPersonRestore).toHaveLength(2);
            expect(result.contactsThatNeedPersonRestore.map((c)=>c.handle)).toContain('john.doe@company.com');
            expect(result.contactsThatNeedPersonRestore.map((c)=>c.handle)).toContain('jane.smith@company.com');
        });
    });
});

//# sourceMappingURL=create-company-and-contact.service.spec.js.map