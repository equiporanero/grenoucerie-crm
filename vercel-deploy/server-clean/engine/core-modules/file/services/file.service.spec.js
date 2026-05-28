"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../application/application.entity");
const _filestorageservice = require("../../file-storage/file-storage.service");
const _fileentity = require("../entities/file.entity");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _getworkspacescopedrepositorytokenutil = require("../../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
const _fileservice = require("./file.service");
jest.mock('uuid', ()=>({
        v4: jest.fn(()=>'mocked-uuid')
    }));
describe('FileService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _fileservice.FileService,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {}
                },
                {
                    provide: _jwtwrapperservice.JwtWrapperService,
                    useValue: {}
                },
                {
                    provide: _filestorageservice.FileStorageService,
                    useValue: {}
                },
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_fileentity.FileEntity),
                    useValue: {}
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_applicationentity.ApplicationEntity),
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_fileservice.FileService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=file.service.spec.js.map