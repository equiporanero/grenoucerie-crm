"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getimapfolderpathutil = require("../get-imap-folder-path.util");
describe('getImapFolderPath', ()=>{
    it('extracts the path from a `path:uidValidity` externalId', ()=>{
        expect((0, _getimapfolderpathutil.getImapFolderPath)('INBOX.Sent:1768984533')).toBe('INBOX.Sent');
    });
    it('returns the externalId unchanged when it has no uidValidity suffix', ()=>{
        expect((0, _getimapfolderpathutil.getImapFolderPath)('INBOX')).toBe('INBOX');
    });
    it('preserves colons inside the path and only strips the trailing uidValidity', ()=>{
        expect((0, _getimapfolderpathutil.getImapFolderPath)('Foo:Bar:42')).toBe('Foo:Bar');
    });
    it('returns the externalId unchanged when the trailing segment is non-numeric', ()=>{
        expect((0, _getimapfolderpathutil.getImapFolderPath)('Project: Updates')).toBe('Project: Updates');
    });
    it('returns null for empty, null, or undefined input', ()=>{
        expect((0, _getimapfolderpathutil.getImapFolderPath)('')).toBeNull();
        expect((0, _getimapfolderpathutil.getImapFolderPath)(null)).toBeNull();
        expect((0, _getimapfolderpathutil.getImapFolderPath)(undefined)).toBeNull();
    });
});

//# sourceMappingURL=get-imap-folder-path.util.spec.js.map