"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateFrontComponentInputToFlatFrontComponentToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateFrontComponentInputToFlatFrontComponentToUpdateOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _flatfrontcomponenteditablepropertiesconstant = require("../constants/flat-front-component-editable-properties.constant");
const _frontcomponentexception = require("../../front-component/front-component.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateFrontComponentInputToFlatFrontComponentToUpdateOrThrow = ({ flatFrontComponentMaps, updateFrontComponentInput })=>{
    const existingFlatFrontComponent = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: updateFrontComponentInput.id,
        flatEntityMaps: flatFrontComponentMaps
    });
    if (!(0, _utils.isDefined)(existingFlatFrontComponent)) {
        throw new _frontcomponentexception.FrontComponentException('Front component not found', _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_FOUND);
    }
    return {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatFrontComponent,
            properties: [
                ..._flatfrontcomponenteditablepropertiesconstant.FLAT_FRONT_COMPONENT_EDITABLE_PROPERTIES
            ],
            update: updateFrontComponentInput.update
        }),
        updatedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-update-front-component-input-to-flat-front-component-to-update-or-throw.util.js.map