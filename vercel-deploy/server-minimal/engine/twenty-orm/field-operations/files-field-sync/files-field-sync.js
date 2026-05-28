"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilesFieldSync", {
    enumerable: true,
    get: function() {
        return FilesFieldSync;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _standarderrormessageconstant = require("../../../api/common/common-query-runners/errors/standard-error-message.constant");
const _getflatfieldsforflatobjectmetadatautil = require("../../../api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _fileentity = require("../../../core-modules/file/entities/file.entity");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _twentyormexception = require("../../exceptions/twenty-orm.exception");
const _getobjectmetadatafromentitytargetutil = require("../../utils/get-object-metadata-from-entity-target.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let FilesFieldSync = class FilesFieldSync {
    prepareFilesFieldSyncBeforeUpdate(entities, target, existingRecords) {
        return this.computeFilesFieldDiffBeforeUpdate(entities, target, existingRecords);
    }
    computeFilesFieldDiffBeforeUpdate(entities, target, existingRecords) {
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(target, this.internalContext);
        const filesFields = this.getFilesFields(objectMetadata.id);
        if (filesFields.length === 0) {
            return null;
        }
        const filesFieldDiffByEntityIndex = {};
        entities.forEach((entity, index)=>{
            const entityWithId = entity;
            const existingRecord = existingRecords?.find((existing)=>(0, _utils.isDefined)(existing.id) && (0, _utils.isDefined)(entityWithId.id) && existing.id === entityWithId.id);
            for (const filesField of filesFields){
                const existingFilesValue = existingRecord?.[filesField.name] ?? [];
                const diff = this.validateAndComputeFilesFieldDiff(entity, filesField, existingFilesValue);
                if (diff) {
                    if (!filesFieldDiffByEntityIndex[index]) {
                        filesFieldDiffByEntityIndex[index] = {};
                    }
                    filesFieldDiffByEntityIndex[index][filesField.name] = diff;
                }
            }
        });
        return Object.keys(filesFieldDiffByEntityIndex).length > 0 ? filesFieldDiffByEntityIndex : null;
    }
    computeFilesFieldDiffBeforeUpdateOne(updatePayload, target, existingRecords) {
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(target, this.internalContext);
        const filesFields = this.getFilesFields(objectMetadata.id);
        if (filesFields.length === 0) {
            return null;
        }
        const isModifyingFilesField = filesFields.some((filesField)=>(0, _utils.isDefined)(updatePayload[filesField.name]));
        if (!isModifyingFilesField) {
            return null;
        }
        if (existingRecords.length !== 1) {
            throw new _twentyormexception.TwentyORMException(`Cannot update multiple records with files field at once`, _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "5r5YRW",
                    message: "You can only update one record with files field at once."
                }
            });
        }
        const filesFieldDiffByEntityIndex = {};
        const existingRecord = existingRecords[0];
        for (const filesField of filesFields){
            const existingFilesValue = existingRecord?.[filesField.name] ?? [];
            const diff = this.validateAndComputeFilesFieldDiff(updatePayload, filesField, existingFilesValue);
            if (diff) {
                if (!filesFieldDiffByEntityIndex[0]) {
                    filesFieldDiffByEntityIndex[0] = {};
                }
                filesFieldDiffByEntityIndex[0][filesField.name] = diff;
            }
        }
        return Object.keys(filesFieldDiffByEntityIndex).length > 0 ? filesFieldDiffByEntityIndex : null;
    }
    computeFilesFieldDiffBeforeInsert(entities, target) {
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(target, this.internalContext);
        const filesFields = this.getFilesFields(objectMetadata.id);
        if (filesFields.length === 0) {
            return null;
        }
        const filesFieldDiffByEntityIndex = {};
        entities.forEach((entity, index)=>{
            for (const filesField of filesFields){
                const diff = this.validateAndComputeFilesFieldDiff(entity, filesField, []);
                if (diff) {
                    if (!filesFieldDiffByEntityIndex[index]) {
                        filesFieldDiffByEntityIndex[index] = {};
                    }
                    filesFieldDiffByEntityIndex[index][filesField.name] = diff;
                }
            }
        });
        return Object.keys(filesFieldDiffByEntityIndex).length > 0 ? filesFieldDiffByEntityIndex : null;
    }
    computeFilesFieldDiffBeforeUpsert(entities, target, existingRecordsMapById) {
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(target, this.internalContext);
        const filesFields = this.getFilesFields(objectMetadata.id);
        if (filesFields.length === 0) {
            return null;
        }
        const filesFieldDiffByEntityIndex = {};
        entities.forEach((entity, index)=>{
            const entityWithId = entity;
            const existingRecord = (0, _utils.isDefined)(entityWithId.id) ? existingRecordsMapById[entityWithId.id] : undefined;
            for (const filesField of filesFields){
                const existingFilesValue = existingRecord ? existingRecord[filesField.name] ?? [] : [];
                const diff = this.validateAndComputeFilesFieldDiff(entity, filesField, existingFilesValue);
                if (diff) {
                    if (!filesFieldDiffByEntityIndex[index]) {
                        filesFieldDiffByEntityIndex[index] = {};
                    }
                    filesFieldDiffByEntityIndex[index][filesField.name] = diff;
                }
            }
        });
        return Object.keys(filesFieldDiffByEntityIndex).length > 0 ? filesFieldDiffByEntityIndex : null;
    }
    validateFilesFieldMaxValues(filesField, newFilesValue) {
        const filesFieldMaxNumberOfValues = filesField.settings.maxNumberOfValues;
        if (newFilesValue.length > filesFieldMaxNumberOfValues) {
            throw new _twentyormexception.TwentyORMException(`Max number of files is ${filesFieldMaxNumberOfValues}`, _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "Dq8Em0",
                    message: "Max number of files is {filesFieldMaxNumberOfValues}",
                    values: {
                        filesFieldMaxNumberOfValues: filesFieldMaxNumberOfValues
                    }
                }
            });
        }
    }
    validateFileFieldUniversalIdentifier(fileId, fileEntity, fileIdToFieldUniversalIdentifier) {
        const expectedUniversalIdentifier = fileIdToFieldUniversalIdentifier.get(fileId);
        if ((0, _utils.isDefined)(expectedUniversalIdentifier) && !fileEntity.path.includes(expectedUniversalIdentifier)) {
            throw new _twentyormexception.TwentyORMException(`File ${fileId} was not uploaded for this field`, _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "v+527c",
                    message: "File {fileId} was not uploaded for this field. Please re-upload the file.",
                    values: {
                        fileId: fileId
                    }
                }
            });
        }
    }
    validateAndComputeFilesFieldDiff(entity, filesField, existingFilesValue) {
        const newFilesValue = entity[filesField.name];
        if (!(0, _utils.isDefined)(newFilesValue)) {
            return null;
        }
        this.validateFilesFieldMaxValues(filesField, newFilesValue);
        const diff = this.computeFilesFieldDiff(existingFilesValue, newFilesValue);
        if (diff.toAdd.length > 0 || diff.toUpdate.length > 0 || diff.toRemove.length > 0) {
            return diff;
        }
        return null;
    }
    computeFilesFieldDiff(existingFiles, newFiles) {
        const existingFileMap = new Map(existingFiles.map((file)=>[
                file.fileId,
                file
            ]));
        const newFileMap = new Map(newFiles.map((file)=>[
                file.fileId,
                file
            ]));
        const toAdd = [];
        const toUpdate = [];
        const toRemove = [];
        for (const newFile of newFiles){
            const existingFile = existingFileMap.get(newFile.fileId);
            if (!(0, _utils.isDefined)(existingFile)) {
                toAdd.push(newFile);
            } else {
                toUpdate.push({
                    ...existingFile,
                    label: newFile.label
                });
            }
        }
        for (const existingFile of existingFiles){
            if (!newFileMap.has(existingFile.fileId)) {
                toRemove.push(existingFile);
            }
        }
        return {
            toAdd,
            toUpdate,
            toRemove
        };
    }
    async enrichFilesFields({ entities, filesFieldDiffByEntityIndex, workspaceId, target }) {
        if (Object.keys(filesFieldDiffByEntityIndex).length === 0) {
            return {
                entities,
                fileIds: {
                    toAdd: new Set(),
                    toUpdate: new Set(),
                    toRemove: new Set()
                }
            };
        }
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(target, this.internalContext);
        const { toAdd, toUpdate, toRemove } = await this.validateAndEnrichFileDiffs(filesFieldDiffByEntityIndex, workspaceId, objectMetadata.id);
        const updatedEntities = this.updateEntitiesWithEnrichedFilesFieldValues(entities, filesFieldDiffByEntityIndex);
        return {
            entities: updatedEntities,
            fileIds: {
                toAdd,
                toUpdate,
                toRemove
            }
        };
    }
    async validateAndEnrichFileDiffs(filesFieldDiffByEntityIndex, workspaceId, objectMetadataId) {
        const allFileIds = {
            toAdd: new Set(),
            toUpdate: new Set(),
            toRemove: new Set()
        };
        const allFileIdsToFetch = new Set();
        const filesFields = this.getFilesFields(objectMetadataId);
        const fieldNameToUniversalIdentifier = new Map(filesFields.map((field)=>[
                field.name,
                field.universalIdentifier
            ]));
        const fileIdToFieldUniversalIdentifier = new Map();
        for (const entityDiffs of Object.values(filesFieldDiffByEntityIndex)){
            for (const [fieldName, diff] of Object.entries(entityDiffs)){
                const fieldUniversalIdentifier = fieldNameToUniversalIdentifier.get(fieldName);
                diff.toAdd.forEach((file)=>{
                    allFileIds.toAdd.add(file.fileId);
                    allFileIdsToFetch.add(file.fileId);
                    if ((0, _utils.isDefined)(fieldUniversalIdentifier)) {
                        fileIdToFieldUniversalIdentifier.set(file.fileId, fieldUniversalIdentifier);
                    }
                });
                diff.toUpdate.forEach((file)=>{
                    allFileIds.toUpdate.add(file.fileId);
                    allFileIdsToFetch.add(file.fileId);
                    if ((0, _utils.isDefined)(fieldUniversalIdentifier)) {
                        fileIdToFieldUniversalIdentifier.set(file.fileId, fieldUniversalIdentifier);
                    }
                });
                diff.toRemove.forEach((file)=>{
                    allFileIds.toRemove.add(file.fileId);
                });
            }
        }
        if (allFileIdsToFetch.size === 0 && allFileIds.toRemove.size === 0) {
            return allFileIds;
        }
        const existingFiles = await this.fileRepository.find({
            where: {
                id: (0, _typeorm.In)([
                    ...allFileIdsToFetch,
                    ...allFileIds.toRemove
                ]),
                workspaceId
            },
            select: [
                'id',
                'path',
                'settings'
            ]
        });
        const existingFileMap = new Map(existingFiles.map((file)=>[
                file.id,
                file
            ]));
        for (const entityDiffs of Object.values(filesFieldDiffByEntityIndex)){
            for (const diff of Object.values(entityDiffs)){
                for (const file of diff.toAdd){
                    const fileEntity = existingFileMap.get(file.fileId);
                    if (!fileEntity) {
                        throw new _twentyormexception.TwentyORMException(`File not found: ${file.fileId}`, _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT);
                    }
                    this.validateFileFieldUniversalIdentifier(file.fileId, fileEntity, fileIdToFieldUniversalIdentifier);
                    if (!fileEntity.settings?.isTemporaryFile) {
                        const fileId = file.fileId;
                        throw new _twentyormexception.TwentyORMException(`File ${fileId} is already associated with a permanent files field`, _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT, {
                            userFriendlyMessage: /*i18n*/ {
                                id: "ycn/wp",
                                message: "File {fileId} is already associated with a permanent files field. Please re-upload the file.",
                                values: {
                                    fileId: fileId
                                }
                            }
                        });
                    }
                    file.extension = _path.default.extname(fileEntity.path);
                }
                for (const file of diff.toUpdate){
                    const fileEntity = existingFileMap.get(file.fileId);
                    if (!fileEntity) {
                        throw new _twentyormexception.TwentyORMException(`File not found: ${file.fileId}`, _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT);
                    }
                    this.validateFileFieldUniversalIdentifier(file.fileId, fileEntity, fileIdToFieldUniversalIdentifier);
                    if (fileEntity.settings?.isTemporaryFile) {
                        throw new _twentyormexception.TwentyORMException(`File ${file.fileId} to update should not be a temporary file`, _twentyormexception.TwentyORMExceptionCode.INVALID_INPUT, {
                            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                        });
                    }
                }
            }
        }
        return allFileIds;
    }
    async updateFileEntityRecords(fileIds) {
        if (fileIds.toAdd.size > 0) {
            await this.fileRepository.update({
                id: (0, _typeorm.In)([
                    ...fileIds.toAdd
                ])
            }, {
                settings: {
                    isTemporaryFile: false,
                    toDelete: false
                }
            });
        }
        if (fileIds.toRemove.size > 0) {
            await this.fileRepository.softDelete([
                ...fileIds.toRemove
            ]);
        }
    }
    updateEntitiesWithEnrichedFilesFieldValues(entities, filesFieldDiffByEntityIndex) {
        return entities.map((entity, index)=>{
            const entityDiffs = filesFieldDiffByEntityIndex[index];
            if (!entityDiffs) {
                return entity;
            }
            const updatedEntity = {
                ...entity
            };
            const updatedEntityAny = updatedEntity;
            for (const [fieldName, diff] of Object.entries(entityDiffs)){
                const entityAny = entity;
                const currentFiles = entityAny[fieldName] ?? [];
                const toAddMap = new Map(diff.toAdd.map((file)=>[
                        file.fileId,
                        file
                    ]));
                const toUpdateMap = new Map(diff.toUpdate.map((file)=>[
                        file.fileId,
                        file
                    ]));
                const updatedFiles = currentFiles.map((file)=>{
                    const enrichedFile = toAddMap.get(file.fileId) || toUpdateMap.get(file.fileId);
                    return enrichedFile || file;
                });
                updatedEntityAny[fieldName] = updatedFiles;
            }
            return updatedEntity;
        });
    }
    getFilesFields(objectMetadataId) {
        const objectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: objectMetadataId,
            flatEntityMaps: this.internalContext.flatObjectMetadataMaps
        });
        if (!objectMetadata) {
            return [];
        }
        const objectFields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(objectMetadata, this.internalContext.flatFieldMetadataMaps);
        return objectFields.filter((field)=>field.type === _types.FieldMetadataType.FILES);
    }
    constructor(internalContext){
        this.internalContext = internalContext;
        this.fileRepository = internalContext.coreDataSource.getRepository(_fileentity.FileEntity);
    }
};

//# sourceMappingURL=files-field-sync.js.map