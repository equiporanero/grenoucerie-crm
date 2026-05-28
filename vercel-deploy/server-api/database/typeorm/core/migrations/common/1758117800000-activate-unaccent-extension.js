"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActivateUnaccentExtension1758117800000", {
    enumerable: true,
    get: function() {
        return ActivateUnaccentExtension1758117800000;
    }
});
let ActivateUnaccentExtension1758117800000 = class ActivateUnaccentExtension1758117800000 {
    async up(queryRunner) {
        // SELF-HOSTED Users:
        // If you are self-hosting Twenty, you will need to install the unaccent_immutable extension with the admin user
        try {
            await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;`);
            await queryRunner.query(`CREATE OR REPLACE FUNCTION public.unaccent_immutable(input text)
            RETURNS text
            LANGUAGE sql
            IMMUTABLE
        AS $$
        SELECT public.unaccent('public.unaccent'::regdictionary, input)
        $$;`);
        } catch  {
        // Ignore error
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP FUNCTION IF EXISTS public.unaccent_immutable(text)`);
    // Note: We don't drop the extension as it might be used elsewhere
    }
    constructor(){
        this.name = 'ActivateUnaccentExtension1758117800000';
    }
};

//# sourceMappingURL=1758117800000-activate-unaccent-extension.js.map