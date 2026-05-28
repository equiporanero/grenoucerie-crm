"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OrderByWithGroupByArgProcessorService", {
    enumerable: true,
    get: function() {
        return OrderByWithGroupByArgProcessorService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let OrderByWithGroupByArgProcessorService = class OrderByWithGroupByArgProcessorService {
    process({ orderBy }) {
        if (Array.isArray(orderBy) || !(0, _utils.isDefined)(orderBy)) {
            return orderBy;
        }
        return [
            orderBy
        ];
    }
};
OrderByWithGroupByArgProcessorService = _ts_decorate([
    (0, _common.Injectable)()
], OrderByWithGroupByArgProcessorService);

//# sourceMappingURL=order-by-with-group-by-arg-processor.service.js.map