"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _sanitizeuniversalflatentityupdateutil = require("../sanitize-universal-flat-entity-update.util");
describe('sanitizeFlatEntityUpdate', ()=>{
    it('should return only valid properties for fieldMetadata when update contains valid and invalid properties', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                isActive: true,
                label: 'New Label',
                invalidProperty: 'should be removed'
            },
            metadataName: 'fieldMetadata'
        });
        expect(result).toMatchSnapshot();
    });
    it('should return empty object when all properties are undefined for fieldMetadata', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                isActive: undefined,
                label: undefined
            },
            metadataName: 'fieldMetadata'
        });
        expect(result).toMatchSnapshot();
    });
    it('should return empty object when update is empty for fieldMetadata', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {},
            metadataName: 'fieldMetadata'
        });
        expect(result).toMatchSnapshot();
    });
    it('should preserve null values as they are valid updates for fieldMetadata', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                isActive: false,
                label: null,
                description: 'Updated description'
            },
            metadataName: 'fieldMetadata'
        });
        expect(result).toMatchSnapshot();
    });
    it('should return only valid properties for view metadata', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                name: 'My View',
                icon: 'IconUser',
                invalidProperty: 'should be removed'
            },
            metadataName: 'view'
        });
        expect(result).toMatchSnapshot();
    });
    it('should return only valid properties for objectMetadata', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                isActive: true,
                labelSingular: 'Person',
                labelPlural: 'People',
                invalidProperty: 'should be removed'
            },
            metadataName: 'objectMetadata'
        });
        expect(result).toMatchSnapshot();
    });
    it('should handle viewField metadata updates', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                position: 1,
                size: 100,
                isVisible: true,
                invalidProperty: 'should be removed'
            },
            metadataName: 'viewField'
        });
        expect(result).toMatchSnapshot();
    });
    it('should handle role metadata updates', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                label: 'Admin Role',
                description: 'Administrator role',
                invalidProperty: 'should be removed'
            },
            metadataName: 'role'
        });
        expect(result).toMatchSnapshot();
    });
    it('should handle agent metadata updates', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                name: 'My Agent',
                description: 'Agent description',
                invalidProperty: 'should be removed'
            },
            metadataName: 'agent'
        });
        expect(result).toMatchSnapshot();
    });
    it('should handle webhook metadata updates', ()=>{
        const result = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
            flatEntityUpdate: {
                targetUrl: 'https://example.com/webhook',
                description: 'My webhook',
                invalidProperty: 'should be removed'
            },
            metadataName: 'webhook'
        });
        expect(result).toMatchSnapshot();
    });
});

//# sourceMappingURL=sanitize-universal-flat-entity-update.util.spec.js.map