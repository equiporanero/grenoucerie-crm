"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _defaultviewfieldsizeconstant = require("../../constants/default-view-field-size.constant");
const _computeflatviewfieldsfromfieldswidgetsutil = require("../compute-flat-view-fields-from-fields-widgets.util");
const _widgetconfigurationtypetype = require("../../../page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../../page-layout-widget/enums/widget-type.enum");
const APPLICATION_UNIVERSAL_IDENTIFIER = 'app-uid-1';
const VIEW_ID = 'view-db-id-1';
const VIEW_UNIVERSAL_IDENTIFIER = 'view-uid-1';
const VIEW_FIELD_GROUP_ID = 'vfg-db-id-1';
const VIEW_FIELD_GROUP_UNIVERSAL_IDENTIFIER = 'vfg-uid-1';
const OBJECT_METADATA_UNIVERSAL_IDENTIFIER = 'obj-uid-1';
const buildEmptyFlatEntityMaps = ()=>({
        byUniversalIdentifier: {},
        universalIdentifierById: {},
        universalIdentifiersByApplicationId: {}
    });
const buildFlatViewMaps = (entries = [])=>({
        byUniversalIdentifier: Object.fromEntries(entries.map((entry)=>[
                entry.universalIdentifier,
                {
                    universalIdentifier: entry.universalIdentifier,
                    id: entry.id
                }
            ])),
        universalIdentifierById: Object.fromEntries(entries.map((entry)=>[
                entry.id,
                entry.universalIdentifier
            ])),
        universalIdentifiersByApplicationId: {}
    });
const buildFlatViewFieldGroupMaps = (entries = [])=>({
        byUniversalIdentifier: Object.fromEntries(entries.map((entry)=>[
                entry.universalIdentifier,
                {
                    universalIdentifier: entry.universalIdentifier,
                    id: entry.id,
                    viewId: entry.viewId ?? VIEW_ID,
                    position: entry.position ?? 0,
                    isActive: true,
                    deletedAt: null
                }
            ])),
        universalIdentifierById: Object.fromEntries(entries.map((entry)=>[
                entry.id,
                entry.universalIdentifier
            ])),
        universalIdentifiersByApplicationId: {}
    });
const buildFlatViewFieldMaps = (entries = [])=>({
        byUniversalIdentifier: Object.fromEntries(entries.map((entry)=>[
                entry.universalIdentifier,
                entry
            ])),
        universalIdentifierById: {},
        universalIdentifiersByApplicationId: {}
    });
const buildFieldsWidget = ({ widgetUniversalIdentifier = 'widget-uid-1', objectMetadataUniversalIdentifier = OBJECT_METADATA_UNIVERSAL_IDENTIFIER, viewId = VIEW_ID, isVisible = true, isActive = true } = {})=>({
        universalIdentifier: widgetUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        type: _widgettypeenum.WidgetType.FIELDS,
        isActive,
        configuration: {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS,
            viewId,
            newFieldDefaultVisibility: isVisible
        },
        universalConfiguration: null,
        overrides: null
    });
const buildFlatPageLayoutWidgetMaps = (widgets)=>({
        byUniversalIdentifier: Object.fromEntries(widgets.map((widget)=>[
                widget.universalIdentifier,
                widget
            ])),
        universalIdentifierById: {},
        universalIdentifiersByApplicationId: {}
    });
describe('computeFlatViewFieldsFromFieldsWidgets', ()=>{
    describe('when no matching widgets exist', ()=>{
        it('should return empty array when widget maps are empty', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildEmptyFlatEntityMaps(),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps(),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toEqual([]);
        });
        it('should return empty array when fieldsToCreate is empty', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toEqual([]);
        });
        it('should skip widgets for a different object', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: 'other-obj-uid',
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toEqual([]);
        });
        it('should skip inactive widgets', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget({
                        isActive: false
                    })
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toEqual([]);
        });
        it('should skip widgets without viewId', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget({
                        viewId: null
                    })
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps(),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toEqual([]);
        });
        it('should skip widgets whose viewId cannot be resolved', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget({
                        viewId: 'non-existent-view-id'
                    })
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps(),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toEqual([]);
        });
    });
    describe('when creating view fields for a single field', ()=>{
        it('should create a view field with correct properties', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget({
                        isVisible: true
                    })
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject({
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
                fieldMetadataUniversalIdentifier: 'field-uid-1',
                viewUniversalIdentifier: VIEW_UNIVERSAL_IDENTIFIER,
                viewFieldGroupUniversalIdentifier: null,
                isVisible: true,
                size: _defaultviewfieldsizeconstant.DEFAULT_VIEW_FIELD_SIZE,
                position: 0,
                aggregateOperation: null,
                deletedAt: null
            });
            expect(result[0].universalIdentifier).toBeDefined();
            expect(result[0].createdAt).toBeDefined();
            expect(result[0].updatedAt).toBeDefined();
        });
        it('should respect isVisible: false from configuration', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget({
                        isVisible: false
                    })
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toHaveLength(1);
            expect(result[0].isVisible).toBe(false);
        });
    });
    describe('position computation', ()=>{
        it('should start at position 0 when no existing view fields', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result[0].position).toBe(0);
        });
        it('should append after the last existing view field position', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps([
                    {
                        universalIdentifier: 'existing-vf-1',
                        viewId: VIEW_ID,
                        viewFieldGroupId: null,
                        position: 3,
                        isActive: true
                    },
                    {
                        universalIdentifier: 'existing-vf-2',
                        viewId: VIEW_ID,
                        viewFieldGroupId: null,
                        position: 7,
                        isActive: true
                    }
                ]),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result[0].position).toBe(8);
        });
        it('should assign sequential positions for multiple fields in the same batch', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    },
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-2'
                    },
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-3'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps([
                    {
                        universalIdentifier: 'existing-vf-1',
                        viewId: VIEW_ID,
                        viewFieldGroupId: null,
                        position: 2,
                        isActive: true
                    }
                ]),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toHaveLength(3);
            expect(result[0].position).toBe(3);
            expect(result[1].position).toBe(4);
            expect(result[2].position).toBe(5);
        });
        it('should ignore inactive view fields when computing position', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps([
                    {
                        universalIdentifier: 'existing-vf-1',
                        viewId: VIEW_ID,
                        viewFieldGroupId: null,
                        position: 5,
                        isActive: true
                    },
                    {
                        universalIdentifier: 'inactive-vf',
                        viewId: VIEW_ID,
                        viewFieldGroupId: null,
                        position: 99,
                        isActive: false
                    }
                ]),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result[0].position).toBe(6);
        });
        it('should ignore view fields from a different view', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps([
                    {
                        universalIdentifier: 'other-view-vf',
                        viewId: 'other-view-db-id',
                        viewFieldGroupId: null,
                        position: 50,
                        isActive: true
                    }
                ]),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result[0].position).toBe(0);
        });
    });
    describe('view field group handling', ()=>{
        it('should resolve to the last view field group when groups exist', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps([
                    {
                        id: VIEW_FIELD_GROUP_ID,
                        universalIdentifier: VIEW_FIELD_GROUP_UNIVERSAL_IDENTIFIER
                    }
                ]),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toHaveLength(1);
            expect(result[0].viewFieldGroupUniversalIdentifier).toBe(VIEW_FIELD_GROUP_UNIVERSAL_IDENTIFIER);
        });
        it('should set viewFieldGroupUniversalIdentifier to null when no groups exist', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result[0].viewFieldGroupUniversalIdentifier).toBeNull();
        });
        it('should compute position only from view fields in the last group', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps([
                    {
                        universalIdentifier: 'vf-in-group',
                        viewId: VIEW_ID,
                        viewFieldGroupId: VIEW_FIELD_GROUP_ID,
                        position: 2,
                        isActive: true
                    },
                    {
                        universalIdentifier: 'vf-no-group',
                        viewId: VIEW_ID,
                        viewFieldGroupId: null,
                        position: 99,
                        isActive: true
                    },
                    {
                        universalIdentifier: 'vf-other-group',
                        viewId: VIEW_ID,
                        viewFieldGroupId: 'other-group-id',
                        position: 50,
                        isActive: true
                    }
                ]),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps([
                    {
                        id: VIEW_FIELD_GROUP_ID,
                        universalIdentifier: VIEW_FIELD_GROUP_UNIVERSAL_IDENTIFIER
                    }
                ]),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result[0].position).toBe(3);
        });
        it('should compute position only from ungrouped view fields when no groups exist', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps([
                    {
                        universalIdentifier: 'vf-no-group',
                        viewId: VIEW_ID,
                        viewFieldGroupId: null,
                        position: 1,
                        isActive: true
                    },
                    {
                        universalIdentifier: 'vf-in-group',
                        viewId: VIEW_ID,
                        viewFieldGroupId: VIEW_FIELD_GROUP_ID,
                        position: 99,
                        isActive: true
                    }
                ]),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result[0].position).toBe(2);
        });
    });
    describe('multiple widgets for the same object', ()=>{
        it('should create view fields for each matching widget', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget({
                        widgetUniversalIdentifier: 'widget-uid-1',
                        viewId: 'view-db-id-A'
                    }),
                    buildFieldsWidget({
                        widgetUniversalIdentifier: 'widget-uid-2',
                        viewId: 'view-db-id-B'
                    })
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: 'view-db-id-A',
                        universalIdentifier: 'view-uid-A'
                    },
                    {
                        id: 'view-db-id-B',
                        universalIdentifier: 'view-uid-B'
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toHaveLength(2);
            expect(result[0].viewUniversalIdentifier).toBe('view-uid-A');
            expect(result[1].viewUniversalIdentifier).toBe('view-uid-B');
        });
    });
    describe('multiple objects', ()=>{
        it('should create view fields for fields across different objects', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: 'obj-uid-1',
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    },
                    {
                        objectMetadataUniversalIdentifier: 'obj-uid-2',
                        fieldMetadataUniversalIdentifier: 'field-uid-2'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget({
                        widgetUniversalIdentifier: 'widget-uid-1',
                        objectMetadataUniversalIdentifier: 'obj-uid-1',
                        viewId: 'view-db-id-A'
                    }),
                    buildFieldsWidget({
                        widgetUniversalIdentifier: 'widget-uid-2',
                        objectMetadataUniversalIdentifier: 'obj-uid-2',
                        viewId: 'view-db-id-B'
                    })
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: 'view-db-id-A',
                        universalIdentifier: 'view-uid-A'
                    },
                    {
                        id: 'view-db-id-B',
                        universalIdentifier: 'view-uid-B'
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            expect(result).toHaveLength(2);
            const viewFieldForObj1 = result.find((viewField)=>viewField.fieldMetadataUniversalIdentifier === 'field-uid-1');
            const viewFieldForObj2 = result.find((viewField)=>viewField.fieldMetadataUniversalIdentifier === 'field-uid-2');
            expect(viewFieldForObj1?.viewUniversalIdentifier).toBe('view-uid-A');
            expect(viewFieldForObj2?.viewUniversalIdentifier).toBe('view-uid-B');
        });
    });
    describe('unique universal identifiers', ()=>{
        it('should generate unique universalIdentifier for each created view field', ()=>{
            const result = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
                fieldsToCreate: [
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-1'
                    },
                    {
                        objectMetadataUniversalIdentifier: OBJECT_METADATA_UNIVERSAL_IDENTIFIER,
                        fieldMetadataUniversalIdentifier: 'field-uid-2'
                    }
                ],
                flatPageLayoutWidgetMaps: buildFlatPageLayoutWidgetMaps([
                    buildFieldsWidget()
                ]),
                flatViewFieldMaps: buildFlatViewFieldMaps(),
                flatViewMaps: buildFlatViewMaps([
                    {
                        id: VIEW_ID,
                        universalIdentifier: VIEW_UNIVERSAL_IDENTIFIER
                    }
                ]),
                flatViewFieldGroupMaps: buildFlatViewFieldGroupMaps(),
                applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER
            });
            const universalIdentifiers = result.map((viewField)=>viewField.universalIdentifier);
            expect(new Set(universalIdentifiers).size).toBe(universalIdentifiers.length);
        });
    });
});

//# sourceMappingURL=compute-flat-view-fields-from-fields-widgets.util.spec.js.map