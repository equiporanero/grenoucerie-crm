"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _areflatobjectmetadatanamessyncedwithlabelsutil = require("../are-flat-object-metadata-names-synced-with-labels.util");
const _twentystandardapplications = require("../../../../workspace-manager/twenty-standard-application/constants/twenty-standard-applications");
const THIRD_PARTY_BUILD_OPTIONS = {
    isSystemBuild: false,
    applicationUniversalIdentifier: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
};
const TWENTY_STANDARD_BUILD_OPTIONS = {
    isSystemBuild: false,
    applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier
};
describe('areFlatObjectMetadataNamesSyncedWithLabels', ()=>{
    it('should return true when names match computed names from labels', ()=>{
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'ticket',
                namePlural: 'tickets',
                labelSingular: 'Ticket',
                labelPlural: 'Tickets'
            },
            buildOptions: THIRD_PARTY_BUILD_OPTIONS
        });
        expect(result).toBe(true);
    });
    it('should return false when singular name does not match', ()=>{
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'wrongName',
                namePlural: 'tickets',
                labelSingular: 'Ticket',
                labelPlural: 'Tickets'
            },
            buildOptions: THIRD_PARTY_BUILD_OPTIONS
        });
        expect(result).toBe(false);
    });
    it('should return false when plural name does not match', ()=>{
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'ticket',
                namePlural: 'wrongPlural',
                labelSingular: 'Ticket',
                labelPlural: 'Tickets'
            },
            buildOptions: THIRD_PARTY_BUILD_OPTIONS
        });
        expect(result).toBe(false);
    });
    it('should apply custom suffix for reserved words when caller is a third-party app', ()=>{
        // "Event" computes to "event" which is reserved, so suffix "Custom" is appended
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'eventCustom',
                namePlural: 'eventsCustom',
                labelSingular: 'Event',
                labelPlural: 'Events'
            },
            buildOptions: THIRD_PARTY_BUILD_OPTIONS
        });
        expect(result).toBe(true);
    });
    it('should return false for reserved words without custom suffix when caller is a third-party app', ()=>{
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'event',
                namePlural: 'events',
                labelSingular: 'Event',
                labelPlural: 'Events'
            },
            buildOptions: THIRD_PARTY_BUILD_OPTIONS
        });
        expect(result).toBe(false);
    });
    it('should not apply custom suffix for reserved words when caller is the Standard app', ()=>{
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'event',
                namePlural: 'events',
                labelSingular: 'Event',
                labelPlural: 'Events'
            },
            buildOptions: TWENTY_STANDARD_BUILD_OPTIONS
        });
        expect(result).toBe(true);
    });
    it('should handle multi-word labels by computing camelCase names', ()=>{
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'supportTicket',
                namePlural: 'supportTickets',
                labelSingular: 'Support Ticket',
                labelPlural: 'Support Tickets'
            },
            buildOptions: THIRD_PARTY_BUILD_OPTIONS
        });
        expect(result).toBe(true);
    });
    it('should return false when both names do not match', ()=>{
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'foo',
                namePlural: 'bar',
                labelSingular: 'Ticket',
                labelPlural: 'Tickets'
            },
            buildOptions: THIRD_PARTY_BUILD_OPTIONS
        });
        expect(result).toBe(false);
    });
    it('should return true with complex labels', ()=>{
        const result = (0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
            flatObjectMetadata: {
                nameSingular: 'wrongCreatedatObject',
                namePlural: 'wrongCreatedatObjects',
                labelSingular: 'Wrong CreatedAt Object',
                labelPlural: 'Wrong CreatedAt Objects'
            },
            buildOptions: THIRD_PARTY_BUILD_OPTIONS
        });
        expect(result).toBe(true);
    });
});

//# sourceMappingURL=are-flat-object-metadata-names-synced-with-labels.util.spec.js.map