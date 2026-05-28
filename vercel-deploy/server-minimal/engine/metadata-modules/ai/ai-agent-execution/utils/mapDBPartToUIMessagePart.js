"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mapDBPartToUIMessagePart", {
    enumerable: true,
    get: function() {
        return mapDBPartToUIMessagePart;
    }
});
const mapDBPartToUIMessagePart = (part)=>{
    switch(part.type){
        case 'text':
            return {
                type: 'text',
                text: part.textContent ?? ''
            };
        case 'reasoning':
            return {
                type: 'reasoning',
                text: part.reasoningContent ?? '',
                state: part.state ?? 'done'
            };
        case 'file':
            return {
                type: 'file',
                mediaType: part.file?.mimeType ?? 'application/octet-stream',
                filename: part.fileFilename ?? '',
                url: '',
                fileId: part.fileId ?? ''
            };
        case 'source-url':
            return {
                type: 'source-url',
                sourceId: part.sourceUrlSourceId ?? '',
                url: part.sourceUrlUrl ?? '',
                title: part.sourceUrlTitle ?? '',
                providerMetadata: part.providerMetadata ?? undefined
            };
        case 'source-document':
            return {
                type: 'source-document',
                sourceId: part.sourceDocumentSourceId ?? '',
                mediaType: part.sourceDocumentMediaType ?? '',
                title: part.sourceDocumentTitle ?? '',
                filename: part.sourceDocumentFilename ?? '',
                providerMetadata: part.providerMetadata ?? undefined
            };
        case 'step-start':
            return {
                type: 'step-start'
            };
        case 'data-routing-status':
            return null;
        default:
            {
                if (part.type.includes('tool-') && part.toolCallId) {
                    return {
                        type: part.type,
                        toolCallId: part.toolCallId,
                        input: part.toolInput ?? {},
                        output: part.toolOutput,
                        errorText: part.errorMessage ?? '',
                        state: part.state,
                        ...part.providerExecuted != null && {
                            providerExecuted: part.providerExecuted
                        }
                    };
                }
                return null;
            }
    }
};

//# sourceMappingURL=mapDBPartToUIMessagePart.js.map