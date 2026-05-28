"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _metadata = require("twenty-shared/metadata");
const _isworkflowrelatedobjectutil = require("../is-workflow-related-object.util");
describe('isWorkflowRelatedObject', ()=>{
    it('should return true for workflow-related objects', ()=>{
        expect((0, _isworkflowrelatedobjectutil.isWorkflowRelatedObject)({
            universalIdentifier: _metadata.STANDARD_OBJECTS.workflow.universalIdentifier
        })).toBe(true);
        expect((0, _isworkflowrelatedobjectutil.isWorkflowRelatedObject)({
            universalIdentifier: _metadata.STANDARD_OBJECTS.workflowRun.universalIdentifier
        })).toBe(true);
        expect((0, _isworkflowrelatedobjectutil.isWorkflowRelatedObject)({
            universalIdentifier: _metadata.STANDARD_OBJECTS.workflowVersion.universalIdentifier
        })).toBe(true);
    });
    it('should return false for non-workflow objects', ()=>{
        expect((0, _isworkflowrelatedobjectutil.isWorkflowRelatedObject)({
            universalIdentifier: _metadata.STANDARD_OBJECTS.person.universalIdentifier
        })).toBe(false);
        expect((0, _isworkflowrelatedobjectutil.isWorkflowRelatedObject)({
            universalIdentifier: 'some-custom-object-uuid'
        })).toBe(false);
    });
});

//# sourceMappingURL=is-workflow-related-object.util.spec.js.map