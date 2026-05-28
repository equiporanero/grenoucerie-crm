"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationService", {
    enumerable: true,
    get: function() {
        return ApplicationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _applicationentity = require("./application.entity");
const _applicationexception = require("./application.exception");
const _getdefaultapplicationpackagefieldsutil = require("./application-package/utils/get-default-application-package-fields.util");
const _parseavailablepackagesfrompackagejsonandyarnlockutil = require("./application-package/utils/parse-available-packages-from-package-json-and-yarn-lock.util");
const _applicationvariableentity = require("./application-variable/application-variable.entity");
const _filestorageservice = require("../file-storage/file-storage.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _agententity = require("../../metadata-modules/ai/ai-agent/entities/agent.entity");
const _commandmenuitementity = require("../../metadata-modules/command-menu-item/entities/command-menu-item.entity");
const _allflatentitymapspropertiesconstant = require("../../metadata-modules/flat-entity/constant/all-flat-entity-maps-properties.constant");
const _frontcomponententity = require("../../metadata-modules/front-component/entities/front-component.entity");
const _logicfunctionentity = require("../../metadata-modules/logic-function/logic-function.entity");
const _logicfunctioncreatehashutils = require("../../metadata-modules/logic-function/utils/logic-function-create-hash.utils");
const _objectmetadataentity = require("../../metadata-modules/object-metadata/object-metadata.entity");
const _injectworkspacescopedrepositorydecorator = require("../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _twentystandardapplications = require("../../workspace-manager/twenty-standard-application/constants/twenty-standard-applications");
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
let ApplicationService = class ApplicationService {
    async findApplicationRoleId(applicationId, workspaceId) {
        const application = await this.applicationRepository.findOne({
            where: {
                id: applicationId,
                workspaceId
            }
        });
        if (!(0, _utils.isDefined)(application) || !(0, _utils.isDefined)(application.defaultRoleId)) {
            throw new _applicationexception.ApplicationException(`Could not find application ${applicationId}`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        return application.defaultRoleId;
    }
    async findWorkspaceTwentyStandardAndCustomApplicationOrThrow({ workspace: workspaceInput, workspaceId }) {
        const workspace = (0, _utils.isDefined)(workspaceInput) ? workspaceInput : await this.workspaceRepository.findOne({
            select: [
                'id',
                'workspaceCustomApplicationId'
            ],
            where: {
                id: workspaceId
            },
            withDeleted: true
        });
        if (!(0, _utils.isDefined)(workspace)) {
            throw new _applicationexception.ApplicationException(`Could not find workspace ${workspaceId}`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        const { flatApplicationMaps } = await this.workspaceCacheService.getOrRecompute(workspace.id, [
            'flatApplicationMaps'
        ]);
        const twentyStandardApplicationId = flatApplicationMaps.idByUniversalIdentifier[_twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier];
        if (!(0, _utils.isDefined)(twentyStandardApplicationId)) {
            throw new _applicationexception.ApplicationException(`Could not find workspace Standard applicationId in cache ${workspaceId}`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        const twentyStandardFlatApplication = flatApplicationMaps.byId[twentyStandardApplicationId];
        const workspaceCustomFlatApplication = flatApplicationMaps.byId[workspace.workspaceCustomApplicationId];
        if (!(0, _utils.isDefined)(twentyStandardFlatApplication) || !(0, _utils.isDefined)(workspaceCustomFlatApplication)) {
            throw new _applicationexception.ApplicationException(`Could not find workspace custom and standard applications ${workspace.id}`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        return {
            twentyStandardFlatApplication,
            workspaceCustomFlatApplication
        };
    }
    async findManyApplications(workspaceId) {
        return this.applicationRepository.find({
            where: {
                workspaceId
            },
            relations: [
                'applicationRegistration'
            ]
        });
    }
    async findManyInstalledFlatApplications(workspaceId) {
        const { flatApplicationMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatApplicationMaps'
        ]);
        return Object.values(flatApplicationMaps.byId).filter((flatApplication)=>(0, _utils.isDefined)(flatApplication) && !(0, _utils.isDefined)(flatApplication.deletedAt));
    }
    async findOneApplication({ id, universalIdentifier, workspaceId }) {
        if (!(0, _utils.isDefined)(id) && !(0, _utils.isDefined)(universalIdentifier)) {
            throw new _applicationexception.ApplicationException(`Either id or universalIdentifier must be provided to find application.`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        const where = {
            workspaceId,
            ...(0, _utils.isDefined)(id) ? {
                id
            } : {
                universalIdentifier
            }
        };
        const application = await this.applicationRepository.findOne({
            where,
            relations: [
                'packageJsonFile',
                'yarnLockFile',
                'applicationRegistration'
            ]
        });
        if (!(0, _utils.isDefined)(application)) {
            return null;
        }
        const [logicFunctions, agents, frontComponents, commandMenuItems, objects, applicationVariables] = await Promise.all([
            this.logicFunctionRepository.find({
                where: {
                    applicationId: application.id,
                    workspaceId
                }
            }),
            this.agentRepository.find(workspaceId, {
                where: {
                    applicationId: application.id
                }
            }),
            this.frontComponentRepository.find({
                where: {
                    applicationId: application.id,
                    workspaceId
                }
            }),
            this.commandMenuItemRepository.find({
                where: {
                    applicationId: application.id,
                    workspaceId
                }
            }),
            this.objectMetadataRepository.find({
                where: {
                    applicationId: application.id,
                    workspaceId
                }
            }),
            this.applicationVariableRepository.find({
                where: {
                    applicationId: application.id,
                    workspaceId
                }
            })
        ]);
        application.logicFunctions = logicFunctions;
        application.agents = agents;
        application.frontComponents = frontComponents;
        application.commandMenuItems = commandMenuItems;
        application.objects = objects;
        application.applicationVariables = applicationVariables;
        return application;
    }
    async findOneApplicationOrThrow({ id, universalIdentifier, workspaceId }) {
        const application = await this.findOneApplication({
            id,
            universalIdentifier,
            workspaceId
        });
        if (!(0, _utils.isDefined)(application)) {
            throw new _applicationexception.ApplicationException(`Application with id ${id} or universalIdentifier ${universalIdentifier} not found`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        return application;
    }
    async findById(id) {
        return this.applicationRepository.findOne({
            where: {
                id
            }
        });
    }
    async findByUniversalIdentifier({ universalIdentifier, workspaceId }) {
        return this.applicationRepository.findOne({
            where: {
                universalIdentifier,
                workspaceId
            }
        });
    }
    async findTwentyStandardApplicationOrThrow(workspaceId) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            }
        });
        if (!(0, _utils.isDefined)(workspace)) {
            throw new _applicationexception.ApplicationException(`Could not find workspace ${workspaceId}`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        const { twentyStandardFlatApplication } = await this.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspace
        });
        const application = await this.applicationRepository.findOne({
            where: {
                id: twentyStandardFlatApplication.id,
                workspaceId: workspace.id
            }
        });
        if (!(0, _utils.isDefined)(application)) {
            throw new _applicationexception.ApplicationException(`Standard application not found for workspace ${workspace.id}`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        return {
            application,
            workspace
        };
    }
    async createTwentyStandardApplication({ workspaceId, skipCacheInvalidation = false }, queryRunner) {
        const defaultPackageFields = await (0, _getdefaultapplicationpackagefieldsutil.getDefaultApplicationPackageFields)();
        const twentyStandardApplication = await this.create({
            ..._twentystandardapplications.TWENTY_STANDARD_APPLICATION,
            logicFunctionLayerId: null,
            workspaceId,
            canBeUninstalled: false,
            packageJsonChecksum: defaultPackageFields.packageJsonChecksum,
            packageJsonFileId: null,
            yarnLockChecksum: defaultPackageFields.yarnLockChecksum,
            yarnLockFileId: null,
            availablePackages: defaultPackageFields.availablePackages
        }, queryRunner);
        await this.uploadDefaultPackageFilesAndSetFileIds(twentyStandardApplication, queryRunner);
        if (!skipCacheInvalidation) {
            await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
                'flatApplicationMaps'
            ]);
        }
        return twentyStandardApplication;
    }
    async createWorkspaceCustomApplication({ workspaceId, applicationId }, queryRunner) {
        const defaultPackageFields = await (0, _getdefaultapplicationpackagefieldsutil.getDefaultApplicationPackageFields)();
        const workspaceCustomApplication = await this.create({
            description: null,
            name: 'Custom',
            sourcePath: 'workspace-custom',
            version: '1.0.1',
            universalIdentifier: applicationId,
            workspaceId,
            id: applicationId,
            logicFunctionLayerId: null,
            canBeUninstalled: false,
            packageJsonChecksum: defaultPackageFields.packageJsonChecksum,
            packageJsonFileId: null,
            yarnLockChecksum: defaultPackageFields.yarnLockChecksum,
            yarnLockFileId: null,
            availablePackages: defaultPackageFields.availablePackages
        }, queryRunner);
        await this.uploadDefaultPackageFilesAndSetFileIds(workspaceCustomApplication, queryRunner);
        return workspaceCustomApplication;
    }
    async uploadDefaultPackageFilesAndSetFileIds(application, queryRunner) {
        const defaultPackageFields = await (0, _getdefaultapplicationpackagefieldsutil.getDefaultApplicationPackageFields)();
        const packageJsonChecksum = (0, _logicfunctioncreatehashutils.logicFunctionCreateHash)(JSON.stringify(JSON.parse(defaultPackageFields.packageJsonContent)));
        const yarnLockChecksum = (0, _logicfunctioncreatehashutils.logicFunctionCreateHash)(defaultPackageFields.yarnLockContent);
        const availablePackages = (0, _parseavailablepackagesfrompackagejsonandyarnlockutil.parseAvailablePackagesFromPackageJsonAndYarnLock)(defaultPackageFields.packageJsonContent, defaultPackageFields.yarnLockContent);
        const packageJsonFile = await this.fileStorageService.writeFile({
            sourceFile: defaultPackageFields.packageJsonContent,
            fileFolder: _types.FileFolder.Dependencies,
            applicationUniversalIdentifier: application.universalIdentifier,
            workspaceId: application.workspaceId,
            resourcePath: 'package.json',
            settings: {
                isTemporaryFile: false,
                toDelete: false
            },
            queryRunner
        });
        const yarnLockFile = await this.fileStorageService.writeFile({
            sourceFile: defaultPackageFields.yarnLockContent,
            fileFolder: _types.FileFolder.Dependencies,
            applicationUniversalIdentifier: application.universalIdentifier,
            workspaceId: application.workspaceId,
            resourcePath: 'yarn.lock',
            settings: {
                isTemporaryFile: false,
                toDelete: false
            },
            queryRunner
        });
        if (queryRunner) {
            await queryRunner.manager.update(_applicationentity.ApplicationEntity, {
                id: application.id
            }, {
                packageJsonFileId: packageJsonFile.id,
                yarnLockFileId: yarnLockFile.id,
                packageJsonChecksum,
                yarnLockChecksum,
                availablePackages
            });
        } else {
            await this.update(application.id, {
                packageJsonFileId: packageJsonFile.id,
                yarnLockFileId: yarnLockFile.id,
                packageJsonChecksum,
                yarnLockChecksum,
                availablePackages,
                workspaceId: application.workspaceId
            });
        }
    }
    async create(data, queryRunner) {
        const application = this.applicationRepository.create(data);
        if (queryRunner) {
            return queryRunner.manager.save(_applicationentity.ApplicationEntity, application);
        }
        const savedApplication = await this.applicationRepository.save(application);
        await this.workspaceCacheService.invalidateAndRecompute(data.workspaceId, [
            'flatApplicationMaps'
        ]);
        return savedApplication;
    }
    async update(id, data) {
        await this.applicationRepository.update({
            id
        }, data);
        await this.workspaceCacheService.invalidateAndRecompute(data.workspaceId, [
            'flatApplicationMaps'
        ]);
        const updatedApplication = await this.findById(id);
        if (!(0, _utils.isDefined)(updatedApplication)) {
            throw new _applicationexception.ApplicationException(`Application with id ${id} not found after update`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        return updatedApplication;
    }
    async delete(universalIdentifier, workspaceId) {
        const application = await this.findByUniversalIdentifier({
            universalIdentifier,
            workspaceId
        });
        if (!(0, _utils.isDefined)(application)) {
            throw new _applicationexception.ApplicationException(`Application with universalIdentifier ${universalIdentifier} not found`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        await this.fileStorageService.deleteApplicationFiles({
            workspaceId,
            applicationUniversalIdentifier: universalIdentifier
        });
        await this.applicationRepository.delete({
            universalIdentifier,
            workspaceId
        });
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
            'flatApplicationMaps'
        ]);
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, _allflatentitymapspropertiesconstant.ALL_FLAT_ENTITY_MAPS_PROPERTIES);
    }
    constructor(applicationRepository, workspaceCacheService, fileStorageService, workspaceRepository, logicFunctionRepository, agentRepository, frontComponentRepository, commandMenuItemRepository, objectMetadataRepository, applicationVariableRepository){
        this.applicationRepository = applicationRepository;
        this.workspaceCacheService = workspaceCacheService;
        this.fileStorageService = fileStorageService;
        this.workspaceRepository = workspaceRepository;
        this.logicFunctionRepository = logicFunctionRepository;
        this.agentRepository = agentRepository;
        this.frontComponentRepository = frontComponentRepository;
        this.commandMenuItemRepository = commandMenuItemRepository;
        this.objectMetadataRepository = objectMetadataRepository;
        this.applicationVariableRepository = applicationVariableRepository;
    }
};
ApplicationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_logicfunctionentity.LogicFunctionEntity)),
    _ts_param(5, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agententity.AgentEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_frontcomponententity.FrontComponentEntity)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_commandmenuitementity.CommandMenuItemEntity)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(9, (0, _typeorm.InjectRepository)(_applicationvariableentity.ApplicationVariableEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], ApplicationService);

//# sourceMappingURL=application.service.js.map