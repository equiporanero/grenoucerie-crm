"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EditableProfileFields1762884796640", {
    enumerable: true,
    get: function() {
        return EditableProfileFields1762884796640;
    }
});
let EditableProfileFields1762884796640 = class EditableProfileFields1762884796640 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "editableProfileFields" character varying array DEFAULT '{email,profilePicture,firstName,lastName}'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "editableProfileFields"`);
    }
    constructor(){
        this.name = 'EditableProfileFields1762884796640';
    }
};

//# sourceMappingURL=1762884796640-editableProfileFields.js.map