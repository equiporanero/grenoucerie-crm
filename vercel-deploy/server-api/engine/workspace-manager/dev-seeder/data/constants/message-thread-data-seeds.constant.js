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
    get MESSAGE_THREAD_DATA_SEEDS () {
        return MESSAGE_THREAD_DATA_SEEDS;
    },
    get MESSAGE_THREAD_DATA_SEED_COLUMNS () {
        return MESSAGE_THREAD_DATA_SEED_COLUMNS;
    },
    get MESSAGE_THREAD_DATA_SEED_IDS () {
        return MESSAGE_THREAD_DATA_SEED_IDS;
    }
});
const MESSAGE_THREAD_DATA_SEED_COLUMNS = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'subject'
];
const EMAIL_SUBJECTS = [
    'Meeting Request',
    'Project Update',
    'Invoice for Services',
    'Thank You for the Meeting',
    'Proposal Submission',
    'Follow-up on Discussion',
    'Customer Feedback',
    'Training Session Reminder',
    'Contract Renewal',
    'Quarterly Report',
    'Partnership Opportunity',
    'Event Invitation'
];
const GENERATE_MESSAGE_THREAD_IDS = ()=>{
    const THREAD_IDS = {};
    for(let INDEX = 1; INDEX <= 300; INDEX++){
        const HEX_INDEX = INDEX.toString(16).padStart(4, '0');
        THREAD_IDS[`ID_${INDEX}`] = `20202020-${HEX_INDEX}-4e7c-8001-123456789def`;
    }
    return THREAD_IDS;
};
const MESSAGE_THREAD_DATA_SEED_IDS = GENERATE_MESSAGE_THREAD_IDS();
const GENERATE_MESSAGE_THREAD_SEEDS = ()=>{
    const THREAD_SEEDS = [];
    for(let INDEX = 1; INDEX <= 300; INDEX++){
        const NOW = new Date();
        const RANDOM_DAYS_OFFSET = Math.floor(Math.random() * 90); // 0 to 90 days ago
        const CREATED_DATE = new Date(NOW.getTime() - RANDOM_DAYS_OFFSET * 24 * 60 * 60 * 1000);
        // Updated date is between created date and now
        const DAYS_SINCE_CREATED = Math.floor((NOW.getTime() - CREATED_DATE.getTime()) / (24 * 60 * 60 * 1000));
        const UPDATE_OFFSET = Math.floor(Math.random() * (DAYS_SINCE_CREATED + 1));
        const UPDATED_DATE = new Date(CREATED_DATE.getTime() + UPDATE_OFFSET * 24 * 60 * 60 * 1000);
        const TEMPLATE_INDEX = (INDEX - 1) * 2 % EMAIL_SUBJECTS.length;
        THREAD_SEEDS.push({
            id: MESSAGE_THREAD_DATA_SEED_IDS[`ID_${INDEX}`],
            createdAt: CREATED_DATE,
            updatedAt: UPDATED_DATE,
            deletedAt: null,
            subject: EMAIL_SUBJECTS[TEMPLATE_INDEX]
        });
    }
    return THREAD_SEEDS;
};
const MESSAGE_THREAD_DATA_SEEDS = GENERATE_MESSAGE_THREAD_SEEDS();

//# sourceMappingURL=message-thread-data-seeds.constant.js.map