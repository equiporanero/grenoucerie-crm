"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _dataargprocessorservice = require("../data-arg-processor.service");
const _recordpositionservice = require("../../../../../core-modules/record-position/services/record-position.service");
const _failinginputsbyfieldmetadatatypeconstant = require("./constants/failing-inputs-by-field-metadata-type.constant");
const _fieldmetadataconfigbyfieldnameconstant = require("./constants/field-metadata-config-by-field-name.constant");
const _successfulinputsbyfieldmetadatatypeconstant = require("./constants/successful-inputs-by-field-metadata-type.constant");
// Mock the rich text v2 transformation to avoid BlockNote module issues
jest.mock('src/engine/core-modules/record-transformer/utils/transform-rich-text.util', ()=>({
        transformRichTextValue: jest.fn().mockImplementation((value)=>value)
    }));
describe('DataArgProcessorService', ()=>{
    let dataArgProcessorService;
    let recordPositionService;
    const mockWorkspaceId = '20202020-1234-1234-1234-123456789012';
    const createMockAuthContext = ()=>({
            type: 'system',
            workspace: {
                id: mockWorkspaceId
            }
        });
    const createFlatFieldMetadataMaps = (fieldNames)=>{
        const byUniversalIdentifier = {};
        const universalIdentifierById = {};
        for (const fieldName of fieldNames){
            const config = _fieldmetadataconfigbyfieldnameconstant.fieldMetadataConfigByFieldName[fieldName];
            if (!config) {
                throw new Error(`No config found for field: ${fieldName}`);
            }
            const fieldId = `${fieldName}-id`;
            const universalId = `${fieldName}-universal-id`;
            byUniversalIdentifier[universalId] = {
                id: fieldId,
                name: config.name,
                type: config.type ?? _types.FieldMetadataType.TEXT,
                isNullable: config.isNullable ?? true,
                objectMetadataId: 'object-id',
                universalIdentifier: universalId,
                options: config.options,
                settings: config.settings,
                defaultValue: config.defaultValue
            };
            universalIdentifierById[fieldId] = universalId;
        }
        return {
            byUniversalIdentifier,
            universalIdentifierById,
            universalIdentifiersByApplicationId: {}
        };
    };
    const createFlatObjectMetadata = (fieldNames)=>({
            id: 'object-id',
            nameSingular: 'testObject',
            namePlural: 'testObjects',
            isCustom: false,
            fieldIds: fieldNames.map((name)=>`${name}-id`),
            universalIdentifier: 'test-object-universal-id',
            labelIdentifierFieldMetadataUniversalIdentifier: null,
            imageIdentifierFieldMetadataUniversalIdentifier: null
        });
    beforeEach(async ()=>{
        recordPositionService = {
            overridePositionOnRecords: jest.fn().mockImplementation(({ partialRecordInputs })=>partialRecordInputs),
            buildRecordPosition: jest.fn(),
            findByPosition: jest.fn(),
            updatePosition: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _dataargprocessorservice.DataArgProcessorService,
                {
                    provide: _recordpositionservice.RecordPositionService,
                    useValue: recordPositionService
                }
            ]
        }).compile();
        dataArgProcessorService = module.get(_dataargprocessorservice.DataArgProcessorService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(dataArgProcessorService).toBeDefined();
    });
    it('should normalize relation connect where composite values', async ()=>{
        const flatFieldMetadataMaps = {
            byUniversalIdentifier: {
                'company-universal-id': {
                    id: 'company-id',
                    name: 'company',
                    type: _types.FieldMetadataType.RELATION,
                    isNullable: true,
                    objectMetadataId: 'object-id',
                    universalIdentifier: 'company-universal-id',
                    relationTargetObjectMetadataId: 'target-company-object-id',
                    settings: {
                        relationType: _types.RelationType.MANY_TO_ONE,
                        joinColumnName: 'companyId'
                    }
                },
                'emails-universal-id': {
                    id: 'emails-id',
                    name: 'emails',
                    type: _types.FieldMetadataType.EMAILS,
                    isNullable: true,
                    objectMetadataId: 'target-company-object-id',
                    universalIdentifier: 'emails-universal-id'
                },
                'domainName-universal-id': {
                    id: 'domainName-id',
                    name: 'domainName',
                    type: _types.FieldMetadataType.LINKS,
                    isNullable: true,
                    objectMetadataId: 'target-company-object-id',
                    universalIdentifier: 'domainName-universal-id'
                }
            },
            universalIdentifierById: {
                'company-id': 'company-universal-id',
                'emails-id': 'emails-universal-id',
                'domainName-id': 'domainName-universal-id'
            },
            universalIdentifiersByApplicationId: {}
        };
        const flatObjectMetadata = {
            id: 'object-id',
            nameSingular: 'testObject',
            namePlural: 'testObjects',
            isCustom: false,
            fieldIds: [
                'company-id'
            ],
            universalIdentifier: 'test-object-universal-id',
            labelIdentifierFieldMetadataUniversalIdentifier: null,
            imageIdentifierFieldMetadataUniversalIdentifier: null
        };
        const flatObjectMetadataMaps = {
            byUniversalIdentifier: {
                'target-company-universal-id': {
                    id: 'target-company-object-id',
                    nameSingular: 'company',
                    namePlural: 'companies',
                    isCustom: false,
                    fieldIds: [
                        'emails-id',
                        'domainName-id'
                    ],
                    universalIdentifier: 'target-company-universal-id',
                    labelIdentifierFieldMetadataUniversalIdentifier: null,
                    imageIdentifierFieldMetadataUniversalIdentifier: null
                }
            },
            universalIdentifierById: {
                'target-company-object-id': 'target-company-universal-id'
            },
            universalIdentifiersByApplicationId: {}
        };
        const result = await dataArgProcessorService.process({
            partialRecordInputs: [
                {
                    company: {
                        connect: {
                            where: {
                                emails: {
                                    primaryEmail: 'User@Example.COM'
                                },
                                domainName: {
                                    primaryLinkUrl: 'HTTPS://Example.COM/path/'
                                }
                            }
                        }
                    }
                }
            ],
            authContext: createMockAuthContext(),
            flatObjectMetadata,
            flatFieldMetadataMaps,
            flatObjectMetadataMaps
        });
        expect(result).toEqual([
            {
                company: {
                    connect: {
                        where: {
                            emails: {
                                primaryEmail: 'user@example.com'
                            },
                            domainName: {
                                primaryLinkUrl: 'https://example.com/path'
                            }
                        }
                    }
                }
            }
        ]);
    });
    describe('failing inputs validation', ()=>{
        const fieldMetadataTypesToTest = Object.keys(_failinginputsbyfieldmetadatatypeconstant.failingInputsByFieldMetadataType);
        for (const fieldMetadataType of fieldMetadataTypesToTest){
            const testCases = _failinginputsbyfieldmetadatatypeconstant.failingInputsByFieldMetadataType[fieldMetadataType];
            if (!testCases) {
                continue;
            }
            describe(`${fieldMetadataType}`, ()=>{
                for (const [index, testCase] of testCases.entries()){
                    const fieldName = Object.keys(testCase.input)[0];
                    const fieldValue = testCase.input[fieldName];
                    it(`should throw for invalid input #${index + 1}: ${JSON.stringify(fieldValue)}`, async ()=>{
                        const fieldNames = [
                            fieldName
                        ];
                        const flatFieldMetadataMaps = createFlatFieldMetadataMaps(fieldNames);
                        const flatObjectMetadata = createFlatObjectMetadata(fieldNames);
                        await expect(dataArgProcessorService.process({
                            partialRecordInputs: [
                                testCase.input
                            ],
                            authContext: createMockAuthContext(),
                            flatObjectMetadata,
                            flatFieldMetadataMaps,
                            flatObjectMetadataMaps: {
                                byUniversalIdentifier: {},
                                universalIdentifierById: {},
                                universalIdentifiersByApplicationId: {}
                            }
                        })).rejects.toThrowErrorMatchingSnapshot();
                    });
                }
            });
        }
    });
    describe('successful inputs validation', ()=>{
        const fieldMetadataTypesToTest = Object.keys(_successfulinputsbyfieldmetadatatypeconstant.successfulInputsByFieldMetadataType);
        for (const fieldMetadataType of fieldMetadataTypesToTest){
            const testCases = _successfulinputsbyfieldmetadatatypeconstant.successfulInputsByFieldMetadataType[fieldMetadataType];
            if (!testCases) {
                continue;
            }
            describe(`${fieldMetadataType}`, ()=>{
                for (const [index, testCase] of testCases.entries()){
                    const fieldName = Object.keys(testCase.input)[0];
                    const fieldValue = testCase.input[fieldName];
                    it(`should process valid input #${index + 1}: ${JSON.stringify(fieldValue)}`, async ()=>{
                        const fieldNames = [
                            fieldName
                        ];
                        const flatFieldMetadataMaps = createFlatFieldMetadataMaps(fieldNames);
                        const flatObjectMetadata = createFlatObjectMetadata(fieldNames);
                        const result = await dataArgProcessorService.process({
                            partialRecordInputs: [
                                testCase.input
                            ],
                            authContext: createMockAuthContext(),
                            flatObjectMetadata,
                            flatFieldMetadataMaps,
                            flatObjectMetadataMaps: {
                                byUniversalIdentifier: {},
                                universalIdentifierById: {},
                                universalIdentifiersByApplicationId: {}
                            }
                        });
                        expect(result).toBeDefined();
                        expect(result).toHaveLength(1);
                        expect(result[0]).toEqual(testCase.expectedOutput);
                    });
                }
            });
        }
    });
});

//# sourceMappingURL=data-arg-processor.service.spec.js.map