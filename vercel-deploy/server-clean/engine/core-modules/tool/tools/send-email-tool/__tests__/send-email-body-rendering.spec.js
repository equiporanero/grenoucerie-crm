"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _react = require("react");
const _twentyemails = require("twenty-emails");
describe('Send Email Body Rendering', ()=>{
    describe('hardBreak node rendering', ()=>{
        it('should return valid React element for content with hardBreak', ()=>{
            const jsonWithHardBreak = {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'Hello'
                            },
                            {
                                type: 'hardBreak'
                            },
                            {
                                type: 'text',
                                text: 'World'
                            }
                        ]
                    }
                ]
            };
            const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(jsonWithHardBreak);
            expect((0, _react.isValidElement)(reactMarkup)).toBe(true);
        });
        it('should return valid React element for multiple hardBreak nodes', ()=>{
            const jsonWithMultipleBreaks = {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'Line 1'
                            },
                            {
                                type: 'hardBreak'
                            },
                            {
                                type: 'text',
                                text: 'Line 2'
                            },
                            {
                                type: 'hardBreak'
                            },
                            {
                                type: 'text',
                                text: 'Line 3'
                            }
                        ]
                    }
                ]
            };
            const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(jsonWithMultipleBreaks);
            expect((0, _react.isValidElement)(reactMarkup)).toBe(true);
        });
        it('should return valid React element for hardBreak at paragraph start', ()=>{
            const jsonWithLeadingBreak = {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'hardBreak'
                            },
                            {
                                type: 'text',
                                text: 'After break'
                            }
                        ]
                    }
                ]
            };
            const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(jsonWithLeadingBreak);
            expect((0, _react.isValidElement)(reactMarkup)).toBe(true);
        });
        it('should return valid React element for hardBreak at paragraph end', ()=>{
            const jsonWithTrailingBreak = {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'Before break'
                            },
                            {
                                type: 'hardBreak'
                            }
                        ]
                    }
                ]
            };
            const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(jsonWithTrailingBreak);
            expect((0, _react.isValidElement)(reactMarkup)).toBe(true);
        });
        it('should return valid React element for paragraph with only hardBreak', ()=>{
            const jsonWithOnlyBreak = {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'hardBreak'
                            }
                        ]
                    }
                ]
            };
            const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(jsonWithOnlyBreak);
            expect((0, _react.isValidElement)(reactMarkup)).toBe(true);
        });
        it('should include br element in the rendered output', ()=>{
            const jsonWithHardBreak = {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'Hello'
                            },
                            {
                                type: 'hardBreak'
                            },
                            {
                                type: 'text',
                                text: 'World'
                            }
                        ]
                    }
                ]
            };
            const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(jsonWithHardBreak);
            const findBrElements = (element)=>{
                if (!element || typeof element !== 'object') return false;
                if (element.type === 'br') return true;
                const children = element.props?.children;
                if (!children) return false;
                if (Array.isArray(children)) {
                    return children.some((child)=>(0, _react.isValidElement)(child) && findBrElements(child));
                }
                if ((0, _react.isValidElement)(children)) {
                    return findBrElements(children);
                }
                return false;
            };
            expect(findBrElements(reactMarkup)).toBe(true);
        });
    });
    describe('mixed content rendering', ()=>{
        it('should return valid React element for hardBreak with other nodes', ()=>{
            const mixedContent = {
                type: 'doc',
                content: [
                    {
                        type: 'heading',
                        attrs: {
                            level: 1
                        },
                        content: [
                            {
                                type: 'text',
                                text: 'Title'
                            }
                        ]
                    },
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'First line'
                            },
                            {
                                type: 'hardBreak'
                            },
                            {
                                type: 'text',
                                text: 'Second line'
                            }
                        ]
                    }
                ]
            };
            const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(mixedContent);
            expect((0, _react.isValidElement)(reactMarkup)).toBe(true);
        });
    });
    describe('plain text fallback', ()=>{
        it('should handle plain string input', ()=>{
            const plainText = 'This is plain text';
            const reactMarkup = (0, _twentyemails.reactMarkupFromJSON)(plainText);
            expect(reactMarkup).toBe(plainText);
        });
    });
});

//# sourceMappingURL=send-email-body-rendering.spec.js.map