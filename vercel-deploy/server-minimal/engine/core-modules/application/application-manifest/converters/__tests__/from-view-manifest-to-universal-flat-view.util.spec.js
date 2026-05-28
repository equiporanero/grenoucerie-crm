"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _fromviewmanifesttouniversalflatviewutil = require("../from-view-manifest-to-universal-flat-view.util");
describe('fromViewManifestToUniversalFlatView', ()=>{
    const now = '2026-01-01T00:00:00.000Z';
    const applicationUniversalIdentifier = 'app-uuid-1';
    it('should convert a minimal view manifest to universal flat view', ()=>{
        const result = (0, _fromviewmanifesttouniversalflatviewutil.fromViewManifestToUniversalFlatView)({
            viewManifest: {
                universalIdentifier: 'view-uuid-1',
                name: 'All Records',
                objectUniversalIdentifier: 'object-uuid-1',
                key: _types.ViewKey.INDEX
            },
            applicationUniversalIdentifier,
            now
        });
        expect(result.universalIdentifier).toBe('view-uuid-1');
        expect(result.applicationUniversalIdentifier).toBe(applicationUniversalIdentifier);
        expect(result.name).toBe('All Records');
        expect(result.objectMetadataUniversalIdentifier).toBe('object-uuid-1');
        expect(result.type).toBe(_types.ViewType.TABLE);
        expect(result.icon).toBe('IconList');
        expect(result.position).toBe(0);
        expect(result.isCompact).toBe(false);
        expect(result.isCustom).toBe(true);
        expect(result.visibility).toBe(_types.ViewVisibility.WORKSPACE);
        expect(result.openRecordIn).toBe(_types.ViewOpenRecordIn.SIDE_PANEL);
        expect(result.key).toBe(_types.ViewKey.INDEX);
        expect(result.createdAt).toBe(now);
        expect(result.updatedAt).toBe(now);
    });
    it('should respect explicit values from the manifest', ()=>{
        const result = (0, _fromviewmanifesttouniversalflatviewutil.fromViewManifestToUniversalFlatView)({
            viewManifest: {
                universalIdentifier: 'view-uuid-2',
                name: 'Kanban Board',
                objectUniversalIdentifier: 'object-uuid-1',
                type: _types.ViewType.KANBAN,
                icon: 'IconLayoutKanban',
                position: 3,
                isCompact: true,
                visibility: _types.ViewVisibility.UNLISTED,
                openRecordIn: _types.ViewOpenRecordIn.RECORD_PAGE
            },
            applicationUniversalIdentifier,
            now
        });
        expect(result.type).toBe(_types.ViewType.KANBAN);
        expect(result.icon).toBe('IconLayoutKanban');
        expect(result.position).toBe(3);
        expect(result.isCompact).toBe(true);
        expect(result.visibility).toBe(_types.ViewVisibility.UNLISTED);
        expect(result.openRecordIn).toBe(_types.ViewOpenRecordIn.RECORD_PAGE);
    });
    it('should preserve kanban fields from the manifest', ()=>{
        const result = (0, _fromviewmanifesttouniversalflatviewutil.fromViewManifestToUniversalFlatView)({
            viewManifest: {
                universalIdentifier: 'view-uuid-3',
                name: 'Kanban Board',
                objectUniversalIdentifier: 'object-uuid-1',
                type: _types.ViewType.KANBAN,
                mainGroupByFieldMetadataUniversalIdentifier: 'field-uuid-status',
                kanbanAggregateOperation: _types.AggregateOperations.COUNT,
                kanbanAggregateOperationFieldMetadataUniversalIdentifier: 'field-uuid-amount'
            },
            applicationUniversalIdentifier,
            now
        });
        expect(result.mainGroupByFieldMetadataUniversalIdentifier).toBe('field-uuid-status');
        expect(result.kanbanAggregateOperation).toBe(_types.AggregateOperations.COUNT);
        expect(result.kanbanAggregateOperationFieldMetadataUniversalIdentifier).toBe('field-uuid-amount');
    });
    it('should default kanban and calendar fields to null when omitted', ()=>{
        const result = (0, _fromviewmanifesttouniversalflatviewutil.fromViewManifestToUniversalFlatView)({
            viewManifest: {
                universalIdentifier: 'view-uuid-4',
                name: 'All Records',
                objectUniversalIdentifier: 'object-uuid-1'
            },
            applicationUniversalIdentifier,
            now
        });
        expect(result.mainGroupByFieldMetadataUniversalIdentifier).toBeNull();
        expect(result.kanbanAggregateOperation).toBeNull();
        expect(result.kanbanAggregateOperationFieldMetadataUniversalIdentifier).toBeNull();
        expect(result.calendarLayout).toBeNull();
        expect(result.calendarFieldMetadataUniversalIdentifier).toBeNull();
    });
    it('should preserve calendar fields from the manifest', ()=>{
        const result = (0, _fromviewmanifesttouniversalflatviewutil.fromViewManifestToUniversalFlatView)({
            viewManifest: {
                universalIdentifier: 'view-uuid-5',
                name: 'Calendar View',
                objectUniversalIdentifier: 'object-uuid-1',
                type: _types.ViewType.CALENDAR,
                calendarLayout: _types.ViewCalendarLayout.WEEK,
                calendarFieldMetadataUniversalIdentifier: 'field-uuid-date'
            },
            applicationUniversalIdentifier,
            now
        });
        expect(result.calendarLayout).toBe(_types.ViewCalendarLayout.WEEK);
        expect(result.calendarFieldMetadataUniversalIdentifier).toBe('field-uuid-date');
    });
});

//# sourceMappingURL=from-view-manifest-to-universal-flat-view.util.spec.js.map