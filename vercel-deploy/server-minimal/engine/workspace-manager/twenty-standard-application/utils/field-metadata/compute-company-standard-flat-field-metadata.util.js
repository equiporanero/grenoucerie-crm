"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCompanyStandardFlatFieldMetadatas", {
    enumerable: true,
    get: function() {
        return buildCompanyStandardFlatFieldMetadatas;
    }
});
const _i18nlabelutil = require("../i18n-label.util");
const _types = require("twenty-shared/types");
const _createstandardfieldflatmetadatautil = require("./create-standard-field-flat-metadata.util");
const _createstandardrelationfieldflatmetadatautil = require("./create-standard-relation-field-flat-metadata.util");
const _gettsvectorcolumnexpressionutil = require("../../../utils/get-ts-vector-column-expression.util");
const _companyworkspaceentity = require("../../../../../modules/company/standard-objects/company.workspace-entity");
const buildCompanyStandardFlatFieldMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        // Base fields from BaseWorkspaceEntity
        id: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'id',
                type: _types.FieldMetadataType.UUID,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "dFb5Nt",
                    message: "Id"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "dFb5Nt",
                    message: "Id"
                }),
                icon: 'Icon123',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 'uuid'
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        createdAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'createdAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wPvFAD",
                    message: "Creation date"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wPvFAD",
                    message: "Creation date"
                }),
                icon: 'IconCalendar',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 'now',
                settings: {
                    displayFormat: _types.DateDisplayFormat.RELATIVE
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        updatedAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'updatedAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "o1zvNS",
                    message: "Last update"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "tGwswq",
                    message: "Last time the record was changed"
                }),
                icon: 'IconCalendarClock',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 'now',
                settings: {
                    displayFormat: _types.DateDisplayFormat.RELATIVE
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        deletedAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'deletedAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "QN9ahV",
                    message: "Deleted at"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "1lL5Iu",
                    message: "Date when the record was deleted"
                }),
                icon: 'IconCalendarMinus',
                isSystem: true,
                isNullable: true,
                isUIReadOnly: true,
                settings: {
                    displayFormat: _types.DateDisplayFormat.RELATIVE
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        // Company-specific fields
        name: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'name',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "6YtxFj",
                    message: "Name"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "N31Pso",
                    message: "The company name"
                }),
                icon: 'IconBuildingSkyscraper',
                isNullable: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        domainName: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'domainName',
                type: _types.FieldMetadataType.LINKS,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wMncXq",
                    message: "Domain Name"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "OBmU0K",
                    message: "The company website URL. We use this url to fetch the company icon"
                }),
                icon: 'IconLink',
                isNullable: true,
                isUnique: true,
                settings: {
                    maxNumberOfValues: 1
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        address: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'address',
                type: _types.FieldMetadataType.ADDRESS,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Du6bPw",
                    message: "Address"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Knl3c9",
                    message: "Address of the company"
                }),
                icon: 'IconMap',
                isNullable: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        employees: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'employees',
                type: _types.FieldMetadataType.NUMBER,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "gqv5ZL",
                    message: "Employees"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "ioJFzx",
                    message: "Number of employees in the company"
                }),
                icon: 'IconUsers',
                isNullable: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        linkedinLink: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'linkedinLink',
                type: _types.FieldMetadataType.LINKS,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "uCA6be",
                    message: "Linkedin"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "qnNFrW",
                    message: "The company Linkedin account"
                }),
                icon: 'IconBrandLinkedin',
                isNullable: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        xLink: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'xLink',
                type: _types.FieldMetadataType.LINKS,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "0gv+T2",
                    message: "X"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "BHFCqB",
                    message: "The company Twitter/X account"
                }),
                icon: 'IconBrandX',
                isNullable: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        annualRecurringRevenue: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'annualRecurringRevenue',
                type: _types.FieldMetadataType.CURRENCY,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "3EiOLz",
                    message: "ARR"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "JKWicb",
                    message: "Annual Recurring Revenue: The actual or estimated annual revenue of the company"
                }),
                icon: 'IconMoneybag',
                isNullable: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        idealCustomerProfile: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'idealCustomerProfile',
                type: _types.FieldMetadataType.BOOLEAN,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "CiyiKN",
                    message: "ICP"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "yEFb1B",
                    message: "Ideal Customer Profile: Indicates whether the company is the most suitable and valuable customer for you"
                }),
                icon: 'IconTarget',
                isNullable: false,
                defaultValue: false
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        position: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'position',
                type: _types.FieldMetadataType.POSITION,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "p/78dY",
                    message: "Position"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "yA1de7",
                    message: "Company record position"
                }),
                icon: 'IconHierarchy2',
                isSystem: true,
                isNullable: false,
                defaultValue: 0
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        createdBy: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'createdBy',
                type: _types.FieldMetadataType.ACTOR,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "NCIYDF",
                    message: "Created by"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "zGBDEH",
                    message: "The creator of the record"
                }),
                icon: 'IconCreativeCommonsSa',
                isSystem: true,
                isUIReadOnly: true,
                isNullable: false,
                defaultValue: {
                    source: "'MANUAL'",
                    name: "'System'",
                    workspaceMemberId: null
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        updatedBy: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'updatedBy',
                type: _types.FieldMetadataType.ACTOR,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "KQsreu",
                    message: "Updated by"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "a6NBQe",
                    message: "The workspace member who last updated the record"
                }),
                icon: 'IconUserCircle',
                isSystem: true,
                isUIReadOnly: true,
                isNullable: false,
                defaultValue: {
                    source: "'MANUAL'",
                    name: "'System'",
                    workspaceMemberId: null
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        searchVector: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'searchVector',
                type: _types.FieldMetadataType.TS_VECTOR,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "PdVIJC",
                    message: "Search vector"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "J4hC2m",
                    message: "Field used for full-text search"
                }),
                icon: 'IconUser',
                isSystem: true,
                isNullable: true,
                settings: {
                    generatedType: 'STORED',
                    asExpression: (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)(_companyworkspaceentity.SEARCH_FIELDS_FOR_COMPANY)
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        // Relation fields
        people: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'people',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "1wdjme",
                    message: "People"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "E1zc7W",
                    message: "People linked to the company."
                }),
                icon: 'IconUsers',
                isNullable: true,
                targetObjectName: 'person',
                targetFieldName: 'company',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        accountOwner: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'accountOwner',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "pd81Qb",
                    message: "Account Owner"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "vPccnr",
                    message: "Your team member responsible for managing the company account"
                }),
                icon: 'IconUserCircle',
                isNullable: true,
                targetObjectName: 'workspaceMember',
                targetFieldName: 'accountOwnerForCompanies',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.SET_NULL,
                    joinColumnName: 'accountOwnerId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        taskTargets: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'taskTargets',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "GtycJ/",
                    message: "Tasks"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "M4rBti",
                    message: "Tasks tied to the company"
                }),
                icon: 'IconCheckbox',
                isUIReadOnly: true,
                isNullable: true,
                targetObjectName: 'taskTarget',
                targetFieldName: 'targetCompany',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        noteTargets: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'noteTargets',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "1DBGsz",
                    message: "Notes"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "fXBE74",
                    message: "Notes tied to the company"
                }),
                icon: 'IconNotes',
                isUIReadOnly: true,
                isNullable: true,
                targetObjectName: 'noteTarget',
                targetFieldName: 'targetCompany',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        opportunities: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'opportunities',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "4MyDFl",
                    message: "Opportunities"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "5QgKbT",
                    message: "Opportunities linked to the company."
                }),
                icon: 'IconTargetArrow',
                isNullable: true,
                targetObjectName: 'opportunity',
                targetFieldName: 'company',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        attachments: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'attachments',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "w/Sphq",
                    message: "Attachments"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "iVnA89",
                    message: "Attachments linked to the company"
                }),
                icon: 'IconFileImport',
                isNullable: true,
                targetObjectName: 'attachment',
                targetFieldName: 'targetCompany',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        timelineActivities: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'timelineActivities',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "az1boY",
                    message: "Timeline Activities"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "fqKMpF",
                    message: "Timeline Activities linked to the company"
                }),
                icon: 'IconIconTimelineEvent',
                isNullable: true,
                targetObjectName: 'timelineActivity',
                targetFieldName: 'targetCompany',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        })
    });

//# sourceMappingURL=compute-company-standard-flat-field-metadata.util.js.map