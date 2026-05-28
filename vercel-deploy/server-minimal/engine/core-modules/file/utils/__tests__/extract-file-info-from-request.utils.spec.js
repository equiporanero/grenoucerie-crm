"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _checkfilefolderutils = require("../check-file-folder.utils");
const _checkfilenameutils = require("../check-file-name.utils");
const _extractfileinfofromrequestutils = require("../extract-file-info-from-request.utils");
jest.mock('src/engine/core-modules/file/utils/check-file-name.utils', ()=>({
        checkFilename: jest.fn()
    }));
jest.mock('src/engine/core-modules/file/utils/check-file-folder.utils', ()=>({
        checkFileFolder: jest.fn()
    }));
jest.mock('src/engine/core-modules/file/interfaces/file-folder.interface', ()=>({
        fileFolderConfigs: {
            attachment: {
                ignoreExpirationToken: false
            },
            'profile-picture': {
                ignoreExpirationToken: true
            }
        }
    }));
describe('extractFileInfoFromRequest', ()=>{
    it('should extract all file info correctly from 3-segment path', ()=>{
        const mockRequest = {
            path: '/files/attachment/filesig123/myfile.txt'
        };
        _checkfilenameutils.checkFilename.mockReturnValue('validated-file.txt');
        _checkfilefolderutils.checkFileFolder.mockReturnValue('attachment');
        const result = (0, _extractfileinfofromrequestutils.extractFileInfoFromRequest)(mockRequest);
        expect(_checkfilenameutils.checkFilename).toHaveBeenCalledWith('myfile.txt');
        expect(_checkfilefolderutils.checkFileFolder).toHaveBeenCalledWith('attachment');
        expect(result).toEqual({
            filename: 'validated-file.txt',
            fileSignature: 'filesig123',
            rawFolder: 'attachment',
            fileFolder: 'attachment',
            ignoreExpirationToken: false
        });
    });
    it('should extract all file info correctly from 4-segment path with size', ()=>{
        const mockRequest = {
            path: '/files/profile-picture/original/filesig456/avatar.jpg'
        };
        _checkfilenameutils.checkFilename.mockReturnValue('validated-avatar.jpg');
        _checkfilefolderutils.checkFileFolder.mockReturnValue('profile-picture');
        const result = (0, _extractfileinfofromrequestutils.extractFileInfoFromRequest)(mockRequest);
        expect(_checkfilenameutils.checkFilename).toHaveBeenCalledWith('avatar.jpg');
        expect(_checkfilefolderutils.checkFileFolder).toHaveBeenCalledWith('profile-picture/original');
        expect(result).toEqual({
            filename: 'validated-avatar.jpg',
            fileSignature: 'filesig456',
            rawFolder: 'profile-picture/original',
            fileFolder: 'profile-picture',
            ignoreExpirationToken: true
        });
    });
});

//# sourceMappingURL=extract-file-info-from-request.utils.spec.js.map