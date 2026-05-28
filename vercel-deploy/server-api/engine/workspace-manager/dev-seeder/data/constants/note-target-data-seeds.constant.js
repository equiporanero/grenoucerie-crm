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
    get NOTE_TARGET_DATA_SEEDS () {
        return NOTE_TARGET_DATA_SEEDS;
    },
    get NOTE_TARGET_DATA_SEEDS_MAP () {
        return NOTE_TARGET_DATA_SEEDS_MAP;
    },
    get NOTE_TARGET_DATA_SEED_COLUMNS () {
        return NOTE_TARGET_DATA_SEED_COLUMNS;
    }
});
const _companydataseedsconstant = require("./company-data-seeds.constant");
const _notedataseedsconstant = require("./note-data-seeds.constant");
const _persondataseedsconstant = require("./person-data-seeds.constant");
const NOTE_TARGET_DATA_SEED_COLUMNS = [
    'id',
    'noteId',
    'targetPersonId',
    'targetCompanyId',
    'targetOpportunityId'
];
const GENERATE_NOTE_TARGET_IDS = ()=>{
    const NOTE_TARGET_IDS = {};
    for(let INDEX = 1; INDEX <= 1200; INDEX++){
        const HEX_INDEX = INDEX.toString(16).padStart(4, '0');
        NOTE_TARGET_IDS[`ID_${INDEX}`] = `20202020-${HEX_INDEX}-4e7c-8001-123456789def`;
    }
    for(let INDEX = 1201; INDEX <= 1800; INDEX++){
        const HEX_INDEX = INDEX.toString(16).padStart(4, '0');
        NOTE_TARGET_IDS[`ID_${INDEX}`] = `20202020-${HEX_INDEX}-4e7c-9001-123456789def`;
    }
    return NOTE_TARGET_IDS;
};
const NOTE_TARGET_DATA_SEED_IDS = GENERATE_NOTE_TARGET_IDS();
const GENERATE_NOTE_TARGET_SEEDS = ()=>{
    const NOTE_TARGET_SEEDS = [];
    for(let INDEX = 1; INDEX <= 1200; INDEX++){
        NOTE_TARGET_SEEDS.push({
            id: NOTE_TARGET_DATA_SEED_IDS[`ID_${INDEX}`],
            noteId: _notedataseedsconstant.NOTE_DATA_SEED_IDS[`ID_${INDEX}`],
            targetPersonId: _persondataseedsconstant.PERSON_DATA_SEED_IDS[`ID_${INDEX}`],
            targetCompanyId: null,
            targetOpportunityId: null
        });
    }
    for(let INDEX = 1201; INDEX <= 1800; INDEX++){
        const COMPANY_INDEX = INDEX - 1200;
        NOTE_TARGET_SEEDS.push({
            id: NOTE_TARGET_DATA_SEED_IDS[`ID_${INDEX}`],
            noteId: _notedataseedsconstant.NOTE_DATA_SEED_IDS[`ID_${INDEX}`],
            targetPersonId: null,
            targetCompanyId: _companydataseedsconstant.COMPANY_DATA_SEED_IDS[`ID_${COMPANY_INDEX}`],
            targetOpportunityId: null
        });
    }
    return NOTE_TARGET_SEEDS;
};
const NOTE_TARGET_DATA_SEEDS = GENERATE_NOTE_TARGET_SEEDS();
const NOTE_TARGET_DATA_SEEDS_MAP = new Map(NOTE_TARGET_DATA_SEEDS.filter((target)=>target.noteId !== null).map((target)=>[
        target.noteId,
        target
    ]));

//# sourceMappingURL=note-target-data-seeds.constant.js.map