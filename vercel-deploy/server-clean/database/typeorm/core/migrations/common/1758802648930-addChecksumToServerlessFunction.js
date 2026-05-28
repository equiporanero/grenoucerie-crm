"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddChecksumToServerlessFunction1758802648930", {
    enumerable: true,
    get: function() {
        return AddChecksumToServerlessFunction1758802648930;
    }
});
let AddChecksumToServerlessFunction1758802648930 = class AddChecksumToServerlessFunction1758802648930 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "checksum" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "checksum"`);
    }
    constructor(){
        this.name = 'AddChecksumToServerlessFunction1758802648930';
    }
};

//# sourceMappingURL=1758802648930-addChecksumToServerlessFunction.js.map