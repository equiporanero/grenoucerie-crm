"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mapUIMessagePartsToDBParts", {
    enumerable: true,
    get: function() {
        return mapUIMessagePartsToDBParts;
    }
});
const _ai = require("twenty-shared/ai");
const isToolPart = (part)=>{
    return part.type.includes('tool-') && 'toolCallId' in part;
};
const mapUIMessagePartsToDBParts = (uiMessageParts, messageId, workspaceId)=>{
    return uiMessageParts.map((part, index)=>{
        const basePart = {
            messageId,
            orderIndex: index,
            type: part.type,
            workspaceId
        };
        switch(part.type){
            case 'text':
                return {
                    ...basePart,
                    textContent: part.text
                };
            case 'reasoning':
                return {
                    ...basePart,
                    reasoningContent: part.text
                };
            case 'file':
                {
                    if (!(0, _ai.isExtendedFileUIPart)(part)) {
                        throw new Error('Expected file part');
                    }
                    return {
                        ...basePart,
                        fileFilename: part.filename,
                        fileId: part.fileId
                    };
                }
            case 'source-url':
                return {
                    ...basePart,
                    sourceUrlSourceId: part.sourceId,
                    sourceUrlUrl: part.url,
                    sourceUrlTitle: part.title,
                    providerMetadata: part.providerMetadata ?? null
                };
            case 'source-document':
                return {
                    ...basePart,
                    sourceDocumentSourceId: part.sourceId,
                    sourceDocumentMediaType: part.mediaType,
                    sourceDocumentTitle: part.title,
                    sourceDocumentFilename: part.filename,
                    providerMetadata: part.providerMetadata ?? null
                };
            case 'step-start':
                return basePart;
            case 'data-compaction':
                return null;
            case 'data-routing-status':
                return {
                    ...basePart,
                    textContent: part.data.text,
                    state: part.data.state
                };
            case 'data-code-execution':
                // Code execution parts are streamed during execution but don't need
                // to be persisted - the final result is captured in the tool part
                return null;
            case 'data-thread-title':
                // Thread title is a transient notification for the client
                return null;
            default:
                {
                    if (isToolPart(part)) {
                        const { toolCallId, input, output, errorText, state } = part;
                        return {
                            ...basePart,
                            toolCallId: toolCallId,
                            toolInput: input,
                            toolOutput: output,
                            errorMessage: errorText,
                            state,
                            providerExecuted: part.providerExecuted ?? null
                        };
                    }
                }
                throw new Error(`Unsupported part type: ${part.type}`);
        }
    }).filter((part)=>part !== null);
};

//# sourceMappingURL=mapUIMessagePartsToDBParts.js.map