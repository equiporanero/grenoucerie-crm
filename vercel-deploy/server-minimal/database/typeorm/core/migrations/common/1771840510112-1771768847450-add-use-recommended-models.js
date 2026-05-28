"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUseRecommendedModels1771840510112", {
    enumerable: true,
    get: function() {
        return AddUseRecommendedModels1771840510112;
    }
});
let AddUseRecommendedModels1771840510112 = class AddUseRecommendedModels1771840510112 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "useRecommendedModels" boolean NOT NULL DEFAULT true`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "useRecommendedModels"`);
    }
    constructor(){
        this.name = 'AddUseRecommendedModels1771840510112';
    }
};

//# sourceMappingURL=1771840510112-1771768847450-add-use-recommended-models.js.map