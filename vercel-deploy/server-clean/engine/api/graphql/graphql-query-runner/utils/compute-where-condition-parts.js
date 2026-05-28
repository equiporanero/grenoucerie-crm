"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeWhereConditionParts", {
    enumerable: true,
    get: function() {
        return computeWhereConditionParts;
    }
});
const _crypto = require("crypto");
const _utils = require("twenty-shared/utils");
const _findpostgresdefaultnullequivalentvalueutil = require("../../../common/common-args-processors/data-arg-processor/utils/find-postgres-default-null-equivalent-value.util");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../errors/graphql-query-runner.exception");
const _formatsearchterms = require("../../../../core-modules/search/utils/format-search-terms");
const computeWhereConditionParts = ({ operator, objectNameSingular, key, subFieldKey, value, fieldMetadataType, useDirectTableReference = false })=>{
    const paramSuffix = (0, _crypto.randomBytes)(5).toString('hex');
    const secondParamSuffix = (0, _crypto.randomBytes)(5).toString('hex');
    const fieldReference = useDirectTableReference ? `"${key}"` : `"${objectNameSingular}"."${key}"`;
    //TODO : Remove filter null equivalence injection once feature flag removed + null equivalence transformation added in ORM
    const nullEquivalentFieldValue = (0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)(value, fieldMetadataType, subFieldKey);
    const hasNullEquivalentFieldValue = (0, _utils.isDefined)(nullEquivalentFieldValue);
    switch(operator){
        case 'isEmptyArray':
            return {
                sql: `${fieldReference} = '{}'${hasNullEquivalentFieldValue ? ` OR ${fieldReference} IS NULL` : ''}`,
                params: {}
            };
        case 'eq':
            return {
                sql: `${fieldReference} = :${key}${paramSuffix}${hasNullEquivalentFieldValue ? ` OR ${fieldReference} IS NULL` : ''}`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'neq':
            return {
                sql: `${fieldReference} != :${key}${paramSuffix}${hasNullEquivalentFieldValue ? ` AND ${fieldReference} IS NOT NULL` : ''}`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'gt':
            return {
                sql: `${fieldReference} > :${key}${paramSuffix}`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'gte':
            return {
                sql: `${fieldReference} >= :${key}${paramSuffix}`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'lt':
            return {
                sql: `${fieldReference} < :${key}${paramSuffix}`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'lte':
            return {
                sql: `${fieldReference} <= :${key}${paramSuffix}`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'in':
            return {
                sql: `${fieldReference} IN (:...${key}${paramSuffix})`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'is':
            return {
                sql: `${fieldReference} IS ${value === 'NULL' ? 'NULL' : 'NOT NULL'}${hasNullEquivalentFieldValue ? ` OR ${fieldReference} = :${key}${secondParamSuffix}` : ''}`,
                params: hasNullEquivalentFieldValue ? {
                    [`${key}${secondParamSuffix}`]: nullEquivalentFieldValue
                } : {}
            };
        case 'like':
            return {
                sql: `${fieldReference}::text LIKE :${key}${paramSuffix}${hasNullEquivalentFieldValue ? ` OR ${fieldReference} IS NULL` : ''}`,
                params: {
                    [`${key}${paramSuffix}`]: `${value}`
                }
            };
        case 'ilike':
            return {
                sql: `${fieldReference}::text ILIKE :${key}${paramSuffix}${hasNullEquivalentFieldValue ? ` OR ${fieldReference} IS NULL` : ''}`,
                params: {
                    [`${key}${paramSuffix}`]: `${value}`
                }
            };
        case 'startsWith':
            return {
                sql: `${fieldReference}::text ^@ :${key}${paramSuffix}`,
                params: {
                    [`${key}${paramSuffix}`]: `${value}`
                }
            };
        case 'endsWith':
            return {
                sql: `RIGHT(${fieldReference}::text, LENGTH(:${key}${paramSuffix})) = :${key}${paramSuffix}`,
                params: {
                    [`${key}${paramSuffix}`]: `${value}`
                }
            };
        case 'contains':
            return {
                sql: `${fieldReference} @> ARRAY[:...${key}${paramSuffix}]`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'search':
            {
                const tsQuery = (0, _formatsearchterms.formatSearchTerms)(value, 'and');
                return {
                    sql: `(
          ${fieldReference} @@ to_tsquery('simple', public.unaccent_immutable(:${key}${paramSuffix}Ts)) OR
          public.unaccent_immutable(${fieldReference}::text) ILIKE public.unaccent_immutable(:${key}${paramSuffix}Like)
        )`,
                    params: {
                        [`${key}${paramSuffix}Ts`]: tsQuery,
                        [`${key}${paramSuffix}Like`]: `%${value}%`
                    }
                };
            }
        case 'notContains':
            return {
                sql: `NOT (${fieldReference}::text[] && ARRAY[:...${key}${paramSuffix}]::text[])`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'containsAny':
            return {
                sql: `${fieldReference}::text[] && ARRAY[:...${key}${paramSuffix}]::text[]`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        case 'containsIlike':
            return {
                sql: `EXISTS (SELECT 1 FROM unnest(${fieldReference}) AS elem WHERE elem ILIKE :${key}${paramSuffix})`,
                params: {
                    [`${key}${paramSuffix}`]: value
                }
            };
        default:
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Operator "${operator}" is not supported`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.UNSUPPORTED_OPERATOR, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
    }
};

//# sourceMappingURL=compute-where-condition-parts.js.map