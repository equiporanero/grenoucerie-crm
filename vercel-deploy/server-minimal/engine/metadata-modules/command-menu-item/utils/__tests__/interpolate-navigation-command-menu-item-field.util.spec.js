"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _commandmenuitemavailabilitytypeenum = require("../../enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../../enums/engine-component-key.enum");
const _interpolatenavigationcommandmenuitemfieldutil = require("../interpolate-navigation-command-menu-item-field.util");
const _buildnavigationflatcommandmenuitemutil = require("../../../flat-command-menu-item/utils/build-navigation-flat-command-menu-item.util");
const mockI18nInstance = {
    _: (messageId)=>messageId
};
const mockObjectMetadata = {
    id: 'obj-id-1',
    labelPlural: 'People',
    labelSingular: 'Person',
    description: 'A person',
    icon: 'IconUser',
    isCustom: false,
    standardOverrides: undefined
};
const baseCommandMenuItem = {
    id: 'cmd-id-1',
    engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.NAVIGATION,
    label: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_LABEL,
    shortLabel: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_SHORT_LABEL,
    icon: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_ICON,
    position: 1,
    isPinned: false,
    availabilityType: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL,
    payload: {
        objectMetadataItemId: 'obj-id-1'
    },
    workspaceId: 'ws-id-1',
    createdAt: new Date(),
    updatedAt: new Date()
};
describe('interpolateNavigationCommandMenuItemField', ()=>{
    it('should resolve label template for NAVIGATION items', ()=>{
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: baseCommandMenuItem,
            fieldName: 'label',
            objectMetadata: mockObjectMetadata,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe('Go to People');
    });
    it('should resolve shortLabel template for NAVIGATION items', ()=>{
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: baseCommandMenuItem,
            fieldName: 'shortLabel',
            objectMetadata: mockObjectMetadata,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe('People');
    });
    it('should resolve icon template for NAVIGATION items', ()=>{
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: baseCommandMenuItem,
            fieldName: 'icon',
            objectMetadata: mockObjectMetadata,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe('IconUser');
    });
    it('should return raw label for non-NAVIGATION items', ()=>{
        const nonNavigationItem = {
            ...baseCommandMenuItem,
            engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.CREATE_NEW_RECORD,
            payload: undefined,
            label: 'Create New Record'
        };
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: nonNavigationItem,
            fieldName: 'label',
            objectMetadata: null,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe('Create New Record');
    });
    it('should return undefined when object metadata is null for a NAVIGATION item', ()=>{
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: baseCommandMenuItem,
            fieldName: 'label',
            objectMetadata: null,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBeUndefined();
    });
    it('should return undefined for undefined shortLabel', ()=>{
        const itemWithoutShortLabel = {
            ...baseCommandMenuItem,
            shortLabel: undefined
        };
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: itemWithoutShortLabel,
            fieldName: 'shortLabel',
            objectMetadata: mockObjectMetadata,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBeUndefined();
    });
    it('should resolve label for custom object metadata', ()=>{
        const customObjectMetadata = {
            ...mockObjectMetadata,
            isCustom: true,
            labelPlural: 'Custom Objects',
            icon: 'IconCustom'
        };
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: baseCommandMenuItem,
            fieldName: 'label',
            objectMetadata: customObjectMetadata,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe('Go to Custom Objects');
    });
    it('should resolve icon for custom object metadata', ()=>{
        const customObjectMetadata = {
            ...mockObjectMetadata,
            isCustom: true,
            icon: 'IconCustom'
        };
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: baseCommandMenuItem,
            fieldName: 'icon',
            objectMetadata: customObjectMetadata,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe('IconCustom');
    });
    it('should return raw value when payload has no objectMetadataItemId', ()=>{
        const itemWithPathPayload = {
            ...baseCommandMenuItem,
            payload: {
                path: '/settings/profile'
            }
        };
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: itemWithPathPayload,
            fieldName: 'label',
            objectMetadata: null,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe(_buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_LABEL);
    });
    it('should return literal label as-is when it has no template variables', ()=>{
        const itemWithLiteralLabel = {
            ...baseCommandMenuItem,
            label: 'Go to People'
        };
        const result = (0, _interpolatenavigationcommandmenuitemfieldutil.interpolateNavigationCommandMenuItemField)({
            commandMenuItem: itemWithLiteralLabel,
            fieldName: 'label',
            objectMetadata: mockObjectMetadata,
            locale: undefined,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe('Go to People');
    });
});

//# sourceMappingURL=interpolate-navigation-command-menu-item-field.util.spec.js.map