"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _translations = require("twenty-shared/translations");
const _enginecomponentkeyenum = require("../../../../metadata-modules/command-menu-item/enums/engine-component-key.enum");
const _buildnavigationflatcommandmenuitemutil = require("../../../../metadata-modules/flat-command-menu-item/utils/build-navigation-flat-command-menu-item.util");
const _enrichcommandmenuitemeventwithresolvednavigationutil = require("../enrich-command-menu-item-event-with-resolved-navigation.util");
const mockI18nInstance = {
    _: (messageId)=>messageId
};
const OBJECT_METADATA_ID = 'obj-id-1';
const makeFlatObjectMetadata = (overrides)=>({
        id: OBJECT_METADATA_ID,
        universalIdentifier: 'obj-uid-1',
        workspaceId: 'ws-1',
        applicationId: 'app-1',
        labelPlural: 'People',
        labelSingular: 'Person',
        icon: 'IconUser',
        isCustom: false,
        standardOverrides: null,
        ...overrides
    });
const makeFlatObjectMetadataMaps = (flatObjectMetadata)=>({
        byUniversalIdentifier: {
            [flatObjectMetadata.universalIdentifier]: flatObjectMetadata
        },
        universalIdentifierById: {
            [flatObjectMetadata.id]: flatObjectMetadata.universalIdentifier
        },
        universalIdentifiersByApplicationId: {}
    });
const makeNavigationRecord = (overrides)=>({
        id: 'cmd-id-1',
        engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.NAVIGATION,
        label: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_LABEL,
        shortLabel: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_SHORT_LABEL,
        icon: _buildnavigationflatcommandmenuitemutil.NAVIGATION_INTERPOLATED_ICON,
        payload: {
            objectMetadataItemId: OBJECT_METADATA_ID
        },
        position: 1,
        isPinned: false,
        ...overrides
    });
describe('enrichCommandMenuItemEventWithResolvedNavigation', ()=>{
    it('should resolve label, shortLabel, and icon templates for NAVIGATION items', ()=>{
        const flatObjectMetadata = makeFlatObjectMetadata();
        const flatObjectMetadataMaps = makeFlatObjectMetadataMaps(flatObjectMetadata);
        const record = makeNavigationRecord();
        const result = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
            record,
            flatObjectMetadataMaps,
            locale: _translations.SOURCE_LOCALE,
            i18nInstance: mockI18nInstance
        });
        expect(result.label).toBe('Go to People');
        expect(result.shortLabel).toBe('People');
        expect(result.icon).toBe('IconUser');
    });
    it('should return record unchanged for non-NAVIGATION items', ()=>{
        const flatObjectMetadata = makeFlatObjectMetadata();
        const flatObjectMetadataMaps = makeFlatObjectMetadataMaps(flatObjectMetadata);
        const record = makeNavigationRecord({
            engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.CREATE_NEW_RECORD,
            label: 'Create New Record',
            shortLabel: undefined,
            icon: 'IconPlus',
            payload: undefined
        });
        const result = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
            record,
            flatObjectMetadataMaps,
            locale: _translations.SOURCE_LOCALE,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe(record);
    });
    it('should return record unchanged when payload has no objectMetadataItemId', ()=>{
        const flatObjectMetadata = makeFlatObjectMetadata();
        const flatObjectMetadataMaps = makeFlatObjectMetadataMaps(flatObjectMetadata);
        const record = makeNavigationRecord({
            payload: {
                path: '/settings'
            }
        });
        const result = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
            record,
            flatObjectMetadataMaps,
            locale: _translations.SOURCE_LOCALE,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe(record);
    });
    it('should return record unchanged when object metadata is not found in maps', ()=>{
        const emptyMaps = {
            byUniversalIdentifier: {},
            universalIdentifierById: {},
            universalIdentifiersByApplicationId: {}
        };
        const record = makeNavigationRecord();
        const result = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
            record,
            flatObjectMetadataMaps: emptyMaps,
            locale: _translations.SOURCE_LOCALE,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe(record);
    });
    it('should apply standard overrides when resolving templates', ()=>{
        const flatObjectMetadata = makeFlatObjectMetadata({
            labelPlural: 'People',
            icon: 'IconUser',
            standardOverrides: {
                labelPlural: 'Contacts',
                icon: 'IconContacts'
            }
        });
        const flatObjectMetadataMaps = makeFlatObjectMetadataMaps(flatObjectMetadata);
        const record = makeNavigationRecord();
        const result = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
            record,
            flatObjectMetadataMaps,
            locale: _translations.SOURCE_LOCALE,
            i18nInstance: mockI18nInstance
        });
        expect(result.label).toBe('Go to Contacts');
        expect(result.shortLabel).toBe('Contacts');
        expect(result.icon).toBe('IconContacts');
    });
    it('should use base values when standard overrides are null', ()=>{
        const flatObjectMetadata = makeFlatObjectMetadata({
            labelPlural: 'Companies',
            icon: 'IconBuilding',
            standardOverrides: null
        });
        const flatObjectMetadataMaps = makeFlatObjectMetadataMaps(flatObjectMetadata);
        const record = makeNavigationRecord();
        const result = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
            record,
            flatObjectMetadataMaps,
            locale: _translations.SOURCE_LOCALE,
            i18nInstance: mockI18nInstance
        });
        expect(result.label).toBe('Go to Companies');
        expect(result.shortLabel).toBe('Companies');
        expect(result.icon).toBe('IconBuilding');
    });
    it('should return record unchanged when payload is null', ()=>{
        const flatObjectMetadata = makeFlatObjectMetadata();
        const flatObjectMetadataMaps = makeFlatObjectMetadataMaps(flatObjectMetadata);
        const record = makeNavigationRecord({
            payload: null
        });
        const result = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
            record,
            flatObjectMetadataMaps,
            locale: _translations.SOURCE_LOCALE,
            i18nInstance: mockI18nInstance
        });
        expect(result).toBe(record);
    });
    it('should pass through already-resolved literal labels', ()=>{
        const flatObjectMetadata = makeFlatObjectMetadata();
        const flatObjectMetadataMaps = makeFlatObjectMetadataMaps(flatObjectMetadata);
        const record = makeNavigationRecord({
            label: 'Go to People',
            shortLabel: 'People',
            icon: 'IconUser'
        });
        const result = (0, _enrichcommandmenuitemeventwithresolvednavigationutil.enrichCommandMenuItemEventWithResolvedNavigation)({
            record,
            flatObjectMetadataMaps,
            locale: _translations.SOURCE_LOCALE,
            i18nInstance: mockI18nInstance
        });
        expect(result.label).toBe('Go to People');
        expect(result.shortLabel).toBe('People');
        expect(result.icon).toBe('IconUser');
    });
});

//# sourceMappingURL=enrich-command-menu-item-event-with-resolved-navigation.util.spec.js.map