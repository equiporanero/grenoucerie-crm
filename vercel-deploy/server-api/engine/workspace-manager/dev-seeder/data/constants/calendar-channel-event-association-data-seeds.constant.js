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
    get CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEEDS () {
        return CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEEDS;
    },
    get CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEED_COLUMNS () {
        return CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEED_COLUMNS;
    },
    get CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEED_IDS () {
        return CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEED_IDS;
    }
});
const _calendarchannelseedidsconstant = require("../../core/constants/calendar-channel-seed-ids.constant");
const _calendareventdataseedsconstant = require("./calendar-event-data-seeds.constant");
const CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEED_COLUMNS = [
    'id',
    'calendarChannelId',
    'calendarEventId',
    'eventExternalId',
    'recurringEventExternalId'
];
const GENERATE_CALENDAR_CHANNEL_EVENT_ASSOCIATION_IDS = ()=>{
    const ASSOCIATION_IDS = {};
    for(let INDEX = 1; INDEX <= 800; INDEX++){
        const HEX_INDEX = INDEX.toString(16).padStart(4, '0');
        ASSOCIATION_IDS[`ID_${INDEX}`] = `20202020-${HEX_INDEX}-4e7c-8001-123456789abc`;
    }
    return ASSOCIATION_IDS;
};
const CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEED_IDS = GENERATE_CALENDAR_CHANNEL_EVENT_ASSOCIATION_IDS();
const GENERATE_CALENDAR_CHANNEL_EVENT_ASSOCIATION_SEEDS = ()=>{
    const ASSOCIATION_SEEDS = [];
    const EVENT_IDS = Object.keys(_calendareventdataseedsconstant.CALENDAR_EVENT_DATA_SEED_IDS).map((key)=>_calendareventdataseedsconstant.CALENDAR_EVENT_DATA_SEED_IDS[key]);
    const CHANNEL_IDS = [
        _calendarchannelseedidsconstant.CALENDAR_CHANNEL_DATA_SEED_IDS.TIM,
        _calendarchannelseedidsconstant.CALENDAR_CHANNEL_DATA_SEED_IDS.JONY,
        _calendarchannelseedidsconstant.CALENDAR_CHANNEL_DATA_SEED_IDS.PHIL,
        _calendarchannelseedidsconstant.CALENDAR_CHANNEL_DATA_SEED_IDS.COMPANY_MAIN,
        _calendarchannelseedidsconstant.CALENDAR_CHANNEL_DATA_SEED_IDS.TEAM_CALENDAR
    ];
    // Create associations for each event
    EVENT_IDS.forEach((eventId, index)=>{
        // Distribute events across channels with weighted distribution
        let CHANNEL_ID;
        const CHANNEL_RAND = Math.random();
        if (CHANNEL_RAND < 0.3) {
            // 30% - Tim's personal calendar
            CHANNEL_ID = CHANNEL_IDS[0]; // TIM
        } else if (CHANNEL_RAND < 0.45) {
            // 15% - Jony's personal calendar
            CHANNEL_ID = CHANNEL_IDS[1]; // JONY
        } else if (CHANNEL_RAND < 0.6) {
            // 15% - Phil's personal calendar
            CHANNEL_ID = CHANNEL_IDS[2]; // PHIL
        } else if (CHANNEL_RAND < 0.8) {
            // 20% - Company main calendar
            CHANNEL_ID = CHANNEL_IDS[3]; // COMPANY_MAIN
        } else {
            // 20% - Team calendar
            CHANNEL_ID = CHANNEL_IDS[4]; // TEAM_CALENDAR
        }
        const ASSOCIATION_INDEX = index + 1;
        ASSOCIATION_SEEDS.push({
            id: CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEED_IDS[`ID_${ASSOCIATION_INDEX}`],
            calendarChannelId: CHANNEL_ID,
            calendarEventId: eventId,
            eventExternalId: `external_event_${ASSOCIATION_INDEX}@calendar.com`,
            recurringEventExternalId: `recurring_${ASSOCIATION_INDEX}@calendar.com`
        });
    });
    return ASSOCIATION_SEEDS;
};
const CALENDAR_CHANNEL_EVENT_ASSOCIATION_DATA_SEEDS = GENERATE_CALENDAR_CHANNEL_EVENT_ASSOCIATION_SEEDS();

//# sourceMappingURL=calendar-channel-event-association-data-seeds.constant.js.map