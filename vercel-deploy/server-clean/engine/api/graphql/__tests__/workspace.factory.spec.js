"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _scalarsexplorerservice = require("../services/scalars-explorer.service");
const _workspacegraphqlschemasdlservice = require("../workspace-graphql-schema-sdl/workspace-graphql-schema-sdl.service");
const _workspaceresolverfactory = require("../workspace-resolver-builder/workspace-resolver.factory");
const _workspaceschemafactory = require("../workspace-schema.factory");
describe('WorkspaceSchemaFactory', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workspaceschemafactory.WorkspaceSchemaFactory,
                {
                    provide: _scalarsexplorerservice.ScalarsExplorerService,
                    useValue: {}
                },
                {
                    provide: _workspaceresolverfactory.WorkspaceResolverFactory,
                    useValue: {}
                },
                {
                    provide: _workspacegraphqlschemasdlservice.WorkspaceGraphqlSchemaSDLService,
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_workspaceschemafactory.WorkspaceSchemaFactory);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=workspace.factory.spec.js.map