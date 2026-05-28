"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _uuid = require("uuid");
const _commandmenuitemavailabilitytypeenum = require("../../../command-menu-item/enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../../../command-menu-item/enums/engine-component-key.enum");
const _buildnavigationflatcommandmenuitemutil = require("../build-navigation-flat-command-menu-item.util");
const _twentystandardapplications = require("../../../../workspace-manager/twenty-standard-application/constants/twenty-standard-applications");
const NAVIGATION_COMMAND_UUID_NAMESPACE = 'b31830da-2ae0-48eb-a915-12fa4ab96dd3';
const baseObjectMetadata = {
    id: 'obj-id-1',
    universalIdentifier: 'obj-universal-1',
    nameSingular: 'person',
    shortcut: 'P'
};
const baseArgs = {
    objectMetadata: baseObjectMetadata,
    commandMenuItemId: 'cmd-id-1',
    applicationId: 'app-id-1',
    workspaceId: 'ws-id-1',
    position: 5,
    now: '2026-01-01T00:00:00.000Z'
};
describe('buildNavigationFlatCommandMenuItem', ()=>{
    it('should produce a deterministic universalIdentifier via UUID v5', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        const expectedUniversalIdentifier = (0, _uuid.v5)(baseObjectMetadata.universalIdentifier, NAVIGATION_COMMAND_UUID_NAMESPACE);
        expect(result.universalIdentifier).toBe(expectedUniversalIdentifier);
    });
    it('should set label and shortLabel as interpolation templates', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.label).toBe(_buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_LABEL);
        expect(result.shortLabel).toBe(_buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_SHORT_LABEL);
    });
    it('should set icon as interpolation template', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.icon).toBe(_buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_ICON);
    });
    it('should set payload with objectMetadataItemId', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.payload).toEqual({
            objectMetadataItemId: 'obj-id-1'
        });
    });
    it('should include shortcut in hotKeys when shortcut is defined', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.hotKeys).toEqual([
            'G',
            'P'
        ]);
    });
    it('should set hotKeys to null when shortcut is null', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)({
            ...baseArgs,
            objectMetadata: {
                ...baseObjectMetadata,
                shortcut: null
            }
        });
        expect(result.hotKeys).toBeNull();
    });
    it('should use the provided id, applicationId, workspaceId, and position', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.id).toBe('cmd-id-1');
        expect(result.applicationId).toBe('app-id-1');
        expect(result.workspaceId).toBe('ws-id-1');
        expect(result.position).toBe(5);
    });
    it('should set applicationUniversalIdentifier from TWENTY_STANDARD_APPLICATION', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.applicationUniversalIdentifier).toBe(_twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier);
    });
    it('should set engineComponentKey to NAVIGATION', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.engineComponentKey).toBe(_enginecomponentkeyenum.EngineComponentKey.NAVIGATION);
    });
    it('should set availabilityType to GLOBAL', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.availabilityType).toBe(_commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL);
    });
    it('should set conditionalAvailabilityExpression based on nameSingular', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.conditionalAvailabilityExpression).toBe('targetObjectReadPermissions.person');
    });
    it('should set isPinned to false', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.isPinned).toBe(false);
    });
    it('should set null fields correctly', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.frontComponentId).toBeNull();
        expect(result.frontComponentUniversalIdentifier).toBeNull();
        expect(result.workflowVersionId).toBeNull();
        expect(result.availabilityObjectMetadataId).toBeNull();
        expect(result.availabilityObjectMetadataUniversalIdentifier).toBeNull();
    });
    it('should set createdAt and updatedAt from the now parameter', ()=>{
        const result = (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)(baseArgs);
        expect(result.createdAt).toBe('2026-01-01T00:00:00.000Z');
        expect(result.updatedAt).toBe('2026-01-01T00:00:00.000Z');
    });
});

//# sourceMappingURL=build-navigation-flat-command-menu-item.util.test.js.map