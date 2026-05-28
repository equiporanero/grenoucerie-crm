"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _createemptyflatentitymapsconstant = require("../../../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _flatpagelayoutwidgettypevalidatorservice = require("../../../../../../metadata-modules/flat-page-layout-widget/services/flat-page-layout-widget-type-validator.service");
const _pagelayouttabexception = require("../../../../../../metadata-modules/page-layout-tab/exceptions/page-layout-tab.exception");
const _flatpagelayoutwidgetvalidatorservice = require("../flat-page-layout-widget-validator.service");
const EXISTING_TAB_UNIVERSAL_IDENTIFIER = '00000000-0000-0000-0000-000000000aa1';
const MISSING_TAB_UNIVERSAL_IDENTIFIER = '00000000-0000-0000-0000-000000000aa2';
const DESTINATION_TAB_UNIVERSAL_IDENTIFIER = '00000000-0000-0000-0000-000000000aa3';
const WIDGET_UNIVERSAL_IDENTIFIER = '00000000-0000-0000-0000-000000000111';
const tab = (universalIdentifier = EXISTING_TAB_UNIVERSAL_IDENTIFIER)=>({
        universalIdentifier,
        layoutMode: _types.PageLayoutTabLayoutMode.VERTICAL_LIST
    });
const widget = (universalIdentifier = WIDGET_UNIVERSAL_IDENTIFIER, pageLayoutTabUniversalIdentifier = EXISTING_TAB_UNIVERSAL_IDENTIFIER)=>({
        universalIdentifier,
        pageLayoutTabUniversalIdentifier,
        title: 'widget',
        type: 'FRONT_COMPONENT',
        gridPosition: {
            row: 0,
            column: 0,
            rowSpan: 12,
            columnSpan: 12
        },
        position: {
            layoutMode: _types.PageLayoutTabLayoutMode.VERTICAL_LIST,
            index: 0
        }
    });
const mapsFrom = (entities)=>{
    const maps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const entity of entities){
        maps.byUniversalIdentifier[entity.universalIdentifier] = entity;
    }
    return maps;
};
const buildUpdateArgs = ({ update, tabs = [
    tab()
], existingWidgets = [
    widget()
] })=>({
        universalIdentifier: WIDGET_UNIVERSAL_IDENTIFIER,
        flatEntityUpdate: update,
        optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
            flatPageLayoutTabMaps: mapsFrom(tabs),
            flatPageLayoutWidgetMaps: mapsFrom(existingWidgets)
        },
        additionalCacheDataMaps: {
            featureFlagsMap: {}
        },
        workspaceId: 'workspace-id',
        buildOptions: {}
    });
describe('FlatPageLayoutWidgetValidatorService', ()=>{
    let service;
    beforeEach(async ()=>{
        const moduleRef = await _testing.Test.createTestingModule({
            providers: [
                _flatpagelayoutwidgetvalidatorservice.FlatPageLayoutWidgetValidatorService,
                {
                    provide: _flatpagelayoutwidgettypevalidatorservice.FlatPageLayoutWidgetTypeValidatorService,
                    useValue: {
                        validateFlatPageLayoutWidgetTypeSpecificitiesForCreation: ()=>[],
                        validateFlatPageLayoutWidgetTypeSpecificitiesForUpdate: ()=>[]
                    }
                }
            ]
        }).compile();
        service = moduleRef.get(_flatpagelayoutwidgetvalidatorservice.FlatPageLayoutWidgetValidatorService);
    });
    describe('validateFlatPageLayoutWidgetUpdate', ()=>{
        it('rejects moving a widget to an unknown tab', async ()=>{
            const result = await service.validateFlatPageLayoutWidgetUpdate(buildUpdateArgs({
                update: {
                    pageLayoutTabUniversalIdentifier: MISSING_TAB_UNIVERSAL_IDENTIFIER
                }
            }));
            expect(result.errors.map((error)=>error.code)).toContain(_pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND);
        });
        it('rejects moving an overridden widget to an unknown tab', async ()=>{
            const result = await service.validateFlatPageLayoutWidgetUpdate(buildUpdateArgs({
                update: {
                    universalOverrides: {
                        pageLayoutTabUniversalIdentifier: MISSING_TAB_UNIVERSAL_IDENTIFIER
                    }
                }
            }));
            expect(result.errors.map((error)=>error.code)).toContain(_pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND);
        });
        it('accepts moving an overridden widget to a known tab and exposes the override target as the effective tab', async ()=>{
            const result = await service.validateFlatPageLayoutWidgetUpdate(buildUpdateArgs({
                update: {
                    universalOverrides: {
                        pageLayoutTabUniversalIdentifier: DESTINATION_TAB_UNIVERSAL_IDENTIFIER
                    }
                },
                tabs: [
                    tab(),
                    tab(DESTINATION_TAB_UNIVERSAL_IDENTIFIER)
                ]
            }));
            expect(result.errors.map((error)=>error.code)).not.toContain(_pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND);
            expect(result.flatEntityMinimalInformation.pageLayoutTabUniversalIdentifier).toBe(DESTINATION_TAB_UNIVERSAL_IDENTIFIER);
        });
    });
});

//# sourceMappingURL=flat-page-layout-widget-validator.service.spec.js.map