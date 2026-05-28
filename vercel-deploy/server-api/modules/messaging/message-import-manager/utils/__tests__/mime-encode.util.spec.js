"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _mimeencodeutil = require("../mime-encode.util");
describe('mimeEncode', ()=>{
    it('should encode properly', ()=>{
        expect((0, _mimeencodeutil.mimeEncode)('test-accents-é-è-ê-ë')).toBe('=?UTF-8?B?dGVzdC1hY2NlbnRzLcOpLcOoLcOqLcOr?=');
    });
});

//# sourceMappingURL=mime-encode.util.spec.js.map