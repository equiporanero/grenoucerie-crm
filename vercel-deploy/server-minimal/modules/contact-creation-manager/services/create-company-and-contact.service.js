"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateCompanyAndPersonService", {
    enumerable: true,
    get: function() {
        return CreateCompanyAndPersonService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _guards = require("@sniptt/guards");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _lodashcompact = /*#__PURE__*/ _interop_require_default(require("lodash.compact"));
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _exceptionhandlerservice = require("../../../engine/core-modules/exception-handler/exception-handler.service");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _contactscreationbatchsizeconstant = require("../constants/contacts-creation-batch-size.constant");
const _createcompanyservice = require("./create-company.service");
const _createpersonservice = require("./create-person.service");
const _filteroutcontactsthatbelongtoselforworkspacemembersutil = require("../utils/filter-out-contacts-that-belong-to-self-or-workspace-members.util");
const _getdomainnamefromhandleutil = require("../utils/get-domain-name-from-handle.util");
const _getfirstnameandlastnamefromhandleanddisplaynameutil = require("../utils/get-first-name-and-last-name-from-handle-and-display-name.util");
const _getuniquecontactsandhandlesutil = require("../utils/get-unique-contacts-and-handles.util");
const _addpersonemailfilterstoquerybuilder = require("../../match-participant/utils/add-person-email-filters-to-query-builder");
const _personworkspaceentity = require("../../person/standard-objects/person.workspace-entity");
const _workspacememberworkspaceentity = require("../../workspace-member/standard-objects/workspace-member.workspace-entity");
const _computedisplayname = require("../../../utils/compute-display-name");
const _isworkemail = require("../../../utils/is-work-email");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let CreateCompanyAndPersonService = class CreateCompanyAndPersonService {
    async createCompaniesAndPeople(connectedAccount, contactsToCreate, workspaceId, source, accountOwner) {
        if (!contactsToCreate || contactsToCreate.length === 0) {
            return [];
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const personRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _personworkspaceentity.PersonWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workspacememberworkspaceentity.WorkspaceMemberWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            const workspaceMembers = await workspaceMemberRepository.find();
            const workspace = await this.workspaceRepository.findOne({
                where: {
                    id: workspaceId
                },
                select: [
                    'id',
                    'isInternalMessagesImportEnabled'
                ]
            });
            const peopleToCreateFromOtherCompanies = (0, _filteroutcontactsthatbelongtoselforworkspacemembersutil.filterOutContactsThatBelongToSelfOrWorkspaceMembers)(contactsToCreate, connectedAccount, workspaceMembers, workspace?.isInternalMessagesImportEnabled ?? false);
            const { uniqueContacts, uniqueHandles } = (0, _getuniquecontactsandhandlesutil.getUniqueContactsAndHandles)(peopleToCreateFromOtherCompanies);
            if (uniqueHandles.length === 0) {
                return [];
            }
            const queryBuilder = (0, _addpersonemailfilterstoquerybuilder.addPersonEmailFiltersToQueryBuilder)({
                queryBuilder: personRepository.createQueryBuilder('person'),
                emails: uniqueHandles
            });
            const alreadyCreatedPeople = await queryBuilder.orderBy('person.createdAt', 'ASC').withDeleted().getMany();
            const { contactsThatNeedPersonCreate, contactsThatNeedPersonRestore, workDomainNamesToCreate, shouldCreateOrRestorePeopleByHandleMap } = this.computeContactsThatNeedPersonCreateAndRestoreAndWorkDomainNamesToCreate(uniqueContacts, alreadyCreatedPeople, source, connectedAccount, accountOwner);
            const companiesMap = await this.createCompaniesService.createOrRestoreCompanies(workDomainNamesToCreate, workspaceId);
            const peopleToCreate = this.formatPeopleToCreateFromContacts({
                contactsToCreate: contactsThatNeedPersonCreate,
                createdBy: {
                    source: source,
                    workspaceMember: accountOwner,
                    context: {
                        provider: connectedAccount.provider
                    }
                },
                companiesMap
            });
            const createdPeople = await this.createPersonService.createPeople(peopleToCreate, workspaceId);
            const peopleToRestore = this.formatPeopleToRestoreFromContacts({
                contactsToRestore: contactsThatNeedPersonRestore,
                companiesMap,
                shouldCreateOrRestorePeopleByHandleMap
            });
            const restoredPeople = await this.createPersonService.restorePeople(peopleToRestore, workspaceId);
            return {
                ...createdPeople,
                ...restoredPeople
            };
        }, authContext);
    }
    async createCompaniesAndPeopleAndUpdateParticipants(connectedAccount, contactsToCreate, workspaceId, source) {
        const contactsBatches = (0, _lodashchunk.default)(contactsToCreate, _contactscreationbatchsizeconstant.CONTACTS_CREATION_BATCH_SIZE);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const accountOwner = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    id: connectedAccount.userWorkspaceId
                }
            });
            if (!userWorkspace) {
                throw new Error(`UserWorkspace with id ${connectedAccount.userWorkspaceId} not found`);
            }
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workspacememberworkspaceentity.WorkspaceMemberWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOne({
                where: {
                    userId: userWorkspace.userId
                }
            });
        }, authContext);
        for (const contactsBatch of contactsBatches){
            try {
                await this.createCompaniesAndPeople(connectedAccount, contactsBatch, workspaceId, source, accountOwner);
            } catch (error) {
                this.exceptionHandlerService.captureExceptions([
                    error
                ], {
                    workspace: {
                        id: workspaceId
                    }
                });
            }
        }
    }
    computeContactsThatNeedPersonCreateAndRestoreAndWorkDomainNamesToCreate(uniqueContacts, alreadyCreatedPeople, source, connectedAccount, accountOwner) {
        const shouldCreateOrRestorePeopleByHandleMap = new Map();
        for (const contact of uniqueContacts){
            if (!contact.handle.includes('@')) {
                continue;
            }
            const existingPersonOnPrimaryEmail = alreadyCreatedPeople.find((person)=>{
                return (0, _guards.isNonEmptyString)(person.emails?.primaryEmail) && person.emails.primaryEmail.toLowerCase() === contact.handle.toLowerCase();
            });
            if ((0, _utils.isDefined)(existingPersonOnPrimaryEmail)) {
                shouldCreateOrRestorePeopleByHandleMap.set(contact.handle.toLowerCase(), {
                    existingPerson: existingPersonOnPrimaryEmail
                });
                continue;
            }
            const existingPersonOnAdditionalEmails = alreadyCreatedPeople.find((person)=>{
                return Array.isArray(person.emails?.additionalEmails) && person.emails.additionalEmails.some((email)=>email.toLowerCase() === contact.handle.toLowerCase());
            });
            if (!(0, _utils.isDefined)(existingPersonOnAdditionalEmails)) continue;
            shouldCreateOrRestorePeopleByHandleMap.set(contact.handle.toLowerCase(), {
                existingPerson: existingPersonOnAdditionalEmails
            });
        }
        const contactsThatNeedPersonCreate = uniqueContacts.filter((contact)=>!shouldCreateOrRestorePeopleByHandleMap.has(contact.handle.toLowerCase()));
        const contactsThatNeedPersonRestore = uniqueContacts.filter((contact)=>{
            const existingPerson = shouldCreateOrRestorePeopleByHandleMap.get(contact.handle.toLowerCase())?.existingPerson;
            if (!(0, _utils.isDefined)(existingPerson)) {
                return false;
            }
            return !(0, _guards.isNull)(existingPerson.deletedAt);
        });
        const workDomainNamesToCreate = (0, _lodashcompact.default)([
            ...contactsThatNeedPersonCreate,
            ...contactsThatNeedPersonRestore
        ].map((contact)=>{
            const companyDomainName = (0, _isworkemail.isWorkEmail)(contact.handle) ? (0, _getdomainnamefromhandleutil.getDomainNameFromHandle)(contact.handle) : undefined;
            if (!(0, _utils.isDefined)(companyDomainName) || !(0, _isworkemail.isWorkDomain)(companyDomainName)) return undefined;
            return {
                domainName: companyDomainName,
                createdBySource: source,
                createdByWorkspaceMember: accountOwner,
                createdByContext: {
                    provider: connectedAccount.provider
                }
            };
        }).filter(_utils.isDefined));
        return {
            contactsThatNeedPersonCreate,
            contactsThatNeedPersonRestore,
            workDomainNamesToCreate,
            shouldCreateOrRestorePeopleByHandleMap
        };
    }
    formatPeopleToCreateFromContacts({ contactsToCreate, createdBy, companiesMap }) {
        return contactsToCreate.map((contact)=>{
            const id = (0, _uuid.v4)();
            const { handle, displayName } = contact;
            const { firstName, lastName } = (0, _getfirstnameandlastnamefromhandleanddisplaynameutil.getFirstNameAndLastNameFromHandleAndDisplayName)(handle, displayName);
            const createdByName = (0, _computedisplayname.computeDisplayName)(createdBy.workspaceMember?.name);
            const companyId = companiesMap[(0, _getdomainnamefromhandleutil.getDomainNameFromHandle)(handle)];
            return {
                id,
                emails: {
                    primaryEmail: handle.toLowerCase(),
                    additionalEmails: null
                },
                name: {
                    firstName,
                    lastName
                },
                companyId,
                createdBy: {
                    source: createdBy.source,
                    workspaceMemberId: createdBy.workspaceMember?.id ?? null,
                    name: createdByName,
                    context: createdBy.context
                }
            };
        });
    }
    formatPeopleToRestoreFromContacts({ contactsToRestore, companiesMap, shouldCreateOrRestorePeopleByHandleMap }) {
        const peopleToRestore = [];
        for (const contact of contactsToRestore){
            const { handle } = contact;
            const existingPerson = shouldCreateOrRestorePeopleByHandleMap.get(handle.toLowerCase())?.existingPerson;
            if (!(0, _utils.isDefined)(existingPerson) || (0, _guards.isNull)(existingPerson.deletedAt)) continue;
            const companyId = companiesMap[(0, _getdomainnamefromhandleutil.getDomainNameFromHandle)(handle)];
            peopleToRestore.push({
                personId: existingPerson.id,
                companyId
            });
        }
        return peopleToRestore;
    }
    constructor(createPersonService, createCompaniesService, globalWorkspaceOrmManager, exceptionHandlerService, userWorkspaceRepository, workspaceRepository){
        this.createPersonService = createPersonService;
        this.createCompaniesService = createCompaniesService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.exceptionHandlerService = exceptionHandlerService;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.workspaceRepository = workspaceRepository;
    }
};
CreateCompanyAndPersonService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(4, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpersonservice.CreatePersonService === "undefined" ? Object : _createpersonservice.CreatePersonService,
        typeof _createcompanyservice.CreateCompanyService === "undefined" ? Object : _createcompanyservice.CreateCompanyService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], CreateCompanyAndPersonService);

//# sourceMappingURL=create-company-and-contact.service.js.map