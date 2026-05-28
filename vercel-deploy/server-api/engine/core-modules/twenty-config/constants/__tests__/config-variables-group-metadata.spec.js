"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _configvariablesgroupmetadata = require("../config-variables-group-metadata");
const _configvariablesgroupenum = require("../../enums/config-variables-group.enum");
describe('CONFIG_VARIABLES_GROUP_METADATA', ()=>{
    it('should include all ConfigVariablesGroup enum values', ()=>{
        const enumValues = Object.values(_configvariablesgroupenum.ConfigVariablesGroup);
        const metadataKeys = Object.keys(_configvariablesgroupmetadata.CONFIG_VARIABLES_GROUP_METADATA);
        enumValues.forEach((enumValue)=>{
            expect(metadataKeys).toContain(enumValue);
        });
        metadataKeys.forEach((key)=>{
            expect(enumValues).toContain(key);
        });
        expect(enumValues.length).toBe(metadataKeys.length);
    });
    it('should have unique position values', ()=>{
        const positions = Object.values(_configvariablesgroupmetadata.CONFIG_VARIABLES_GROUP_METADATA).map((metadata)=>metadata.position);
        const uniquePositions = new Set(positions);
        expect(positions.length).toBe(uniquePositions.size);
    });
});

//# sourceMappingURL=config-variables-group-metadata.spec.js.map