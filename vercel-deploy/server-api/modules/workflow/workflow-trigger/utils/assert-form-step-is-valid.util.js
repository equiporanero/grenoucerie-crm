"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertFormStepIsValid", {
    enumerable: true,
    get: function() {
        return assertFormStepIsValid;
    }
});
const _guards = require("@sniptt/guards");
const _workflowtriggerexception = require("../exceptions/workflow-trigger.exception");
function assertFormStepIsValid(settings) {
    if (!settings.input) {
        throw new _workflowtriggerexception.WorkflowTriggerException('No input provided in form step', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
            userFriendlyMessage: /*i18n*/ {
                id: "9bu19u",
                message: "No input provided in form step"
            }
        });
    }
    if (settings.input.length === 0) {
        throw new _workflowtriggerexception.WorkflowTriggerException('Form action must have at least one field', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION, {
            userFriendlyMessage: /*i18n*/ {
                id: "KYP1t5",
                message: "Form action must have at least one field"
            }
        });
    }
    // Check all fields have unique and defined names
    const fieldNames = settings.input.map((fieldMetadata)=>fieldMetadata.name);
    const uniqueFieldNames = new Set(fieldNames);
    if (fieldNames.length !== uniqueFieldNames.size) {
        throw new _workflowtriggerexception.WorkflowTriggerException('Form action fields must have unique names', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION, {
            userFriendlyMessage: /*i18n*/ {
                id: "QK3OvQ",
                message: "Form action fields must have unique names"
            }
        });
    }
    // Check all fields have defined labels and types
    settings.input.forEach((fieldMetadata)=>{
        if (!(0, _guards.isNonEmptyString)(fieldMetadata.label) || !(0, _guards.isNonEmptyString)(fieldMetadata.type)) {
            throw new _workflowtriggerexception.WorkflowTriggerException('Form action fields must have a defined label and type', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION, {
                userFriendlyMessage: /*i18n*/ {
                    id: "kuN9I4",
                    message: "Form action fields must have a defined label and type"
                }
            });
        }
    });
}

//# sourceMappingURL=assert-form-step-is-valid.util.js.map