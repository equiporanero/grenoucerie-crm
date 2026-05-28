"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _constants = require("twenty-shared/constants");
const _frompagelayoutwidgetmanifesttouniversalflatpagelayoutwidgetutil = require("../from-page-layout-widget-manifest-to-universal-flat-page-layout-widget.util");
const _widgettypeenum = require("../../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
describe('fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget', ()=>{
    const now = '2026-01-01T00:00:00.000Z';
    const applicationUniversalIdentifier = 'app-uuid-1';
    const pageLayoutTabUniversalIdentifier = 'tab-uuid-1';
    it('should convert a minimal page layout widget manifest', ()=>{
        const result = (0, _frompagelayoutwidgetmanifesttouniversalflatpagelayoutwidgetutil.fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget)({
            pageLayoutWidgetManifest: {
                universalIdentifier: 'widget-uuid-1',
                title: 'My Widget',
                type: _widgettypeenum.WidgetType.VIEW,
                configuration: {
                    configurationType: 'VIEW'
                }
            },
            pageLayoutTabUniversalIdentifier,
            applicationUniversalIdentifier,
            now
        });
        expect(result.universalIdentifier).toBe('widget-uuid-1');
        expect(result.applicationUniversalIdentifier).toBe(applicationUniversalIdentifier);
        expect(result.pageLayoutTabUniversalIdentifier).toBe(pageLayoutTabUniversalIdentifier);
        expect(result.title).toBe('My Widget');
        expect(result.type).toBe(_widgettypeenum.WidgetType.VIEW);
        expect(result.objectMetadataUniversalIdentifier).toBeNull();
        expect(result.conditionalDisplay).toBeNull();
        expect(result.gridPosition).toEqual({
            row: 0,
            column: 0,
            rowSpan: _constants.DEFAULT_WIDGET_SIZE.default.h,
            columnSpan: _constants.DEFAULT_WIDGET_SIZE.default.w
        });
        expect(result.position).toBeNull();
        expect(result.universalConfiguration).toEqual({
            configurationType: 'VIEW'
        });
    });
    it('should convert a fully specified page layout widget manifest', ()=>{
        const result = (0, _frompagelayoutwidgetmanifesttouniversalflatpagelayoutwidgetutil.fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget)({
            pageLayoutWidgetManifest: {
                universalIdentifier: 'widget-uuid-2',
                title: 'Iframe Widget',
                type: 'IFRAME',
                objectUniversalIdentifier: 'obj-uuid-1',
                configuration: {
                    configurationType: 'IFRAME',
                    url: 'https://example.com'
                }
            },
            pageLayoutTabUniversalIdentifier,
            applicationUniversalIdentifier,
            now
        });
        expect(result.title).toBe('Iframe Widget');
        expect(result.type).toBe('IFRAME');
        expect(result.objectMetadataUniversalIdentifier).toBe('obj-uuid-1');
        expect(result.gridPosition).toEqual({
            row: 0,
            column: 0,
            rowSpan: _constants.DEFAULT_WIDGET_SIZE.default.h,
            columnSpan: _constants.DEFAULT_WIDGET_SIZE.default.w
        });
        expect(result.universalConfiguration).toEqual({
            configurationType: 'IFRAME',
            url: 'https://example.com'
        });
    });
    it('should use manifest gridPosition when provided', ()=>{
        const result = (0, _frompagelayoutwidgetmanifesttouniversalflatpagelayoutwidgetutil.fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget)({
            pageLayoutWidgetManifest: {
                universalIdentifier: 'widget-uuid-3',
                title: 'Positioned Widget',
                type: _widgettypeenum.WidgetType.GRAPH,
                gridPosition: {
                    row: 2,
                    column: 6,
                    rowSpan: 4,
                    columnSpan: 6
                },
                configuration: {
                    configurationType: 'VIEW'
                }
            },
            pageLayoutTabUniversalIdentifier,
            applicationUniversalIdentifier,
            now
        });
        expect(result.gridPosition).toEqual({
            row: 2,
            column: 6,
            rowSpan: 4,
            columnSpan: 6
        });
    });
});

//# sourceMappingURL=from-page-layout-widget-manifest-to-universal-flat-page-layout-widget.util.spec.js.map