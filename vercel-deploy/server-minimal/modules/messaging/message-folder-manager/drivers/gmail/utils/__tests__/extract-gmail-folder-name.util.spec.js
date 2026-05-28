"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _extractgmailfoldernameutil = require("../extract-gmail-folder-name.util");
describe('extractGmailFolderName', ()=>{
    it('should return full name for top-level folders', ()=>{
        expect((0, _extractgmailfoldernameutil.extractGmailFolderName)('Inbox')).toBe('Inbox');
        expect((0, _extractgmailfoldernameutil.extractGmailFolderName)('Sent')).toBe('Sent');
    });
    it('should extract folder name from nested folder', ()=>{
        expect((0, _extractgmailfoldernameutil.extractGmailFolderName)('Work/Projects')).toBe('Projects');
    });
    it('should extract folder name from deeply nested folder', ()=>{
        expect((0, _extractgmailfoldernameutil.extractGmailFolderName)('Work/Projects/2024')).toBe('2024');
    });
    it('should handle Gmail-style nested labels', ()=>{
        expect((0, _extractgmailfoldernameutil.extractGmailFolderName)('[Gmail]/Sent Mail')).toBe('Sent Mail');
    });
    it('should handle single character names', ()=>{
        expect((0, _extractgmailfoldernameutil.extractGmailFolderName)('A/B/C')).toBe('C');
    });
    it('should handle special characters', ()=>{
        expect((0, _extractgmailfoldernameutil.extractGmailFolderName)('Work/Client - ABC Corp')).toBe('Client - ABC Corp');
    });
});

//# sourceMappingURL=extract-gmail-folder-name.util.spec.js.map