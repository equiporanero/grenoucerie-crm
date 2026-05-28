"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _googleapissetrequestextraparamsutil = require("../google-apis-set-request-extra-params.util");
describe('googleApisSetRequestExtraParams', ()=>{
    it('should set request extra params', ()=>{
        const request = {
            params: {}
        };
        (0, _googleapissetrequestextraparamsutil.setRequestExtraParams)(request, {
            transientToken: 'abc',
            redirectLocation: '/test',
            calendarVisibility: _types.CalendarChannelVisibility.SHARE_EVERYTHING,
            messageVisibility: _types.MessageChannelVisibility.SHARE_EVERYTHING
        });
        expect(request.params).toEqual({
            transientToken: 'abc',
            redirectLocation: '/test',
            calendarVisibility: _types.CalendarChannelVisibility.SHARE_EVERYTHING,
            messageVisibility: _types.MessageChannelVisibility.SHARE_EVERYTHING
        });
    });
    it('should throw error if transientToken is not provided', ()=>{
        const request = {
            params: {}
        };
        expect(()=>{
            (0, _googleapissetrequestextraparamsutil.setRequestExtraParams)(request, {
                redirectLocation: '/test',
                calendarVisibility: _types.CalendarChannelVisibility.SHARE_EVERYTHING,
                messageVisibility: _types.MessageChannelVisibility.SHARE_EVERYTHING
            });
        }).toThrow('transientToken is required');
    });
});

//# sourceMappingURL=google-apis-set-request-extra-params.util.spec.js.map