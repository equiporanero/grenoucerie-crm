"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteFrontComponentInputToFlatFrontComponentOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteFrontComponentInputToFlatFrontComponentOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _frontcomponentexception = require("../../front-component/front-component.exception");
const fromDeleteFrontComponentInputToFlatFrontComponentOrThrow = ({ flatFrontComponentMaps, frontComponentId })=>{
    const existingFlatFrontComponent = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: frontComponentId,
        flatEntityMaps: flatFrontComponentMaps
    });
    if (!(0, _utils.isDefined)(existingFlatFrontComponent)) {
        throw new _frontcomponentexception.FrontComponentException('Front component not found', _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_FOUND);
    }
    return existingFlatFrontComponent;
};

//# sourceMappingURL=from-delete-front-component-input-to-flat-front-component-or-throw.util.js.map