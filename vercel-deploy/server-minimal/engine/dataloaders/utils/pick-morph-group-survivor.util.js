"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pickMorphGroupSurvivor", {
    enumerable: true,
    get: function() {
        return pickMorphGroupSurvivor;
    }
});
// Prefers active non-system fields (standard targets) over system ones
// (auto-created for custom objects). Smallest id breaks ties.
const scoreMorphField = (field)=>(field.isActive ? 2 : 0) + (field.isSystem ? 0 : 1);
const pickMorphGroupSurvivor = (group)=>{
    return group.reduce((best, current)=>{
        const diff = scoreMorphField(current) - scoreMorphField(best);
        return diff > 0 || diff === 0 && current.id < best.id ? current : best;
    });
};

//# sourceMappingURL=pick-morph-group-survivor.util.js.map