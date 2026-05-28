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
    get MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEEDS () {
        return MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEEDS;
    },
    get MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEED_COLUMNS () {
        return MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEED_COLUMNS;
    },
    get MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEED_IDS () {
        return MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEED_IDS;
    }
});
const _messagechannelseedidsconstant = require("../../core/constants/message-channel-seed-ids.constant");
const _messagedataseedsconstant = require("./message-data-seeds.constant");
const _messagedirectionenum = require("../../../../../modules/messaging/common/enums/message-direction.enum");
const MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEED_COLUMNS = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'messageExternalId',
    'messageThreadExternalId',
    'messageChannelId',
    'messageId',
    'direction'
];
const GENERATE_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_IDS = ()=>{
    const ASSOCIATION_IDS = {};
    for(let INDEX = 1; INDEX <= 600; INDEX++){
        const HEX_INDEX = INDEX.toString(16).padStart(4, '0');
        ASSOCIATION_IDS[`ID_${INDEX}`] = `20202020-${HEX_INDEX}-4e7c-8001-123456789bcd`;
    }
    return ASSOCIATION_IDS;
};
const MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEED_IDS = GENERATE_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_IDS();
const GENERATE_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_SEEDS = ()=>{
    const ASSOCIATION_SEEDS = [];
    const MESSAGE_IDS = Object.keys(_messagedataseedsconstant.MESSAGE_DATA_SEED_IDS).map((key)=>_messagedataseedsconstant.MESSAGE_DATA_SEED_IDS[key]);
    MESSAGE_IDS.forEach((messageId, index)=>{
        const ASSOCIATION_INDEX = index + 1;
        const NOW = new Date();
        const RANDOM_DAYS_OFFSET = Math.floor(Math.random() * 90);
        const ASSOCIATION_DATE = new Date(NOW.getTime() - RANDOM_DAYS_OFFSET * 24 * 60 * 60 * 1000);
        const CHANNEL_WEIGHT = Math.random();
        let CHANNEL_ID;
        // Tim's email (40% weight)
        if (CHANNEL_WEIGHT < 0.4) {
            CHANNEL_ID = _messagechannelseedidsconstant.MESSAGE_CHANNEL_DATA_SEED_IDS.TIM;
        } else if (CHANNEL_WEIGHT < 0.6) {
            CHANNEL_ID = _messagechannelseedidsconstant.MESSAGE_CHANNEL_DATA_SEED_IDS.JONY;
        } else if (CHANNEL_WEIGHT < 0.75) {
            CHANNEL_ID = _messagechannelseedidsconstant.MESSAGE_CHANNEL_DATA_SEED_IDS.PHIL;
        } else if (CHANNEL_WEIGHT < 0.9) {
            CHANNEL_ID = _messagechannelseedidsconstant.MESSAGE_CHANNEL_DATA_SEED_IDS.SUPPORT;
        } else {
            CHANNEL_ID = _messagechannelseedidsconstant.MESSAGE_CHANNEL_DATA_SEED_IDS.SALES;
        }
        // 50/50 split between incoming and outgoing messages
        const DIRECTION = Math.random() < 0.5 ? _messagedirectionenum.MessageDirection.INCOMING : _messagedirectionenum.MessageDirection.OUTGOING;
        // Generate unique external IDs for email sync
        const MESSAGE_EXTERNAL_ID = `msg-${ASSOCIATION_INDEX}-${Date.now()}`;
        const MESSAGE_THREAD_EXTERNAL_ID = `thread-${Math.floor(ASSOCIATION_INDEX / 2)}-${Date.now()}`;
        ASSOCIATION_SEEDS.push({
            id: MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEED_IDS[`ID_${ASSOCIATION_INDEX}`],
            createdAt: ASSOCIATION_DATE,
            updatedAt: ASSOCIATION_DATE,
            deletedAt: null,
            messageExternalId: MESSAGE_EXTERNAL_ID,
            messageThreadExternalId: MESSAGE_THREAD_EXTERNAL_ID,
            messageChannelId: CHANNEL_ID,
            messageId: messageId,
            direction: DIRECTION
        });
    });
    return ASSOCIATION_SEEDS;
};
const MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_DATA_SEEDS = GENERATE_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_SEEDS();

//# sourceMappingURL=message-channel-message-association-data-seeds.constant.js.map