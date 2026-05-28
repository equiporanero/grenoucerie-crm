"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _recordtransformerexception = require("../../record-transformer.exception");
const _removeemptylinks = require("../remove-empty-links");
describe('removeEmptyLinks', ()=>{
    it('should return null values when all inputs are empty', ()=>{
        expect((0, _removeemptylinks.removeEmptyLinks)({
            primaryLinkUrl: null,
            primaryLinkLabel: null,
            secondaryLinks: []
        })).toEqual({
            primaryLinkUrl: null,
            primaryLinkLabel: null,
            secondaryLinks: []
        });
        expect((0, _removeemptylinks.removeEmptyLinks)({
            primaryLinkUrl: null,
            primaryLinkLabel: null,
            secondaryLinks: null
        })).toEqual({
            primaryLinkUrl: null,
            primaryLinkLabel: null,
            secondaryLinks: []
        });
    });
    it('should keep valid primary link and remove empty secondary links', ()=>{
        expect((0, _removeemptylinks.removeEmptyLinks)({
            primaryLinkUrl: 'https://www.twenty.com',
            primaryLinkLabel: 'Twenty Website',
            secondaryLinks: []
        })).toEqual({
            primaryLinkUrl: 'https://www.twenty.com',
            primaryLinkLabel: 'Twenty Website',
            secondaryLinks: []
        });
    });
    it('should promote first valid secondary link to primary when primary is empty', ()=>{
        expect((0, _removeemptylinks.removeEmptyLinks)({
            primaryLinkUrl: null,
            primaryLinkLabel: null,
            secondaryLinks: [
                {
                    url: 'https://docs.twenty.com',
                    label: 'Documentation'
                },
                {
                    url: 'https://github.com/twentyhq/twenty',
                    label: 'GitHub'
                }
            ]
        })).toEqual({
            primaryLinkUrl: 'https://docs.twenty.com',
            primaryLinkLabel: 'Documentation',
            secondaryLinks: [
                {
                    url: 'https://github.com/twentyhq/twenty',
                    label: 'GitHub'
                }
            ]
        });
    });
    it('should throw RecordTransformerException when primary link URL is invalid', ()=>{
        expect(()=>(0, _removeemptylinks.removeEmptyLinks)({
                primaryLinkUrl: 'lydia,com',
                primaryLinkLabel: 'Invalid URL',
                secondaryLinks: []
            })).toThrow(expect.objectContaining({
            constructor: _recordtransformerexception.RecordTransformerException,
            code: _recordtransformerexception.RecordTransformerExceptionCode.INVALID_URL,
            message: 'The URL of the link is not valid'
        }));
    });
    it('should throw RecordTransformerException when any secondary link URL is invalid', ()=>{
        expect(()=>(0, _removeemptylinks.removeEmptyLinks)({
                primaryLinkUrl: 'https://www.twenty.com',
                primaryLinkLabel: 'Twenty Website',
                secondaryLinks: [
                    {
                        url: 'wikipedia',
                        label: 'Invalid URL'
                    }
                ]
            })).toThrow(expect.objectContaining({
            constructor: _recordtransformerexception.RecordTransformerException,
            code: _recordtransformerexception.RecordTransformerExceptionCode.INVALID_URL,
            message: 'The URL of the link is not valid'
        }));
    });
    it('should throw RecordTransformerException when both primary and secondary URLs are invalid', ()=>{
        expect(()=>(0, _removeemptylinks.removeEmptyLinks)({
                primaryLinkUrl: 'lydia,com',
                primaryLinkLabel: 'Invalid URL',
                secondaryLinks: [
                    {
                        url: 'wikipedia',
                        label: 'Invalid URL'
                    }
                ]
            })).toThrow(expect.objectContaining({
            constructor: _recordtransformerexception.RecordTransformerException,
            code: _recordtransformerexception.RecordTransformerExceptionCode.INVALID_URL,
            message: 'The URL of the link is not valid'
        }));
    });
    it('should handle empty or null secondary links', ()=>{
        expect((0, _removeemptylinks.removeEmptyLinks)({
            primaryLinkUrl: 'https://www.twenty.com',
            primaryLinkLabel: 'Twenty Website',
            secondaryLinks: [
                {
                    url: '',
                    label: 'Empty URL'
                },
                {
                    url: null,
                    label: 'Null URL'
                }
            ]
        })).toEqual({
            primaryLinkUrl: 'https://www.twenty.com',
            primaryLinkLabel: 'Twenty Website',
            secondaryLinks: []
        });
    });
    it('should return empty state when there are no valid URLs', ()=>{
        expect((0, _removeemptylinks.removeEmptyLinks)({
            primaryLinkUrl: '',
            primaryLinkLabel: 'Empty URL',
            secondaryLinks: [
                {
                    url: null,
                    label: 'Null URL'
                },
                {
                    url: '',
                    label: 'Empty URL'
                }
            ]
        })).toEqual({
            primaryLinkUrl: null,
            primaryLinkLabel: null,
            secondaryLinks: []
        });
    });
    it('should keep valid URLs with null labels', ()=>{
        expect((0, _removeemptylinks.removeEmptyLinks)({
            primaryLinkUrl: 'https://www.twenty.com',
            primaryLinkLabel: null,
            secondaryLinks: [
                {
                    url: 'https://docs.twenty.com',
                    label: null
                }
            ]
        })).toEqual({
            primaryLinkUrl: 'https://www.twenty.com',
            primaryLinkLabel: null,
            secondaryLinks: [
                {
                    url: 'https://docs.twenty.com',
                    label: null
                }
            ]
        });
    });
});

//# sourceMappingURL=remove-empty-links.spec.js.map