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
    get MESSAGE_PARTICIPANT_DATA_SEED_COLUMNS () {
        return MESSAGE_PARTICIPANT_DATA_SEED_COLUMNS;
    },
    get MESSAGE_PARTICIPANT_DATA_SEED_IDS () {
        return MESSAGE_PARTICIPANT_DATA_SEED_IDS;
    },
    get getMessageParticipantDataSeeds () {
        return getMessageParticipantDataSeeds;
    }
});
const _types = require("twenty-shared/types");
const _messagedataseedsconstant = require("./message-data-seeds.constant");
const _persondataseedsconstant = require("./person-data-seeds.constant");
const _workspacememberdataseedsconstant = require("./workspace-member-data-seeds.constant");
const MESSAGE_PARTICIPANT_DATA_SEED_COLUMNS = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'workspaceMemberId',
    'personId',
    'displayName',
    'handle',
    'role',
    'messageId'
];
const GENERATE_MESSAGE_PARTICIPANT_IDS = ()=>{
    const PARTICIPANT_IDS = {};
    for(let INDEX = 1; INDEX <= 1500; INDEX++){
        const HEX_INDEX = INDEX.toString(16).padStart(4, '0');
        PARTICIPANT_IDS[`ID_${INDEX}`] = `20202020-${HEX_INDEX}-4e7c-8001-123456789cde`;
    }
    return PARTICIPANT_IDS;
};
const MESSAGE_PARTICIPANT_DATA_SEED_IDS = GENERATE_MESSAGE_PARTICIPANT_IDS();
const FAKE_EMAIL_PARTICIPANTS = [
    {
        name: 'Alex Johnson',
        email: 'alex.johnson@company.com'
    },
    {
        name: 'Sarah Williams',
        email: 'sarah.williams@company.com'
    },
    {
        name: 'Michael Chen',
        email: 'michael.chen@company.com'
    },
    {
        name: 'Emily Davis',
        email: 'emily.davis@company.com'
    },
    {
        name: 'David Rodriguez',
        email: 'david.rodriguez@company.com'
    },
    {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com'
    },
    {
        name: 'James Wilson',
        email: 'james.wilson@company.com'
    },
    {
        name: 'Jennifer Martinez',
        email: 'jennifer.martinez@company.com'
    },
    {
        name: 'Robert Taylor',
        email: 'robert.taylor@company.com'
    },
    {
        name: 'Maria Garcia',
        email: 'maria.garcia@company.com'
    },
    {
        name: 'John Smith',
        email: 'john.smith@external.com'
    },
    {
        name: 'Emma Johnson',
        email: 'emma.johnson@external.com'
    },
    {
        name: 'Oliver Brown',
        email: 'oliver.brown@external.com'
    },
    {
        name: 'Sophia Davis',
        email: 'sophia.davis@external.com'
    },
    {
        name: 'William Miller',
        email: 'william.miller@external.com'
    }
];
const GET_RANDOM_FAKE_PARTICIPANT = ()=>{
    return FAKE_EMAIL_PARTICIPANTS[Math.floor(Math.random() * FAKE_EMAIL_PARTICIPANTS.length)];
};
const FIND_UNUSED_PERSON_ID = (personIds, usedPersonIds)=>{
    const AVAILABLE_IDS = personIds.filter((id)=>!usedPersonIds.has(id));
    if (AVAILABLE_IDS.length === 0) return null;
    return AVAILABLE_IDS[Math.floor(Math.random() * AVAILABLE_IDS.length)];
};
const FIND_UNUSED_WORKSPACE_MEMBER_ID = (workspaceMemberIds, usedWorkspaceMemberIds)=>{
    const AVAILABLE_IDS = workspaceMemberIds.filter((id)=>!usedWorkspaceMemberIds.has(id));
    if (AVAILABLE_IDS.length === 0) return null;
    return AVAILABLE_IDS[Math.floor(Math.random() * AVAILABLE_IDS.length)];
};
const CREATE_PERSON_PARTICIPANT = (personIds, usedPersonIds, defaultWorkspaceMemberId)=>{
    const PERSON_ID = FIND_UNUSED_PERSON_ID(personIds, usedPersonIds);
    if (!PERSON_ID) return null;
    usedPersonIds.add(PERSON_ID);
    const PERSON_INDEX = personIds.indexOf(PERSON_ID) + 1;
    return {
        workspaceMemberId: defaultWorkspaceMemberId,
        personId: PERSON_ID,
        displayName: `Person ${PERSON_INDEX}`,
        handle: `person${PERSON_INDEX}@example.com`
    };
};
const CREATE_WORKSPACE_MEMBER_PARTICIPANT = (workspaceMemberIds, personIds, usedWorkspaceMemberIds)=>{
    const WORKSPACE_MEMBER_ID = FIND_UNUSED_WORKSPACE_MEMBER_ID(workspaceMemberIds, usedWorkspaceMemberIds);
    if (!WORKSPACE_MEMBER_ID) return null;
    usedWorkspaceMemberIds.add(WORKSPACE_MEMBER_ID);
    switch(WORKSPACE_MEMBER_ID){
        case _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.TIM:
            return {
                workspaceMemberId: WORKSPACE_MEMBER_ID,
                personId: personIds[0],
                displayName: 'Tim Apple',
                handle: 'tim@apple.dev'
            };
        case _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.JONY:
            return {
                workspaceMemberId: WORKSPACE_MEMBER_ID,
                personId: personIds[1] || personIds[0],
                displayName: 'Jony Ive',
                handle: 'jony@apple.dev'
            };
        case _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.PHIL:
            return {
                workspaceMemberId: WORKSPACE_MEMBER_ID,
                personId: personIds[2] || personIds[0],
                displayName: 'Phil Schiller',
                handle: 'phil@apple.dev'
            };
        default:
            return {
                workspaceMemberId: WORKSPACE_MEMBER_ID,
                personId: personIds[0],
                displayName: 'Workspace Member',
                handle: 'member@apple.dev'
            };
    }
};
const CREATE_FAKE_PARTICIPANT = (workspaceMemberIds, personIds)=>{
    const FAKE = GET_RANDOM_FAKE_PARTICIPANT();
    return {
        workspaceMemberId: workspaceMemberIds[0],
        personId: personIds[Math.floor(Math.random() * Math.min(10, personIds.length))],
        displayName: FAKE.name,
        handle: FAKE.email
    };
};
const CREATE_PARTICIPANT_DATA = (personIds, workspaceMemberIds, usedPersonIds, usedWorkspaceMemberIds)=>{
    const PARTICIPANT_TYPE = Math.random();
    // Try person participant (40% chance)
    if (PARTICIPANT_TYPE < 0.4) {
        const PERSON_PARTICIPANT = CREATE_PERSON_PARTICIPANT(personIds, usedPersonIds, workspaceMemberIds[0]);
        if (PERSON_PARTICIPANT) return PERSON_PARTICIPANT;
    }
    // Try workspace member participant (30% chance, 0.4-0.7 range)
    if (PARTICIPANT_TYPE >= 0.4 && PARTICIPANT_TYPE < 0.7) {
        const WORKSPACE_PARTICIPANT = CREATE_WORKSPACE_MEMBER_PARTICIPANT(workspaceMemberIds, personIds, usedWorkspaceMemberIds);
        if (WORKSPACE_PARTICIPANT) return WORKSPACE_PARTICIPANT;
    }
    // Fallback to fake participant
    return CREATE_FAKE_PARTICIPANT(workspaceMemberIds, personIds);
};
const CREATE_MESSAGE_PARTICIPANTS = (messageId, personIds, workspaceMemberIds, participantIndex)=>{
    const PARTICIPANTS = [];
    const RECIPIENT_COUNT = 1 + Math.floor(Math.random() * 3); // 1-3 recipients
    const TOTAL_PARTICIPANTS = 1 + RECIPIENT_COUNT; // sender + recipients
    const USED_PERSON_IDS = new Set();
    const USED_WORKSPACE_MEMBER_IDS = new Set();
    for(let I = 0; I < TOTAL_PARTICIPANTS; I++){
        const IS_SENDER = I === 0;
        const ROLE = IS_SENDER ? _types.MessageParticipantRole.FROM : _types.MessageParticipantRole.TO;
        // Random date within the last 3 months
        const NOW = new Date();
        const RANDOM_DAYS_OFFSET = Math.floor(Math.random() * 90);
        const PARTICIPANT_DATE = new Date(NOW.getTime() - RANDOM_DAYS_OFFSET * 24 * 60 * 60 * 1000);
        const PARTICIPANT_DATA = CREATE_PARTICIPANT_DATA(personIds, workspaceMemberIds, USED_PERSON_IDS, USED_WORKSPACE_MEMBER_IDS);
        PARTICIPANTS.push({
            id: MESSAGE_PARTICIPANT_DATA_SEED_IDS[`ID_${participantIndex}`],
            createdAt: PARTICIPANT_DATE,
            updatedAt: PARTICIPANT_DATE,
            deletedAt: null,
            workspaceMemberId: PARTICIPANT_DATA.workspaceMemberId,
            personId: PARTICIPANT_DATA.personId,
            displayName: PARTICIPANT_DATA.displayName,
            handle: PARTICIPANT_DATA.handle,
            role: ROLE,
            messageId
        });
        participantIndex++;
    }
    return {
        participants: PARTICIPANTS,
        nextIndex: participantIndex
    };
};
const GENERATE_MESSAGE_PARTICIPANT_SEEDS = (workspaceId)=>{
    const PARTICIPANT_SEEDS = [];
    let PARTICIPANT_INDEX = 1;
    const MESSAGE_IDS = Object.keys(_messagedataseedsconstant.MESSAGE_DATA_SEED_IDS).map((key)=>_messagedataseedsconstant.MESSAGE_DATA_SEED_IDS[key]);
    const PERSON_IDS = Object.keys(_persondataseedsconstant.PERSON_DATA_SEED_IDS).map((key)=>_persondataseedsconstant.PERSON_DATA_SEED_IDS[key]);
    const WORKSPACE_MEMBER_IDS = (0, _workspacememberdataseedsconstant.getWorkspaceMemberDataSeeds)(workspaceId).map((member)=>member.id);
    for (const MESSAGE_ID of MESSAGE_IDS){
        const RESULT = CREATE_MESSAGE_PARTICIPANTS(MESSAGE_ID, PERSON_IDS, WORKSPACE_MEMBER_IDS, PARTICIPANT_INDEX);
        PARTICIPANT_SEEDS.push(...RESULT.participants);
        PARTICIPANT_INDEX = RESULT.nextIndex;
    }
    return PARTICIPANT_SEEDS;
};
const getMessageParticipantDataSeeds = (workspaceId)=>{
    return GENERATE_MESSAGE_PARTICIPANT_SEEDS(workspaceId);
};

//# sourceMappingURL=message-participant-data-seeds.constant.js.map