"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _fromviewsortmanifesttouniversalflatviewsortutil = require("../from-view-sort-manifest-to-universal-flat-view-sort.util");
describe('fromViewSortManifestToUniversalFlatViewSort', ()=>{
    const now = '2026-01-01T00:00:00.000Z';
    const applicationUniversalIdentifier = 'app-uuid-1';
    const viewUniversalIdentifier = 'view-uuid-1';
    it('should convert a view sort manifest with ASC direction', ()=>{
        const result = (0, _fromviewsortmanifesttouniversalflatviewsortutil.fromViewSortManifestToUniversalFlatViewSort)({
            viewSortManifest: {
                universalIdentifier: 'vsort-uuid-1',
                fieldMetadataUniversalIdentifier: 'field-uuid-1',
                direction: _types.ViewSortDirection.ASC
            },
            viewUniversalIdentifier,
            applicationUniversalIdentifier,
            now
        });
        expect(result.universalIdentifier).toBe('vsort-uuid-1');
        expect(result.fieldMetadataUniversalIdentifier).toBe('field-uuid-1');
        expect(result.viewUniversalIdentifier).toBe(viewUniversalIdentifier);
        expect(result.applicationUniversalIdentifier).toBe(applicationUniversalIdentifier);
        expect(result.direction).toBe(_types.ViewSortDirection.ASC);
        expect(result.createdAt).toBe(now);
        expect(result.updatedAt).toBe(now);
        expect(result.deletedAt).toBeNull();
    });
    it('should convert a view sort manifest with DESC direction', ()=>{
        const result = (0, _fromviewsortmanifesttouniversalflatviewsortutil.fromViewSortManifestToUniversalFlatViewSort)({
            viewSortManifest: {
                universalIdentifier: 'vsort-uuid-2',
                fieldMetadataUniversalIdentifier: 'field-uuid-2',
                direction: _types.ViewSortDirection.DESC
            },
            viewUniversalIdentifier,
            applicationUniversalIdentifier,
            now
        });
        expect(result.direction).toBe(_types.ViewSortDirection.DESC);
    });
});

//# sourceMappingURL=from-view-sort-manifest-to-universal-flat-view-sort.util.spec.js.map