"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_PERMISSION_FLAG_DEFINITIONS", {
    enumerable: true,
    get: function() {
        return STANDARD_PERMISSION_FLAG_DEFINITIONS;
    }
});
const _constants = require("twenty-shared/constants");
const _toolpermissionflags = require("../../permissions/constants/tool-permission-flags");
const STANDARD_PERMISSION_FLAG_METADATA = {
    [_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS]: {
        label: 'API Keys & Webhooks',
        description: 'Manage API keys and webhooks',
        icon: 'IconCode'
    },
    [_constants.PermissionFlagType.WORKSPACE]: {
        label: 'Workspace',
        description: 'Set global workspace preferences',
        icon: 'IconSettings'
    },
    [_constants.PermissionFlagType.WORKSPACE_MEMBERS]: {
        label: 'Users',
        description: 'Add or remove users',
        icon: 'IconUsers'
    },
    [_constants.PermissionFlagType.ROLES]: {
        label: 'Roles',
        description: 'Define user roles and access levels',
        icon: 'IconLockOpen'
    },
    [_constants.PermissionFlagType.DATA_MODEL]: {
        label: 'Data Model',
        description: 'Edit data structure and fields',
        icon: 'IconHierarchy'
    },
    [_constants.PermissionFlagType.SECURITY]: {
        label: 'Security',
        description: 'Manage security policies',
        icon: 'IconKey'
    },
    [_constants.PermissionFlagType.WORKFLOWS]: {
        label: 'Workflows',
        description: 'Manage workflows',
        icon: 'IconSettingsAutomation'
    },
    [_constants.PermissionFlagType.IMPERSONATE]: {
        label: 'Impersonate',
        description: 'Impersonate workspace users',
        icon: 'IconSpy'
    },
    [_constants.PermissionFlagType.SSO_BYPASS]: {
        label: 'SSO Bypass',
        description: 'Enable bypass options',
        icon: 'IconShield'
    },
    [_constants.PermissionFlagType.APPLICATIONS]: {
        label: 'Applications',
        description: 'Install and manage applications',
        icon: 'IconApps'
    },
    [_constants.PermissionFlagType.MARKETPLACE_APPS]: {
        label: 'Marketplace Apps',
        description: 'Browse and install marketplace apps',
        icon: 'IconShoppingBag'
    },
    [_constants.PermissionFlagType.LAYOUTS]: {
        label: 'Layouts',
        description: 'Customize page layouts and UI structure',
        icon: 'IconLayoutSidebarRightCollapse'
    },
    [_constants.PermissionFlagType.BILLING]: {
        label: 'Billing',
        description: 'Manage billing and subscriptions',
        icon: 'IconCreditCard'
    },
    [_constants.PermissionFlagType.AI_SETTINGS]: {
        label: 'AI',
        description: 'Create and configure AI agents',
        icon: 'IconSparkles'
    },
    [_constants.PermissionFlagType.AI]: {
        label: 'Ask AI',
        description: 'Chat with AI agents and use AI features',
        icon: 'IconSparkles'
    },
    [_constants.PermissionFlagType.VIEWS]: {
        label: 'Manage Views',
        description: 'Create, edit, and delete workspace views',
        icon: 'IconTable'
    },
    [_constants.PermissionFlagType.UPLOAD_FILE]: {
        label: 'Upload Files',
        description: 'Allow uploading files and attachments',
        icon: 'IconFileUpload'
    },
    [_constants.PermissionFlagType.DOWNLOAD_FILE]: {
        label: 'Download Files',
        description: 'Allow downloading files and attachments',
        icon: 'IconDownload'
    },
    [_constants.PermissionFlagType.SEND_EMAIL_TOOL]: {
        label: 'Send Email',
        description: 'Send emails via connected accounts',
        icon: 'IconMail'
    },
    [_constants.PermissionFlagType.HTTP_REQUEST_TOOL]: {
        label: 'HTTP Request',
        description: 'Make HTTP requests to external APIs',
        icon: 'IconApi'
    },
    [_constants.PermissionFlagType.CODE_INTERPRETER_TOOL]: {
        label: 'Code Interpreter',
        description: 'Run code to analyze files and data',
        icon: 'IconCode'
    },
    [_constants.PermissionFlagType.IMPORT_CSV]: {
        label: 'Import CSV',
        description: 'Allow importing data from CSV files',
        icon: 'IconFileImport'
    },
    [_constants.PermissionFlagType.EXPORT_CSV]: {
        label: 'Export CSV',
        description: 'Allow exporting data to CSV files',
        icon: 'IconFileExport'
    },
    [_constants.PermissionFlagType.CONNECTED_ACCOUNTS]: {
        label: 'Sync Account',
        description: 'Sync email and calendar accounts',
        icon: 'IconAt'
    },
    [_constants.PermissionFlagType.PROFILE_INFORMATION]: {
        label: 'Edit Profile',
        description: 'Edit own profile information',
        icon: 'IconUser'
    }
};
const STANDARD_PERMISSION_FLAG_DEFINITIONS = Object.values(_constants.PermissionFlagType).map((key)=>({
        key,
        universalIdentifier: _constants.SystemPermissionFlag[key],
        ...STANDARD_PERMISSION_FLAG_METADATA[key],
        permissionType: _toolpermissionflags.TOOL_PERMISSION_FLAGS.includes(key) ? 'tool' : 'settings'
    }));

//# sourceMappingURL=standard-permission-flag-definitions.constant.js.map