"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevSeederMetadataService", {
    enumerable: true,
    get: function() {
        return DevSeederMetadataService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _fieldmetadataservice = require("../../../../metadata-modules/field-metadata/services/field-metadata.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildobjectidbynamemapsutil = require("../../../../metadata-modules/flat-object-metadata/utils/build-object-id-by-name-maps.util");
const _objectmetadataservice = require("../../../../metadata-modules/object-metadata/object-metadata.service");
const _seederworkspacesconstant = require("../../core/constants/seeder-workspaces.constant");
const _companycustomfieldseedsconstant = require("../custom-fields/constants/company-custom-field-seeds.constant");
const _personcustomfieldseedsconstant = require("../custom-fields/constants/person-custom-field-seeds.constant");
const _petcareagreementcustomrelationfieldseedsconstant = require("../custom-fields/constants/pet-care-agreement-custom-relation-field-seeds.constant");
const _petcustomfieldseedsconstant = require("../custom-fields/constants/pet-custom-field-seeds.constant");
const _petcustomrelationfieldseedsconstant = require("../custom-fields/constants/pet-custom-relation-field-seeds.constant");
const _surveyresultsfieldseedsconstant = require("../custom-fields/constants/survey-results-field-seeds.constant");
const _employmenthistorycustomobjectseedconstant = require("../custom-objects/constants/employment-history-custom-object-seed.constant");
const _petcareagreementcustomobjectseedconstant = require("../custom-objects/constants/pet-care-agreement-custom-object-seed.constant");
const _petcustomobjectseedconstant = require("../custom-objects/constants/pet-custom-object-seed.constant");
const _rocketcustomobjectseedconstant = require("../custom-objects/constants/rocket-custom-object-seed.constant");
const _surveyresultsobjectseedconstant = require("../custom-objects/constants/survey-results-object-seed.constant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DevSeederMetadataService = class DevSeederMetadataService {
    getLightConfig(_config) {
        return {
            objects: [],
            fields: []
        };
    }
    getConfig(workspaceId, light) {
        const config = this.workspaceConfigs[workspaceId];
        if (!config) {
            throw new Error(`Workspace configuration not found for workspaceId: ${workspaceId}`);
        }
        return light ? this.getLightConfig(config) : config;
    }
    async seed({ workspaceId, light = false }) {
        const config = this.getConfig(workspaceId, light);
        for (const obj of config.objects){
            await this.seedCustomObject({
                workspaceId,
                objectMetadataSeed: obj.seed
            });
            if (obj.fields) {
                await this.seedCustomFields({
                    workspaceId,
                    objectMetadataNameSingular: obj.seed.nameSingular,
                    fieldMetadataSeeds: obj.fields
                });
            }
        }
        for (const fieldConfig of config.fields){
            await this.seedCustomFields({
                workspaceId,
                objectMetadataNameSingular: fieldConfig.objectName,
                fieldMetadataSeeds: fieldConfig.seeds
            });
        }
    }
    async seedCustomObject({ workspaceId, objectMetadataSeed }) {
        await this.objectMetadataService.createOneObject({
            createObjectInput: objectMetadataSeed,
            workspaceId
        });
    }
    async seedCustomFields({ workspaceId, objectMetadataNameSingular, fieldMetadataSeeds }) {
        const objectMetadata = await this.objectMetadataService.findOneWithinWorkspace(workspaceId, {
            where: {
                nameSingular: objectMetadataNameSingular
            }
        });
        if (!(0, _utils.isDefined)(objectMetadata)) {
            throw new Error(`Object metadata not found for: ${objectMetadataNameSingular}`);
        }
        const createFieldInputs = fieldMetadataSeeds.map((fieldMetadataSeed)=>({
                ...fieldMetadataSeed,
                objectMetadataId: objectMetadata.id
            }));
        await this.fieldMetadataService.createManyFields({
            createFieldInputs,
            workspaceId
        });
    }
    async seedRelations({ workspaceId, light = false }) {
        const config = this.getConfig(workspaceId, light);
        // 1. Seed morph relations (creates inverses on target objects)
        let maps = await this.getFreshFlatMaps(workspaceId);
        for (const relation of config.morphRelations ?? []){
            await this.seedMorphRelations({
                workspaceId,
                relation,
                objectIdByNameSingular: maps.objectIdByName
            });
        }
        // 2. Seed junction fields (creates relations + inverses on junction objects)
        maps = await this.getFreshFlatMaps(workspaceId);
        for (const field of config.junctionFields ?? []){
            await this.seedJunctionField({
                workspaceId,
                field,
                flatMaps: maps
            });
        }
        // 3. Configure junction settings (after all fields exist)
        if (config.junctionConfigs && config.junctionConfigs.length > 0) {
            maps = await this.getFreshFlatMaps(workspaceId);
            for (const junctionConfig of config.junctionConfigs){
                await this.applyJunctionConfig({
                    workspaceId,
                    junctionConfig,
                    flatMaps: maps
                });
            }
        }
    }
    async getFreshFlatMaps(workspaceId) {
        await this.flatEntityMapsCacheService.invalidateFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const { idByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        return {
            flatFieldMetadataMaps,
            flatObjectMetadataMaps,
            objectIdByName: idByNameSingular
        };
    }
    async applyJunctionConfig({ workspaceId, junctionConfig, flatMaps }) {
        const [targetObjectName, targetFieldName] = junctionConfig.junctionTargetFieldRef.split('.');
        const junctionTargetFieldId = this.findFieldId(targetObjectName, targetFieldName, flatMaps);
        const fieldId = this.findFieldId(junctionConfig.objectName, junctionConfig.fieldName, flatMaps);
        await this.fieldMetadataService.updateOneField({
            workspaceId,
            updateFieldInput: {
                id: fieldId,
                ...junctionConfig.label && {
                    label: junctionConfig.label
                },
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY,
                    junctionTargetFieldId
                }
            }
        });
    }
    async seedMorphRelations({ workspaceId, relation, objectIdByNameSingular }) {
        const objectMetadataId = objectIdByNameSingular[relation.objectName];
        if (!(0, _utils.isDefined)(objectMetadataId)) {
            throw new Error(`Object metadata id not found for: ${relation.objectName}`);
        }
        const createFieldInputs = relation.seeds.map((seed)=>({
                type: seed.type,
                label: seed.label,
                name: seed.name,
                icon: seed.icon,
                objectMetadataId,
                morphRelationsCreationPayload: seed.targetObjectMetadataNames.map((targetObjectMetadataName)=>{
                    const targetObjectMetadataId = objectIdByNameSingular[targetObjectMetadataName];
                    if (!(0, _utils.isDefined)(targetObjectMetadataId)) {
                        throw new Error(`Target object metadata id not found for: ${targetObjectMetadataName}`);
                    }
                    if (!(0, _utils.isDefined)(seed.morphRelationsCreationPayload)) {
                        throw new Error('Morph relations creation payload is not defined');
                    }
                    return {
                        type: seed.morphRelationsCreationPayload[0].type,
                        targetFieldLabel: seed.morphRelationsCreationPayload[0].targetFieldLabel,
                        targetFieldIcon: seed.morphRelationsCreationPayload[0].targetFieldIcon,
                        targetObjectMetadataId
                    };
                })
            }));
        await this.fieldMetadataService.createManyFields({
            createFieldInputs,
            workspaceId
        });
    }
    async seedJunctionField({ workspaceId, field, flatMaps }) {
        const sourceObjectId = flatMaps.objectIdByName[field.sourceObjectName];
        const targetObjectId = flatMaps.objectIdByName[field.targetObjectName];
        if (!(0, _utils.isDefined)(sourceObjectId)) {
            throw new Error(`Source object not found: ${field.sourceObjectName}`);
        }
        if (!(0, _utils.isDefined)(targetObjectId)) {
            throw new Error(`Target object not found: ${field.targetObjectName}`);
        }
        await this.fieldMetadataService.createManyFields({
            createFieldInputs: [
                {
                    type: _types.FieldMetadataType.RELATION,
                    name: field.name,
                    label: field.label,
                    icon: field.icon,
                    objectMetadataId: sourceObjectId,
                    relationCreationPayload: {
                        type: _types.RelationType.ONE_TO_MANY,
                        targetFieldLabel: field.targetFieldLabel,
                        targetFieldIcon: field.targetFieldIcon,
                        targetObjectMetadataId: targetObjectId
                    }
                }
            ],
            workspaceId
        });
    }
    findFieldId(objectName, fieldName, flatMaps) {
        const objectId = flatMaps.objectIdByName[objectName];
        if (!(0, _utils.isDefined)(objectId)) {
            throw new Error(`Object not found: ${objectName}`);
        }
        const objectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: objectId,
            flatEntityMaps: flatMaps.flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(objectMetadata)) {
            throw new Error(`Object metadata not found: ${objectName}`);
        }
        for (const fieldId of objectMetadata.fieldIds){
            const field = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldId,
                flatEntityMaps: flatMaps.flatFieldMetadataMaps
            });
            if (field?.name === fieldName) {
                return fieldId;
            }
        }
        throw new Error(`Field not found: ${objectName}.${fieldName}`);
    }
    constructor(objectMetadataService, fieldMetadataService, flatEntityMapsCacheService){
        this.objectMetadataService = objectMetadataService;
        this.fieldMetadataService = fieldMetadataService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.workspaceConfigs = {
            [_seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID]: {
                objects: [
                    {
                        seed: _rocketcustomobjectseedconstant.ROCKET_CUSTOM_OBJECT_SEED
                    },
                    {
                        seed: _petcustomobjectseedconstant.PET_CUSTOM_OBJECT_SEED,
                        fields: _petcustomfieldseedsconstant.PET_CUSTOM_FIELD_SEEDS
                    },
                    {
                        seed: _surveyresultsobjectseedconstant.SURVEY_RESULT_CUSTOM_OBJECT_SEED,
                        fields: _surveyresultsfieldseedsconstant.SURVEY_RESULT_CUSTOM_FIELD_SEEDS
                    },
                    // Junction objects (minimal pivots)
                    {
                        seed: _employmenthistorycustomobjectseedconstant.EMPLOYMENT_HISTORY_CUSTOM_OBJECT_SEED
                    },
                    {
                        seed: _petcareagreementcustomobjectseedconstant.PET_CARE_AGREEMENT_CUSTOM_OBJECT_SEED
                    }
                ],
                fields: [
                    {
                        objectName: 'company',
                        seeds: _companycustomfieldseedsconstant.COMPANY_CUSTOM_FIELD_SEEDS
                    },
                    {
                        objectName: 'person',
                        seeds: _personcustomfieldseedsconstant.PERSON_CUSTOM_FIELD_SEEDS
                    }
                ],
                morphRelations: [
                    {
                        objectName: _petcustomobjectseedconstant.PET_CUSTOM_OBJECT_SEED.nameSingular,
                        seeds: _petcustomrelationfieldseedsconstant.PET_CUSTOM_RELATION_FIELD_SEEDS
                    },
                    {
                        objectName: _petcareagreementcustomobjectseedconstant.PET_CARE_AGREEMENT_CUSTOM_OBJECT_SEED.nameSingular,
                        seeds: [
                            _petcareagreementcustomrelationfieldseedsconstant.PET_CARE_AGREEMENT_CARETAKER_MORPH_SEED
                        ]
                    }
                ],
                junctionFields: [
                    // Employment History: Person <-> Company
                    {
                        sourceObjectName: 'person',
                        name: 'previousCompanies',
                        label: 'Previous Companies',
                        icon: 'IconBuildingSkyscraper',
                        targetObjectName: _employmenthistorycustomobjectseedconstant.EMPLOYMENT_HISTORY_CUSTOM_OBJECT_SEED.nameSingular,
                        targetFieldLabel: 'Person',
                        targetFieldIcon: 'IconUser'
                    },
                    {
                        sourceObjectName: 'company',
                        name: 'previousEmployees',
                        label: 'Previous Employees',
                        icon: 'IconUser',
                        targetObjectName: _employmenthistorycustomobjectseedconstant.EMPLOYMENT_HISTORY_CUSTOM_OBJECT_SEED.nameSingular,
                        targetFieldLabel: 'Company',
                        targetFieldIcon: 'IconBuildingSkyscraper'
                    },
                    // Pet Care Agreement: Pet -> caretakers
                    {
                        sourceObjectName: _petcustomobjectseedconstant.PET_CUSTOM_OBJECT_SEED.nameSingular,
                        name: 'caretakers',
                        label: 'Caretakers',
                        icon: 'IconUser',
                        targetObjectName: _petcareagreementcustomobjectseedconstant.PET_CARE_AGREEMENT_CUSTOM_OBJECT_SEED.nameSingular,
                        targetFieldLabel: 'Pet',
                        targetFieldIcon: 'IconCat'
                    }
                ],
                junctionConfigs: [
                    // Employment History junction configs
                    {
                        objectName: 'person',
                        fieldName: 'previousCompanies',
                        junctionTargetFieldRef: `${_employmenthistorycustomobjectseedconstant.EMPLOYMENT_HISTORY_CUSTOM_OBJECT_SEED.nameSingular}.company`
                    },
                    {
                        objectName: 'company',
                        fieldName: 'previousEmployees',
                        junctionTargetFieldRef: `${_employmenthistorycustomobjectseedconstant.EMPLOYMENT_HISTORY_CUSTOM_OBJECT_SEED.nameSingular}.person`
                    },
                    // Pet Care Agreement junction configs
                    {
                        objectName: _petcustomobjectseedconstant.PET_CUSTOM_OBJECT_SEED.nameSingular,
                        fieldName: 'caretakers',
                        junctionTargetFieldRef: `${_petcareagreementcustomobjectseedconstant.PET_CARE_AGREEMENT_CUSTOM_OBJECT_SEED.nameSingular}.caretakerPerson`
                    },
                    {
                        objectName: 'company',
                        fieldName: 'caredForPets',
                        junctionTargetFieldRef: `${_petcareagreementcustomobjectseedconstant.PET_CARE_AGREEMENT_CUSTOM_OBJECT_SEED.nameSingular}.pet`
                    },
                    {
                        objectName: 'person',
                        fieldName: 'caredForPets',
                        junctionTargetFieldRef: `${_petcareagreementcustomobjectseedconstant.PET_CARE_AGREEMENT_CUSTOM_OBJECT_SEED.nameSingular}.pet`
                    }
                ]
            },
            [_seederworkspacesconstant.SEED_YCOMBINATOR_WORKSPACE_ID]: {
                objects: [
                    {
                        seed: _surveyresultsobjectseedconstant.SURVEY_RESULT_CUSTOM_OBJECT_SEED,
                        fields: _surveyresultsfieldseedsconstant.SURVEY_RESULT_CUSTOM_FIELD_SEEDS
                    }
                ],
                fields: [
                    {
                        objectName: 'company',
                        seeds: _companycustomfieldseedsconstant.COMPANY_CUSTOM_FIELD_SEEDS
                    },
                    {
                        objectName: 'person',
                        seeds: _personcustomfieldseedsconstant.PERSON_CUSTOM_FIELD_SEEDS
                    }
                ]
            }
        };
    }
};
DevSeederMetadataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadataservice.ObjectMetadataService === "undefined" ? Object : _objectmetadataservice.ObjectMetadataService,
        typeof _fieldmetadataservice.FieldMetadataService === "undefined" ? Object : _fieldmetadataservice.FieldMetadataService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], DevSeederMetadataService);

//# sourceMappingURL=dev-seeder-metadata.service.js.map