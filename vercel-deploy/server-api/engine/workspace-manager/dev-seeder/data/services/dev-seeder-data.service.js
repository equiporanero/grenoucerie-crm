"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevSeederDataService", {
    enumerable: true,
    get: function() {
        return DevSeederDataService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _promises = require("node:fs/promises");
const _path = require("path");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _typeorm1 = require("typeorm");
const _applicationservice = require("../../../../core-modules/application/application.service");
const _filestorageservice = require("../../../../core-modules/file-storage/file-storage.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _objectmetadataservice = require("../../../../metadata-modules/object-metadata/object-metadata.service");
const _computetablenameutil = require("../../../../utils/compute-table-name.util");
const _attachmentdataseedsconstant = require("../constants/attachment-data-seeds.constant");
const _calendarchanneleventassociationdataseedsconstant = require("../constants/calendar-channel-event-association-data-seeds.constant");
const _calendareventdataseedsconstant = require("../constants/calendar-event-data-seeds.constant");
const _calendareventparticipantdataseedsconstant = require("../constants/calendar-event-participant-data-seeds.constant");
const _companydataseedsconstant = require("../constants/company-data-seeds.constant");
const _dashboarddataseedsconstant = require("../constants/dashboard-data-seeds.constant");
const _employmenthistorydataseedsconstant = require("../constants/employment-history-data-seeds.constant");
const _messagechannelmessageassociationdataseedsconstant = require("../constants/message-channel-message-association-data-seeds.constant");
const _messagedataseedsconstant = require("../constants/message-data-seeds.constant");
const _messageparticipantdataseedsconstant = require("../constants/message-participant-data-seeds.constant");
const _messagethreaddataseedsconstant = require("../constants/message-thread-data-seeds.constant");
const _notedataseedsconstant = require("../constants/note-data-seeds.constant");
const _notetargetdataseedsconstant = require("../constants/note-target-data-seeds.constant");
const _opportunitydataseedsconstant = require("../constants/opportunity-data-seeds.constant");
const _persondataseedsconstant = require("../constants/person-data-seeds.constant");
const _petcareagreementdataseedsconstant = require("../constants/pet-care-agreement-data-seeds.constant");
const _petdataseedsconstant = require("../constants/pet-data-seeds.constant");
const _rocketdataseedsconstant = require("../constants/rocket-data-seeds.constant");
const _surveyresultdataseedsconstant = require("../constants/survey-result-data-seeds.constant");
const _taskdataseedsconstant = require("../constants/task-data-seeds.constant");
const _tasktargetdataseedsconstant = require("../constants/task-target-data-seeds.constant");
const _workspacememberdataseedsconstant = require("../constants/workspace-member-data-seeds.constant");
const _timelineactivityseederservice = require("./timeline-activity-seeder.service");
const _prefillfrontcomponentcommandmenuitemsutil = require("../../../standard-objects-prefill-data/utils/prefill-front-component-command-menu-items.util");
const _prefillworkflowcommandmenuitemsutil = require("../../../standard-objects-prefill-data/utils/prefill-workflow-command-menu-items.util");
const _prefillworkflowsutil = require("../../../standard-objects-prefill-data/utils/prefill-workflows.util");
const _twentystandardapplications = require("../../../twenty-standard-application/constants/twenty-standard-applications");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-migration/services/workspace-migration-validate-build-and-run-service");
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
// Organize seeds into dependency batches for parallel insertion
const getRecordSeedsBatches = (workspaceId, attachmentSeeds, _featureFlags)=>{
    // Batch 1: No dependencies
    const batch1 = [
        {
            tableName: 'workspaceMember',
            pgColumns: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_COLUMNS,
            recordSeeds: (0, _workspacememberdataseedsconstant.getWorkspaceMemberDataSeeds)(workspaceId)
        },
        {
            tableName: '_surveyResult',
            pgColumns: _surveyresultdataseedsconstant.SURVEY_RESULT_DATA_SEED_COLUMNS,
            recordSeeds: _surveyresultdataseedsconstant.SURVEY_RESULT_DATA_SEEDS
        },
        {
            tableName: '_rocket',
            pgColumns: _rocketdataseedsconstant.ROCKET_DATA_SEED_COLUMNS,
            recordSeeds: _rocketdataseedsconstant.ROCKET_DATA_SEEDS
        }
    ];
    // Batch 2: Depends on workspaceMember
    const batch2 = [
        {
            tableName: 'company',
            pgColumns: _companydataseedsconstant.COMPANY_DATA_SEED_COLUMNS,
            recordSeeds: _companydataseedsconstant.COMPANY_DATA_SEEDS
        },
        {
            tableName: 'dashboard',
            pgColumns: _dashboarddataseedsconstant.DASHBOARD_DATA_SEED_COLUMNS,
            recordSeeds: (0, _dashboarddataseedsconstant.getDashboardDataSeeds)(workspaceId)
        }
    ];
    // Batch 3: Depends on company
    const batch3 = [
        {
            tableName: 'person',
            pgColumns: _persondataseedsconstant.PERSON_DATA_SEED_COLUMNS,
            recordSeeds: _persondataseedsconstant.PERSON_DATA_SEEDS
        },
        {
            tableName: '_pet',
            pgColumns: _petdataseedsconstant.PET_DATA_SEED_COLUMNS,
            recordSeeds: _petdataseedsconstant.PET_DATA_SEEDS
        }
    ];
    // Batch 4: Depends on person/company/messageChannel or independent
    const batch4 = [
        {
            tableName: 'opportunity',
            pgColumns: _opportunitydataseedsconstant.OPPORTUNITY_DATA_SEED_COLUMNS,
            recordSeeds: _opportunitydataseedsconstant.OPPORTUNITY_DATA_SEEDS
        },
        {
            tableName: 'note',
            pgColumns: _notedataseedsconstant.NOTE_DATA_SEED_COLUMNS,
            recordSeeds: _notedataseedsconstant.NOTE_DATA_SEEDS
        },
        {
            tableName: 'task',
            pgColumns: _taskdataseedsconstant.TASK_DATA_SEED_COLUMNS,
            recordSeeds: _taskdataseedsconstant.TASK_DATA_SEEDS
        },
        {
            tableName: 'calendarEvent',
            pgColumns: _calendareventdataseedsconstant.CALENDAR_EVENT_DATA_SEED_COLUMNS,
            recordSeeds: _calendareventdataseedsconstant.CALENDAR_EVENT_DATA_SEEDS
        },
        {
            tableName: 'messageThread',
            pgColumns: _messagethreaddataseedsconstant.MESSAGE_THREAD_DATA_SEED_COLUMNS,
            recordSeeds: _messagethreaddataseedsconstant.MESSAGE_THREAD_DATA_SEEDS
        },
        // Junction tables
        {
            tableName: '_employmentHistory',
            pgColumns: _employmenthistorydataseedsconstant.EMPLOYMENT_HISTORY_DATA_SEED_COLUMNS,
            recordSeeds: _employmenthistorydataseedsconstant.EMPLOYMENT_HISTORY_DATA_SEEDS
        },
        {
            tableName: '_petCareAgreement',
            pgColumns: _petcareagreementdataseedsconstant.PET_CARE_AGREEMENT_DATA_SEED_COLUMNS,
            recordSeeds: _petcareagreementdataseedsconstant.PET_CARE_AGREEMENT_DATA_SEEDS
        }
    ];
    // Batch 5: Depends on batch 4 entities
    const batch5 = [
        {
            tableName: 'noteTarget',
            pgColumns: _notetargetdataseedsconstant.NOTE_TARGET_DATA_SEED_COLUMNS,
            recordSeeds: _notetargetdataseedsconstant.NOTE_TARGET_DATA_SEEDS
        },
        {
            tableName: 'taskTarget',
            pgColumns: _tasktargetdataseedsconstant.TASK_TARGET_DATA_SEED_COLUMNS,
            recordSeeds: _tasktargetdataseedsconstant.TASK_TARGET_DATA_SEEDS
        },
        {
            tableName: 'calendarChannelEventAssociation',
            pgColumns: _calendarchanneleventassociationdataseedsconstant.CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEED_COLUMNS,
            recordSeeds: _calendarchanneleventassociationdataseedsconstant.CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEEDS
        },
        {
            tableName: 'calendarEventParticipant',
            pgColumns: _calendareventparticipantdataseedsconstant.CALENDAR_EVENT_PARTICIPANT_DATA_SEED_COLUMNS,
            recordSeeds: (0, _calendareventparticipantdataseedsconstant.getCalendarEventParticipantDataSeeds)(workspaceId)
        },
        {
            tableName: 'message',
            pgColumns: _messagedataseedsconstant.MESSAGE_DATA_SEED_COLUMNS,
            recordSeeds: _messagedataseedsconstant.MESSAGE_DATA_SEEDS
        }
    ];
    // Batch 6: Depends on batch 5 entities
    const batch6 = [
        {
            tableName: 'messageChannelMessageAssociation',
            pgColumns: _messagechannelmessageassociationdataseedsconstant.MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEED_COLUMNS,
            recordSeeds: _messagechannelmessageassociationdataseedsconstant.MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEEDS
        },
        {
            tableName: 'messageParticipant',
            pgColumns: _messageparticipantdataseedsconstant.MESSAGE_PARTICIPANT_DATA_SEED_COLUMNS,
            recordSeeds: (0, _messageparticipantdataseedsconstant.getMessageParticipantDataSeeds)(workspaceId)
        },
        {
            tableName: 'attachment',
            pgColumns: _attachmentdataseedsconstant.ATTACHMENT_DATA_SEED_COLUMNS,
            recordSeeds: attachmentSeeds
        }
    ];
    return [
        batch1,
        batch2,
        batch3,
        batch4,
        batch5,
        batch6
    ];
};
let DevSeederDataService = class DevSeederDataService {
    async seed({ schemaName, workspaceId, featureFlags, light = false }) {
        const objectMetadataItems = await this.objectMetadataService.findManyWithinWorkspace(workspaceId);
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const { seeds: attachmentSeeds, fileSeedMetadata: attachmentFileMeta } = (0, _attachmentdataseedsconstant.generateAttachmentSeedsForWorkspace)(workspaceId);
        await this.coreDataSource.transaction(async (entityManager)=>{
            await this.seedRecordsInBatches({
                entityManager,
                schemaName,
                workspaceId,
                attachmentSeeds,
                featureFlags,
                objectMetadataItems,
                light
            });
            if (!light) {
                await this.timelineActivitySeederService.seedTimelineActivities({
                    entityManager,
                    schemaName,
                    workspaceId
                });
                await this.seedAttachmentFiles(workspaceId, entityManager, attachmentFileMeta);
            }
            await (0, _prefillworkflowsutil.prefillWorkflows)(entityManager, workspaceId, schemaName, flatObjectMetadataMaps, flatFieldMetadataMaps);
        });
        await (0, _prefillworkflowcommandmenuitemsutil.prefillWorkflowCommandMenuItems)({
            workspaceId,
            applicationService: this.applicationService,
            flatEntityMapsCacheService: this.flatEntityMapsCacheService,
            workspaceMigrationValidateBuildAndRunService: this.workspaceMigrationValidateBuildAndRunService
        });
        await (0, _prefillfrontcomponentcommandmenuitemsutil.prefillFrontComponentCommandMenuItems)({
            workspaceId,
            applicationService: this.applicationService,
            flatEntityMapsCacheService: this.flatEntityMapsCacheService,
            workspaceMigrationValidateBuildAndRunService: this.workspaceMigrationValidateBuildAndRunService
        });
    }
    async seedRecordsInBatches({ entityManager, schemaName, workspaceId, attachmentSeeds, featureFlags, objectMetadataItems, light = false }) {
        const batches = getRecordSeedsBatches(workspaceId, attachmentSeeds, featureFlags);
        // Process batches sequentially (respecting dependencies)
        // but entities within each batch in parallel
        for (const batch of batches){
            await Promise.all(batch.map(async (recordSeedsConfig)=>{
                if (light && recordSeedsConfig.tableName.startsWith('_')) {
                    return;
                }
                const objectMetadata = objectMetadataItems.find((item)=>(0, _computetablenameutil.computeTableName)(item.nameSingular, item.isCustom) === recordSeedsConfig.tableName);
                if (!objectMetadata) {
                    // TODO this continue is hacky, we should have a record seed config per workspace
                    return;
                }
                await this.seedRecords({
                    entityManager,
                    schemaName,
                    tableName: recordSeedsConfig.tableName,
                    pgColumns: recordSeedsConfig.pgColumns,
                    recordSeeds: recordSeedsConfig.recordSeeds
                });
            }));
        }
    }
    async seedRecords({ entityManager, schemaName, tableName, pgColumns, recordSeeds }) {
        await entityManager.createQueryBuilder(undefined, undefined, undefined, {
            shouldBypassPermissionChecks: true
        }).insert().into(`${schemaName}.${tableName}`, pgColumns).orIgnore().values(recordSeeds).execute();
    }
    async seedAttachmentFiles(workspaceId, entityManager, fileSeedMetadata) {
        const IS_BUILT = __dirname.includes('/dist/');
        const sampleFilesDir = IS_BUILT ? (0, _path.join)(__dirname, '../../../../../assets/engine/workspace-manager/dev-seeder/data/sample-files') : (0, _path.join)(__dirname, '../sample-files');
        // Read each sample file once and cache the buffer
        const sampleFileBuffers = [];
        for (const sampleFile of _attachmentdataseedsconstant.ATTACHMENT_SAMPLE_FILES){
            const filePath = (0, _path.join)(sampleFilesDir, sampleFile.filename);
            sampleFileBuffers.push(await (0, _promises.readFile)(filePath));
        }
        const fieldUniversalIdentifier = _metadata.STANDARD_OBJECTS.attachment.fields.file.universalIdentifier;
        const applicationUniversalIdentifier = _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier;
        for (const metadata of fileSeedMetadata){
            const resourcePath = `${metadata.fileId}.${metadata.extension}`;
            const sourceFile = sampleFileBuffers[metadata.sampleFileIndex];
            await this.fileStorageService.writeFile({
                sourceFile,
                fileFolder: _types.FileFolder.FilesField,
                applicationUniversalIdentifier,
                workspaceId,
                resourcePath: `${fieldUniversalIdentifier}/${resourcePath}`,
                fileId: metadata.fileId,
                settings: {
                    isTemporaryFile: false,
                    toDelete: false
                },
                queryRunner: entityManager.queryRunner
            });
        }
    }
    constructor(coreDataSource, objectMetadataService, timelineActivitySeederService, fileStorageService, flatEntityMapsCacheService, applicationService, workspaceMigrationValidateBuildAndRunService){
        this.coreDataSource = coreDataSource;
        this.objectMetadataService = objectMetadataService;
        this.timelineActivitySeederService = timelineActivitySeederService;
        this.fileStorageService = fileStorageService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
DevSeederDataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _objectmetadataservice.ObjectMetadataService === "undefined" ? Object : _objectmetadataservice.ObjectMetadataService,
        typeof _timelineactivityseederservice.TimelineActivitySeederService === "undefined" ? Object : _timelineactivityseederservice.TimelineActivitySeederService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], DevSeederDataService);

//# sourceMappingURL=dev-seeder-data.service.js.map