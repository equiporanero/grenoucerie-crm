"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EntitySchemaFactory", {
    enumerable: true,
    get: function() {
        return EntitySchemaFactory;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _entityschemacolumnfactory = require("./entity-schema-column.factory");
const _entityschemarelationfactory = require("./entity-schema-relation.factory");
const _computetablenameutil = require("../../utils/compute-table-name.util");
const _getworkspaceschemanameutil = require("../../workspace-datasource/utils/get-workspace-schema-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EntitySchemaFactory = class EntitySchemaFactory {
    create(workspaceId, objectMetadata, objectMetadataMaps, fieldMetadataMaps) {
        const columns = this.entitySchemaColumnFactory.create(objectMetadata, fieldMetadataMaps);
        const relations = this.entitySchemaRelationFactory.create(objectMetadata, objectMetadataMaps, fieldMetadataMaps);
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        const entitySchema = new _typeorm.EntitySchema({
            name: objectMetadata.nameSingular,
            tableName: (0, _computetablenameutil.computeTableName)(objectMetadata.nameSingular, objectMetadata.isCustom),
            columns,
            relations,
            schema: schemaName
        });
        return entitySchema;
    }
    constructor(entitySchemaColumnFactory, entitySchemaRelationFactory){
        this.entitySchemaColumnFactory = entitySchemaColumnFactory;
        this.entitySchemaRelationFactory = entitySchemaRelationFactory;
    }
};
EntitySchemaFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _entityschemacolumnfactory.EntitySchemaColumnFactory === "undefined" ? Object : _entityschemacolumnfactory.EntitySchemaColumnFactory,
        typeof _entityschemarelationfactory.EntitySchemaRelationFactory === "undefined" ? Object : _entityschemarelationfactory.EntitySchemaRelationFactory
    ])
], EntitySchemaFactory);

//# sourceMappingURL=entity-schema.factory.js.map