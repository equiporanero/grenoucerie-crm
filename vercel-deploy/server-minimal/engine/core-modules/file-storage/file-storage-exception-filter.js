"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileStorageExceptionFilter", {
    enumerable: true,
    get: function() {
        return FileStorageExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _filestorageexception = require("./interfaces/file-storage-exception");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FileStorageExceptionFilter = class FileStorageExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _filestorageexception.FileStorageExceptionCode.INVALID_EXTENSION:
                throw new _graphqlerrorsutil.UserInputError(exception);
            case _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED:
                throw new _graphqlerrorsutil.ForbiddenError(exception);
            case _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(exception);
            default:
                (0, _utils.assertUnreachable)(exception.code);
        }
    }
};
FileStorageExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_filestorageexception.FileStorageException)
], FileStorageExceptionFilter);

//# sourceMappingURL=file-storage-exception-filter.js.map