"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WebhookService", {
    enumerable: true,
    get: function() {
        return WebhookService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _applicationservice = require("../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _fromcreatewebhookinputtoflatwebhooktocreateutil = require("../flat-webhook/utils/from-create-webhook-input-to-flat-webhook-to-create.util");
const _fromdeletewebhookinputtoflatwebhookorthrowutil = require("../flat-webhook/utils/from-delete-webhook-input-to-flat-webhook-or-throw.util");
const _fromflatwebhooktowebhookdtoutil = require("../flat-webhook/utils/from-flat-webhook-to-webhook-dto.util");
const _fromupdatewebhookinputtoflatwebhooktoupdateorthrowutil = require("../flat-webhook/utils/from-update-webhook-input-to-flat-webhook-to-update-or-throw.util");
const _fromwebhookentitytoflatwebhookutil = require("../flat-webhook/utils/from-webhook-entity-to-flat-webhook.util");
const _webhookentity = require("./entities/webhook.entity");
const _createidtouniversalidentifiermaputil = require("../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let WebhookService = class WebhookService {
    normalizeTargetUrl(targetUrl) {
        try {
            const url = new URL(targetUrl);
            return url.toString();
        } catch  {
            return targetUrl;
        }
    }
    async findAll(workspaceId) {
        const [webhooks, applications] = await Promise.all([
            this.webhookRepository.find({
                where: {
                    workspaceId,
                    deletedAt: (0, _typeorm1.IsNull)()
                },
                order: {
                    createdAt: 'ASC'
                }
            }),
            this.applicationRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ]
            })
        ]);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        return webhooks.map((webhookEntity)=>(0, _fromwebhookentitytoflatwebhookutil.fromWebhookEntityToFlatWebhook)({
                entity: webhookEntity,
                applicationIdToUniversalIdentifierMap
            })).map(_fromflatwebhooktowebhookdtoutil.fromFlatWebhookToWebhookDto);
    }
    async findById(id, workspaceId) {
        const [webhook, applications] = await Promise.all([
            this.webhookRepository.findOne({
                where: {
                    id,
                    workspaceId,
                    deletedAt: (0, _typeorm1.IsNull)()
                }
            }),
            this.applicationRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ]
            })
        ]);
        if (!(0, _utils.isDefined)(webhook)) {
            return null;
        }
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        return (0, _fromflatwebhooktowebhookdtoutil.fromFlatWebhookToWebhookDto)((0, _fromwebhookentitytoflatwebhookutil.fromWebhookEntityToFlatWebhook)({
            entity: webhook,
            applicationIdToUniversalIdentifierMap
        }));
    }
    async create(input, workspaceId) {
        const normalizedTargetUrl = this.normalizeTargetUrl(input.targetUrl);
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const flatWebhookToCreate = (0, _fromcreatewebhookinputtoflatwebhooktocreateutil.fromCreateWebhookInputToFlatWebhookToCreate)({
            createWebhookInput: {
                ...input,
                targetUrl: normalizedTargetUrl
            },
            workspaceId,
            flatApplication: workspaceCustomFlatApplication
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                webhook: {
                    flatEntityToCreate: [
                        flatWebhookToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating webhook');
        }
        const { flatWebhookMaps: recomputedFlatWebhookMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatWebhookMaps'
            ]
        });
        return (0, _fromflatwebhooktowebhookdtoutil.fromFlatWebhookToWebhookDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatWebhookToCreate.id,
            flatEntityMaps: recomputedFlatWebhookMaps
        }));
    }
    async update(input, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const normalizedInput = {
            ...input,
            update: {
                ...input.update,
                ...(0, _utils.isDefined)(input.update.targetUrl) && {
                    targetUrl: this.normalizeTargetUrl(input.update.targetUrl)
                }
            }
        };
        const { flatWebhookMaps: existingFlatWebhookMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatWebhookMaps'
            ]
        });
        const flatWebhookToUpdate = (0, _fromupdatewebhookinputtoflatwebhooktoupdateorthrowutil.fromUpdateWebhookInputToFlatWebhookToUpdateOrThrow)({
            flatWebhookMaps: existingFlatWebhookMaps,
            updateWebhookInput: normalizedInput
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                webhook: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatWebhookToUpdate
                    ]
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating webhook');
        }
        const { flatWebhookMaps: recomputedFlatWebhookMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatWebhookMaps'
            ]
        });
        return (0, _fromflatwebhooktowebhookdtoutil.fromFlatWebhookToWebhookDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: input.id,
            flatEntityMaps: recomputedFlatWebhookMaps
        }));
    }
    async delete(id, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatWebhookMaps: existingFlatWebhookMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatWebhookMaps'
            ]
        });
        const flatWebhookToDelete = (0, _fromdeletewebhookinputtoflatwebhookorthrowutil.fromDeleteWebhookInputToFlatWebhookOrThrow)({
            flatWebhookMaps: existingFlatWebhookMaps,
            webhookId: id
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                webhook: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        flatWebhookToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting webhook');
        }
        return (0, _fromflatwebhooktowebhookdtoutil.fromFlatWebhookToWebhookDto)(flatWebhookToDelete);
    }
    constructor(webhookRepository, applicationRepository, workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService){
        this.webhookRepository = webhookRepository;
        this.applicationRepository = applicationRepository;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
WebhookService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_webhookentity.WebhookEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], WebhookService);

//# sourceMappingURL=webhook.service.js.map