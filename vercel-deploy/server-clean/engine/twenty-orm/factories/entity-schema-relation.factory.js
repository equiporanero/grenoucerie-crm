"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EntitySchemaRelationFactory", {
    enumerable: true,
    get: function() {
        return EntitySchemaRelationFactory;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _determineschemarelationdetailsutil = require("../utils/determine-schema-relation-details.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EntitySchemaRelationFactory = class EntitySchemaRelationFactory {
    create(objectMetadata, objectMetadataMaps, fieldMetadataMaps) {
        const entitySchemaRelationMap = {};
        const fieldMetadatas = objectMetadata.fieldIds.map((fieldId)=>fieldMetadataMaps.byId[fieldId]).filter(_utils.isDefined);
        for (const fieldMetadata of fieldMetadatas){
            if (!this.isRelationField(fieldMetadata)) {
                continue;
            }
            const relationDetails = (0, _determineschemarelationdetailsutil.determineSchemaRelationDetails)(fieldMetadata, objectMetadataMaps, fieldMetadataMaps);
            entitySchemaRelationMap[fieldMetadata.name] = {
                type: relationDetails.relationType,
                target: relationDetails.target,
                inverseSide: relationDetails.inverseSide,
                joinColumn: relationDetails.joinColumn
            };
        }
        return entitySchemaRelationMap;
    }
    isRelationField(fieldMetadata) {
        return fieldMetadata.type === _types.FieldMetadataType.RELATION || fieldMetadata.type === _types.FieldMetadataType.MORPH_RELATION;
    }
    constructor(){}
};
EntitySchemaRelationFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], EntitySchemaRelationFactory);

//# sourceMappingURL=entity-schema-relation.factory.js.map