"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilesFieldQueryResultGetterHandler", {
    enumerable: true,
    get: function() {
        return FilesFieldQueryResultGetterHandler;
    }
});
const _types = require("twenty-shared/types");
const _fileitemguard = require("../../../common-args-processors/data-arg-processor/types/file-item.guard");
let FilesFieldQueryResultGetterHandler = class FilesFieldQueryResultGetterHandler {
    async handle(record, workspaceId, flatFieldMetadata) {
        const filesFields = flatFieldMetadata.filter((field)=>field.type === _types.FieldMetadataType.FILES);
        if (filesFields.length === 0) {
            return record;
        }
        for (const field of filesFields){
            const filesFieldValue = record[field.name];
            if (!(0, _fileitemguard.isFileOutputArray)(filesFieldValue)) {
                continue;
            }
            const signedFilesFieldValue = [];
            for (const file of filesFieldValue){
                const url = await this.fileUrlService.signFileByIdUrl({
                    fileId: file.fileId,
                    workspaceId,
                    fileFolder: _types.FileFolder.FilesField
                });
                signedFilesFieldValue.push({
                    ...file,
                    url
                });
            }
            record[field.name] = signedFilesFieldValue;
        }
        return record;
    }
    constructor(fileUrlService){
        this.fileUrlService = fileUrlService;
    }
};

//# sourceMappingURL=files-field-query-result-getter.handler.js.map