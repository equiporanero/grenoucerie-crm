"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isMicrosoftClientTemporaryError", {
    enumerable: true,
    get: function() {
        return isMicrosoftClientTemporaryError;
    }
});
const isMicrosoftClientTemporaryError = (body)=>{
    return body.includes('Unexpected token < in JSON at position') || body.includes('ApplicationThrottled 429 error');
};

//# sourceMappingURL=is-temporary-error.utils.js.map