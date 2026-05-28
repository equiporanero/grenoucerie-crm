"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertVersionCanBeActivated", {
    enumerable: true,
    get: function() {
        return assertVersionCanBeActivated;
    }
});
const _workflowversionworkspaceentity = require("../../common/standard-objects/workflow-version.workspace-entity");
const _workflowactiontype = require("../../workflow-executor/workflow-actions/types/workflow-action.type");
const _workflowtriggerexception = require("../exceptions/workflow-trigger.exception");
const _workflowtriggertype = require("../types/workflow-trigger.type");
const _assertformstepisvalidutil = require("./assert-form-step-is-valid.util");
function assertVersionCanBeActivated(workflowVersion, workflow) {
    assertVersionIsValid(workflowVersion);
    const isLastPublishedVersion = workflow.lastPublishedVersionId === workflowVersion.id;
    const isDraft = workflowVersion.status === _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT;
    const isLastPublishedVersionDeactivated = workflowVersion.status === _workflowversionworkspaceentity.WorkflowVersionStatus.DEACTIVATED && isLastPublishedVersion;
    if (!isDraft && !isLastPublishedVersionDeactivated) {
        throw new _workflowtriggerexception.WorkflowTriggerException('Cannot activate non-draft or non-last-published version', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_INPUT, {
            userFriendlyMessage: /*i18n*/ {
                id: "vxbVwc",
                message: "Cannot activate non-draft or non-last-published version"
            }
        });
    }
}
function assertVersionIsValid(workflowVersion) {
    if (!workflowVersion.trigger) {
        throw new _workflowtriggerexception.WorkflowTriggerException('Workflow version does not contain trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION, {
            userFriendlyMessage: /*i18n*/ {
                id: "k4DPlQ",
                message: "Workflow version does not contain trigger"
            }
        });
    }
    if (!workflowVersion.trigger.type) {
        throw new _workflowtriggerexception.WorkflowTriggerException('No trigger type provided', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
            userFriendlyMessage: /*i18n*/ {
                id: "6dP8sB",
                message: "No trigger type provided"
            }
        });
    }
    if (!workflowVersion.steps || workflowVersion.steps.length === 0) {
        throw new _workflowtriggerexception.WorkflowTriggerException('No steps provided in workflow version', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
            userFriendlyMessage: /*i18n*/ {
                id: "QwbSxD",
                message: "No steps provided in workflow version"
            }
        });
    }
    assertTriggerSettingsAreValid(workflowVersion.trigger.type, workflowVersion.trigger.settings);
    workflowVersion.steps.forEach((step)=>{
        assertStepIsValid(step);
    });
}
function assertTriggerSettingsAreValid(triggerType, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
settings) {
    switch(triggerType){
        case _workflowtriggertype.WorkflowTriggerType.DATABASE_EVENT:
            assertDatabaseEventTriggerSettingsAreValid(settings);
            break;
        case _workflowtriggertype.WorkflowTriggerType.MANUAL:
        case _workflowtriggertype.WorkflowTriggerType.WEBHOOK:
            break;
        case _workflowtriggertype.WorkflowTriggerType.CRON:
            assertCronTriggerSettingsAreValid(settings);
            break;
        default:
            throw new _workflowtriggerexception.WorkflowTriggerException('Invalid trigger type for enabling workflow trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                userFriendlyMessage: /*i18n*/ {
                    id: "sHcAMD",
                    message: "Invalid trigger type for enabling workflow trigger"
                }
            });
    }
}
// oxlint-disable-next-line @typescripttypescript/no-explicit-any
function assertCronTriggerSettingsAreValid(settings) {
    if (!settings?.type) {
        throw new _workflowtriggerexception.WorkflowTriggerException('No setting type provided in cron trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
            userFriendlyMessage: /*i18n*/ {
                id: "cLUBlS",
                message: "No setting type provided in cron trigger"
            }
        });
    }
    switch(settings.type){
        case 'CUSTOM':
            {
                if (!settings.pattern) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('No pattern provided in CUSTOM cron trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "MWAUHo",
                            message: "No pattern provided in CUSTOM cron trigger"
                        }
                    });
                }
                return;
            }
        case 'DAYS':
            {
                if (!settings.schedule) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('No schedule provided in cron trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "pOu4u/",
                            message: "No schedule provided in cron trigger"
                        }
                    });
                }
                if (settings.schedule.day <= 0) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('Invalid day value. Should be integer greater than 1', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "4EtFrA",
                            message: "Invalid day value. Should be integer greater than 1"
                        }
                    });
                }
                if (settings.schedule.hour < 0 || settings.schedule.hour > 23) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('Invalid hour value. Should be integer between 0 and 23', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "MBpeQ6",
                            message: "Invalid hour value. Should be integer between 0 and 23"
                        }
                    });
                }
                if (settings.schedule.minute < 0 || settings.schedule.minute > 59) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('Invalid minute value. Should be integer between 0 and 59', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "iBBCnf",
                            message: "Invalid minute value. Should be integer between 0 and 59"
                        }
                    });
                }
                return;
            }
        case 'HOURS':
            {
                if (!settings.schedule) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('No schedule provided in cron trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "9xsjn9",
                            message: "Invalid hour value. Should be integer greater than 1"
                        }
                    });
                }
                if (settings.schedule.hour <= 0) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('Invalid hour value. Should be integer greater than 1', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "9xsjn9",
                            message: "Invalid hour value. Should be integer greater than 1"
                        }
                    });
                }
                if (settings.schedule.minute < 0 || settings.schedule.minute > 59) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('Invalid minute value. Should be integer between 0 and 59', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "iBBCnf",
                            message: "Invalid minute value. Should be integer between 0 and 59"
                        }
                    });
                }
                return;
            }
        case 'MINUTES':
            {
                if (!settings.schedule) {
                    throw new _workflowtriggerexception.WorkflowTriggerException('No schedule provided in cron trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "hYcFSd",
                            message: "Invalid minute value. Should be integer greater than 1"
                        }
                    });
                }
                if (settings.schedule.minute <= 0 || settings.schedule.minute > 60) {
                    const errorMessage = settings.schedule.minute <= 0 ? /*i18n*/ {
                        id: "hYcFSd",
                        message: "Invalid minute value. Should be integer greater than 1"
                    } : /*i18n*/ {
                        id: "G6wJK8",
                        message: 'Minute value cannot exceed 60. For intervals greater than 60 minutes, use the "Hours" trigger type or a custom cron expression'
                    };
                    throw new _workflowtriggerexception.WorkflowTriggerException(settings.schedule.minute <= 0 ? 'Invalid minute value. Should be integer greater than 1' : 'Invalid minute value. Cannot exceed 60. For intervals greater than 60 minutes, use the "Hours" trigger type or a custom cron expression', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                        userFriendlyMessage: errorMessage
                    });
                }
                return;
            }
        default:
            throw new _workflowtriggerexception.WorkflowTriggerException('Invalid setting type provided in cron trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                userFriendlyMessage: /*i18n*/ {
                    id: "ApP70c",
                    message: "Invalid setting type provided in cron trigger"
                }
            });
    }
}
// oxlint-disable-next-line @typescripttypescript/no-explicit-any
function assertDatabaseEventTriggerSettingsAreValid(settings) {
    if (!settings?.eventName) {
        throw new _workflowtriggerexception.WorkflowTriggerException('No event name provided in database event trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
            userFriendlyMessage: /*i18n*/ {
                id: "hQQZse",
                message: "No event name provided in database event trigger"
            }
        });
    }
}
function assertStepIsValid(step) {
    switch(step.type){
        case _workflowactiontype.WorkflowActionType.FORM:
            (0, _assertformstepisvalidutil.assertFormStepIsValid)(step.settings);
            break;
        default:
            break;
    }
}

//# sourceMappingURL=assert-version-can-be-activated.util.js.map