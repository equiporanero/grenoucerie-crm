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
    get objectEventFixtures () {
        return objectEventFixtures;
    },
    get usageEventFixtures () {
        return usageEventFixtures;
    },
    get workspaceEventFixtures () {
        return workspaceEventFixtures;
    }
});
const _objectrecordcreated = require("../../../engine/core-modules/audit/utils/events/object-event/object-record-created");
const _objectrecorddelete = require("../../../engine/core-modules/audit/utils/events/object-event/object-record-delete");
const _objectrecordupdated = require("../../../engine/core-modules/audit/utils/events/object-event/object-record-updated");
const _customdomainactivated = require("../../../engine/core-modules/audit/utils/events/workspace-event/custom-domain/custom-domain-activated");
const _customdomaindeactivated = require("../../../engine/core-modules/audit/utils/events/workspace-event/custom-domain/custom-domain-deactivated");
const _clickHouseutil = require("../clickHouse.util");
const _seederworkspacesconstant = require("../../../engine/workspace-manager/dev-seeder/core/constants/seeder-workspaces.constant");
const _seeduserworkspacesutil = require("../../../engine/workspace-manager/dev-seeder/core/utils/seed-user-workspaces.util");
const workspaceEventFixtures = [
    {
        type: 'track',
        event: _customdomainactivated.CUSTOM_DOMAIN_ACTIVATED_EVENT,
        timestamp: '2024-10-24T15:55:35.177',
        version: '1',
        userId: '20202020-3957-45c9-be39-337dc4d9100a',
        workspaceId: _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID,
        properties: {}
    },
    {
        type: 'track',
        event: _customdomaindeactivated.CUSTOM_DOMAIN_DEACTIVATED_EVENT,
        timestamp: '2024-10-24T15:55:35.177',
        version: '1',
        userId: '20202020-3957-45c9-be39-337dc4d9100a',
        workspaceId: _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID,
        properties: {}
    }
];
const objectEventFixtures = [
    {
        type: 'track',
        event: _objectrecordcreated.OBJECT_RECORD_CREATED_EVENT,
        timestamp: '2024-10-24T15:55:35.177',
        version: '1',
        userId: '20202020-3957-45c9-be39-337dc4d9100a',
        workspaceId: _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID,
        properties: {},
        recordId: '20202020-c21e-4ec2-873b-de4264d89025',
        objectMetadataId: '20202020-1f76-4e46-b33b-58a70e007ba0'
    },
    {
        type: 'track',
        event: _objectrecordupdated.OBJECT_RECORD_UPDATED_EVENT,
        timestamp: '2024-10-24T15:55:35.177',
        version: '1',
        userId: '20202020-3957-45c9-be39-337dc4d9100a',
        workspaceId: _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID,
        properties: {},
        recordId: '20202020-c21e-4ec2-873b-de4264d89025',
        objectMetadataId: '20202020-1f76-4e46-b33b-58a70e007ba0'
    },
    {
        type: 'track',
        event: _objectrecorddelete.OBJECT_RECORD_DELETED_EVENT,
        timestamp: '2024-10-24T15:55:35.177',
        version: '1',
        userId: '20202020-3957-45c9-be39-337dc4d9100a',
        workspaceId: _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID,
        properties: {},
        recordId: '20202020-c21e-4ec2-873b-de4264d89025',
        objectMetadataId: '20202020-1f76-4e46-b33b-58a70e007ba0'
    }
];
const buildUsageEventFixtures = ()=>{
    const now = new Date();
    const fixtures = [];
    const users = [
        _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.TIM,
        _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.JANE,
        _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.JONY,
        _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.PHIL
    ];
    // Weight per user so the breakdown isn't uniform
    const userWeights = [
        1.0,
        0.6,
        0.3,
        0.15
    ];
    const aiModelIds = [
        'anthropic/claude-opus-4-6',
        'openai/gpt-5.4',
        'openai/gpt-5.4-mini',
        'google/gemini-2.5-pro'
    ];
    const operations = [
        {
            resourceType: 'AI',
            operationType: 'AI_CHAT_TOKEN',
            baseCreditsMicro: 5000,
            baseQuantity: 1200,
            unit: 'TOKEN',
            modelIds: aiModelIds
        },
        {
            resourceType: 'AI',
            operationType: 'AI_WORKFLOW_TOKEN',
            baseCreditsMicro: 3500,
            baseQuantity: 800,
            unit: 'TOKEN',
            modelIds: aiModelIds
        },
        {
            resourceType: 'WORKFLOW',
            operationType: 'WORKFLOW_EXECUTION',
            baseCreditsMicro: 12000,
            baseQuantity: 1,
            unit: 'INVOCATION'
        },
        {
            resourceType: 'WORKFLOW',
            operationType: 'CODE_EXECUTION',
            baseCreditsMicro: 3000,
            baseQuantity: 1,
            unit: 'INVOCATION'
        },
        {
            resourceType: 'AI',
            operationType: 'WEB_SEARCH',
            baseCreditsMicro: 7000,
            baseQuantity: 1,
            unit: 'INVOCATION'
        }
    ];
    // Pseudo-random using a seed for reproducibility across runs
    let rngState = 42;
    const nextRandom = ()=>{
        rngState = rngState * 1664525 + 1013904223 & 0x7fffffff;
        return rngState / 0x7fffffff;
    };
    for(let daysAgo = 34; daysAgo >= 0; daysAgo--){
        const day = new Date(now);
        day.setDate(day.getDate() - daysAgo);
        day.setHours(0, 0, 0, 0);
        // Weekdays have more activity than weekends
        const dayOfWeek = day.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const dayMultiplier = isWeekend ? 0.3 : 1.0;
        // Gradual ramp-up over the month (more recent = more usage)
        const recencyMultiplier = 0.5 + 0.5 * ((35 - daysAgo) / 35);
        for(let userIdx = 0; userIdx < users.length; userIdx++){
            const userWeight = userWeights[userIdx];
            for (const op of operations){
                // Skip some user/operation combos randomly for variety
                if (nextRandom() < 0.25) {
                    continue;
                }
                const eventsCount = Math.max(1, Math.round((1 + nextRandom() * 4) * dayMultiplier * recencyMultiplier * userWeight));
                for(let eventIdx = 0; eventIdx < eventsCount; eventIdx++){
                    const hour = Math.floor(9 + nextRandom() * 9); // 9am–6pm
                    const minute = Math.floor(nextRandom() * 60);
                    const second = Math.floor(nextRandom() * 60);
                    const eventDate = new Date(day);
                    eventDate.setHours(hour, minute, second, Math.floor(nextRandom() * 1000));
                    const jitter = 0.5 + nextRandom();
                    const resourceContext = op.modelIds ? op.modelIds[Math.floor(nextRandom() * op.modelIds.length)] : '';
                    fixtures.push({
                        timestamp: (0, _clickHouseutil.formatDateTimeForClickHouse)(eventDate),
                        workspaceId: _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID,
                        periodStart: (0, _clickHouseutil.formatDateTimeForClickHouse)(new Date(Date.UTC(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), 1))),
                        userWorkspaceId: users[userIdx],
                        resourceType: op.resourceType,
                        operationType: op.operationType,
                        quantity: Math.round(op.baseQuantity * jitter),
                        unit: op.unit,
                        creditsUsedMicro: Math.round(op.baseCreditsMicro * jitter),
                        resourceId: '',
                        resourceContext,
                        metadata: {}
                    });
                }
            }
        }
    }
    return fixtures;
};
const usageEventFixtures = buildUsageEventFixtures();

//# sourceMappingURL=fixtures.js.map