"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformRichTextValue", {
    enumerable: true,
    get: function() {
        return transformRichTextValue;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
// Reuse a single ServerBlockNoteEditor across all calls to avoid
// the cost of dynamic import resolution + instance creation (~90ms) on every transform.
let cachedServerBlockNoteEditor = null;
// SWC compiles import() to require() in CJS mode, which breaks ESM-only
// transitive dependencies in @blocknote/core. Native import() resolves
// the ESM bundle path where the full chain works.
const nativeImport = new Function('specifier', 'return import(specifier)');
const getServerBlockNoteEditor = async ()=>{
    if (cachedServerBlockNoteEditor) {
        return cachedServerBlockNoteEditor;
    }
    const module = await nativeImport('@blocknote/server-util');
    const editor = module.ServerBlockNoteEditor.create();
    cachedServerBlockNoteEditor = editor;
    return editor;
};
const transformRichTextValue = async (// oxlint-disable-next-line @typescripttypescript/no-explicit-any
richTextValue)=>{
    const parsedValue = (0, _guards.isNonEmptyString)(richTextValue) ? _types.richTextValueSchema.parse(richTextValue) : richTextValue;
    const serverBlockNoteEditor = await getServerBlockNoteEditor();
    // Patch: Handle cases where blocknote to markdown conversion fails for certain block types (custom/code blocks)
    // Todo : This may be resolved once the server-utils library is updated with proper conversion support - #947
    let convertedMarkdown = null;
    try {
        convertedMarkdown = (0, _utils.isDefined)(parsedValue.blocknote) ? await serverBlockNoteEditor.blocksToMarkdownLossy(JSON.parse(parsedValue.blocknote)) : null;
    } catch  {
        convertedMarkdown = parsedValue.blocknote || null;
    }
    const convertedBlocknote = parsedValue.markdown ? JSON.stringify(await serverBlockNoteEditor.tryParseMarkdownToBlocks(parsedValue.markdown)) : null;
    return {
        markdown: parsedValue.markdown || convertedMarkdown,
        blocknote: parsedValue.blocknote || convertedBlocknote
    };
};

//# sourceMappingURL=transform-rich-text.util.js.map