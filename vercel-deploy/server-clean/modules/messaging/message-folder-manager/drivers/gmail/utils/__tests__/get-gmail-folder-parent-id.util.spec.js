"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getgmailfolderparentidutil = require("../get-gmail-folder-parent-id.util");
describe('getGmailFolderParentId', ()=>{
    it('should return null for top-level folders without slash', ()=>{
        const labelNameToIdMap = new Map([
            [
                'Inbox',
                'INBOX'
            ],
            [
                'Sent',
                'SENT'
            ]
        ]);
        expect((0, _getgmailfolderparentidutil.getGmailFolderParentId)('Inbox', labelNameToIdMap)).toBeNull();
    });
    it('should return parent ID for nested folder', ()=>{
        const labelNameToIdMap = new Map([
            [
                'Work',
                'work-id'
            ],
            [
                'Work/Projects',
                'projects-id'
            ]
        ]);
        expect((0, _getgmailfolderparentidutil.getGmailFolderParentId)('Work/Projects', labelNameToIdMap)).toBe('work-id');
    });
    it('should return parent ID for deeply nested folder', ()=>{
        const labelNameToIdMap = new Map([
            [
                'Work',
                'work-id'
            ],
            [
                'Work/Projects',
                'projects-id'
            ],
            [
                'Work/Projects/2024',
                '2024-id'
            ]
        ]);
        expect((0, _getgmailfolderparentidutil.getGmailFolderParentId)('Work/Projects/2024', labelNameToIdMap)).toBe('projects-id');
    });
    it('should return null if parent folder does not exist in map', ()=>{
        const labelNameToIdMap = new Map([
            [
                'Work/Projects',
                'projects-id'
            ]
        ]);
        expect((0, _getgmailfolderparentidutil.getGmailFolderParentId)('Work/Projects', labelNameToIdMap)).toBeNull();
    });
    it('should handle Gmail-style nested labels', ()=>{
        const labelNameToIdMap = new Map([
            [
                '[Gmail]',
                'gmail-id'
            ],
            [
                '[Gmail]/Sent Mail',
                'sent-id'
            ]
        ]);
        expect((0, _getgmailfolderparentidutil.getGmailFolderParentId)('[Gmail]/Sent Mail', labelNameToIdMap)).toBe('gmail-id');
    });
});

//# sourceMappingURL=get-gmail-folder-parent-id.util.spec.js.map