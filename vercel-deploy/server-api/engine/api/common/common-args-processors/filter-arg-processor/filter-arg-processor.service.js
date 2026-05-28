"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilterArgProcessorService", {
    enumerable: true,
    get: function() {
        return FilterArgProcessorService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _maxrelationfilterdepthconstant = require("./constants/max-relation-filter-depth.constant");
const _validateandtransformoperatorandvalueutil = require("./utils/validate-and-transform-operator-and-value.util");
const _commonqueryrunnerexception = require("../../common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../common-query-runners/errors/standard-error-message.constant");
const _iscompositefieldmetadatatypeutil = require("../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _isflatfieldmetadataoftypeutil = require("../../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function throwUseJoinColumnInstead(key) {
    const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
        name: key
    });
    throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Cannot filter by relation field "${key}": use "${joinColumnName}" instead`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
        userFriendlyMessage: /*i18n*/ {
            id: "bNNDED",
            message: 'Invalid filter: use "{joinColumnName}" to filter by this relation field',
            values: {
                joinColumnName: joinColumnName
            }
        }
    });
}
let FilterArgProcessorService = class FilterArgProcessorService {
    process({ filter, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps }) {
        if (!(0, _utils.isDefined)(filter)) {
            return filter;
        }
        const { fieldIdByName, fieldIdByJoinColumnName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        return this.validateAndTransformFilter(filter, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, fieldIdByName, fieldIdByJoinColumnName, 0);
    }
    validateAndTransformFilter(filterObject, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, fieldIdByName, fieldIdByJoinColumnName, depth) {
        const transformedFilter = {};
        for (const [key, value] of Object.entries(filterObject)){
            if (key === 'and' || key === 'or') {
                transformedFilter[key] = value.map((nestedFilter)=>this.validateAndTransformFilter(nestedFilter, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, fieldIdByName, fieldIdByJoinColumnName, depth));
                continue;
            }
            if (key === 'not') {
                transformedFilter[key] = this.validateAndTransformFilter(value, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, fieldIdByName, fieldIdByJoinColumnName, depth);
                continue;
            }
            const fieldMetadataForRelation = this.resolveRelationFieldMetadataByName({
                key,
                fieldIdByName,
                fieldIdByJoinColumnName,
                flatFieldMetadataMaps
            });
            if ((0, _utils.isDefined)(fieldMetadataForRelation)) {
                transformedFilter[key] = this.validateAndTransformRelationFilter(key, value, fieldMetadataForRelation, flatObjectMetadataMaps, flatFieldMetadataMaps, depth);
                continue;
            }
            transformedFilter[key] = this.validateAndTransformFieldFilter(key, value, flatObjectMetadata, flatFieldMetadataMaps, fieldIdByName, fieldIdByJoinColumnName);
        }
        return transformedFilter;
    }
    resolveRelationFieldMetadataByName({ key, fieldIdByName, fieldIdByJoinColumnName, flatFieldMetadataMaps }) {
        const resolvedByName = fieldIdByName[key];
        if (!(0, _utils.isDefined)(resolvedByName) || (0, _utils.isDefined)(fieldIdByJoinColumnName[key])) {
            return undefined;
        }
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: resolvedByName,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(fieldMetadata)) {
            return undefined;
        }
        if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fieldMetadata, _types.FieldMetadataType.RELATION) || (0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
            return fieldMetadata;
        }
        return undefined;
    }
    validateAndTransformRelationFilter(key, filterValue, fieldMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, depth) {
        if (fieldMetadata.settings?.relationType !== _types.RelationType.MANY_TO_ONE) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Cannot filter by relation field "${key}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
                userFriendlyMessage: /*i18n*/ {
                    id: "rpkTUe",
                    message: 'Invalid filter: filtering by relation field "{key}" is not supported',
                    values: {
                        key: key
                    }
                }
            });
        }
        if (typeof filterValue !== 'object' || filterValue === null) {
            throwUseJoinColumnInstead(key);
        }
        const targetObjectMetadataId = fieldMetadata.relationTargetObjectMetadataId;
        if (!(0, _utils.isDefined)(flatObjectMetadataMaps) || !(0, _utils.isDefined)(targetObjectMetadataId)) {
            throwUseJoinColumnInstead(key);
        }
        const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: targetObjectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(targetObjectMetadata)) {
            throwUseJoinColumnInstead(key);
        }
        if (depth >= _maxrelationfilterdepthconstant.MAX_RELATION_FILTER_DEPTH) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Relation filter nesting deeper than ${_maxrelationfilterdepthconstant.MAX_RELATION_FILTER_DEPTH} hop is not supported`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
                userFriendlyMessage: /*i18n*/ {
                    id: "L8AY9P",
                    message: "Relation filters can only traverse one relation deep"
                }
            });
        }
        const { fieldIdByName: targetFieldIdByName, fieldIdByJoinColumnName: targetFieldIdByJoinColumnName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, targetObjectMetadata);
        return this.validateAndTransformFilter(filterValue, targetObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, targetFieldIdByName, targetFieldIdByJoinColumnName, depth + 1);
    }
    validateAndTransformFieldFilter(key, filterValue, flatObjectMetadata, flatFieldMetadataMaps, fieldIdByName, fieldIdByJoinColumnName) {
        const fieldMetadataId = fieldIdByName[key] ?? fieldIdByJoinColumnName[key];
        if (!(0, _utils.isDefined)(fieldMetadataId)) {
            const nameSingular = flatObjectMetadata.nameSingular;
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Object ${flatObjectMetadata.nameSingular} doesn't have any "${key}" field.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
                userFriendlyMessage: /*i18n*/ {
                    id: "+ECOke",
                    message: 'Invalid filter : {nameSingular} object doesn\'t have any "{key}" field.',
                    values: {
                        nameSingular: nameSingular,
                        key: key
                    }
                }
            });
        }
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!fieldMetadata) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Field metadata not found for field ${key}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
            return this.validateAndTransformCompositeFieldFilter(fieldMetadata, filterValue);
        }
        return (0, _validateandtransformoperatorandvalueutil.validateAndTransformOperatorAndValue)(key, filterValue, fieldMetadata);
    }
    validateAndTransformCompositeFieldFilter(fieldMetadata, filterValue) {
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
        if (!compositeType) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Composite type definition not found for type: ${fieldMetadata.type}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const transformedFilter = {};
        for (const [subFieldKey, subFieldFilter] of Object.entries(filterValue)){
            const subFieldMetadata = compositeType.properties.find((property)=>property.name === subFieldKey);
            if (!subFieldMetadata) {
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Sub field "${subFieldKey}" not found for composite type: ${fieldMetadata.type}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                });
            }
            transformedFilter[subFieldKey] = (0, _validateandtransformoperatorandvalueutil.validateAndTransformOperatorAndValue)(`${fieldMetadata.name}.${subFieldKey}`, subFieldFilter, {
                ...fieldMetadata,
                type: subFieldMetadata.type
            });
        }
        return transformedFilter;
    }
};
FilterArgProcessorService = _ts_decorate([
    (0, _common.Injectable)()
], FilterArgProcessorService);

//# sourceMappingURL=filter-arg-processor.service.js.map