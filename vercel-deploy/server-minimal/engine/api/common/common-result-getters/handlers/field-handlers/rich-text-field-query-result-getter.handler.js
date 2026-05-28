"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RichTextFieldQueryResultGetterHandler", {
    enumerable: true,
    get: function() {
        return RichTextFieldQueryResultGetterHandler;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _extractfileidfromurlutil = require("../../../../../core-modules/file/files-field/utils/extract-file-id-from-url.util");
const parseBlocknoteJsonSafely = (blocknoteJson)=>{
    try {
        const parsed = JSON.parse(blocknoteJson);
        if (!Array.isArray(parsed)) {
            return null;
        }
        return parsed;
    } catch  {
        return null;
    }
};
let RichTextFieldQueryResultGetterHandler = class RichTextFieldQueryResultGetterHandler {
    async handle(record, workspaceId, flatFieldMetadata) {
        const richTextFields = flatFieldMetadata.filter((field)=>field.type === _types.FieldMetadataType.RICH_TEXT);
        if (richTextFields.length === 0) {
            return record;
        }
        for (const field of richTextFields){
            const fieldValue = record[field.name];
            const blocknoteJson = fieldValue?.blocknote;
            if (!blocknoteJson || typeof blocknoteJson !== 'string') {
                continue;
            }
            const blocknoteBlocks = parseBlocknoteJsonSafely(blocknoteJson);
            if (!(0, _utils.isDefined)(blocknoteBlocks)) {
                continue;
            }
            const signedBlocks = await this.signBlocknoteImageUrls(blocknoteBlocks, workspaceId);
            record[field.name] = {
                ...fieldValue,
                blocknote: JSON.stringify(signedBlocks)
            };
        }
        return record;
    }
    constructor(fileUrlService){
        this.fileUrlService = fileUrlService;
        this.signBlocknoteImageUrls = async (blocknoteBlocks, workspaceId)=>{
            return Promise.all(blocknoteBlocks.map(async (block)=>{
                if (!(0, _utils.isDefined)(block.props?.url)) {
                    return block;
                }
                const fileIdFromUrl = (0, _extractfileidfromurlutil.extractFileIdFromUrl)(block.props.url, _types.FileFolder.FilesField);
                if (!(0, _utils.isDefined)(fileIdFromUrl)) {
                    return block;
                }
                const url = await this.fileUrlService.signFileByIdUrl({
                    fileId: fileIdFromUrl,
                    workspaceId,
                    fileFolder: _types.FileFolder.FilesField
                });
                return {
                    ...block,
                    props: {
                        ...block.props,
                        url
                    }
                };
            }));
        };
    }
};

//# sourceMappingURL=rich-text-field-query-result-getter.handler.js.map