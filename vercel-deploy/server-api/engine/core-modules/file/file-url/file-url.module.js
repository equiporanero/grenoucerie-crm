"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileUrlModule", {
    enumerable: true,
    get: function() {
        return FileUrlModule;
    }
});
const _common = require("@nestjs/common");
const _jwtmodule = require("../../jwt/jwt.module");
const _fileurlservice = require("./file-url.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FileUrlModule = class FileUrlModule {
};
FileUrlModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwtmodule.JwtModule
        ],
        providers: [
            _fileurlservice.FileUrlService
        ],
        exports: [
            _fileurlservice.FileUrlService
        ]
    })
], FileUrlModule);

//# sourceMappingURL=file-url.module.js.map