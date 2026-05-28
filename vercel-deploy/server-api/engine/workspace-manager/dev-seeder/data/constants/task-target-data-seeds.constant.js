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
    get TASK_TARGET_DATA_SEEDS () {
        return TASK_TARGET_DATA_SEEDS;
    },
    get TASK_TARGET_DATA_SEEDS_MAP () {
        return TASK_TARGET_DATA_SEEDS_MAP;
    },
    get TASK_TARGET_DATA_SEED_COLUMNS () {
        return TASK_TARGET_DATA_SEED_COLUMNS;
    }
});
const _companydataseedsconstant = require("./company-data-seeds.constant");
const _persondataseedsconstant = require("./person-data-seeds.constant");
const _taskdataseedsconstant = require("./task-data-seeds.constant");
const TASK_TARGET_DATA_SEED_COLUMNS = [
    'id',
    'taskId',
    'targetPersonId',
    'targetCompanyId',
    'targetOpportunityId'
];
// Generate all task target IDs
const GENERATE_TASK_TARGET_IDS = ()=>{
    const TASK_TARGET_IDS = {};
    // Person task targets (ID_1 to ID_1200)
    for(let INDEX = 1; INDEX <= 1200; INDEX++){
        const HEX_INDEX = INDEX.toString(16).padStart(4, '0');
        TASK_TARGET_IDS[`ID_${INDEX}`] = `60606060-${HEX_INDEX}-4e7c-8001-123456789def`;
    }
    // Company task targets (ID_1201 to ID_1800)
    for(let INDEX = 1201; INDEX <= 1800; INDEX++){
        const HEX_INDEX = INDEX.toString(16).padStart(4, '0');
        TASK_TARGET_IDS[`ID_${INDEX}`] = `60606060-${HEX_INDEX}-4e7c-9001-123456789def`;
    }
    return TASK_TARGET_IDS;
};
const TASK_TARGET_DATA_SEED_IDS = GENERATE_TASK_TARGET_IDS();
// Generate task target data seeds
const GENERATE_TASK_TARGET_SEEDS = ()=>{
    const TASK_TARGET_SEEDS = [];
    // Person task targets (link each person task to its corresponding person)
    for(let INDEX = 1; INDEX <= 1200; INDEX++){
        TASK_TARGET_SEEDS.push({
            id: TASK_TARGET_DATA_SEED_IDS[`ID_${INDEX}`],
            taskId: _taskdataseedsconstant.TASK_DATA_SEED_IDS[`ID_${INDEX}`],
            targetPersonId: _persondataseedsconstant.PERSON_DATA_SEED_IDS[`ID_${INDEX}`],
            targetCompanyId: null,
            targetOpportunityId: null
        });
    }
    // Company task targets (link each company task to its corresponding company)
    for(let INDEX = 1201; INDEX <= 1800; INDEX++){
        const COMPANY_INDEX = INDEX - 1200;
        TASK_TARGET_SEEDS.push({
            id: TASK_TARGET_DATA_SEED_IDS[`ID_${INDEX}`],
            taskId: _taskdataseedsconstant.TASK_DATA_SEED_IDS[`ID_${INDEX}`],
            targetPersonId: null,
            targetCompanyId: _companydataseedsconstant.COMPANY_DATA_SEED_IDS[`ID_${COMPANY_INDEX}`],
            targetOpportunityId: null
        });
    }
    return TASK_TARGET_SEEDS;
};
const TASK_TARGET_DATA_SEEDS = GENERATE_TASK_TARGET_SEEDS();
const TASK_TARGET_DATA_SEEDS_MAP = new Map(TASK_TARGET_DATA_SEEDS.filter((target)=>target.taskId !== null).map((target)=>[
        target.taskId,
        target
    ]));

//# sourceMappingURL=task-target-data-seeds.constant.js.map