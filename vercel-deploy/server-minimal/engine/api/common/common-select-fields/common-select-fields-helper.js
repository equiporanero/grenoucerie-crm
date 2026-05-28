"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonSelectFieldsHelper", {
    enumerable: true,
    get: function() {
        return CommonSelectFieldsHelper;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _getallselectablefieldsutil = require("./utils/get-all-selectable-fields.util");
const _getisflatfieldajoincolumnutil = require("./utils/get-is-flat-field-a-join-column.util");
const _getisflatfieldajunctionrelationfield = require("./utils/get-is-flat-field-a-junction-relation-field");
const _maxdepthconstant = require("../../rest/input-request-parsers/constants/max-depth.constant");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _isflatfieldmetadataoftypeutil = require("../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommonSelectFieldsHelper = class CommonSelectFieldsHelper {
    getRelationsAndRelationsSelectFields({ flatObjectMetadataMaps, flatFieldMetadataMaps, flatObjectMetadata, objectsPermissions, depth, onlyUseLabelIdentifierFieldsInRelations = false, currentDepthLevelIsAJunctionTable = false, recurseIntoJunctionTableRelations = false }) {
        if (!(0, _utils.isDefined)(depth) || depth === 0) return {};
        let relationsSelectFields = {};
        for (const fieldId of flatObjectMetadata.fieldIds){
            const flatField = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityMaps: flatFieldMetadataMaps,
                flatEntityId: fieldId
            });
            if (!(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatField, _types.FieldMetadataType.RELATION) && !(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatField, _types.FieldMetadataType.MORPH_RELATION)) {
                continue;
            }
            if (currentDepthLevelIsAJunctionTable) {
                const fieldIsJunctionRelation = (0, _getisflatfieldajunctionrelationfield.getIsFlatFieldAJunctionRelationField)({
                    flatField
                });
                if (!fieldIsJunctionRelation) {
                    continue;
                }
            }
            const relationTargetObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityMaps: flatObjectMetadataMaps,
                flatEntityId: flatField.relationTargetObjectMetadataId
            });
            const relationFieldSelectFields = (0, _getallselectablefieldsutil.getAllSelectableFields)({
                restrictedFields: objectsPermissions[relationTargetObjectMetadata.id].restrictedFields,
                flatObjectMetadata: relationTargetObjectMetadata,
                flatFieldMetadataMaps,
                onlyUseLabelIdentifierFieldsInRelations
            });
            if (Object.keys(relationFieldSelectFields).length === 0) continue;
            const flatFieldIsJoinColumn = (0, _getisflatfieldajoincolumnutil.getIsFlatFieldAJoinColumn)({
                flatField
            });
            const isFirstDepthLevel = depth === _maxdepthconstant.MAX_DEPTH && (0, _utils.isDefined)(flatField.relationTargetObjectMetadataId);
            const shouldRecurseIntoRelation = isFirstDepthLevel || flatFieldIsJoinColumn && recurseIntoJunctionTableRelations;
            const nextLevelIsAJunctionTable = flatFieldIsJoinColumn;
            if (shouldRecurseIntoRelation) {
                const nestedRelationFieldSelectFields = this.getRelationsAndRelationsSelectFields({
                    flatObjectMetadataMaps,
                    flatFieldMetadataMaps,
                    flatObjectMetadata: relationTargetObjectMetadata,
                    objectsPermissions,
                    depth: 1,
                    onlyUseLabelIdentifierFieldsInRelations,
                    currentDepthLevelIsAJunctionTable: nextLevelIsAJunctionTable,
                    recurseIntoJunctionTableRelations
                });
                relationsSelectFields[flatField.name] = {
                    ...relationFieldSelectFields,
                    ...nestedRelationFieldSelectFields
                };
            } else {
                relationsSelectFields[flatField.name] = relationFieldSelectFields;
            }
        }
        return relationsSelectFields;
    }
    constructor(){
        this.computeFromDepth = ({ objectsPermissions, flatObjectMetadataMaps, flatFieldMetadataMaps, flatObjectMetadata, depth, onlyUseLabelIdentifierFieldsInRelations = false, recurseIntoJunctionTableRelations = false })=>{
            const restrictedFields = objectsPermissions[flatObjectMetadata.id].restrictedFields;
            const relationsSelectFields = this.getRelationsAndRelationsSelectFields({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata,
                objectsPermissions,
                depth,
                onlyUseLabelIdentifierFieldsInRelations,
                recurseIntoJunctionTableRelations
            });
            const selectableFields = (0, _getallselectablefieldsutil.getAllSelectableFields)({
                restrictedFields,
                flatObjectMetadata,
                flatFieldMetadataMaps
            });
            return {
                ...selectableFields,
                ...relationsSelectFields
            };
        };
    }
};
CommonSelectFieldsHelper = _ts_decorate([
    (0, _common.Injectable)()
], CommonSelectFieldsHelper);

//# sourceMappingURL=common-select-fields-helper.js.map