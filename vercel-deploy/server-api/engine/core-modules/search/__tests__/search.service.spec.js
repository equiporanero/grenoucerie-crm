"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _cursorsutil = require("../../../api/graphql/graphql-query-runner/utils/cursors.util");
const _mockFlatObjectMetadatas = require("../../__mocks__/mockFlatObjectMetadatas");
const _fileurlservice = require("../../file/file-url/file-url.service");
const _searchservice = require("../services/search.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
describe('SearchService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _searchservice.SearchService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {}
                },
                {
                    provide: _fileurlservice.FileUrlService,
                    useValue: {}
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: (key)=>key === 'SEARCH_ILIKE_FALLBACK_TIMEOUT_MS' ? 500 : false
                    }
                }
            ]
        }).compile();
        service = module.get(_searchservice.SearchService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('filterObjectMetadataItems', ()=>{
        it('should return searchable object metadata items', ()=>{
            const objectMetadataItems = service.filterObjectMetadataItems({
                flatObjectMetadatas: _mockFlatObjectMetadatas.mockFlatObjectMetadatas,
                includedObjectNameSingulars: [],
                excludedObjectNameSingulars: []
            });
            expect(objectMetadataItems).toEqual([
                _mockFlatObjectMetadatas.mockFlatObjectMetadatas[0],
                _mockFlatObjectMetadatas.mockFlatObjectMetadatas[1],
                _mockFlatObjectMetadatas.mockFlatObjectMetadatas[2]
            ]);
        });
        it('should return searchable object metadata items without excluded ones', ()=>{
            const objectMetadataItems = service.filterObjectMetadataItems({
                flatObjectMetadatas: _mockFlatObjectMetadatas.mockFlatObjectMetadatas,
                includedObjectNameSingulars: [],
                excludedObjectNameSingulars: [
                    'company'
                ]
            });
            expect(objectMetadataItems).toEqual([
                _mockFlatObjectMetadatas.mockFlatObjectMetadatas[0],
                _mockFlatObjectMetadatas.mockFlatObjectMetadatas[2]
            ]);
        });
        it('should return searchable object metadata items with included ones only', ()=>{
            const objectMetadataItems = service.filterObjectMetadataItems({
                flatObjectMetadatas: _mockFlatObjectMetadatas.mockFlatObjectMetadatas,
                includedObjectNameSingulars: [
                    'company'
                ],
                excludedObjectNameSingulars: []
            });
            expect(objectMetadataItems).toEqual([
                _mockFlatObjectMetadatas.mockFlatObjectMetadatas[1]
            ]);
        });
        it('should allow non-searchable objects when explicitly included', ()=>{
            const objectMetadataItems = service.filterObjectMetadataItems({
                flatObjectMetadatas: _mockFlatObjectMetadatas.mockFlatObjectMetadatas,
                includedObjectNameSingulars: [
                    'non-searchable-object'
                ],
                excludedObjectNameSingulars: []
            });
            expect(objectMetadataItems).toEqual([
                _mockFlatObjectMetadatas.mockFlatObjectMetadatas[3]
            ]);
        });
        it('should block objects with channel visibility constraints even when explicitly included', ()=>{
            const objectMetadataItems = service.filterObjectMetadataItems({
                flatObjectMetadatas: _mockFlatObjectMetadatas.mockFlatObjectMetadatas,
                includedObjectNameSingulars: [
                    'message'
                ],
                excludedObjectNameSingulars: []
            });
            expect(objectMetadataItems).toEqual([]);
        });
    });
    describe('getLabelIdentifierColumns', ()=>{
        it('should return the two label identifier columns for a person object metadata item', ()=>{
            const labelIdentifierColumns = service.getLabelIdentifierColumns(_mockFlatObjectMetadatas.mockFlatObjectMetadatas[0], _mockFlatObjectMetadatas.mockFlatFieldMetadataMaps);
            expect(labelIdentifierColumns).toEqual([
                'nameFirstName',
                'nameLastName'
            ]);
        });
        it('should return the label identifier column for a regular object metadata item', ()=>{
            const labelIdentifierColumns = service.getLabelIdentifierColumns(_mockFlatObjectMetadatas.mockFlatObjectMetadatas[1], _mockFlatObjectMetadatas.mockFlatFieldMetadataMaps);
            expect(labelIdentifierColumns).toEqual([
                'name'
            ]);
        });
    });
    describe('getImageIdentifierColumn', ()=>{
        it('should return `avatarFile` if the object metadata item is a person', ()=>{
            const imageIdentifierColumn = service.getImageIdentifierColumn(_mockFlatObjectMetadatas.mockFlatObjectMetadatas[0], _mockFlatObjectMetadatas.mockFlatFieldMetadataMaps);
            expect(imageIdentifierColumn).toEqual('avatarFile');
        });
        it('should return `domainNamePrimaryLinkUrl` column for a company object metadata item', ()=>{
            const imageIdentifierColumn = service.getImageIdentifierColumn(_mockFlatObjectMetadatas.mockFlatObjectMetadatas[1], _mockFlatObjectMetadatas.mockFlatFieldMetadataMaps);
            expect(imageIdentifierColumn).toEqual('domainNamePrimaryLinkUrl');
        });
        it('should return the image identifier column', ()=>{
            const imageIdentifierColumn = service.getImageIdentifierColumn(_mockFlatObjectMetadatas.mockFlatObjectMetadatas[2], _mockFlatObjectMetadatas.mockFlatFieldMetadataMaps);
            expect(imageIdentifierColumn).toEqual('imageIdentifierFieldName');
        });
    });
    describe('sortSearchObjectResults', ()=>{
        it('should sort the search object results by tsRankCD', ()=>{
            const objectResults = [
                {
                    objectNameSingular: 'person',
                    objectLabelSingular: 'Person',
                    tsRankCD: 2,
                    tsRank: 1,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                },
                {
                    objectNameSingular: 'company',
                    objectLabelSingular: 'Company',
                    tsRankCD: 1,
                    tsRank: 1,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                },
                {
                    objectNameSingular: 'regular-custom-object',
                    objectLabelSingular: 'Regular Custom Object',
                    tsRankCD: 3,
                    tsRank: 1,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                }
            ];
            expect(service.sortSearchObjectResults([
                ...objectResults
            ])).toEqual([
                objectResults[2],
                objectResults[0],
                objectResults[1]
            ]);
        });
        it('should sort the search object results by tsRank, if tsRankCD is the same', ()=>{
            const objectResults = [
                {
                    objectNameSingular: 'person',
                    objectLabelSingular: 'Person',
                    tsRankCD: 1,
                    tsRank: 1,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                },
                {
                    objectNameSingular: 'company',
                    objectLabelSingular: 'Company',
                    tsRankCD: 1,
                    tsRank: 2,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                },
                {
                    objectNameSingular: 'regular-custom-object',
                    objectLabelSingular: 'Regular Custom Object',
                    tsRankCD: 1,
                    tsRank: 3,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                }
            ];
            expect(service.sortSearchObjectResults([
                ...objectResults
            ])).toEqual([
                objectResults[2],
                objectResults[1],
                objectResults[0]
            ]);
        });
        it('should sort the search object results by priority rank, if tsRankCD and tsRank are the same', ()=>{
            const objectResults = [
                {
                    objectNameSingular: 'company',
                    objectLabelSingular: 'Company',
                    tsRankCD: 1,
                    tsRank: 1,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                },
                {
                    objectNameSingular: 'person',
                    objectLabelSingular: 'Person',
                    tsRankCD: 1,
                    tsRank: 1,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                },
                {
                    objectNameSingular: 'regular-custom-object',
                    objectLabelSingular: 'Regular Custom Object',
                    tsRankCD: 1,
                    tsRank: 1,
                    recordId: '',
                    label: '',
                    imageUrl: ''
                }
            ];
            expect(service.sortSearchObjectResults([
                ...objectResults
            ])).toEqual([
                objectResults[1],
                objectResults[0],
                objectResults[2]
            ]);
        });
    });
    describe('computeEdges', ()=>{
        it('should compute edges properly', ()=>{
            const sortedSlicedRecords = [
                {
                    record: {
                        objectNameSingular: 'company',
                        objectLabelSingular: 'Company',
                        tsRankCD: 0.9,
                        tsRank: 0.9,
                        recordId: 'companyId1',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.9,
                            tsRank: 0.9
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId1'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'company',
                        objectLabelSingular: 'Company',
                        tsRankCD: 0.89,
                        tsRank: 0.89,
                        recordId: 'companyId2',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.89,
                            tsRank: 0.89
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId2'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'person',
                        objectLabelSingular: 'Person',
                        tsRankCD: 0.87,
                        tsRank: 0.87,
                        recordId: 'personId1',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.87,
                            tsRank: 0.87
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId2',
                            person: 'personId1'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'person',
                        objectLabelSingular: 'Person',
                        tsRankCD: 0.87,
                        tsRank: 0.87,
                        recordId: 'personId2',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.87,
                            tsRank: 0.87
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId2',
                            person: 'personId2'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'opportunity',
                        objectLabelSingular: 'Opportunity',
                        tsRankCD: 0.87,
                        tsRank: 0.87,
                        recordId: 'opportunityId1',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.87,
                            tsRank: 0.87
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId2',
                            person: 'personId2',
                            opportunity: 'opportunityId1'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'note',
                        objectLabelSingular: 'Note',
                        tsRankCD: 0.2,
                        tsRank: 0.2,
                        recordId: 'noteId1',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.2,
                            tsRank: 0.2
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId2',
                            person: 'personId2',
                            opportunity: 'opportunityId1',
                            note: 'noteId1'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'company',
                        objectLabelSingular: 'Company',
                        tsRankCD: 0.1,
                        tsRank: 0.1,
                        recordId: 'companyId3',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.1,
                            tsRank: 0.1
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId3',
                            person: 'personId2',
                            opportunity: 'opportunityId1',
                            note: 'noteId1'
                        }
                    })
                }
            ];
            const edges = service.computeEdges({
                sortedRecords: sortedSlicedRecords.map((r)=>r.record)
            });
            expect(edges.map((e)=>e.cursor)).toEqual(sortedSlicedRecords.map((r)=>r.expectedCursor));
        });
        it('should compute pageInfo properly with an input after cursor', ()=>{
            const sortedSlicedRecords = [
                {
                    record: {
                        objectNameSingular: 'person',
                        objectLabelSingular: 'Person',
                        tsRankCD: 0.87,
                        tsRank: 0.87,
                        recordId: 'personId2',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.87,
                            tsRank: 0.87
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId2',
                            person: 'personId2'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'opportunity',
                        objectLabelSingular: 'Opportunity',
                        tsRankCD: 0.87,
                        tsRank: 0.87,
                        recordId: 'opportunityId1',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.87,
                            tsRank: 0.87
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId2',
                            person: 'personId2',
                            opportunity: 'opportunityId1'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'note',
                        objectLabelSingular: 'Note',
                        tsRankCD: 0.2,
                        tsRank: 0.2,
                        recordId: 'noteId1',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.2,
                            tsRank: 0.2
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId2',
                            person: 'personId2',
                            opportunity: 'opportunityId1',
                            note: 'noteId1'
                        }
                    })
                },
                {
                    record: {
                        objectNameSingular: 'company',
                        objectLabelSingular: 'Company',
                        tsRankCD: 0.1,
                        tsRank: 0.1,
                        recordId: 'companyId3',
                        label: '',
                        imageUrl: ''
                    },
                    expectedCursor: (0, _cursorsutil.encodeCursorData)({
                        lastRanks: {
                            tsRankCD: 0.1,
                            tsRank: 0.1
                        },
                        lastRecordIdsPerObject: {
                            company: 'companyId3',
                            person: 'personId2',
                            opportunity: 'opportunityId1',
                            note: 'noteId1'
                        }
                    })
                }
            ];
            const afterCursor = (0, _cursorsutil.encodeCursorData)({
                lastRanks: {
                    tsRankCD: 0.87,
                    tsRank: 0.87
                },
                lastRecordIdsPerObject: {
                    company: 'companyId2',
                    person: 'personId1'
                }
            });
            const edges = service.computeEdges({
                sortedRecords: sortedSlicedRecords.map((r)=>r.record),
                after: afterCursor
            });
            expect(edges.map((e)=>e.cursor)).toEqual(sortedSlicedRecords.map((r)=>r.expectedCursor));
        });
    });
});

//# sourceMappingURL=search.service.spec.js.map