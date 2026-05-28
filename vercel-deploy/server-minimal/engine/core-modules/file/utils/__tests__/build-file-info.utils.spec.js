"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _uuid = require("uuid");
const _buildfileinfoutils = require("../build-file-info.utils");
jest.mock('uuid', ()=>({
        v4: jest.fn()
    }));
describe('buildFileInfo', ()=>{
    const mockId = '1234-uuid';
    beforeEach(()=>{
        _uuid.v4.mockReturnValue(mockId);
    });
    it('should extract extension and generate correct name with extension', ()=>{
        const result = (0, _buildfileinfoutils.buildFileInfo)('file.txt');
        expect(result).toEqual({
            ext: 'txt',
            name: `${mockId}.txt`
        });
    });
    it('should handle filenames without extension', ()=>{
        const result = (0, _buildfileinfoutils.buildFileInfo)('file');
        expect(result).toEqual({
            ext: '',
            name: mockId
        });
    });
    it('should handle filenames with multiple dots', ()=>{
        const result = (0, _buildfileinfoutils.buildFileInfo)('archive.tar.gz');
        expect(result).toEqual({
            ext: 'gz',
            name: `${mockId}.gz`
        });
    });
});

//# sourceMappingURL=build-file-info.utils.spec.js.map