"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _mockPersonObjectMetadata = require("../../graphql/graphql-query-runner/__mocks__/mockPersonObjectMetadata");
const _mockPersonRecords = require("../../graphql/graphql-query-runner/__mocks__/mockPersonRecords");
const _buildduplicateconditionsutils = require("../build-duplicate-conditions.utils");
describe('buildDuplicateConditions', ()=>{
    it('should build conditions based on duplicate criteria from composite field', ()=>{
        const duplicateConditons = (0, _buildduplicateconditionsutils.buildDuplicateConditions)((0, _mockPersonObjectMetadata.mockPersonFlatObjectMetadata)([
            [
                'emailsPrimaryEmail'
            ]
        ]), (0, _mockPersonObjectMetadata.mockPersonFlatObjectMetadataMaps)([
            [
                'emailsPrimaryEmail'
            ]
        ]), (0, _mockPersonObjectMetadata.mockPersonFlatFieldMetadataMaps)(), _mockPersonRecords.mockPersonRecords, 'recordId');
        expect(duplicateConditons).toEqual({
            or: [
                {
                    emails: {
                        primaryEmail: {
                            eq: 'test@test.fr'
                        }
                    }
                }
            ],
            id: {
                neq: 'recordId'
            }
        });
    });
    it('should build conditions based on duplicate criteria from basic field', ()=>{
        const duplicateConditons = (0, _buildduplicateconditionsutils.buildDuplicateConditions)((0, _mockPersonObjectMetadata.mockPersonFlatObjectMetadata)([
            [
                'jobTitle'
            ]
        ]), (0, _mockPersonObjectMetadata.mockPersonFlatObjectMetadataMaps)([
            [
                'jobTitle'
            ]
        ]), (0, _mockPersonObjectMetadata.mockPersonFlatFieldMetadataMaps)(), _mockPersonRecords.mockPersonRecords, 'recordId');
        expect(duplicateConditons).toEqual({
            or: [
                {
                    jobTitle: {
                        eq: 'Test job'
                    }
                }
            ],
            id: {
                neq: 'recordId'
            }
        });
    });
    it('should not build conditions based on duplicate criteria if record value is null or too small', ()=>{
        const duplicateConditons = (0, _buildduplicateconditionsutils.buildDuplicateConditions)((0, _mockPersonObjectMetadata.mockPersonFlatObjectMetadata)([
            [
                'linkedinLinkPrimaryLinkUrl'
            ]
        ]), (0, _mockPersonObjectMetadata.mockPersonFlatObjectMetadataMaps)([
            [
                'linkedinLinkPrimaryLinkUrl'
            ]
        ]), (0, _mockPersonObjectMetadata.mockPersonFlatFieldMetadataMaps)(), _mockPersonRecords.mockPersonRecords, 'recordId');
        expect(duplicateConditons).toEqual({});
    });
    it('should build conditions based on duplicate criteria and without recordId filter', ()=>{
        const duplicateConditons = (0, _buildduplicateconditionsutils.buildDuplicateConditions)((0, _mockPersonObjectMetadata.mockPersonFlatObjectMetadata)([
            [
                'jobTitle'
            ]
        ]), (0, _mockPersonObjectMetadata.mockPersonFlatObjectMetadataMaps)([
            [
                'jobTitle'
            ]
        ]), (0, _mockPersonObjectMetadata.mockPersonFlatFieldMetadataMaps)(), _mockPersonRecords.mockPersonRecords);
        expect(duplicateConditons).toEqual({
            or: [
                {
                    jobTitle: {
                        eq: 'Test job'
                    }
                }
            ]
        });
    });
});

//# sourceMappingURL=build-duplicate-conditions.utils.spec.js.map