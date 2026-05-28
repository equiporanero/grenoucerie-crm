"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EntitySchemaColumnFactory", {
    enumerable: true,
    get: function() {
        return EntitySchemaColumnFactory;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _relationtypeinterface = require("../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _computecolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _isenumfieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-enum-field-metadata-type.util");
const _serializedefaultvalue = require("../../metadata-modules/field-metadata/utils/serialize-default-value");
const _isfieldmetadataoftypeutil = require("../../utils/is-field-metadata-of-type.util");
const _fieldmetadatatypetocolumntypeutil = require("../../workspace-manager/workspace-migration/workspace-migration-runner/utils/field-metadata-type-to-column-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EntitySchemaColumnFactory = class EntitySchemaColumnFactory {
    create(objectMetadata, fieldMetadataMaps) {
        let entitySchemaColumnMap = {};
        const fieldMetadataCollection = objectMetadata.fieldIds.map((fieldId)=>fieldMetadataMaps.byId[fieldId]).filter(_utils.isDefined);
        for (const fieldMetadata of fieldMetadataCollection){
            const key = fieldMetadata.name;
            const isRelation = (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(fieldMetadata, _types.FieldMetadataType.RELATION) || (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(fieldMetadata, _types.FieldMetadataType.MORPH_RELATION);
            if (isRelation) {
                const isManyToOneRelation = fieldMetadata.settings?.relationType === _relationtypeinterface.RelationType.MANY_TO_ONE;
                if (!isManyToOneRelation) {
                    continue;
                }
                const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                    name: fieldMetadata.name
                });
                entitySchemaColumnMap[joinColumnName] = {
                    name: joinColumnName,
                    type: 'uuid',
                    nullable: fieldMetadata.isNullable ?? false
                };
                continue;
            }
            if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
                const compositeColumns = this.createCompositeColumns(fieldMetadata);
                entitySchemaColumnMap = {
                    ...entitySchemaColumnMap,
                    ...compositeColumns
                };
                continue;
            }
            const columnType = (0, _fieldmetadatatypetocolumntypeutil.fieldMetadataTypeToColumnType)(fieldMetadata.type);
            const defaultValue = (0, _serializedefaultvalue.serializeDefaultValue)(fieldMetadata.defaultValue);
            entitySchemaColumnMap[key] = {
                name: key,
                type: columnType,
                precision: fieldMetadata.type === _types.FieldMetadataType.DATE_TIME ? 3 : undefined,
                // TODO: We should double check that
                primary: key === 'id',
                nullable: fieldMetadata.isNullable ?? false,
                createDate: key === 'createdAt',
                updateDate: key === 'updatedAt',
                deleteDate: key === 'deletedAt',
                array: fieldMetadata.type === _types.FieldMetadataType.MULTI_SELECT,
                default: defaultValue
            };
            if ((0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(fieldMetadata.type)) {
                const values = fieldMetadata.options?.map((option)=>option.value);
                if (values && values.length > 0) {
                    entitySchemaColumnMap[key].enum = values;
                }
            }
        }
        return entitySchemaColumnMap;
    }
    createCompositeColumns(fieldMetadata) {
        const entitySchemaColumnMap = {};
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
        if (!compositeType) {
            throw new Error(`Composite type ${fieldMetadata.type} is not defined in compositeTypeDefinitions`);
        }
        for (const compositeProperty of compositeType.properties){
            const columnName = (0, _computecolumnnameutil.computeCompositeColumnName)(fieldMetadata.name, compositeProperty);
            const columnType = (0, _fieldmetadatatypetocolumntypeutil.fieldMetadataTypeToColumnType)(compositeProperty.type);
            const defaultValue = (0, _serializedefaultvalue.serializeDefaultValue)(// @ts-expect-error legacy noImplicitAny
            fieldMetadata.defaultValue?.[compositeProperty.name]);
            entitySchemaColumnMap[columnName] = {
                name: columnName,
                type: columnType,
                nullable: compositeProperty.isRequired,
                default: defaultValue
            };
            if ((0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(compositeProperty.type)) {
                const values = compositeProperty.options?.map((option)=>option.value);
                if (values && values.length > 0) {
                    entitySchemaColumnMap[columnName].enum = values;
                }
            }
        }
        return entitySchemaColumnMap;
    }
};
EntitySchemaColumnFactory = _ts_decorate([
    (0, _common.Injectable)()
], EntitySchemaColumnFactory);

//# sourceMappingURL=entity-schema-column.factory.js.map