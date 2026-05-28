"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "instantiateTypeGenerators", {
    enumerable: true,
    get: function() {
        return instantiateTypeGenerators;
    }
});
const _argstypegenerator = require("./args-type/args-type.generator");
const _compositefieldmetadatagqlenumtypegenerator = require("./enum-types/composite-field-metadata-gql-enum-type.generator");
const _enumfieldmetadatagqlenumtypegenerator = require("./enum-types/enum-field-metadata-gql-enum-type.generator");
const _compositefieldmetadatagqlinputtypegenerator = require("./input-types/composite-field-metadata-gql-input-type.generator");
const _compositefieldmetadatacreategqlinputtypegenerator = require("./input-types/create-input/composite-field-metadata-create-gql-input-type.generator");
const _objectmetadatacreategqlinputtypegenerator = require("./input-types/create-input/object-metadata-create-gql-input-type.generator");
const _compositefieldmetadatafiltergqlinputtypesgenerator = require("./input-types/filter-input/composite-field-metadata-filter-gql-input-types.generator");
const _objectmetadatafiltergqlinputtypegenerator = require("./input-types/filter-input/object-metadata-filter-gql-input-type.generator");
const _compositefieldmetadatagroupbygqlinputtypegenerator = require("./input-types/group-by-input/composite-field-metadata-group-by-gql-input-type.generator");
const _groupbydategranularitygqlinputtypegenerator = require("./input-types/group-by-input/group-by-date-granularity-gql-input-type.generator");
const _objectmetadatagroupbygqlinputtypegenerator = require("./input-types/group-by-input/object-metadata-group-by-gql-input-type.generator");
const _objectmetadatagqlinputtypegenerator = require("./input-types/object-metadata-gql-input-type.generator");
const _compositefieldmetadataorderbygqlinputtypegenerator = require("./input-types/order-by-input/composite-field-metadata-order-by-gql-input-type.generator");
const _objectmetadataorderbybasegenerator = require("./input-types/order-by-input/object-metadata-order-by-base.generator");
const _objectmetadataorderbygqlinputtypegenerator = require("./input-types/order-by-input/object-metadata-order-by-gql-input-type.generator");
const _objectmetadataorderbywithgroupbygqlinputtypegenerator = require("./input-types/order-by-input/object-metadata-order-by-with-group-by-gql-input-type.generator");
const _relationconnectgqlinputtypegenerator = require("./input-types/relation-connect-gql-input-type.generator");
const _relationfieldmetadatagqltypegenerator = require("./input-types/relation-field-metadata-gql-type.generator");
const _compositefieldmetadataupdategqlinputtypegenerator = require("./input-types/update-input/composite-field-metadata-update-gql-input-type.generator");
const _objectmetadataupdategqlinputtypegenerator = require("./input-types/update-input/object-metadata-update-gql-input-type.generator");
const _aggregationtypegenerator = require("./object-types/aggregation-type.generator");
const _compositefieldmetadatagqlobjecttypegenerator = require("./object-types/composite-field-metadata-gql-object-type.generator");
const _connectiongqlobjecttypegenerator = require("./object-types/connection-gql-object-type.generator");
const _edgegqlobjecttypegenerator = require("./object-types/edge-gql-object-type.generator");
const _groupbyconnectiongqlobjecttypegenerator = require("./object-types/group-by-connection-gql-object-type.generator");
const _objectmetadatagqlobjecttypegenerator = require("./object-types/object-metadata-gql-object-type.generator");
const _objectmetadatawithrelationsgqlobjecttypegenerator = require("./object-types/object-metadata-with-relations-gql-object-type.generator");
const _relationfieldmetadatagqlobjecttypegenerator = require("./object-types/relation-field-metadata-gql-object-type.generator");
const _mutationtypegenerator = require("./root-types/mutation-type.generator");
const _querytypegenerator = require("./root-types/query-type.generator");
const _roottypegenerator = require("./root-types/root-type.generator");
const instantiateTypeGenerators = (gqlTypesStorage, typeMapperService, workspaceResolverBuilderService)=>{
    const argsTypeGenerator = new _argstypegenerator.ArgsTypeGenerator(gqlTypesStorage);
    const relationFieldMetadataGqlObjectTypeGenerator = new _relationfieldmetadatagqlobjecttypegenerator.RelationFieldMetadataGqlObjectTypeGenerator(typeMapperService);
    const relationFieldMetadataGqlInputTypeGenerator = new _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator(typeMapperService, gqlTypesStorage);
    const compositeFieldMetadataCreateGqlInputTypeGenerator = new _compositefieldmetadatacreategqlinputtypegenerator.CompositeFieldMetadataCreateGqlInputTypeGenerator(gqlTypesStorage, typeMapperService);
    const compositeFieldMetadataUpdateGqlInputTypeGenerator = new _compositefieldmetadataupdategqlinputtypegenerator.CompositeFieldMetadataUpdateGqlInputTypeGenerator(gqlTypesStorage, typeMapperService);
    const compositeFieldMetadataFilterGqlInputTypeGenerator = new _compositefieldmetadatafiltergqlinputtypesgenerator.CompositeFieldMetadataFilterGqlInputTypeGenerator(gqlTypesStorage, typeMapperService);
    const compositeFieldMetadataOrderByGqlInputTypeGenerator = new _compositefieldmetadataorderbygqlinputtypegenerator.CompositeFieldMetadataOrderByGqlInputTypeGenerator(gqlTypesStorage, typeMapperService);
    const compositeFieldMetadataGroupByGqlInputTypeGenerator = new _compositefieldmetadatagroupbygqlinputtypegenerator.CompositeFieldMetadataGroupByGqlInputTypeGenerator(gqlTypesStorage, typeMapperService);
    const objectMetadataOrderByBaseGenerator = new _objectmetadataorderbybasegenerator.ObjectMetadataOrderByBaseGenerator(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, typeMapperService);
    const rootTypeGenerator = new _roottypegenerator.RootTypeGenerator(gqlTypesStorage, argsTypeGenerator, workspaceResolverBuilderService);
    return {
        enumFieldMetadataGqlEnumTypeGenerator: new _enumfieldmetadatagqlenumtypegenerator.EnumFieldMetadataGqlEnumTypeGenerator(gqlTypesStorage),
        compositeFieldMetadataGqlEnumTypeGenerator: new _compositefieldmetadatagqlenumtypegenerator.CompositeFieldMetadataGqlEnumTypeGenerator(gqlTypesStorage),
        compositeFieldMetadataGqlObjectTypeGenerator: new _compositefieldmetadatagqlobjecttypegenerator.CompositeFieldMetadataGqlObjectTypeGenerator(gqlTypesStorage, typeMapperService),
        compositeFieldMetadataGqlInputTypeGenerator: new _compositefieldmetadatagqlinputtypegenerator.CompositeFieldMetadataGqlInputTypeGenerator(compositeFieldMetadataCreateGqlInputTypeGenerator, compositeFieldMetadataUpdateGqlInputTypeGenerator, compositeFieldMetadataFilterGqlInputTypeGenerator, compositeFieldMetadataOrderByGqlInputTypeGenerator, compositeFieldMetadataGroupByGqlInputTypeGenerator),
        objectMetadataGqlObjectTypeGenerator: new _objectmetadatagqlobjecttypegenerator.ObjectMetadataGqlObjectTypeGenerator(relationFieldMetadataGqlObjectTypeGenerator, gqlTypesStorage, typeMapperService),
        objectMetadataGqlInputTypeGenerator: new _objectmetadatagqlinputtypegenerator.ObjectMetadataGqlInputTypeGenerator(new _objectmetadatacreategqlinputtypegenerator.ObjectMetadataCreateGqlInputTypeGenerator(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, typeMapperService), new _objectmetadataupdategqlinputtypegenerator.ObjectMetadataUpdateGqlInputTypeGenerator(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, typeMapperService), new _objectmetadatafiltergqlinputtypegenerator.ObjectMetadataFilterGqlInputTypeGenerator(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, typeMapperService), new _objectmetadataorderbygqlinputtypegenerator.ObjectMetadataOrderByGqlInputTypeGenerator(gqlTypesStorage, objectMetadataOrderByBaseGenerator), new _objectmetadataorderbywithgroupbygqlinputtypegenerator.ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, objectMetadataOrderByBaseGenerator, typeMapperService), new _objectmetadatagroupbygqlinputtypegenerator.ObjectMetadataGroupByGqlInputTypeGenerator(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, typeMapperService)),
        edgeGqlObjectTypeGenerator: new _edgegqlobjecttypegenerator.EdgeGqlObjectTypeGenerator(gqlTypesStorage),
        connectionGqlObjectTypeGenerator: new _connectiongqlobjecttypegenerator.ConnectionGqlObjectTypeGenerator(new _aggregationtypegenerator.AggregationObjectTypeGenerator(), gqlTypesStorage),
        groupByConnectionGqlObjectTypeGenerator: new _groupbyconnectiongqlobjecttypegenerator.GroupByConnectionGqlObjectTypeGenerator(gqlTypesStorage),
        objectMetadataWithRelationsGqlObjectTypeGenerator: new _objectmetadatawithrelationsgqlobjecttypegenerator.ObjectMetadataWithRelationsGqlObjectTypeGenerator(argsTypeGenerator, gqlTypesStorage),
        relationConnectGqlInputTypeGenerator: new _relationconnectgqlinputtypegenerator.RelationConnectGqlInputTypeGenerator(typeMapperService, gqlTypesStorage),
        groupByDateGranularityInputTypeGenerator: new _groupbydategranularitygqlinputtypegenerator.GroupByDateGranularityInputTypeGenerator(gqlTypesStorage),
        queryTypeGenerator: new _querytypegenerator.QueryTypeGenerator(rootTypeGenerator, gqlTypesStorage),
        mutationTypeGenerator: new _mutationtypegenerator.MutationTypeGenerator(rootTypeGenerator, gqlTypesStorage)
    };
};

//# sourceMappingURL=type-generators.js.map