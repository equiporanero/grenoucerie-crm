"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderRichTextToHtml", {
    enumerable: true,
    get: function() {
        return renderRichTextToHtml;
    }
});
const _render = require("@react-email/render");
const _twentyemails = require("twenty-emails");
const renderRichTextToHtml = async (jsonContent)=>{
    const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(jsonContent);
    return (0, _render.render)(reactMarkup);
};

//# sourceMappingURL=render-rich-text-to-html.util.js.map