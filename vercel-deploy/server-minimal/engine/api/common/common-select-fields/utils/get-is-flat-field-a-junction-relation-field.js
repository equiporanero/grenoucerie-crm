"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getIsFlatFieldAJunctionRelationField", {
    enumerable: true,
    get: function() {
        return getIsFlatFieldAJunctionRelationField;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const getIsFlatFieldAJunctionRelationField = ({ flatField })=>{
    const isJunctionRelationField = (0, _utils.isDefined)(flatField.settings) && 'relationType' in flatField.settings && flatField.settings.relationType === _types.RelationType.MANY_TO_ONE;
    // TODO: refactor this when we remove hard-coded activity relations
    const isActivityRelationField = flatField.name === 'note' || flatField.name === 'task';
    return isJunctionRelationField || isActivityRelationField;
};

//# sourceMappingURL=get-is-flat-field-a-junction-relation-field.js.map