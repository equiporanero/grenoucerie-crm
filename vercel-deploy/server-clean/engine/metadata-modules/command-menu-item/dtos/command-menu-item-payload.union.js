"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandMenuItemPayloadUnion", {
    enumerable: true,
    get: function() {
        return CommandMenuItemPayloadUnion;
    }
});
const _graphql = require("@nestjs/graphql");
const _objectmetadatacommandmenuitempayloaddto = require("./object-metadata-command-menu-item-payload.dto");
const _pathcommandmenuitempayloaddto = require("./path-command-menu-item-payload.dto");
const CommandMenuItemPayloadUnion = (0, _graphql.createUnionType)({
    name: 'CommandMenuItemPayload',
    types: ()=>[
            _pathcommandmenuitempayloaddto.PathCommandMenuItemPayloadDTO,
            _objectmetadatacommandmenuitempayloaddto.ObjectMetadataCommandMenuItemPayloadDTO
        ],
    resolveType (payload) {
        if ('path' in payload) {
            return _pathcommandmenuitempayloaddto.PathCommandMenuItemPayloadDTO;
        }
        if ('objectMetadataItemId' in payload) {
            return _objectmetadatacommandmenuitempayloaddto.ObjectMetadataCommandMenuItemPayloadDTO;
        }
        return undefined;
    }
});

//# sourceMappingURL=command-menu-item-payload.union.js.map