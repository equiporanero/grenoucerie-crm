"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SkillService", {
    enumerable: true,
    get: function() {
        return SkillService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreateskillinputtoflatskilltocreateutil = require("../flat-skill/utils/from-create-skill-input-to-flat-skill-to-create.util");
const _fromdeleteskillinputtoflatskillorthrowutil = require("../flat-skill/utils/from-delete-skill-input-to-flat-skill-or-throw.util");
const _fromflatskilltoskilldtoutil = require("../flat-skill/utils/from-flat-skill-to-skill-dto.util");
const _fromupdateskillinputtoflatskilltoupdateorthrowutil = require("../flat-skill/utils/from-update-skill-input-to-flat-skill-to-update-or-throw.util");
const _skillexception = require("./skill.exception");
const _workspacemigrationbuilderexception = require("../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SkillService = class SkillService {
    async findAll(workspaceId) {
        const { flatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        return Object.values(flatSkillMaps.byUniversalIdentifier).filter(_utils.isDefined).sort((a, b)=>a.label.localeCompare(b.label)).map(_fromflatskilltoskilldtoutil.fromFlatSkillToSkillDto);
    }
    async findById(id, workspaceId) {
        const { flatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        const flatSkill = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatSkillMaps
        });
        if (!(0, _utils.isDefined)(flatSkill)) {
            return null;
        }
        return (0, _fromflatskilltoskilldtoutil.fromFlatSkillToSkillDto)(flatSkill);
    }
    async create(input, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const universalFlatSkillToCreate = (0, _fromcreateskillinputtoflatskilltocreateutil.fromCreateSkillInputToUniversalFlatSkillToCreate)({
            createSkillInput: input,
            flatApplication: workspaceCustomFlatApplication
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                skill: {
                    flatEntityToCreate: [
                        universalFlatSkillToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating skill');
        }
        const { flatSkillMaps: recomputedFlatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        return (0, _fromflatskilltoskilldtoutil.fromFlatSkillToSkillDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: universalFlatSkillToCreate.id,
            flatEntityMaps: recomputedFlatSkillMaps
        }));
    }
    async update(input, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatSkillMaps: existingFlatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        const flatSkillToUpdate = (0, _fromupdateskillinputtoflatskilltoupdateorthrowutil.fromUpdateSkillInputToFlatSkillToUpdateOrThrow)({
            flatSkillMaps: existingFlatSkillMaps,
            updateSkillInput: input
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                skill: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatSkillToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating skill');
        }
        const { flatSkillMaps: recomputedFlatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        return (0, _fromflatskilltoskilldtoutil.fromFlatSkillToSkillDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: input.id,
            flatEntityMaps: recomputedFlatSkillMaps
        }));
    }
    async delete(id, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatSkillMaps: existingFlatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        const flatSkillToDelete = (0, _fromdeleteskillinputtoflatskillorthrowutil.fromDeleteSkillInputToFlatSkillOrThrow)({
            flatSkillMaps: existingFlatSkillMaps,
            skillId: id
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                skill: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        flatSkillToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting skill');
        }
        return (0, _fromflatskilltoskilldtoutil.fromFlatSkillToSkillDto)(flatSkillToDelete);
    }
    async findAllFlatSkills(workspaceId) {
        const { flatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        return Object.values(flatSkillMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((flatSkill)=>flatSkill.isActive).sort((a, b)=>a.label.localeCompare(b.label));
    }
    async findFlatSkillsByNames(names, workspaceId) {
        if (names.length === 0) {
            return [];
        }
        const { flatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        return Object.values(flatSkillMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((flatSkill)=>names.includes(flatSkill.name) && flatSkill.isActive);
    }
    async activate(id, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        const existingFlatSkill = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: flatSkillMaps
        });
        const flatSkillToUpdate = {
            ...existingFlatSkill,
            isActive: true,
            updatedAt: new Date().toISOString()
        };
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                skill: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatSkillToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while activating skill');
        }
        const { flatSkillMaps: recomputedFlatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        return (0, _fromflatskilltoskilldtoutil.fromFlatSkillToSkillDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedFlatSkillMaps
        }));
    }
    async deactivate(id, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        const existingFlatSkill = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: flatSkillMaps
        });
        const flatSkillToUpdate = {
            ...existingFlatSkill,
            isActive: false,
            updatedAt: new Date().toISOString()
        };
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                skill: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatSkillToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deactivating skill');
        }
        const { flatSkillMaps: recomputedFlatSkillMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatSkillMaps'
            ]
        });
        return (0, _fromflatskilltoskilldtoutil.fromFlatSkillToSkillDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedFlatSkillMaps
        }));
    }
    async findByIdOrThrow(id, workspaceId) {
        const skill = await this.findById(id, workspaceId);
        if (!(0, _utils.isDefined)(skill)) {
            throw new _skillexception.SkillException('Skill not found', _skillexception.SkillExceptionCode.SKILL_NOT_FOUND);
        }
        return skill;
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
SkillService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], SkillService);

//# sourceMappingURL=skill.service.js.map