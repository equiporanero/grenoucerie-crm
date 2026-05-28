"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveAbsolutePath", {
    enumerable: true,
    get: function() {
        return resolveAbsolutePath;
    }
});
const resolveAbsolutePath = (path)=>{
    return path.startsWith('/') ? path : process.cwd() + '/' + path;
};

//# sourceMappingURL=resolve-absolute-path.js.map