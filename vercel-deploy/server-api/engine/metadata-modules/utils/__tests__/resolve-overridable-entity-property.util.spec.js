"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _resolveoverridableentitypropertyutil = require("../resolve-overridable-entity-property.util");
describe('resolveOverridableEntityProperty', ()=>{
    it('should return override value when override exists for the property', ()=>{
        const entity = {
            title: 'Base Title',
            position: 0,
            icon: null,
            overrides: {
                title: 'Overridden Title'
            }
        };
        expect((0, _resolveoverridableentitypropertyutil.resolveOverridableEntityProperty)(entity, 'title')).toBe('Overridden Title');
    });
    it('should return base value when overrides is null', ()=>{
        const entity = {
            title: 'Base Title',
            position: 0,
            icon: null,
            overrides: null
        };
        expect((0, _resolveoverridableentitypropertyutil.resolveOverridableEntityProperty)(entity, 'title')).toBe('Base Title');
    });
    it('should return base value when overrides exist but not for the requested property', ()=>{
        const entity = {
            title: 'Base Title',
            position: 0,
            icon: null,
            overrides: {
                position: 5
            }
        };
        expect((0, _resolveoverridableentitypropertyutil.resolveOverridableEntityProperty)(entity, 'title')).toBe('Base Title');
    });
    it('should return base value when overrides is undefined', ()=>{
        const entity = {
            title: 'Base Title',
            position: 0,
            icon: null,
            overrides: undefined
        };
        expect((0, _resolveoverridableentitypropertyutil.resolveOverridableEntityProperty)(entity, 'title')).toBe('Base Title');
    });
    it('should return null when override explicitly sets a nullable property to null', ()=>{
        const entity = {
            title: 'Base Title',
            position: 0,
            icon: 'IconStar',
            overrides: {
                icon: null
            }
        };
        expect((0, _resolveoverridableentitypropertyutil.resolveOverridableEntityProperty)(entity, 'icon')).toBeNull();
    });
});

//# sourceMappingURL=resolve-overridable-entity-property.util.spec.js.map