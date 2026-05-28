"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _filestorageexceptionfilter = require("../file-storage-exception-filter");
const _filestorageexception = require("../interfaces/file-storage-exception");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
describe('FileStorageExceptionFilter', ()=>{
    const filter = new _filestorageexceptionfilter.FileStorageExceptionFilter();
    it.each([
        {
            code: _filestorageexception.FileStorageExceptionCode.INVALID_EXTENSION,
            expectedError: _graphqlerrorsutil.UserInputError
        },
        {
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED,
            expectedError: _graphqlerrorsutil.ForbiddenError
        },
        {
            code: _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND,
            expectedError: _graphqlerrorsutil.NotFoundError
        }
    ])('should map $code to the expected GraphQL error', ({ code, expectedError })=>{
        const exception = new _filestorageexception.FileStorageException('test message', code);
        expect(()=>filter.catch(exception)).toThrow(expectedError);
    });
});

//# sourceMappingURL=file-storage-exception-filter.spec.js.map