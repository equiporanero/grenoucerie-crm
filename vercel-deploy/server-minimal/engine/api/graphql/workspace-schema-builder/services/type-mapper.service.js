"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TypeMapperService", {
    enumerable: true,
    get: function() {
        return TypeMapperService;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _graphql1 = require("graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
const _enum = require("../graphql-types/enum");
const _input = require("../graphql-types/input");
const _filesinputtype = require("../graphql-types/input/files.input-type");
const _multiselectfilterinputtype = require("../graphql-types/input/multi-select-filter.input-type");
const _richtextinputtype = require("../graphql-types/input/rich-text.input-type");
const _selectfilterinputtype = require("../graphql-types/input/select-filter.input-type");
const _tsvectorfilterinputtype = require("../graphql-types/input/ts-vector-filter.input-type");
const _uuidfilterinputtype = require("../graphql-types/input/uuid-filter.input-type");
const _filesobjecttype = require("../graphql-types/object/files.object-type");
const _scalars = require("../graphql-types/scalars");
const _positionscalar = require("../graphql-types/scalars/position.scalar");
const _getnumberfiltertypeutil = require("../utils/get-number-filter-type.util");
const _getnumberscalartypeutil = require("../utils/get-number-scalar-type.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const StringArrayScalarType = new _graphql1.GraphQLList(_graphql1.GraphQLString);
let TypeMapperService = class TypeMapperService {
    mapToPreBuiltGraphQLOutputType({ fieldMetadataType, typeOptions }) {
        if (this.isIdOrRelationType(fieldMetadataType, typeOptions)) {
            return _graphql1.GraphQLID;
        }
        if (fieldMetadataType === _types.FieldMetadataType.NUMBER) {
            return this.getNumberScalarTypeFromOptions(typeOptions);
        }
        if (fieldMetadataType === _types.FieldMetadataType.FILES) {
            return _filesobjecttype.FilesObjectType;
        }
        return this.baseTypeScalarMapping.get(fieldMetadataType);
    }
    mapToPreBuiltGraphQLInputType({ fieldMetadataType, typeOptions }) {
        if (this.isIdOrRelationType(fieldMetadataType, typeOptions)) {
            return _graphql1.GraphQLID;
        }
        if (fieldMetadataType === _types.FieldMetadataType.NUMBER) {
            return this.getNumberScalarTypeFromOptions(typeOptions);
        }
        if (fieldMetadataType === _types.FieldMetadataType.FILES) {
            return _filesinputtype.FilesInputType;
        }
        return this.baseTypeScalarMapping.get(fieldMetadataType);
    }
    isIdOrRelationType(fieldMetadataType, typeOptions) {
        return typeOptions?.isIdField === true || fieldMetadataType === _types.FieldMetadataType.RELATION || fieldMetadataType === _types.FieldMetadataType.MORPH_RELATION;
    }
    getNumberScalarTypeFromOptions(typeOptions) {
        return (0, _getnumberscalartypeutil.getNumberScalarType)(typeOptions?.settings?.dataType ?? _types.NumberDataType.FLOAT);
    }
    mapToFilterType(fieldMetadataType, typeOptions) {
        if (typeOptions?.isIdField || fieldMetadataType === _types.FieldMetadataType.RELATION || fieldMetadataType === _types.FieldMetadataType.MORPH_RELATION) {
            return _uuidfilterinputtype.UUIDFilterType;
        }
        const typeFilterMapping = new Map([
            [
                _types.FieldMetadataType.UUID,
                _uuidfilterinputtype.UUIDFilterType
            ],
            [
                _types.FieldMetadataType.TEXT,
                _input.StringFilterType
            ],
            [
                _types.FieldMetadataType.DATE_TIME,
                _graphql.GraphQLISODateTime
            ],
            [
                _types.FieldMetadataType.DATE,
                _input.DateFilterType
            ],
            [
                _types.FieldMetadataType.BOOLEAN,
                _input.BooleanFilterType
            ],
            [
                _types.FieldMetadataType.NUMBER,
                (0, _getnumberfiltertypeutil.getNumberFilterType)(typeOptions?.settings?.dataType)
            ],
            [
                _types.FieldMetadataType.NUMERIC,
                _input.BigFloatFilterType
            ],
            [
                _types.FieldMetadataType.POSITION,
                _input.FloatFilterType
            ],
            [
                _types.FieldMetadataType.FILES,
                _input.RawJsonFilterType
            ],
            [
                _types.FieldMetadataType.RAW_JSON,
                _input.RawJsonFilterType
            ],
            [
                _types.FieldMetadataType.RICH_TEXT,
                _richtextinputtype.RichTextFilterType
            ],
            [
                _types.FieldMetadataType.ARRAY,
                _input.ArrayFilterType
            ],
            [
                _types.FieldMetadataType.MULTI_SELECT,
                _multiselectfilterinputtype.MultiSelectFilterType
            ],
            [
                _types.FieldMetadataType.SELECT,
                _selectfilterinputtype.SelectFilterType
            ],
            [
                _types.FieldMetadataType.TS_VECTOR,
                _tsvectorfilterinputtype.TSVectorFilterType
            ]
        ]);
        return typeFilterMapping.get(fieldMetadataType);
    }
    mapToOrderByType(fieldMetadataType) {
        const typeOrderByMapping = new Map([
            [
                _types.FieldMetadataType.UUID,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.RELATION,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.MORPH_RELATION,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.TEXT,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.DATE_TIME,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.DATE,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.BOOLEAN,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.NUMBER,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.NUMERIC,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.RATING,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.SELECT,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.MULTI_SELECT,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.POSITION,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.FILES,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.RAW_JSON,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.ARRAY,
                _enum.OrderByDirectionType
            ],
            [
                _types.FieldMetadataType.TS_VECTOR,
                _enum.OrderByDirectionType
            ]
        ]);
        return typeOrderByMapping.get(fieldMetadataType);
    }
    mapToOrderByWithGroupByType(aggregationType) {
        const typeOrderByMapping = new Map([
            [
                _types.AggregateOperations.SUM,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.COUNT,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.COUNT_UNIQUE_VALUES,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.COUNT_EMPTY,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.COUNT_NOT_EMPTY,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.COUNT_TRUE,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.COUNT_FALSE,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.PERCENTAGE_EMPTY,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.PERCENTAGE_NOT_EMPTY,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.MIN,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.MAX,
                _enum.OrderByDirectionType
            ],
            [
                _types.AggregateOperations.AVG,
                _enum.OrderByDirectionType
            ]
        ]);
        return typeOrderByMapping.get(aggregationType);
    }
    constructor(){
        this.baseTypeScalarMapping = new Map([
            [
                _types.FieldMetadataType.UUID,
                _scalars.UUIDScalarType
            ],
            [
                _types.FieldMetadataType.TEXT,
                _graphql1.GraphQLString
            ],
            [
                _types.FieldMetadataType.DATE_TIME,
                _graphql.GraphQLISODateTime
            ],
            [
                _types.FieldMetadataType.DATE,
                _scalars.DateScalarType
            ],
            [
                _types.FieldMetadataType.BOOLEAN,
                _graphql1.GraphQLBoolean
            ],
            [
                _types.FieldMetadataType.NUMERIC,
                _scalars.BigFloatScalarType
            ],
            [
                _types.FieldMetadataType.POSITION,
                _positionscalar.PositionScalarType
            ],
            [
                _types.FieldMetadataType.RAW_JSON,
                _graphqltypejson.default
            ],
            [
                _types.FieldMetadataType.ARRAY,
                StringArrayScalarType
            ],
            [
                _types.FieldMetadataType.TS_VECTOR,
                _scalars.TSVectorScalarType
            ]
        ]);
    }
};
TypeMapperService = _ts_decorate([
    (0, _common.Injectable)()
], TypeMapperService);

//# sourceMappingURL=type-mapper.service.js.map