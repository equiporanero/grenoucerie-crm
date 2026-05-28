"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _extractobjectsingularnamefromtargetcolumnnameutil = require("../extract-object-singular-name-from-target-column-name.util");
describe('extractObjectSingularNameFromTargetColumnName', ()=>{
    it('should extract "person" from "targetPersonId"', ()=>{
        expect((0, _extractobjectsingularnamefromtargetcolumnnameutil.extractObjectSingularNameFromTargetColumnName)('targetPersonId')).toBe('person');
    });
    it('should extract "arrowTarget" from "targetArrowTargetId"', ()=>{
        expect((0, _extractobjectsingularnamefromtargetcolumnnameutil.extractObjectSingularNameFromTargetColumnName)('targetArrowTargetId')).toBe('arrowTarget');
    });
    it('should extract "idCard" from "targetIdCardId"', ()=>{
        expect((0, _extractobjectsingularnamefromtargetcolumnnameutil.extractObjectSingularNameFromTargetColumnName)('targetIdCardId')).toBe('idCard');
    });
    it('should extract "cardId" from "targetCardIdId"', ()=>{
        expect((0, _extractobjectsingularnamefromtargetcolumnnameutil.extractObjectSingularNameFromTargetColumnName)('targetCardIdId')).toBe('cardId');
    });
});

//# sourceMappingURL=extract-object-singular-name-from-target-column-name.util.spec.js.map