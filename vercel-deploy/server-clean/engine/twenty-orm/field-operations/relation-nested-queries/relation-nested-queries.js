"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RelationNestedQueries", {
    enumerable: true,
    get: function() {
        return RelationNestedQueries;
    }
});
const _classvalidator = require("class-validator");
const _constants = require("twenty-shared/constants");
const _twentyormexception = require("../../exceptions/twenty-orm.exception");
const _formatConnectRecordNotFoundErrorMessageutil = require("./utils/formatConnectRecordNotFoundErrorMessage.util");
const _computerelationconnectqueryconfigsutil = require("../../utils/compute-relation-connect-query-configs.util");
const _createsqlwheretupleinclauseutils = require("../../utils/create-sql-where-tuple-in-clause.utils");
const _extractnestedrelationfieldsbyentityindexutil = require("../../utils/extract-nested-relation-fields-by-entity-index.util");
const _getassociatedrelationfieldnameutil = require("../../utils/get-associated-relation-field-name.util");
const _getobjectmetadatafromentitytargetutil = require("../../utils/get-object-metadata-from-entity-target.util");
const _getrecordtoconnectfieldsutil = require("../../utils/get-record-to-connect-fields.util");
let RelationNestedQueries = class RelationNestedQueries {
    prepareNestedRelationQueries(entities, target) {
        const entitiesArray = Array.isArray(entities) ? entities : [
            entities
        ];
        const { relationConnectQueryFieldsByEntityIndex, relationDisconnectQueryFieldsByEntityIndex } = (0, _extractnestedrelationfieldsbyentityindexutil.extractNestedRelationFieldsByEntityIndex)(entitiesArray);
        const connectConfig = this.prepareRelationConnect(entitiesArray, target, relationConnectQueryFieldsByEntityIndex);
        return connectConfig.length > 0 || Object.keys(relationDisconnectQueryFieldsByEntityIndex).length > 0 ? [
            connectConfig,
            relationDisconnectQueryFieldsByEntityIndex
        ] : null;
    }
    prepareRelationConnect(entities, target, relationConnectQueryFieldsByEntityIndex) {
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(target, this.internalContext);
        const relationConnectQueryConfigs = (0, _computerelationconnectqueryconfigsutil.computeRelationConnectQueryConfigs)(entities, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps, this.internalContext.flatIndexMaps, relationConnectQueryFieldsByEntityIndex);
        return relationConnectQueryConfigs;
    }
    async processRelationNestedQueries({ entities, relationNestedConfig, queryBuilder }) {
        const entitiesArray = Array.isArray(entities) ? entities : [
            entities
        ];
        const [relationConnectQueryConfigs, relationDisconnectQueryFieldsByEntityIndex] = relationNestedConfig;
        const updatedEntitiesWithDisconnect = this.processRelationDisconnect({
            entities: entitiesArray,
            relationDisconnectQueryFieldsByEntityIndex
        });
        const updatedEntitiesWithConnect = await this.processRelationConnect({
            entities: updatedEntitiesWithDisconnect,
            relationConnectQueryConfigs,
            queryBuilder
        });
        return updatedEntitiesWithConnect;
    }
    async processRelationConnect({ entities, relationConnectQueryConfigs, queryBuilder }) {
        if (relationConnectQueryConfigs.length === 0) return entities;
        const recordsToConnectWithConfig = await this.executeConnectQueries(relationConnectQueryConfigs, queryBuilder);
        const updatedEntities = this.updateEntitiesWithRecordToConnectId(entities, recordsToConnectWithConfig);
        return updatedEntities;
    }
    async executeConnectQueries(relationConnectQueryConfigs, queryBuilder) {
        const allRecordsToConnectWithConfig = [];
        for (const connectQueryConfig of relationConnectQueryConfigs){
            const { clause, parameters } = (0, _createsqlwheretupleinclauseutils.createSqlWhereTupleInClause)(connectQueryConfig.recordToConnectConditions, connectQueryConfig.targetObjectName);
            queryBuilder.expressionMap.aliases = [];
            queryBuilder.expressionMap.mainAlias = undefined;
            const recordsToConnect = await queryBuilder.select((0, _getrecordtoconnectfieldsutil.getRecordToConnectFields)(connectQueryConfig)).where(clause, parameters).from(connectQueryConfig.targetObjectName, connectQueryConfig.targetObjectName).getRawMany();
            allRecordsToConnectWithConfig.push([
                connectQueryConfig,
                recordsToConnect
            ]);
        }
        return allRecordsToConnectWithConfig;
    }
    updateEntitiesWithRecordToConnectId(entities, recordsToConnectWithConfig) {
        return entities.map((entity, index)=>{
            for (const [connectQueryConfig, recordsToConnect] of recordsToConnectWithConfig){
                if ((0, _classvalidator.isDefined)(connectQueryConfig.recordToConnectConditionByEntityIndex[index])) {
                    const recordToConnect = recordsToConnect.filter((record)=>connectQueryConfig.recordToConnectConditionByEntityIndex[index].every(([field, value])=>record[field] === value));
                    if (recordToConnect.length !== 1) {
                        const { errorMessage, userFriendlyMessage } = (0, _formatConnectRecordNotFoundErrorMessageutil.formatConnectRecordNotFoundErrorMessage)(connectQueryConfig.connectFieldName, recordToConnect.length, connectQueryConfig.recordToConnectConditionByEntityIndex[index]);
                        throw new _twentyormexception.TwentyORMException(errorMessage, _twentyormexception.TwentyORMExceptionCode.CONNECT_RECORD_NOT_FOUND, {
                            userFriendlyMessage
                        });
                    }
                    entity = {
                        ...entity,
                        [connectQueryConfig.relationFieldName]: recordToConnect[0]['id'],
                        [connectQueryConfig.connectFieldName]: null
                    };
                }
            }
            return entity;
        });
    }
    processRelationDisconnect({ entities, relationDisconnectQueryFieldsByEntityIndex }) {
        return entities.map((entity, index)=>{
            const nestedRelationDisconnectFields = relationDisconnectQueryFieldsByEntityIndex[index];
            if (!(0, _classvalidator.isDefined)(nestedRelationDisconnectFields)) return entity;
            for (const [disconnectFieldName, disconnectObject] of Object.entries(nestedRelationDisconnectFields ?? {})){
                entity = {
                    ...entity,
                    [disconnectFieldName]: undefined,
                    ...disconnectObject[_constants.RELATION_NESTED_QUERY_KEYWORDS.DISCONNECT] === true ? {
                        [(0, _getassociatedrelationfieldnameutil.getAssociatedRelationFieldName)(disconnectFieldName)]: null
                    } : {}
                };
            }
            return entity;
        });
    }
    constructor(internalContext){
        this.internalContext = internalContext;
    }
};

//# sourceMappingURL=relation-nested-queries.js.map