"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandMenuItemService", {
    enumerable: true,
    get: function() {
        return CommandMenuItemService;
    }
});
const _common = require("@nestjs/common");
const _translations = require("twenty-shared/translations");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../core-modules/application/application.service");
const _i18nservice = require("../../core-modules/i18n/i18n.service");
const _commandmenuitemexception = require("./command-menu-item.exception");
const _enginecomponentkeyenum = require("./enums/engine-component-key.enum");
const _isobjectmetadatacommandmenuitempayloadutil = require("./utils/is-object-metadata-command-menu-item-payload.util");
const _interpolatenavigationcommandmenuitemfieldutil = require("./utils/interpolate-navigation-command-menu-item-field.util");
const _fromcreatecommandmenuiteminputtoflatcommandmenuitemtocreateutil = require("../flat-command-menu-item/utils/from-create-command-menu-item-input-to-flat-command-menu-item-to-create.util");
const _fromdeletecommandmenuiteminputtoflatcommandmenuitemorthrowutil = require("../flat-command-menu-item/utils/from-delete-command-menu-item-input-to-flat-command-menu-item-or-throw.util");
const _fromflatcommandmenuitemtocommandmenuitemdtoutil = require("../flat-command-menu-item/utils/from-flat-command-menu-item-to-command-menu-item-dto.util");
const _fromupdatecommandmenuiteminputtoflatcommandmenuitemtoupdateorthrowutil = require("../flat-command-menu-item/utils/from-update-command-menu-item-input-to-flat-command-menu-item-to-update-or-throw.util");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
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
let CommandMenuItemService = class CommandMenuItemService {
    async findAll(workspaceId) {
        const { flatCommandMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps'
            ]
        });
        return Object.values(flatCommandMenuItemMaps.byUniversalIdentifier).filter(_utils.isDefined).sort((a, b)=>a.position - b.position).map(_fromflatcommandmenuitemtocommandmenuitemdtoutil.fromFlatCommandMenuItemToCommandMenuItemDto);
    }
    async findById(id, workspaceId) {
        const { flatCommandMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps'
            ]
        });
        const flatCommandMenuItem = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatCommandMenuItemMaps
        });
        if (!(0, _utils.isDefined)(flatCommandMenuItem)) {
            return null;
        }
        return (0, _fromflatcommandmenuitemtocommandmenuitemdtoutil.fromFlatCommandMenuItemToCommandMenuItemDto)(flatCommandMenuItem);
    }
    async findByIdOrThrow(id, workspaceId) {
        const commandMenuItem = await this.findById(id, workspaceId);
        if (!(0, _utils.isDefined)(commandMenuItem)) {
            throw new _commandmenuitemexception.CommandMenuItemException('Command menu item not found', _commandmenuitemexception.CommandMenuItemExceptionCode.COMMAND_MENU_ITEM_NOT_FOUND);
        }
        return commandMenuItem;
    }
    async create(input, workspaceId) {
        const { flatObjectMetadataMaps, flatFrontComponentMaps, flatPageLayoutMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFrontComponentMaps',
                'flatPageLayoutMaps'
            ]
        });
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const flatCommandMenuItemToCreate = (0, _fromcreatecommandmenuiteminputtoflatcommandmenuitemtocreateutil.fromCreateCommandMenuItemInputToFlatCommandMenuItemToCreate)({
            createCommandMenuItemInput: input,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatObjectMetadataMaps,
            flatFrontComponentMaps,
            flatPageLayoutMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                commandMenuItem: {
                    flatEntityToCreate: [
                        flatCommandMenuItemToCreate
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
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating command menu item');
        }
        const { flatCommandMenuItemMaps: recomputedFlatCommandMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps'
            ]
        });
        return (0, _fromflatcommandmenuitemtocommandmenuitemdtoutil.fromFlatCommandMenuItemToCommandMenuItemDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatCommandMenuItemToCreate.id,
            flatEntityMaps: recomputedFlatCommandMenuItemMaps
        }));
    }
    async update(input, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps, flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatPageLayoutMaps: existingFlatPageLayoutMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps',
                'flatObjectMetadataMaps',
                'flatPageLayoutMaps'
            ]
        });
        const flatCommandMenuItemToUpdate = (0, _fromupdatecommandmenuiteminputtoflatcommandmenuitemtoupdateorthrowutil.fromUpdateCommandMenuItemInputToFlatCommandMenuItemToUpdateOrThrow)({
            flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps,
            updateCommandMenuItemInput: input,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps,
            flatPageLayoutMaps: existingFlatPageLayoutMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                commandMenuItem: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatCommandMenuItemToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating command menu item');
        }
        const { flatCommandMenuItemMaps: recomputedFlatCommandMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps'
            ]
        });
        return (0, _fromflatcommandmenuitemtocommandmenuitemdtoutil.fromFlatCommandMenuItemToCommandMenuItemDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: input.id,
            flatEntityMaps: recomputedFlatCommandMenuItemMaps
        }));
    }
    async delete(id, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps'
            ]
        });
        const flatCommandMenuItemToDelete = (0, _fromdeletecommandmenuiteminputtoflatcommandmenuitemorthrowutil.fromDeleteCommandMenuItemInputToFlatCommandMenuItemOrThrow)({
            flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps,
            commandMenuItemId: id
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                commandMenuItem: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        flatCommandMenuItemToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting command menu item');
        }
        return (0, _fromflatcommandmenuitemtocommandmenuitemdtoutil.fromFlatCommandMenuItemToCommandMenuItemDto)(flatCommandMenuItemToDelete);
    }
    async findAllFlatCommandMenuItems(workspaceId) {
        const { flatCommandMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps'
            ]
        });
        return Object.values(flatCommandMenuItemMaps.byUniversalIdentifier).filter(_utils.isDefined).sort((a, b)=>a.position - b.position);
    }
    async loadNavigationObjectMetadata({ commandMenuItem, objectMetadataLoader, workspaceId }) {
        if (commandMenuItem.engineComponentKey !== _enginecomponentkeyenum.EngineComponentKey.NAVIGATION || !(0, _isobjectmetadatacommandmenuitempayloadutil.isObjectMetadataCommandMenuItemPayload)(commandMenuItem.payload)) {
            return null;
        }
        return objectMetadataLoader.load({
            objectMetadataId: commandMenuItem.payload.objectMetadataItemId,
            workspaceId
        });
    }
    async resolveNavigationField({ commandMenuItem, fieldName, objectMetadataLoader, workspaceId, locale }) {
        const objectMetadata = await this.loadNavigationObjectMetadata({
            commandMenuItem,
            objectMetadataLoader,
            workspaceId
        });
        return (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem,
            fieldName,
            objectMetadata,
            locale,
            i18nInstance: this.i18nService.getI18nInstance(locale ?? _translations.SOURCE_LOCALE)
        });
    }
    async findByWorkflowVersionId(workflowVersionId, workspaceId) {
        const { flatCommandMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps'
            ]
        });
        const flatCommandMenuItem = Object.values(flatCommandMenuItemMaps.byUniversalIdentifier).find((item)=>(0, _utils.isDefined)(item) && item.workflowVersionId === workflowVersionId);
        if (!(0, _utils.isDefined)(flatCommandMenuItem)) {
            return null;
        }
        return (0, _fromflatcommandmenuitemtocommandmenuitemdtoutil.fromFlatCommandMenuItemToCommandMenuItemDto)(flatCommandMenuItem);
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, i18nService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.i18nService = i18nService;
    }
};
CommandMenuItemService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], CommandMenuItemService);

//# sourceMappingURL=command-menu-item.service.js.map