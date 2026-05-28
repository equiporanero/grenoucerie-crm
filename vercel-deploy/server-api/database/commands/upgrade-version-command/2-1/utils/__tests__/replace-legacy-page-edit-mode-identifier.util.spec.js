"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _replacelegacypageeditmodeidentifierutil = require("../replace-legacy-page-edit-mode-identifier.util");
describe('replaceLegacyPageEditModeIdentifier', ()=>{
    it('should replace the legacy edit-mode variable', ()=>{
        expect((0, _replacelegacypageeditmodeidentifierutil.replaceLegacyPageEditModeIdentifier)('pageType == "RECORD_PAGE" and not isPageInEditMode')).toBe('((pageType == "RECORD_PAGE") and ((not isDashboardPageLayoutInEditMode)))');
    });
    it('should replace the legacy variable in function arguments', ()=>{
        expect((0, _replacelegacypageeditmodeidentifierutil.replaceLegacyPageEditModeIdentifier)('someEquals(selectedRecords, "status", isPageInEditMode)')).toBe('someEquals(selectedRecords, "status", isDashboardPageLayoutInEditMode)');
    });
    it('should replace every legacy variable occurrence', ()=>{
        expect((0, _replacelegacypageeditmodeidentifierutil.replaceLegacyPageEditModeIdentifier)('isPageInEditMode and not isPageInEditMode')).toBe('(isDashboardPageLayoutInEditMode and ((not isDashboardPageLayoutInEditMode)))');
    });
    it('should not replace string literals', ()=>{
        const conditionalAvailabilityExpression = 'objectMetadataItem.nameSingular == "isPageInEditMode"';
        expect((0, _replacelegacypageeditmodeidentifierutil.replaceLegacyPageEditModeIdentifier)(conditionalAvailabilityExpression)).toBe(conditionalAvailabilityExpression);
    });
    it('should not replace member access', ()=>{
        const conditionalAvailabilityExpression = 'objectMetadataItem.isPageInEditMode';
        expect((0, _replacelegacypageeditmodeidentifierutil.replaceLegacyPageEditModeIdentifier)(conditionalAvailabilityExpression)).toBe(conditionalAvailabilityExpression);
    });
    it('should leave invalid expressions untouched', ()=>{
        const conditionalAvailabilityExpression = 'isPageInEditMode and (';
        expect((0, _replacelegacypageeditmodeidentifierutil.replaceLegacyPageEditModeIdentifier)(conditionalAvailabilityExpression)).toBe(conditionalAvailabilityExpression);
    });
    it('should return null when expression is null', ()=>{
        expect((0, _replacelegacypageeditmodeidentifierutil.replaceLegacyPageEditModeIdentifier)(null)).toBeNull();
    });
});

//# sourceMappingURL=replace-legacy-page-edit-mode-identifier.util.spec.js.map