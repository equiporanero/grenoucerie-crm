"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonResultGettersService", {
    enumerable: true,
    get: function() {
        return CommonResultGettersService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _filesfieldqueryresultgetterhandler = require("./handlers/field-handlers/files-field-query-result-getter.handler");
const _richtextfieldqueryresultgetterhandler = require("./handlers/field-handlers/rich-text-field-query-result-getter.handler");
const _workspacememberqueryresultgetterhandler = require("../../graphql/workspace-query-runner/factories/query-result-getters/handlers/workspace-member-query-result-getter.handler");
const _fileurlservice = require("../../../core-modules/file/file-url/file-url.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _isflatfieldmetadataoftypeutil = require("../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CommonResultGettersService = class CommonResultGettersService {
    initializeObjectHandlers() {
        this.objectHandlers = new Map([
            [
                'workspaceMember',
                new _workspacememberqueryresultgetterhandler.WorkspaceMemberQueryResultGetterHandler(this.fileUrlService)
            ]
        ]);
    }
    initializeFieldHandlers() {
        this.fieldHandlers = new Map([
            [
                _types.FieldMetadataType.FILES,
                new _filesfieldqueryresultgetterhandler.FilesFieldQueryResultGetterHandler(this.fileUrlService)
            ],
            [
                _types.FieldMetadataType.RICH_TEXT,
                new _richtextfieldqueryresultgetterhandler.RichTextFieldQueryResultGetterHandler(this.fileUrlService)
            ]
        ]);
    }
    async processRecordArray(recordArray, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, workspaceId) {
        const fieldMaps = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        return await Promise.all(recordArray.map(async (record)=>await this.processRecord(record, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, workspaceId, fieldMaps)));
    }
    async processRecord(record, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, workspaceId, fieldMapsForObject) {
        const fieldMaps = fieldMapsForObject ?? (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        const { fieldIdByName } = fieldMaps;
        const handlers = [
            this.getObjectHandler(flatObjectMetadata.nameSingular),
            ...Object.keys(record).map((recordFieldName)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: fieldIdByName[recordFieldName],
                    flatEntityMaps: flatFieldMetadataMaps
                })).filter(_utils.isDefined).map((fieldMetadata)=>this.fieldHandlers.get(fieldMetadata.type)).filter(_utils.isDefined)
        ];
        const relationFields = Object.keys(record).map((recordFieldName)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldIdByName[recordFieldName],
                flatEntityMaps: flatFieldMetadataMaps
            })).filter(_utils.isDefined).filter((fieldMetadata)=>(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fieldMetadata, _types.FieldMetadataType.RELATION));
        const relationFieldsProcessedMap = {};
        for (const relationField of relationFields){
            if (!(0, _utils.isDefined)(relationField.relationTargetObjectMetadataId)) {
                throw new Error('Relation target object metadata id is not defined');
            }
            const recordFieldValue = record[relationField.name];
            if (!(0, _utils.isDefined)(recordFieldValue)) {
                continue;
            }
            const targetFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: relationField.relationTargetObjectMetadataId,
                flatEntityMaps: flatObjectMetadataMaps
            });
            relationFieldsProcessedMap[relationField.name] = relationField.settings?.relationType === _types.RelationType.ONE_TO_MANY ? await this.processRecordArray(record[relationField.name], targetFlatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, workspaceId) : await this.processRecord(record[relationField.name], targetFlatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, workspaceId);
        }
        const fieldMetadata = Object.keys(record).map((recordFieldName)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldIdByName[recordFieldName],
                flatEntityMaps: flatFieldMetadataMaps
            })).filter(_utils.isDefined);
        const objectRecordProcessedWithoutRelationFields = await this.processObjectRecordWithoutRelationFields(record, workspaceId, handlers, fieldMetadata);
        const processedRecord = {
            ...objectRecordProcessedWithoutRelationFields,
            ...relationFieldsProcessedMap
        };
        return processedRecord;
    }
    async processObjectRecordWithoutRelationFields(record, workspaceId, handlers, fieldMetadata) {
        let processedRecord = record;
        for (const handler of handlers){
            processedRecord = await handler.handle(processedRecord, workspaceId, fieldMetadata);
        }
        return processedRecord;
    }
    getObjectHandler(objectType) {
        return (this.objectHandlers.get(objectType) || {
            handle: (result)=>Promise.resolve(result)
        }) ?? {
            handle: (result)=>Promise.resolve(result)
        };
    }
    constructor(fileUrlService){
        this.fileUrlService = fileUrlService;
        this.initializeObjectHandlers();
        this.initializeFieldHandlers();
    }
};
CommonResultGettersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService
    ])
], CommonResultGettersService);

//# sourceMappingURL=common-result-getters.service.js.map