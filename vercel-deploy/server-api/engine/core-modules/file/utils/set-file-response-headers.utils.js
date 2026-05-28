"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setFileResponseHeaders", {
    enumerable: true,
    get: function() {
        return setFileResponseHeaders;
    }
});
const _getcontentdispositionutils = require("./get-content-disposition.utils");
const setFileResponseHeaders = (res, mimeType)=>{
    const contentType = mimeType || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Disposition', (0, _getcontentdispositionutils.getContentDisposition)(contentType));
};

//# sourceMappingURL=set-file-response-headers.utils.js.map