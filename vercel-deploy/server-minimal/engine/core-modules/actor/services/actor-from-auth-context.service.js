"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActorFromAuthContextService", {
    enumerable: true,
    get: function() {
        return ActorFromAuthContextService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _buildcreatedbyfromapikeyutil = require("../utils/build-created-by-from-api-key.util");
const _buildcreatedbyfromapplicationutil = require("../utils/build-created-by-from-application.util");
const _buildcreatedbyfromfullnamemetadatautil = require("../utils/build-created-by-from-full-name-metadata.util");
const _isapikeyauthcontextguard = require("../../auth/guards/is-api-key-auth-context.guard");
const _isapplicationauthcontextguard = require("../../auth/guards/is-application-auth-context.guard");
const _isuserauthcontextguard = require("../../auth/guards/is-user-auth-context.guard");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _buildobjectidbynamemapsutil = require("../../../metadata-modules/flat-object-metadata/utils/build-object-id-by-name-maps.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ActorFromAuthContextService = class ActorFromAuthContextService {
    async injectCreatedBy({ records, objectMetadataNameSingular, authContext }) {
        return this.injectActorField({
            records,
            objectMetadataNameSingular,
            authContext,
            fieldName: 'createdBy'
        });
    }
    async injectActorFieldsOnCreate({ records, objectMetadataNameSingular, authContext }) {
        const recordsWithCreatedBy = await this.injectActorField({
            records,
            objectMetadataNameSingular,
            authContext,
            fieldName: 'createdBy'
        });
        return await this.injectActorField({
            records: recordsWithCreatedBy,
            objectMetadataNameSingular,
            authContext,
            fieldName: 'updatedBy'
        });
    }
    async injectUpdatedBy({ records, objectMetadataNameSingular, authContext }) {
        return this.injectActorField({
            records,
            objectMetadataNameSingular,
            authContext,
            fieldName: 'updatedBy'
        });
    }
    async injectActorField({ records, objectMetadataNameSingular, authContext, fieldName }) {
        const workspace = authContext.workspace;
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: workspace.id,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const { idByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        const objectId = idByNameSingular[objectMetadataNameSingular];
        const objectMetadata = objectId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: objectId,
            flatEntityMaps: flatObjectMetadataMaps
        }) : undefined;
        const fieldIdByName = objectMetadata ? (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, objectMetadata).fieldIdByName : {};
        this.logger.log(`Object metadata found with fields: ${Object.keys(fieldIdByName)}`);
        if (!(0, _utils.isDefined)(fieldIdByName[fieldName])) {
            this.logger.log(`${fieldName} field not found in object metadata, skipping injection`);
            return records;
        }
        const clonedRecords = structuredClone(records);
        const actorMetadata = this.buildActorMetadata(authContext);
        for (const record of clonedRecords){
            this.injectActorToRecord(actorMetadata, record, fieldName);
        }
        return clonedRecords;
    }
    injectActorToRecord(actorMetadata, record, fieldName) {
        const existingValue = record[fieldName];
        if (fieldName === 'createdBy') {
            if (actorMetadata && (!existingValue || !existingValue.name)) {
                record[fieldName] = {
                    ...actorMetadata,
                    source: existingValue?.source ?? actorMetadata.source
                };
            }
        } else {
            record[fieldName] = actorMetadata;
        }
    }
    buildActorMetadata(authContext) {
        if ((0, _isuserauthcontextguard.isUserAuthContext)(authContext)) {
            return (0, _buildcreatedbyfromfullnamemetadatautil.buildCreatedByFromFullNameMetadata)({
                fullNameMetadata: authContext.workspaceMember.name,
                workspaceMemberId: authContext.workspaceMemberId
            });
        }
        if ((0, _isapikeyauthcontextguard.isApiKeyAuthContext)(authContext)) {
            return (0, _buildcreatedbyfromapikeyutil.buildCreatedByFromApiKey)({
                apiKey: authContext.apiKey
            });
        }
        if ((0, _isapplicationauthcontextguard.isApplicationAuthContext)(authContext)) {
            return (0, _buildcreatedbyfromapplicationutil.buildCreatedByFromApplication)({
                application: authContext.application
            });
        }
        throw new Error('Unable to build actor metadata - no valid actor information found in auth context');
    }
    constructor(flatEntityMapsCacheService){
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.logger = new _common.Logger(ActorFromAuthContextService.name);
    }
};
ActorFromAuthContextService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], ActorFromAuthContextService);

//# sourceMappingURL=actor-from-auth-context.service.js.map