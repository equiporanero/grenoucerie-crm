"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get getSeedFrontComponentCommandMenuItemDefinitions () {
        return getSeedFrontComponentCommandMenuItemDefinitions;
    },
    get getSeedFrontComponentDefinitions () {
        return getSeedFrontComponentDefinitions;
    },
    get getSeedFrontComponentIds () {
        return getSeedFrontComponentIds;
    }
});
const _uuid = require("uuid");
const _pagelayoutseedsconstant = require("../../dev-seeder/core/constants/page-layout-seeds.constant");
const _generateseedidutil = require("../../dev-seeder/core/utils/generate-seed-id.util");
const SEED_FRONT_COMPONENT_ID_NAMESPACE = 'e7a3b1c4-f5d6-4e8a-9b2c-3d4e5f6a7b8c';
const getSeedFrontComponentIds = (workspaceId)=>({
        helloWorldId: (0, _uuid.v5)(`${workspaceId}:seed-front-component:hello-world`, SEED_FRONT_COMPONENT_ID_NAMESPACE),
        showNotificationId: (0, _uuid.v5)(`${workspaceId}:seed-front-component:show-notification`, SEED_FRONT_COMPONENT_ID_NAMESPACE)
    });
const getSeedFrontComponentDefinitions = (workspaceId)=>{
    const { helloWorldId, showNotificationId } = getSeedFrontComponentIds(workspaceId);
    return [
        {
            id: helloWorldId,
            universalIdentifier: (0, _uuid.v5)(`${workspaceId}:seed-front-component-uid:hello-world`, SEED_FRONT_COMPONENT_ID_NAMESPACE),
            name: 'Hello World',
            description: 'A sample visual front component that displays execution context',
            componentName: 'HelloWorld',
            isHeadless: false,
            usesSdkClient: false,
            seedProjectSubdir: 'hello-world'
        },
        {
            id: showNotificationId,
            universalIdentifier: (0, _uuid.v5)(`${workspaceId}:seed-front-component-uid:show-notification`, SEED_FRONT_COMPONENT_ID_NAMESPACE),
            name: 'Show Notification',
            description: 'A sample headless front component that displays a notification',
            componentName: 'ShowNotification',
            isHeadless: true,
            usesSdkClient: false,
            seedProjectSubdir: 'show-notification'
        }
    ];
};
const getSeedFrontComponentCommandMenuItemDefinitions = (workspaceId)=>{
    const { helloWorldId, showNotificationId } = getSeedFrontComponentIds(workspaceId);
    return [
        {
            universalIdentifier: (0, _uuid.v5)(`${workspaceId}:seed-front-component-command:hello-world`, SEED_FRONT_COMPONENT_ID_NAMESPACE),
            frontComponentId: helloWorldId,
            label: 'Hello World',
            icon: 'IconAppWindow',
            position: 200
        },
        {
            universalIdentifier: (0, _uuid.v5)(`${workspaceId}:seed-front-component-command:show-notification`, SEED_FRONT_COMPONENT_ID_NAMESPACE),
            frontComponentId: showNotificationId,
            label: 'Show Notification',
            icon: 'IconBell',
            position: 201
        },
        {
            universalIdentifier: (0, _uuid.v5)(`${workspaceId}:seed-front-component-command:standalone-page-show-notification`, SEED_FRONT_COMPONENT_ID_NAMESPACE),
            frontComponentId: showNotificationId,
            label: 'Show Notification',
            icon: 'IconStar',
            position: 202,
            isPinned: true,
            pageLayoutId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.DOCUMENTATION_STANDALONE_PAGE)
        }
    ];
};

//# sourceMappingURL=prefill-front-component-definitions.util.js.map