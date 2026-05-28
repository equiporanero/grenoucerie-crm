"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "paginateByIdCursor", {
    enumerable: true,
    get: function() {
        return paginateByIdCursor;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const paginateByIdCursor = async ({ repository, workspaceId, where, limit, startingAfter, endingBefore })=>{
    if ((0, _utils.isDefined)(startingAfter) && (0, _utils.isDefined)(endingBefore)) {
        throw new _common.BadRequestException(`'starting_after' and 'ending_before' cannot be used together.`);
    }
    const isBackward = (0, _utils.isDefined)(endingBefore);
    const idCondition = isBackward ? {
        id: (0, _typeorm.MoreThan)(endingBefore)
    } : (0, _utils.isDefined)(startingAfter) ? {
        id: (0, _typeorm.LessThan)(startingAfter)
    } : {};
    const baseWhere = {
        ...where,
        workspaceId
    };
    const [rows, totalCount] = await Promise.all([
        repository.find({
            where: {
                ...baseWhere,
                ...idCondition
            },
            order: {
                id: isBackward ? 'ASC' : 'DESC'
            },
            take: limit + 1
        }),
        repository.count({
            where: baseWhere
        })
    ]);
    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    if (isBackward) {
        items.reverse();
    }
    return {
        items,
        pageInfo: {
            hasNextPage: hasMore,
            startCursor: items[0]?.id ?? null,
            endCursor: items[items.length - 1]?.id ?? null
        },
        totalCount
    };
};

//# sourceMappingURL=paginate-by-id-cursor.util.js.map