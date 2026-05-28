"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractFileIdFromUrl", {
    enumerable: true,
    get: function() {
        return extractFileIdFromUrl;
    }
});
const _utils = require("twenty-shared/utils");
const extractFileIdFromUrl = (url, fileFolder)=>{
    let parsedUrl;
    try {
        parsedUrl = new URL(url);
    } catch  {
        return null;
    }
    const pathname = parsedUrl.pathname;
    const isLinkExternal = !pathname.startsWith(`/file/${fileFolder}/`);
    if (isLinkExternal) {
        return null;
    }
    const fileId = pathname.match(`/${fileFolder}/([^/]+)`)?.[1];
    return (0, _utils.isDefined)(fileId) && (0, _utils.isValidUuid)(fileId) ? fileId : null;
};

//# sourceMappingURL=extract-file-id-from-url.util.js.map