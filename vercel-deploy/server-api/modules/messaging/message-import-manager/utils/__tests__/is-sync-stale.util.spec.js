"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _messagingimportongoingsynctimeoutconstant = require("../../constants/messaging-import-ongoing-sync-timeout.constant");
const _issyncstaleutil = require("../is-sync-stale.util");
jest.useFakeTimers().setSystemTime(new Date('2024-01-01'));
describe('isSyncStale', ()=>{
    it('should return true if sync is stale', ()=>{
        const syncStageStartedAt = new Date(Date.now() - _messagingimportongoingsynctimeoutconstant.MESSAGING_IMPORT_ONGOING_SYNC_TIMEOUT - 1).toISOString();
        const result = (0, _issyncstaleutil.isSyncStale)(syncStageStartedAt);
        expect(result).toBe(true);
    });
    it('should return false if sync is not stale', ()=>{
        const syncStageStartedAt = new Date(Date.now() - _messagingimportongoingsynctimeoutconstant.MESSAGING_IMPORT_ONGOING_SYNC_TIMEOUT + 1).toISOString();
        const result = (0, _issyncstaleutil.isSyncStale)(syncStageStartedAt);
        expect(result).toBe(false);
    });
    it('should return true if syncStageStartedAt is undefined', ()=>{
        const result = (0, _issyncstaleutil.isSyncStale)(undefined);
        expect(result).toBe(true);
    });
    it('should return true if syncStageStartedAt is null', ()=>{
        const result = (0, _issyncstaleutil.isSyncStale)(null);
        expect(result).toBe(true);
    });
    it('should throw an error if syncStageStartedAt is invalid', ()=>{
        const syncStageStartedAt = 'invalid-date';
        expect(()=>{
            (0, _issyncstaleutil.isSyncStale)(syncStageStartedAt);
        }).toThrow('Invalid date format');
    });
});

//# sourceMappingURL=is-sync-stale.util.spec.js.map