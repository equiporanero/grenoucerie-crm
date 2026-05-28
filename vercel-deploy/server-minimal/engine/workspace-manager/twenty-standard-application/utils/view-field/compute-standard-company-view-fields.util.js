"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCompanyViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardCompanyViewFields;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardCompanyViewFields = (args)=>{
    return {
        // allCompanies view fields
        allCompaniesName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 180
            }
        }),
        allCompaniesDomainName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                viewFieldName: 'domainName',
                fieldName: 'domainName',
                position: 1,
                isVisible: true,
                size: 100,
                aggregateOperation: _types.AggregateOperations.COUNT
            }
        }),
        allCompaniesCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allCompaniesAccountOwner: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                viewFieldName: 'accountOwner',
                fieldName: 'accountOwner',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allCompaniesCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        allCompaniesEmployees: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                viewFieldName: 'employees',
                fieldName: 'employees',
                position: 5,
                isVisible: true,
                size: 150,
                aggregateOperation: _types.AggregateOperations.MAX
            }
        }),
        allCompaniesLinkedinLink: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                viewFieldName: 'linkedinLink',
                fieldName: 'linkedinLink',
                position: 6,
                isVisible: true,
                size: 170,
                aggregateOperation: _types.AggregateOperations.PERCENTAGE_EMPTY
            }
        }),
        allCompaniesAddress: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                viewFieldName: 'address',
                fieldName: 'address',
                position: 7,
                isVisible: true,
                size: 170,
                aggregateOperation: _types.AggregateOperations.COUNT_NOT_EMPTY
            }
        }),
        // companyRecordPageFields view fields
        companyRecordPageFieldsDomainName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'domainName',
                fieldName: 'domainName',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        companyRecordPageFieldsAccountOwner: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'accountOwner',
                fieldName: 'accountOwner',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        companyRecordPageFieldsPeople: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'people',
                fieldName: 'people',
                position: 2,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        companyRecordPageFieldsTaskTargets: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'taskTargets',
                fieldName: 'taskTargets',
                position: 3,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        companyRecordPageFieldsNoteTargets: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'noteTargets',
                fieldName: 'noteTargets',
                position: 4,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        companyRecordPageFieldsOpportunities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'opportunities',
                fieldName: 'opportunities',
                position: 5,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        companyRecordPageFieldsAttachments: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'attachments',
                fieldName: 'attachments',
                position: 7,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        companyRecordPageFieldsTimelineActivities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'timelineActivities',
                fieldName: 'timelineActivities',
                position: 8,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        // Business group
        companyRecordPageFieldsAnnualRecurringRevenue: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'annualRecurringRevenue',
                fieldName: 'annualRecurringRevenue',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'business'
            }
        }),
        companyRecordPageFieldsEmployees: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'employees',
                fieldName: 'employees',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'business'
            }
        }),
        companyRecordPageFieldsIdealCustomerProfile: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'idealCustomerProfile',
                fieldName: 'idealCustomerProfile',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'business'
            }
        }),
        // Contact group
        companyRecordPageFieldsAddress: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'address',
                fieldName: 'address',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'contact'
            }
        }),
        companyRecordPageFieldsLinkedinLink: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'linkedinLink',
                fieldName: 'linkedinLink',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'contact'
            }
        }),
        companyRecordPageFieldsXLink: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'xLink',
                fieldName: 'xLink',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'contact'
            }
        }),
        // System group
        companyRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        companyRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        companyRecordPageFieldsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 2,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        companyRecordPageFieldsUpdatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldName: 'updatedBy',
                fieldName: 'updatedBy',
                position: 3,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-company-view-fields.util.js.map