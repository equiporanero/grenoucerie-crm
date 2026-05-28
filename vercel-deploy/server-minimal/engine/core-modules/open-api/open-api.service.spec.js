"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _accesstokenservice = require("../auth/token/services/access-token.service");
const _featureflagservice = require("../feature-flag/services/feature-flag.service");
const _openapiservice = require("./open-api.service");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _objectmetadataservice = require("../../metadata-modules/object-metadata/object-metadata.service");
describe('OpenApiService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _openapiservice.OpenApiService,
                {
                    provide: _accesstokenservice.AccessTokenService,
                    useValue: {}
                },
                {
                    provide: _objectmetadataservice.ObjectMetadataService,
                    useValue: {}
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {}
                },
                {
                    provide: _featureflagservice.FeatureFlagService,
                    useValue: {}
                },
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_openapiservice.OpenApiService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=open-api.service.spec.js.map