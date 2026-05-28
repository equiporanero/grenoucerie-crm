"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _richtextfieldqueryresultgetterhandler = require("../rich-text-field-query-result-getter.handler");
const baseRecord = {
    id: '1',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    deletedAt: null
};
const richTextFieldMetadata = [
    {
        type: _types.FieldMetadataType.RICH_TEXT,
        name: 'bodyV2'
    }
];
const mockFileUrlService = {
    signFileByIdUrl: jest.fn().mockReturnValue('signed-path')
};
describe('RichTextFieldQueryResultGetterHandler', ()=>{
    let handler;
    beforeEach(()=>{
        process.env.SERVER_URL = 'https://my-domain.twenty.com';
        handler = new _richtextfieldqueryresultgetterhandler.RichTextFieldQueryResultGetterHandler(mockFileUrlService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
        delete process.env.SERVER_URL;
    });
    describe('should return record unchanged', ()=>{
        it('when no RICH_TEXT field metadata is present', async ()=>{
            const record = {
                ...baseRecord,
                bodyV2: {
                    blocknote: '[]',
                    markdown: null
                }
            };
            const result = await handler.handle(record, 'ws-1', []);
            expect(result).toEqual(record);
        });
        it('when blocknote is null', async ()=>{
            const record = {
                ...baseRecord,
                bodyV2: {
                    blocknote: null,
                    markdown: null
                }
            };
            const result = await handler.handle(record, 'ws-1', richTextFieldMetadata);
            expect(result).toEqual(record);
        });
        it('when blocknote is not a string', async ()=>{
            const record = {
                ...baseRecord,
                bodyV2: {
                    blocknote: 123,
                    markdown: null
                }
            };
            const result = await handler.handle(record, 'ws-1', richTextFieldMetadata);
            expect(result).toEqual(record);
        });
        it('when blocknote is an invalid JSON string', async ()=>{
            const record = {
                ...baseRecord,
                bodyV2: {
                    blocknote: 'not-json',
                    markdown: null
                }
            };
            const result = await handler.handle(record, 'ws-1', richTextFieldMetadata);
            expect(result).toEqual(record);
        });
        it('when blocknote parses to a non-array value', async ()=>{
            const record = {
                ...baseRecord,
                bodyV2: {
                    blocknote: '{}',
                    markdown: null
                }
            };
            const result = await handler.handle(record, 'ws-1', richTextFieldMetadata);
            expect(result).toEqual(record);
        });
        it('when blocknote has no image blocks', async ()=>{
            const record = {
                ...baseRecord,
                bodyV2: {
                    markdown: null,
                    blocknote: JSON.stringify([
                        {
                            type: 'paragraph',
                            props: {},
                            children: [
                                {
                                    text: 'Hello, world!'
                                }
                            ]
                        }
                    ])
                }
            };
            const result = await handler.handle(record, 'ws-1', richTextFieldMetadata);
            expect(result).toEqual(record);
        });
        it('when image block has external URL', async ()=>{
            const record = {
                ...baseRecord,
                bodyV2: {
                    markdown: null,
                    blocknote: JSON.stringify([
                        {
                            type: 'image',
                            props: {
                                url: 'https://external.com/image.jpg'
                            }
                        }
                    ])
                }
            };
            const result = await handler.handle(record, 'ws-1', richTextFieldMetadata);
            expect(result).toEqual(record);
        });
    });
    describe('should handle multiple RICH_TEXT fields', ()=>{
        it('when record has multiple rich text fields', async ()=>{
            const multiFieldMetadata = [
                {
                    type: _types.FieldMetadataType.RICH_TEXT,
                    name: 'bodyV2'
                },
                {
                    type: _types.FieldMetadataType.RICH_TEXT,
                    name: 'description'
                }
            ];
            const record = {
                ...baseRecord,
                bodyV2: {
                    markdown: null,
                    blocknote: JSON.stringify([
                        {
                            type: 'paragraph',
                            props: {},
                            children: [
                                {
                                    text: 'Hello'
                                }
                            ]
                        }
                    ])
                },
                description: {
                    markdown: null,
                    blocknote: '{}'
                }
            };
            const result = await handler.handle(record, 'ws-1', multiFieldMetadata);
            // bodyV2 should be unchanged (no images), description should be
            // unchanged (non-array blocknote)
            expect(result).toEqual(record);
        });
    });
});

//# sourceMappingURL=rich-text-field-query-result-getter.handler.spec.js.map