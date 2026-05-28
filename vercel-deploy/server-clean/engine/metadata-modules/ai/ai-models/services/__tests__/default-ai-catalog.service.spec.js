"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _stream = require("stream");
const _filestoragedriverfactory = require("../../../../../core-modules/file-storage/file-storage-driver.factory");
const _twentyconfigservice = require("../../../../../core-modules/twenty-config/twenty-config.service");
const _defaultaicatalogservice = require("../default-ai-catalog.service");
const mockReadFile = jest.fn();
describe('DefaultAiCatalogService', ()=>{
    let service;
    let mockConfigService;
    beforeEach(async ()=>{
        jest.clearAllMocks();
        mockConfigService = {
            get: jest.fn().mockReturnValue(undefined)
        };
        const mockDriverFactory = {
            getCurrentDriver: jest.fn().mockReturnValue({
                readFile: mockReadFile
            })
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _defaultaicatalogservice.DefaultAiCatalogService,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: mockConfigService
                },
                {
                    provide: _filestoragedriverfactory.FileStorageDriverFactory,
                    useValue: mockDriverFactory
                }
            ]
        }).compile();
        service = module.get(_defaultaicatalogservice.DefaultAiCatalogService);
    });
    describe('onModuleInit', ()=>{
        it('should use built-in catalog when AI_CATALOG_STORAGE_PATH is not set', async ()=>{
            await service.onModuleInit();
            const providers = service.getDefaultAiCatalog();
            expect(providers).toBeDefined();
            expect(Object.keys(providers).length).toBeGreaterThan(0);
            expect(mockReadFile).not.toHaveBeenCalled();
        });
        it('should load catalog from storage when AI_CATALOG_STORAGE_PATH is set', async ()=>{
            const catalog = JSON.stringify({
                customProvider: {
                    npm: '@ai-sdk/openai',
                    models: [
                        {
                            name: 'custom-model',
                            label: 'Custom Model',
                            inputCostPerMillionTokens: 1,
                            outputCostPerMillionTokens: 2,
                            contextWindowTokens: 4096,
                            maxOutputTokens: 1024
                        }
                    ]
                }
            });
            mockConfigService.get.mockImplementation((key)=>{
                if (key === 'AI_CATALOG_STORAGE_PATH') return 'config/ai-catalog.json';
                return undefined;
            });
            mockReadFile.mockResolvedValue(_stream.Readable.from([
                Buffer.from(catalog)
            ]));
            await service.onModuleInit();
            const providers = service.getDefaultAiCatalog();
            expect(Object.keys(providers)).toEqual([
                'customProvider'
            ]);
            expect(providers['customProvider'].name).toBe('customProvider');
            expect(providers['customProvider'].models?.[0].source).toBe('catalog');
            expect(mockReadFile).toHaveBeenCalledWith({
                filePath: 'config/ai-catalog.json'
            });
        });
        it('should reset catalog to empty object when storage read fails', async ()=>{
            mockConfigService.get.mockImplementation((key)=>{
                if (key === 'AI_CATALOG_STORAGE_PATH') return 'config/ai-catalog.json';
                return undefined;
            });
            mockReadFile.mockRejectedValue(new Error('Network error'));
            await service.onModuleInit();
            expect(service.getDefaultAiCatalog()).toEqual({});
        });
        it('should reset catalog to empty object when storage returns invalid JSON', async ()=>{
            mockConfigService.get.mockImplementation((key)=>{
                if (key === 'AI_CATALOG_STORAGE_PATH') return 'config/ai-catalog.json';
                return undefined;
            });
            mockReadFile.mockResolvedValue(_stream.Readable.from([
                Buffer.from('not valid json')
            ]));
            await service.onModuleInit();
            expect(service.getDefaultAiCatalog()).toEqual({});
        });
        it('should reset catalog to empty object when payload fails Zod validation', async ()=>{
            const invalidCatalog = JSON.stringify({
                badProvider: {
                    models: 'not-an-array'
                }
            });
            mockConfigService.get.mockImplementation((key)=>{
                if (key === 'AI_CATALOG_STORAGE_PATH') return 'config/ai-catalog.json';
                return undefined;
            });
            mockReadFile.mockResolvedValue(_stream.Readable.from([
                Buffer.from(invalidCatalog)
            ]));
            await service.onModuleInit();
            expect(service.getDefaultAiCatalog()).toEqual({});
        });
    });
});

//# sourceMappingURL=default-ai-catalog.service.spec.js.map