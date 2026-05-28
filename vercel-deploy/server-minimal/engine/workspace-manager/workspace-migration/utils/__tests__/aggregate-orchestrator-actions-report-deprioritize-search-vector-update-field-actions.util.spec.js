"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _getflatfieldmetadatamock = require("../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _searchvectorfieldconstants = require("../../../../metadata-modules/search-field-metadata/constants/search-vector-field.constants");
const _emptyorchestratoractionsreportconstant = require("../../constant/empty-orchestrator-actions-report.constant");
const _aggregateorchestratoractionsreportdeprioritizesearchvectorupdatefieldactionsutil = require("../aggregate-orchestrator-actions-report-deprioritize-search-vector-update-field-actions.util");
describe('aggregateOrchestratorActionsReportDeprioritizeSearchVectorUpdateFieldActions', ()=>{
    it('should move searchVector update actions to the end of the update list', ()=>{
        const orchestratorActionsReport = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            fieldMetadata: {
                create: [],
                update: [
                    {
                        type: 'update',
                        metadataName: 'fieldMetadata',
                        universalIdentifier: 'search-vector-field-1',
                        update: {
                            label: 'Updated Search Vector'
                        }
                    },
                    {
                        type: 'update',
                        metadataName: 'fieldMetadata',
                        universalIdentifier: 'regular-field-1',
                        update: {
                            label: 'Updated First Name'
                        }
                    },
                    {
                        type: 'update',
                        metadataName: 'fieldMetadata',
                        universalIdentifier: 'regular-field-2',
                        update: {
                            label: 'Updated Last Name'
                        }
                    }
                ],
                delete: []
            }
        };
        const flatFieldMetadataMaps = [
            (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'search-vector-field-1',
                objectMetadataId: 'object-1',
                type: _types.FieldMetadataType.TS_VECTOR,
                id: 'search-vector-field-1',
                name: _searchvectorfieldconstants.SEARCH_VECTOR_FIELD.name
            }),
            (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'regular-field-1',
                objectMetadataId: 'object-1',
                type: _types.FieldMetadataType.TEXT,
                id: 'regular-field-1',
                name: 'firstName'
            }),
            (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'regular-field-2',
                objectMetadataId: 'object-1',
                type: _types.FieldMetadataType.TEXT,
                id: 'regular-field-2',
                name: 'lastName'
            })
        ].reduce((flatEntityMaps, field)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: field,
                flatEntityMaps
            }), (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());
        const result = (0, _aggregateorchestratoractionsreportdeprioritizesearchvectorupdatefieldactionsutil.aggregateOrchestratorActionsReportDeprioritizeSearchVectorUpdateFieldActions)({
            orchestratorActionsReport,
            flatFieldMetadataMaps
        });
        const updateFieldActions = result.fieldMetadata.update;
        const actualUniversalIdentifiers = updateFieldActions.map((action)=>action.universalIdentifier);
        expect(actualUniversalIdentifiers).toEqual([
            'regular-field-1',
            'regular-field-2',
            'search-vector-field-1'
        ]);
        expect(result.fieldMetadata.create).toEqual(orchestratorActionsReport.fieldMetadata.create);
        expect(result.fieldMetadata.delete).toEqual(orchestratorActionsReport.fieldMetadata.delete);
        expect(result.objectMetadata).toEqual(orchestratorActionsReport.objectMetadata);
    });
});

//# sourceMappingURL=aggregate-orchestrator-actions-report-deprioritize-search-vector-update-field-actions.util.spec.js.map